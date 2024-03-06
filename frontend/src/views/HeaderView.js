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

const HeaderView = ({ onLogout, supportedLngs, changeLang }) => (
    <div style={headerStyle}>
        <p>Welcome</p>
        <div className="button">
            {supportedLngs.map((lang) =>
                <button
                    name={lang}
                    key={lang}
                    onClick={(e) => changeLang(e)}>
                    {lang}
                </button>
            )}
        </div>
        <button onClick={onLogout} style={logoutButtonStyle}>Logout</button>
    </div>
);

export default HeaderView;
