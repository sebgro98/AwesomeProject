import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ApplicationsView = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Define an asynchronous function inside useEffect
        const fetchData = async () => {
            try {
                // Fetch applications from the server
                const response = await axios.post('/application/applications');
                setApplications(response.data);
                console.log('hejdsfdsfdsfsd', response);
                console.log('applications', applications);
                console.log('hej', response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        // Call the asynchronous function
        fetchData();
    }, []); // Empty dependency array ensures the effect runs once when the component mounts

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