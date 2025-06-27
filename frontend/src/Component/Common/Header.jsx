import React from 'react';
import ProfilePhoto from './ProfilePhoto';  // Import the ProfilePhoto component
import '../CSS/Header.css';

const Header = () => (
  <header className="header">
    <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="Company Logo" className="logo" />
    
    <div className="title-container">
      <br/>
      <h1 className="header-title">
        <span className="highlight-inventory">Inventory     </span>
        <span className="highlight-management">Management</span>
      </h1>
    </div>

    <ProfilePhoto /> {/* Add ProfilePhoto component */}
  </header>
);

export default Header;
