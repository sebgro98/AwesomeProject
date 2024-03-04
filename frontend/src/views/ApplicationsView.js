import React from 'react';

const ApplicationsView = ({ applications, navigate }) => {
    return (
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
                            {application.application_status_id === 2
                                ? "Accepted"
                                : application.application_status_id === 3
                                    ? "Rejected"
                                    : "Unhandled"}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicationsView;
