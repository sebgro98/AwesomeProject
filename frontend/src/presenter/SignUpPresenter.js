import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SignUpView from "../views/SignUpView";
import {useTranslation} from "react-i18next";
/**
 * SignUpPresenter component manages the state and logic for user sign-up.
 * <SignUpPresenter />
 */
const SignUpPresenter = () => {
    const [t, i18n] = useTranslation("translation");
    /**
     * State to store error messages during sign-up.
     * @type {string}
     * @default ''
     */
    const [error, setError] = useState('');


    /**
     * State to store the verification code during sign-up.
     * @type {string}
     * @default ''
     */
    const [verificationCode, setVerificationCode] = useState('');

    /**
     * State to control the visibility of the verification view.
     * @type {boolean}
     * @default false
     */
    const [showVerificationView, setShowVerificationView] = useState(false);

    /**
     * React Router navigation hook.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * State to store form data during sign-up.
     * @type {Object}
     * @property {string} firstName - User's first name.
     * @property {string} lastName - User's last name.
     * @property {string} email - User's email address.
     * @property {string} personNumber - User's personal identification number.
     * @property {string} username - User's chosen username.
     * @property {string} password - User's chosen password.
     */
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        personNumber: '',
        username: '',
        password: '',
    });

    /**
     * Handle input changes in the sign-up form.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
     * @returns {void}
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     */
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    /**
     * Validates a person number.
     *
     * @param {string} personNumber - The person number to validate.
     */
    const isValidPersonNumber = (personNumber) => {
        const personNumberRegex = /^\d{8}-\d{4}$/;
        return personNumberRegex.test(personNumber);
    };

    /**
     * Checks if the length of the given string is within the specified range.
     *
     * @param {string} value - The string value to be checked.
     * @param {object} options - The options object with min and max properties specifying the length range.
     * @returns {boolean} - True if the length is within the specified range, false otherwise.
     */
    const isValidLength = (value, { min, max }) => {
        return value.length >= min && value.length <= max;
    };


    /**
     * Handle form submission for sending verification code.
     * @async
     * @param {React.FormEvent} e - The form submission event.
     * @returns {void}
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Validate email and person number before making the API call
        if (!isValidEmail(formData.email)) {
            alert('Invalid email address format.');
            return;
        }
        if (!isValidPersonNumber(formData.personNumber)) {
            alert('Invalid person number format. It should be in the format YYYYMMDD-XXXX.');
            return;
        }
        if (!isValidLength(formData.firstName, { min: 2, max: 50})) {
            alert('Firstname must be more then 2 letters');
            return;
        }
        if (!isValidLength(formData.lastName, { min: 2, max: 50})) {
            alert('Last name must be more then 2 letters');
            return;
        }

        try {
            const response = await axios.post('/person/sendVerification', { formData }, { withCredentials: true });
            setShowVerificationView(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please check your data.');
        }
    };

    /**
     * Handle verification code submission.
     * @async
     * @returns {void}
     */
    const handleVerificationSubmit = async () => {
        try {
            const response = await axios.post('/person/verifyVerificationCode', { formData, verificationCode }, { withCredentials: true });
            alert('User verified successfully!');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Verification failed. Please check your data.');
        }
    };

    /**
     * Redirect to the login page.
     * @returns {void}
     */
    const redirectToLogIn = () => {
        navigate('/');
    };


    /**
     * Render the SignUpView component with the necessary props.
     * @returns {JSX.Element} - The rendered React component.
     */
    return (
        <SignUpView
            error={error}
            verificationCode={verificationCode}
            showVerificationView={showVerificationView}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleVerificationSubmit={handleVerificationSubmit}
            redirectToLogIn={redirectToLogIn}
            setError={setError}
            setVerificationCode={setVerificationCode}
            languageData={t}
        />
    );
};

export default SignUpPresenter;
