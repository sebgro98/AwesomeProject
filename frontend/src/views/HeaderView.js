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

const HeaderView = ({ onLogout, language }) => (
    <div style={headerStyle}>
        <p>Welcome</p>
        <p>{language("login.message")}</p>
        <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
    </div>
);

export default HeaderView;
