import React from 'react';

// Updated Styles
const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    // Removed justifyContent to align content towards the top
    paddingTop: '10vh', // Add padding top to give some space from the top
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f5f5f5',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
};

const inputStyle = {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
};

const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px',
};

const errorStyle = {
    marginBottom: '15px',
    color: '#ff0000',
};

const LoginView = ({
                       username,
                       password,
                       error,
                       handleUsernameChange,
                       handlePasswordChange,
                       handleSubmit,
                       redirectToSignUp,
                       languageData,
                   }) => (
    <div style={containerStyle}>
        <h2>{languageData("application.log_in_page.log_in_page")}</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
            {error && <p style={errorStyle}>{error}</p>}
            <div>
                <label>{languageData("application.log_in_page.username")}:</label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    style={inputStyle}
                />
            </div>
            <div>
                <label>{languageData("application.log_in_page.password")}:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={inputStyle}
                />
            </div>
            <button type="submit" style={buttonStyle}>{languageData("application.log_in_page.log_in")}</button>
            <button type="button" onClick={redirectToSignUp} style={{ ...buttonStyle, backgroundColor: '#6c757d' }}>{languageData("application.log_in_page.sign_up")}</button>

            <h6>{languageData("application.log_in_page.log_in_message")}</h6>
        </form>
    </div>
);

export default LoginView;
