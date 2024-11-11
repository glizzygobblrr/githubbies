import React, { useState } from 'react';
import '../styles/login.css'; 
import logo from '../assets/logo.png';

const Login = () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzAxMDU4NzYsImV4cCI6MTczMDEwNjA3Nn0.vSNTKCXwdH_e8EYRqRHwRRnvOpE4UXu6xjEkYDCEZRI"
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log(token);

        try {
            const response = await fetch('/login', { // Update to the correct endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`               
                },
                body: JSON.stringify({ email, password }), // Ensure you're sending email here
            });            

            const data = await response.json();

            if (!response.ok) {
                console.error('Response Data:', data);
                throw new Error(data.message || 'Invalid email or password');
            }

            console.log('Login successful', data);
            localStorage.setItem('token', data.token); // Save token
            localStorage.setItem('role', data.role);   // Save role in localStorage

            // Check role and navigate accordingly
            if (data.role === "Admin") {
                window.open('/admin', '_blank'); // Open admin dashboard
            } else if (data.role === "Operator") {
                window.open('/operator', '_blank'); // Open operator dashboard
            } else if (data.role === "Content Creator") {
                window.location.href = '/content-creator'; // Open content creator page
            } else if (data.role === "Analyst") {
                window.location.href = '/analyst'; // Open analyst page
            } else {
                console.error('Invalid role');
                setError('Invalid role');
            }
        
        } catch (err) {
            console.error('Login failed', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;