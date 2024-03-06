import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplicationsView from "../views/ApplicationsView";
import {useTranslation} from "react-i18next";

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
     * State to track user authorization status.
     *
     * @type {boolean}
     * @default false
     */
    const [authorized, setAuthorized] = useState(false);

    /**
     * State to store the list of application statuses.
     *
     * @type {Array}
     * @default []
     */
    const [applicationStatus, setApplicationStatus] = useState([])

    /**
     * React-i18next translation hook.
     *
     * @type {Function}
     */
    const [t, i18n] = useTranslation("translation");

    /**
     * Fetch application statuses data from the server using Axios on component mount.
     *
     * @async
     * @function
     * @returns {void}
     */
    useEffect(() => {
        const getApplicationStatus = async () => {
            try {
                const response = await axios.post('application/retrieveStatus',{lang: i18n.language}, { withCredentials: true });
                setApplicationStatus(response.data);
            }
            catch (error) {
                console.error("Error fetching application status:", error);
            }
        };
        getApplicationStatus();
    }, [i18n.language]);

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

        checkAuthorization();
        fetchData();
    }, []);

    /**
     * Render the ApplicationsView component with the fetched applications data.
     *
     * @returns {JSX.Element} - The rendered React component.
     */
    return <ApplicationsView
        applications={applications}
        navigate={navigate}
        authorized={authorized}
        applicationStatus={applicationStatus}
        languageData={t}
    />;
}

export default ApplicationsPresenter;
