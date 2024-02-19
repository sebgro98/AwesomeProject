import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Use useNavigate to get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Both username and password are required');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/person/login', { username, password });
            // Handle successful login
            console.log(response.data);
        } catch (error) {
            // Handle failed login
            setError('Login failed. Please check your credentials.');
        }
    };

    const redirectToSignUp = () => {
        // Use navigate to navigate to the SignUpView
        navigate('/signup');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>

                {/* Button to redirect to SignUpView */}
                <button type="button" onClick={redirectToSignUp}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default LoginView;
