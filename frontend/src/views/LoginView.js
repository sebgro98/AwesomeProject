import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

/**
 * LoginView component for user login.
 * @returns {JSX.Element} Rendered LoginView component.
 */
const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Use useNavigate to get the navigate function

    /**
     * Handles form submission for user login.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Both username and password are required');
            return;
        }

        try {
            const response = await axios.post('/person/login',
                { username, password }, { withCredentials: true });

                navigate('/apply');


        } catch (error) {
            // Handle failed login
            setError('Login failed. Please check your credentials.');
        }
    };

    /**
     * Redirects to the SignUpView component.
     */
    const redirectToSignUp = () => {
        // Use navigate to navigate to the SignUpView
        navigate('/signup');
    };

    return (
        <div>
            <h2>Login Page</h2>
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
