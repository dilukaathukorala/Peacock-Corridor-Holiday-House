import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import StockManagement from './Component/Pages/StockManagement.jsx';
import Profile from './Component/Pages/Profile.jsx';
import Home from './Component/Pages/Home.js';
import About from './Component/Pages/About.js'; 
import Contact from './Component/Pages/Contact.js';
import Feedback from './Component/Pages/Feedback.js';
import Gallery from './Component/Pages/Gallery.js';
import Menu from './Component/Pages/Menu.js';
import SignIn from './Component/Pages/SignIn.js';
import './App.css';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/stock-management" element={<StockManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        {/* Redirect from root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </div>
  );
};

// Wrap the entire App in Router to provide context
const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
