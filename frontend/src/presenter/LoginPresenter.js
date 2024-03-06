import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginView from "../views/LoginView";
import {useTranslation} from "react-i18next";

/**
 * LoginPresenter component manages the state and logic for user login.
 * <LoginPresenter />
 */
const LoginPresenter = () => {
    const [t, i18n] = useTranslation("translation");
    /**
     * State to store the entered username.
     * @type {string}
     * @default ''
     */
    const [username, setUsername] = useState('');

    /**
     * State to store the entered password.
     * @type {string}
     * @default ''
     */
    const [password, setPassword] = useState('');

    /**
     * State to store login error messages.
     * @type {string}
     * @default ''
     */
    const [error, setError] = useState('');

    /**
     * React Router navigation hook.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * Update the username state on input change.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @returns {void}
     */
    const handleUsernameChange = (e) => setUsername(e.target.value);

    /**
     * Update the password state on input change.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @returns {void}
     */
    const handlePasswordChange = (e) => setPassword(e.target.value);

    /**
     * Handle the form submission for user login.
     * Redirects to the appropriate page based on the user's role.
     * @async
     * @param {React.FormEvent} e - The form submission event.
     * @returns {void}
     */
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

    /**
     * Redirect to the signup page.
     * @returns {void}
     */
    const redirectToSignUp = () => {
        console.log('Redirecting to SignUp'); // Debug log
        navigate('/signup');
    };

    /**
     * Render the LoginView component with the necessary props.
     * @returns {JSX.Element} - The rendered React component.
     */
    return (
        <LoginView
            username={username}
            password={password}
            error={error}
            handleUsernameChange={handleUsernameChange}
            handlePasswordChange={handlePasswordChange}
            handleSubmit={handleSubmit}
            redirectToSignUp={redirectToSignUp}
            languageData = {t}
        />
    );
};

export default LoginPresenter;
