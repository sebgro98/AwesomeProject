import React from 'react';



const Footer = () => (
    <div style={footerStyle}>
        <p>© 2024 Recruiter App, Inc.</p>
    </div>
);

const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    padding: '10px 0'
};

export default Footer;
