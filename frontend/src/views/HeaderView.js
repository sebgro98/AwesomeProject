// HeaderView.js
import React from 'react';

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

const logoutButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
};

const languageStyle = {
    display: 'flex',
    gap: '10px', /* Adjust the gap between buttons as needed */
};

const HeaderView = ({ onLogout, languageData, changeLang, languages }) => (
    <div style={headerStyle}>
        <p>Welcome</p>
        <div style={languageStyle}>{languages.map((lang) => (
            <button name={lang} key={lang} value={lang} onClick={(e) => changeLang(e)}>{lang}</button>
        ))}
        </div>
        <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
    </div>
);

export default HeaderView;
