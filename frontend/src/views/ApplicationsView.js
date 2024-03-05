import React from 'react';

const ApplicationsView = ({ applications, navigate, authorized, applicationStatus}) => {
    return authorized ? (
        <>
            <div>
                <h1>All Applications</h1>
                <table>
                    <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {applications.map(application => (
                        <tr key={application.person_id} onClick={() => navigate(`/applications/${application.person_id}`)}>
                            <td>{`${application.name} ${application.surname}`}</td>
                            <td>
                                {applicationStatus.find(status => status.application_status_id === application.application_status_id)?.name || "Unknown"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <div>
            <p>You are not authorized to access this page. Please log in.</p>
            <button onClick={() => navigate('/')}>Log In</button>
        </div>
    );
}

export default ApplicationsView;
