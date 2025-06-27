import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../CSS/ProfilePhoto.css';

const ProfilePhoto = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [profilePhoto, setProfilePhoto] = useState(`${process.env.PUBLIC_URL}/images/profile-icon.png`);

  useEffect(() => {
    // Load saved profile photo from localStorage
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  const handleProfileClick = () => {
    // Navigate to the profile page
    navigate('/profile'); // Use the correct route path
  };

  return (
    <div className="profile-photo-container" onClick={handleProfileClick}>
      <img 
        src={profilePhoto} 
        alt="Profile" 
        className="profile-photo" 
      />
    </div>
  );
};

export default ProfilePhoto;
