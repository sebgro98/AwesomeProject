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

    /**
     * Fetch applications data from the server using Axios on component mount.
     * @function
     * @async
     * @returns {void}
     */
    useEffect(() => {
        /**
         * Fetch data from the server and update the state.
         * @async
         * @returns {void}
         */
        const fetchData = async () => {
            try {
                const response = await axios.post('/application/applications');
                setApplications(response.data);
            } catch (error) {
                console.error('Error fetching applications:', error);
            }
        };

        fetchData();
    }, []);

    /**
     * Render the ApplicationsView component with the fetched applications data.
     * @returns {JSX.Element} - The rendered React component.
     */
    return <ApplicationsView applications={applications} navigate={navigate} />;
}

export default ApplicationsPresenter;
