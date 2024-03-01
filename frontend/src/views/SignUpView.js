import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import '../ModalStyles.css';
ReactModal.setAppElement('#root');

/**
 * SignUpView component for user registration.
 * @returns {JSX.Element} Rendered SignUpView component.
 */
const SignUpView = () => {
    const [error, setError] = useState('');
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

    /**
     * Handles changes in form fields.
     * @param {React.ChangeEvent} e - The change event.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    /**
     * Handles form submission for user registration or verification.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
                const response = await axios.post('/person/sendVerification', { formData }, { withCredentials: true });
                // Prompt user to enter verification code
                setShowVerificationView(true);

        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed. Please check your data.');
        }
    };

    /**
     * Handles submission of the verification code for existing users.
     */
    const handleVerificationSubmit = async () => {
        try {
            const response = await axios.post('/person/verifyVerificationCode', { formData, verificationCode }, { withCredentials: true });
            alert('User verified successfully!');
            // Redirect to the login page
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Verification failed. Please check your data.');
        }
    };

    /**
     * Redirects to the login page.
     */
    const redirectToLogIn = () => {
        navigate('/');
    };

    /**
     * Handles checkbox change to switch between new and existing user.
     */
    const handleCheckboxChange = () => {
        setIsNewUser((prev) => !prev);
        setVerificationCode('');
        setShowVerificationView(false);
    };



    return (
        <div>
            <h2>Sign Up</h2>
            {showVerificationView ? (
                <div>
                    <p>Please enter the verification code sent to your email:</p>
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                    <button type="button" onClick={handleVerificationSubmit}>
                        Verify
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
                <label>
                    First Name:
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </label>

                <label>
                    Last Name:
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </label>

                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>

                <label>
                    Person Number YYYYMMDD-XXXX:
                    <input type="text" name="personNumber" value={formData.personNumber} onChange={handleChange} required />
                </label>

                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </label>

                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>


                    <button type="submit" style={{ marginTop: '10px' }}>
                        Sign Up
                    </button>

                    <button type="button" onClick={redirectToLogIn}>
                        Go back to log in
                    </button>
                </form>
            )}
            <ReactModal
                isOpen={!!error}
                onRequestClose={() => setError('')}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        position: 'static',
                        inset: 'auto',
                        border: 'none',
                        background: 'none',
                        padding: 'none',
                        overflow: 'visible'
                    }
                }}
            >
                <div className="errorModalContent">
                    <h2 className="errorModalHeader">Error</h2>
                    <p>{error}</p>
                    <button onClick={() => setError('')} className="errorModalButton">
                        Close
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default SignUpView;