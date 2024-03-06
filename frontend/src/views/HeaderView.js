import React from 'react';

// Styles for the header component
const headerStyle = {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

// Styles for the logout button
const logoutButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

// Styles for the language selection buttons
const languageStyle = {
    display: 'flex',
    gap: '10px',
};

/**
 * HeaderView component renders the header section of the application.
 * Displays a welcome message, language selection buttons, and a logout button.
 * @param {Object} props - Component props.
 * @param {Function} props.onLogout - Logout button click handler.
 * @param {Function} props.changeLang - Language change button click handler.
 * @param {Array} props.languages - Array of supported languages.
 * @param {Function} props.languageData - Function for translating language keys.
 * @returns {JSX.Element} - Rendered component.
 */
const HeaderView = ({ onLogout, languageData, changeLang, languages }) => (
    <div style={headerStyle}>
        {/* Display a welcome message */}
        <p>{languageData("application.header.welcome")}</p>

        {/* Display language selection buttons */}
        <div style={languageStyle}>
            {languages.map((lang) => (
                <button name={lang} key={lang} value={lang} onClick={(e) => changeLang(e)}>
                    {lang}
                </button>
            ))}
        </div>

        {/* Display a logout button */}
        <button onClick={onLogout} style={logoutButtonStyle}>
            {languageData("application.header.log_out")}
        </button>
    </div>
);

export default HeaderView;
