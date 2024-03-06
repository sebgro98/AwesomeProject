import React from 'react';

// Styles
const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '20px',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 3px rgba(0,0,0,0.1)',
};

const thStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    textAlign: 'left',
    padding: '10px',
    fontSize: '16px',
};

const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #dddddd',
    cursor: 'pointer', // Adds a pointer cursor to indicate clickable rows
};

const trHoverStyle = {
    '&:hover': {
        backgroundColor: '#f2f2f2',
    },
};

const unauthorizedStyle = {
    textAlign: 'center',
    marginTop: '50px',
};

const loginButtonStyle = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const ApplicationsView = ({ applications, navigate, authorized, applicationStatus, languageData}) => {
    return authorized ? (
        <div style={containerStyle}>
            <h1 style={headerStyle}>All Applications</h1>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>Full Name</th>
                    <th style={thStyle}>Status</th>
                </tr>
                </thead>
                <tbody>
                {applications.map(application => (
                    <tr key={application.person_id} onClick={() => navigate(`/applications/${application.person_id}`)} style={trHoverStyle}>
                        <td style={tdStyle}>{`${application.name} ${application.surname}`}</td>
                        <td style={tdStyle}>
                            {applicationStatus.find(status => status.application_status_id === application.application_status_id)?.translated_name || "Unknown"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    ) : (
        <div style={unauthorizedStyle}>
            <p>You are not authorized to access this page. Please log in.</p>
            <button onClick={() => navigate('/')} style={loginButtonStyle}>Log In</button>
        </div>
    );
}

export default ApplicationsView;
