import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplicationsView from "../views/ApplicationsView";

const ApplicationsPresenter = () => {
    const [applications, setApplications] = useState([]);
    const [authorized, setAuthorized] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axios.post('/application/authorize', { withCredentials: true });
                if (response.status === 200) {
                    setAuthorized(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };
        const fetchData = async () => {
            try {
                const response = await axios.post('/application/applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        const getApplicationStatus = async () => {
            try {
                const response = await axios.post('application/retrieveCompetences');
                setApplicationStatus(response.data);
                console.log("application status: ", response.data);
            }
            catch (error) {
                console.log("Error fetching application status:", error);
            }
        }
        checkAuthorization();
        fetchData();
        getApplicationStatus();
    }, []);

    return <ApplicationsView
        applications={applications}
        navigate={navigate}
        authorized={authorized}
    />;
}

export default ApplicationsPresenter;
