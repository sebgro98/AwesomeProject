import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ApplicationsView = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch applications from the server
        axios.get('/api/applications')
            .then(response => {
                setApplications(response.data);
            })
            .catch(error => {
                console.error('Error fetching applications:', error);
            });
    }, []);

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
                    <tr key={application.id} onClick={() => navigate(`/applications/${application.id}`)}>
                        <td>{application.fullName}</td>
                        <td>{application.status}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ApplicationsView;