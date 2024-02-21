import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

/**
 * SignUpView component for user registration.
 * @returns {JSX.Element} Rendered SignUpView component.
 */
const SignUpView = () => {
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function from react-router-dom

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
     * Handles form submission for user registration.
     * @param {React.FormEvent} e - The form event.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('/person/register',
                { formData }, { withCredentials: true });
            // Handle successful registration
            console.log(response.data);
            alert('User registered successfully!');

            // Redirect to the login page
            navigate('/');
        } catch (error) {
            // Handle failed registration
            setError('Registration failed. Please check your data.');
        }
    };

    /**
     * Redirects to the login page.
     */
    const redirectToLogIn = () => {
        navigate('/');
    };

    return (
        <div>
            <h2>Sign Up</h2>
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

                <button type="submit" style={{ marginTop: '10px' }}>Sign Up</button>

                {/* Button to redirect to login page */}
                <button type="button" onClick={redirectToLogIn}>
                    Go back to log in
                </button>
            </form>
        </div>
    );
};

export default SignUpView;
