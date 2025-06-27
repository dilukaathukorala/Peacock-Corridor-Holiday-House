import React, { useState } from 'react';
import './Login.css'; // Create a separate CSS file for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();

        // Check credentials
        if (username === 'dilukaathukorala@gmail.com' && password === 'inventory123') {
            setMessage('Login successful!');
            // Redirect to StockManagement page (update the path as necessary)
            window.location.href = '/StockManagement'; 
        } else {
            setMessage('Invalid username or password.');
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        id="username"
                        placeholder="dilukaathukorala@gmail.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="inventory123"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Login;
