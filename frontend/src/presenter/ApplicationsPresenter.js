import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplicationsView from "../views/ApplicationsView";

/**
 * ApplicationsPresenter component fetches and displays a list of applications.
 * <ApplicationsPresenter />
 */
const ApplicationsPresenter = () => {
    /**
     * State to store the list of applications.
     * @type {Array}
     * @default []
     */
    const [applications, setApplications] = useState([]);

    /**
     * React Router navigation hook.
     * @type {Function}
     */
    const navigate = useNavigate();

    const [authorized, setAuthorized] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState([])

    /**
     * Fetch applications data from the server using Axios on component mount.
     * @function
     * @async
     * @returns {void}
     */
    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axios.post('/person/authorizeRecruiter', { withCredentials: true });
                if (response.status === 200) {
                    setAuthorized(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };
        /**
         * Fetch data from the server and update the state.
         * @async
         * @returns {void}
         */
        const fetchData = async () => {
            try {
                const response = await axios.post('/application/applications', { withCredentials: true });
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        const getApplicationStatus = async () => {
            try {
                const response = await axios.post('application/retrieveStatus', { withCredentials: true });
                setApplicationStatus(response.data);
                console.log("application status: ", response.data);
            }
            catch (error) {
                console.log("Error fetching application status:", error);
            }
        };

        checkAuthorization();
        fetchData();
        getApplicationStatus();
    }, []);

    /**
     * Render the ApplicationsView component with the fetched applications data.
     * @returns {JSX.Element} - The rendered React component.
     */
    return <ApplicationsView
        applications={applications}
        navigate={navigate}
        authorized={authorized}
        applicationStatus={applicationStatus}
    />;
}

export default ApplicationsPresenter;
