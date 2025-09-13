import React, { useEffect, useState } from "react";
import "../styles/UserDashboard.css";
import { Link } from "react-router-dom";
import CyberTip from "./Cyber_tip";

function UserDashboard() {
  const [currentTime, setCurrentTime] = useState('');
  const [tip, setTip] = useState('');

  const tips = [
    "Never share your OTP or passwords with anyone — not even your best friend!",
    "Beware of links asking for KYC updates. Most are phishing traps.",
    "If something feels off, don’t engage. Report at cybercrime.gov.in.",
    "Install apps only from trusted sources like Play Store or App Store.",
    "Always double-check email IDs that claim to be official!"
  ];

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setCurrentTime(time);

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning ☀️"
      : currentHour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  const recentFIRs = [
    {
      id: "FIR2025UP001",
      location: "Lucknow, Uttar Pradesh",
      date: "July 22, 2025",
      status: "Filed",
    },
    {
      id: "FIR2025DL002",
      location: "New Delhi",
      date: "July 19, 2025",
      status: "In Review",
    },
    {
      id: "FIR2025MH003",
      location: "Mumbai, Maharashtra",
      date: "July 14, 2025",
      status: "Resolved",
    },
  ];

  const alerts = [
    {
      title: "⚠️ New phishing scam targeting college students",
      detail:
        "Avoid clicking on fake internship emails. Always verify sender domain. Report to cybercrime.gov.in.",
    },
    {
      title: "🛑 RBI Warning: Loan App Frauds",
      detail:
        "Only use RBI-registered apps. Don’t share OTPs. Cross-check on rbi.org.in.",
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{greeting}, Citizen!</h1>
        <p>⏰ {currentTime} — Welcome to your CyberCop dashboard. Stay alert. Stay safe.</p>
      </div>

      <div className="dashboard-grid">
        {/* Recent FIRs */}
        <div className="dashboard-card glow">
          <h2>📄 Recent FIRs</h2>
          {recentFIRs.map((fir, index) => (
            <div key={index} className="fir-entry">
              <strong>{fir.id}</strong> — {fir.location} <br />
              <small>
                {fir.date} | Status:{" "}
                <span className={`status ${fir.status.toLowerCase().replace(" ", "-")}`}>
                  {fir.status}
                </span>
              </small>
            </div>
          ))}
        </div>

        {/* ScamMap Preview */}
        <div className="dashboard-card glow">
          <h2>🗺️ Scam Map Quick View</h2>
          <p>See the cybercrime hotspots across India.</p>
          <Link to="/map" className="map-button">View Full Scam Map</Link>
        </div>

        {/* Cyber Alerts */}
        <div className="dashboard-card full-width glow">
          <h2>🔔 Cyber Alerts & Warnings</h2>
          {alerts.map((alert, i) => (
            <div key={i} className="alert">
              <strong>{alert.title}</strong>
              <p>{alert.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="dashboard-tip">💡 Safety Tip: {tip}</p>
      <CyberTip />
    </div>
  );
}

export default UserDashboard;
