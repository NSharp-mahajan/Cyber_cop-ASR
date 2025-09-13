import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "../styles/CrimeMap.css"; // Import your custom CSS

// Fix for default marker icon not appearing (ensure this is placed before any L.Icon.Default usage)
// This is a common issue with react-leaflet and webpack/create-react-app
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


// CustomClickTooltip component to render the sniper scope effect
const CustomClickTooltip = ({ position, content, isVisible }) => {
    const map = useMap(); // Hook to access the Leaflet map instance
    const [pixelPosition, setPixelPosition] = useState(null);

    useEffect(() => {
        if (isVisible && position) {
            // Convert geographical coordinates (LatLng) to pixel coordinates on the screen
            const point = map.latLngToContainerPoint(position);
            setPixelPosition(point);
        } else {
            setPixelPosition(null); // Hide the tooltip by clearing position
        }
    }, [isVisible, position, map]); // Re-run effect if these dependencies change

    // If not visible or position isn't set, don't render anything
    if (!isVisible || !pixelPosition) return null;

    return (
        <div
            className={`custom-click-tooltip ${isVisible ? 'show' : ''}`} // Add 'show' class for animation
            style={{
                left: pixelPosition.x, // Position based on calculated pixel coordinates
                top: pixelPosition.y,
                // Centering transformation is handled by CSS
            }}
        >
            {/* Three rotating rings for the scope effect */}
            <div className="reticle-ring ring-1"></div>
            <div className="reticle-ring ring-2"></div>
            <div className="reticle-ring ring-3"></div>

            {/* Crosshairs and central aiming dot */}
            <div className="reticle-lines">
                <div className="horizontal-line"></div>
                <div className="vertical-line"></div>
                <div className="center-dot"></div> {/* The pulsating red aiming dot */}
            </div>
            {/* Display the state name inside the scope */}
            <div className="content-display">{content}</div>
        </div>
    );
};


const CrimeMapApp = () => {
    const [geoData, setGeoData] = useState(null); // State to store GeoJSON data
    const [selectedRegion, setSelectedRegion] = useState(null); // State for the currently selected region name
    const [crimeData, setCrimeData] = useState(null); // State for crime data of the selected region
    const [tooltipState, setTooltipState] = useState({ // State for managing the custom tooltip's visibility, position, and content
        isVisible: false,
        position: null,
        content: ''
    });

    // Effect to fetch GeoJSON data when the component mounts
    useEffect(() => {
        fetch('/india_state.geojson')
            .then((res) => {
                if (!res.ok) { // Check for HTTP errors
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setGeoData(data)) // Set the fetched data to state
            .catch((err) => console.error('Failed to load GeoJSON:', err)); // Log any errors
    }, []); // Empty dependency array means this effect runs once on mount

    // Handler for when a GeoJSON region on the map is clicked
    const onRegionClick = async (e) => {
        const regionName = e.target.feature.properties.NAME_1; // Get region name from GeoJSON properties
        setSelectedRegion(regionName); // Update selected region in sidebar

        // Update tooltip state to show it at the click position with the region name
        setTooltipState({
            isVisible: true,
            position: e.latlng, // Use the geographical coordinates of the click
            content: regionName, // Content for the tooltip
        });

        // Set a timeout to automatically hide the tooltip after 3 seconds
        // This creates a fleeting "aiming" effect
        setTimeout(() => {
            setTooltipState(prev => ({ ...prev, isVisible: false })); // Use functional update to ensure correct state
        }, 3000); // Tooltip disappears after 3 seconds

        // Fetch crime data for the clicked region
        try {
            const response = await fetch('/crimeData.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const allData = await response.json(); // Parse all crime data
            const regionCrime = allData[regionName]; // Get specific data for the clicked region
            setCrimeData(regionCrime || null); // Set crime data, or null if no data exists for the region
        } catch (error) {
            console.error('Error loading crime data:', error);
            setCrimeData(null); // Clear crime data on error
        }
    };

    // Function to apply properties and event listeners to each GeoJSON feature
    const onEachRegion = (feature, layer) => {
        layer.on({ click: onRegionClick }); // Attach click handler
        // layer.bindTooltip(feature.properties.NAME_1); // REMOVE OR COMMENT OUT THIS LINE to disable default Leaflet tooltip
        layer.setStyle({
            color: '#00ffff', // Neon blue border
            weight: 1,      // Default border weight
            fillOpacity: 0.1, // Very low fill opacity for a sleek look
            fillColor: '#00ffff', // Base fill color
        });
        // Add hover effects for visual feedback
        layer.on('mouseover', function () {
            this.setStyle({
                weight: 3,           // Thicker border on hover
                color: '#ff6b6b',    // Warning red border on hover
                fillOpacity: 0.3,    // More opaque fill on hover
                fillColor: '#ff6b6b', // Red fill color on hover
            });
        });
        layer.on('mouseout', function () {
            this.setStyle({
                weight: 1,           // Revert border weight
                color: '#00ffff',     // Revert border color
                fillOpacity: 0.1,    // Revert fill opacity
                fillColor: '#00ffff', // Revert fill color
            });
        });
    };

    return (
        <div className="crime-app-container">
            {/* Map Section */}
            <div className="map-section">
                <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: '100%', width: '100%' }}>
                    {/* Darker, high-contrast TileLayer */}
                    <TileLayer
                        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* Render GeoJSON data if available, applying onEachRegion to each feature */}
                    {geoData && <GeoJSON data={geoData} onEachFeature={onEachRegion} />}
                    {/* Render the custom tooltip, passing its state */}
                    <CustomClickTooltip
                        position={tooltipState.position}
                        content={tooltipState.content}
                        isVisible={tooltipState.isVisible}
                    />
                </MapContainer>
            </div>

            {/* Sidebar Section */}
            <div className="sidebar">
                {selectedRegion ? ( // Conditional rendering based on whether a region is selected
                    <div className="sidebar-card">
                        <h2>{selectedRegion}</h2> {/* Display selected region name */}
                        {crimeData ? ( // Conditional rendering based on whether crime data is available
                            <>
                                {/* Display various crime statistics */}
                                <div className="stat stat-blue">
                                    <p>Cyber Crime Cases</p>
                                    <h3>{crimeData.cyber_crime_2022}</h3>
                                </div>
                                <div className="stat stat-purple">
                                    <p>Women Safety Rate</p>
                                    <h3>{crimeData.women_safety_rate_per_100k} / 100k</h3>
                                </div>
                                <div className="stat stat-orange">
                                    <p>Police Score</p>
                                    <h3>{crimeData.police_score}/10</h3>
                                </div>
                                <div className="top-crimes">
                                    <h4>🔎 Top Reported Crimes</h4>
                                    {crimeData.top_crimes && crimeData.top_crimes.length > 0 ? (
                                        <ul>
                                            {/* Corrected line: Emoji wrapped in a string */}
                                            {crimeData.top_crimes.map((crime, i) => (
                                                <li key={i}>{"💥"} {crime}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        // Removed inline comment, which was causing the error
                                        <p className="no-data">No specific data available.</p>
                                    )}
                                </div>
                            </>
                        ) : (
                            // Removed inline comment, which was causing the error
                            <p className="no-data">Data loading or not available for {selectedRegion}.</p>
                        )}
                    </div>
                ) : (
                    <div className="sidebar-card placeholder">
                        <span className="placeholder-icon">🌐</span>
                        <h3>Click a state on the map to analyze crime data.</h3> {/* Placeholder when no region is selected */}
                        <p className="no-data">Awaiting data stream...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrimeMapApp;