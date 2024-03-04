import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginView from "../views/LoginView";

const LoginPresenter = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        setError('');

        if (!username || !password) {
            setError('Both username and password are required');
            return;
        }

        try {
            console.log('Attempting login', { username, password }); // Debug log
            const response = await axios.post('/person/login', { username, password }, { withCredentials: true });
            console.log('Login response', response); // Debug log

            if (response.data.success && response.data.success.role === 'recruiter') {
                navigate('/applications');
            } else {
                navigate('/apply');
            }

        } catch (error) {
            console.error('Login error', error); // Debug log
            setError('Login failed. Please check your credentials.');
        }
    };

    const redirectToSignUp = () => {
        console.log('Redirecting to SignUp'); // Debug log
        navigate('/signup');
    };

    return (
        <LoginView
            username={username}
            password={password}
            error={error}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            redirectToSignUp={redirectToSignUp}
        />
    );
};

export default LoginPresenter;
