// SignUpView.js

import React, { useState } from 'react';

const SignUpView = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to send the form data to the server for registration
        // You can use fetch or any other library to make an API request
        console.log('Form data submitted:', formData);
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
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
                    Person Number:
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
            </form>
        </div>
    );
};

export default SignUpView;
