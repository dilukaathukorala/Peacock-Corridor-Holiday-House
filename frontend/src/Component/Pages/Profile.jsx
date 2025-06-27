import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Profile.css';

const Profile = () => {
  const [name, setName] = useState('Diluka Athukorala');
  const [idNumber, setIdNumber] = useState('IT22005762');
  const [jobRole, setJobRole] = useState('Inventory Manager');
  const [profilePhoto, setProfilePhoto] = useState(`${process.env.PUBLIC_URL}/images/profile-icon.png`);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Create a navigate function

  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    const savedName = localStorage.getItem('name');
    const savedIdNumber = localStorage.getItem('idNumber');
    const savedJobRole = localStorage.getItem('jobRole');

    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
    if (savedName) {
      setName(savedName);
    }
    if (savedIdNumber) {
      setIdNumber(savedIdNumber);
    }
    if (savedJobRole) {
      setJobRole(savedJobRole);
    }
  }, []);

  const handleLogout = () => {
    // Clear any user session data here if necessary
    localStorage.removeItem('profilePhoto');
    localStorage.removeItem('name');
    localStorage.removeItem('idNumber');
    localStorage.removeItem('jobRole');
    console.log('Logged out');
    navigate('/signin'); // Redirect to Sign-In page
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem('profilePhoto', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('name', name);
    localStorage.setItem('idNumber', idNumber);
    localStorage.setItem('jobRole', jobRole);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="company-logo-container">
        <img 
          src={`${process.env.PUBLIC_URL}../images/logo.png`} 
          alt="Company Logo" 
          className="company-logo"
        />
      </div>

      <div className="profile-section">
        <img 
          src={profilePhoto} 
          alt="Profile" 
          className="profile-photo"
        />
        {isEditing ? (
          <form onSubmit={handleSave}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
            <div>
              <br />
              <br />
              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>ID Number:</label>
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </div>
            <br />
            <div>
              <label>Job Role:</label>
              <input
                type="text"
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div>
            <br />
            <button type="submit">Save</button>
            <br />
            <button type="button" onClick={handleEditToggle}>Cancel</button>
          </form>
        ) : (
          <>
            <h1>Profile</h1>
            <p>Name: {name}</p>
            <p>ID Number: {idNumber}</p>
            <p>Job Role: {jobRole}</p>
            <button onClick={handleEditToggle} className="edit-button">
              Edit Profile
            </button>
          </>
        )}
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
