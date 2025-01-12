'use client';
import './NavBar.css';
import React, { useState } from 'react';
import TutorialPage from './TutorialPage'; // Import the TutorialPage component

const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState('#'); // State to track the current href

  // Function to render the selected page
  const renderPage = () => {
    if (selectedPage === '#tutorial') {
      return <TutorialPage />; // Render TutorialPage when #tutorial is selected
    } else {
      

    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="synced">Synced</div>
        <button className="menu-button" onClick={() => {}}>
          ☰
        </button>
        <div className="desktop-menu">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              onClick={() => setSelectedPage(item.href)} // Update selected page on click
            />
          ))}
        </div>
        <div className="sign-buttons">
          <button className="try-now">Create Now</button>
        </div>
      </nav>

      {/* Render the selected page */}
      <div className="content">{renderPage()}</div>
    </div>
  );
};

// Navigation item component
const NavItem = ({ item, onClick }) => {
  return (
    <div className="nav-item">
      <a
        href={item.href}
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior (full-page reload)
          onClick(); // Call the click handler passed from NavBar
        }}
      >
        {item.label}
      </a>
    </div>
  );
};

// Navigation items
const NAV_ITEMS = [
  { label: 'Why Synced', href: '#' }, // Default home page
  { label: 'Tutorial', href: '#tutorial' }, // Links to TutorialPage
];

export default NavBar;

