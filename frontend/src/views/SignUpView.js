import React from 'react';
import ReactModal from 'react-modal';

// Inline Styles
const formContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
};

const formItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '15px',
};

const labelStyle = {
    marginBottom: '5px',
};

const inputStyle = {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
};

const buttonStyle = {
    padding: '10px 15px',
    margin: '10px 0 5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
};

const errorModalContentStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '90%',
};

const SignUpView = ({
                        error,
                        verificationCode,
                        showVerificationView,
                        formData,
                        handleChange,
                        handleSubmit,
                        handleVerificationSubmit,
                        redirectToLogIn,
                        setError,
                        setVerificationCode,
                    }) => {
    ReactModal.setAppElement('body'); // Adjust according to your app's root element

    return (
        <div style={formContainerStyle}>
            <h2>Sign Up</h2>
            {showVerificationView ? (
                <div style={formItemStyle}>
                    <p>Please enter the verification code sent to your email:</p>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button type="button" onClick={handleVerificationSubmit} style={buttonStyle}>
                        Verify
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={formItemStyle}>
                        <label style={labelStyle}>First Name:</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>Last Name:</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>Email:</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>Person Number YYYYMMDD-XXXX:</label>
                        <input type="text" name="personNumber" value={formData.personNumber} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>Username:</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={formItemStyle}>
                        <label style={labelStyle}>Password:</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required style={inputStyle} />
                    </div>

                    <button type="submit" style={buttonStyle}>Sign Up</button>
                    <button type="button" onClick={redirectToLogIn} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>Go back to log in</button>
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
                        alignItems: 'center',
                    },
                    content: errorModalContentStyle,
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <h2>Error</h2>
                    <p>{error}</p>
                    <button onClick={() => setError('')} style={buttonStyle}>
                        Close
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

export default SignUpView;
