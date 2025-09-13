import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';

import Home from './pages/Home';
import FIRGenerator from './pages/FIRGenerator';
import CrimeMap from './pages/CrimeMap';
import ScamChatbot from './pages/ScamChatbot';
import UserDashboard from './pages/UserDashboard';
import CyberTip from './pages/Cyber_tip';

import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

const navigationLinks = [
  { path: '/', label: 'Home' },
  { path: '/fir', label: 'FIR' },
  { path: '/chatbot', label: 'Chatbot' },
  { path: '/map', label: 'Map' },  
  { path: '/dashboard', label: 'Dashboard' },
];


  const appRoutes = [
  { path: '/', element: <Home /> },
  { path: '/fir', element: <FIRGenerator /> },
  { path: '/chatbot', element: <ScamChatbot /> },
  { path: '/map', element: <CrimeMap /> },
  { path: '/dashboard', element: <UserDashboard /> },
];


  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`app-wrapper ${darkMode ? 'dark' : 'light'}`}>
        {/* Header Section */}
        <header className="header">
          <div className="logo">
            🛡️ CyberCop
          </div>
          
          <nav className="nav-links">
            {navigationLinks.map(({ path, label }) => (
              <Link key={path} to={path}>
                {label}
              </Link>
            ))}
            
            <button 
              className="theme-toggle" 
              onClick={handleThemeToggle}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
          </nav>
        </header>

        <main>
          <Routes>
            {appRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <footer id="footer" className="footer">
          <p>© 2025 CyberCop. Built at the intersection of AI, Bharat, and Justice.</p>
          <p>Made with ❤️ by students, for citizens</p>
          
          <div className="footer-links">
            <a 
              href="https://india.gov.in" 
              target="_blank" 
              rel="noreferrer"
            >
              India.gov.in
            </a>
            <a href="#">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
