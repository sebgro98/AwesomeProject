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
    cursor: 'pointer',
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

/**
 * Represents a React component for displaying a list of job applications.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {Array} props.applications - An array of job applications to display.
 * @param {function} props.navigate - A function to handle navigation.
 * @param {boolean} props.authorized - A boolean indicating whether the user is authorized to view the applications.
 * @param {Array} props.applicationStatus - An array of application status data.
 * @param {function} props.languageData - A function to retrieve language-specific data.
 * @returns {JSX.Element} The JSX representation of the component.
 */
const ApplicationsView = ({ applications, navigate, authorized, applicationStatus, languageData}) => {
    // / Render the component differently based on the user's authorization status
    return authorized ? (
        // Display application data if the user is authorized
        <div style={containerStyle}>
            <h1 style={headerStyle}>{languageData("application.applications.all_applications")}</h1>
            <table style={tableStyle}>
                <thead>
                <tr>
                    <th style={thStyle}>{languageData("application.applications.full_name")}</th>
                    <th style={thStyle}>{languageData("application.applications.status")}</th>
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
        // Display an unauthorized message and a login button if the user is not authorized
        <div style={unauthorizedStyle}>
            <p>{languageData("application.unauthorized.unauthorized_message")}</p>
            <button onClick={() => navigate('/')} style={loginButtonStyle}>{languageData("application.unauthorized.login")}</button>
        </div>
    );
}

export default ApplicationsView;
