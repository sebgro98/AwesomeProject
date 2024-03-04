import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import SignUpView from "../views/SignUpView";

const SignUpPresenter = () => {
    const [error, setError] = useState('');
    const [isNewUser, setIsNewUser] = useState(true);
    const [verificationCode, setVerificationCode] = useState('');
    const [showVerificationView, setShowVerificationView] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        personNumber: '',
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/person/sendVerification', { formData }, { withCredentials: true });
            setShowVerificationView(true);
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please check your data.');
        }
    };

    const handleVerificationSubmit = async () => {
        try {
            const response = await axios.post('/person/verifyVerificationCode', { formData, verificationCode }, { withCredentials: true });
            alert('User verified successfully!');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message && error.response?.data?.customError || 'Verification failed. Please check your data.');
        }
    };

    const redirectToLogIn = () => {
        navigate('/');
    };

    const handleCheckboxChange = () => {
        setIsNewUser((prev) => !prev);
        setVerificationCode('');
        setShowVerificationView(false);
    };

    return (
        <SignUpView
            error={error}
            isNewUser={isNewUser}
            verificationCode={verificationCode}
            showVerificationView={showVerificationView}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleVerificationSubmit={handleVerificationSubmit}
            redirectToLogIn={redirectToLogIn}
            handleCheckboxChange={handleCheckboxChange}
            setError={setError}
            setVerificationCode={setVerificationCode}
        />
    );
};

export default SignUpPresenter;
