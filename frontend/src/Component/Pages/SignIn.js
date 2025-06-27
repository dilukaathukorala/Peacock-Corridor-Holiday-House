import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../CSS/SignIn.css'; 
import HeaderMain from '../Common/HeaderMain';
import NavBarMain from '../Common/NavBarMain';
import FooterMain from '../Common/FooterMain';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Create a navigate function

    const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username, "Password:", password); // Debug log
    if (username === "dilukaathukorala@gmail.com" && password === "inventory123") {
        localStorage.setItem('isAuthenticated', 'true'); 
        console.log("User authenticated. Redirecting to Stock Management."); // Debug log
        navigate('/stock-management'); 
    } else {
        alert("Invalid username or password");
    }
};


    return (
        <div className="signin-page">
            <HeaderMain/>
            <NavBarMain/>
            <div className="sign-in-container">
                <img src="/images/Gallery_7.jpg" alt="Background" className="background-image" />
                <div className="sign-in-form">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <FooterMain/>
        </div>
    );
};

export default SignIn;
