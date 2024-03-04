import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplicationsView from "../views/ApplicationsView";

const ApplicationsPresenter = () => {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
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

    return <ApplicationsView applications={applications} navigate={navigate} />;
}

export default ApplicationsPresenter;
