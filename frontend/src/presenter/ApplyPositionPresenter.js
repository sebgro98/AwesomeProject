import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplyPositionView from "../views/ApplyPositionView";

const ApplyPositionPresenter = () => {
    const [message, setMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [competence, setCompetence] = useState(null);
    const [experience, setExperience] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [competenceObject, setCompetenceObject] = useState([]);
    const [availabilityObject, setAvailabilityObject] = useState([]);
    const [error, setError] = useState('');
    const [authorized, setAuthorized] = useState(false);
    const [competenceNames, setCompetenceNames] = useState([]);
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

        const getCompetences = async () => {
            try {
                const response = await axios.post('/application/retrieveCompetences');
                setCompetenceNames(response.data);
            } catch (error) {
                console.error('Error retrieving competences:', error);
            }
        }

        checkAuthorization();
        getCompetences();
    }, []);

    function getCompetenceName(id) {
        const competenceName = competenceNames.find(competence => competence.competence_id === id)
        return competenceName ? competenceName.name : null;
    }

    const handleCompetenceChange = (id) => setCompetence(id);
    const handleExperienceChange = (e) => setExperience(e.target.value);
    const handleStartDateChange = (e) => setStartDate(e.target.value);
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    const resetForm = () => {
        setExperience('');
        setStartDate('');
        setEndDate('');
        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });
    };

    const handleCompetenceSubmit = (e) => {e.preventDefault();

        let experienceNumber= parseFloat(experience);
        if (isNaN(experienceNumber)) {
            setMessage("Years of experience is not a number")
            return;
        }

        experienceNumber = experienceNumber.toFixed(2);

        if (experienceNumber.length > 5) {
            setMessage("The years of experience number is too large");
            return;
        }

        const competenceData = {competence: competence, experience: experienceNumber}
        const newCompetenceObject = competenceObject;
        console.log("competenceData: ", competenceData);
        newCompetenceObject[competence-1] = competenceData;
        setCompetenceObject(newCompetenceObject);

        setMessage(`Added competence ${getCompetenceName(competence)} with ${experienceNumber} years of experience`);
        resetForm();};
    const handleAvailabilitySubmit = (e) => { e.preventDefault();

        // Convert the start and end dates to JavaScript Date objects
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const tomorrow  = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

        // Check if startDate is at least tomorrow
        if (startDateObj < tomorrow ) {
            setMessage('Start date must be at least tomorrow');
            return;
        }

        // Check if endDate is after startDate
        if (endDateObj <= startDateObj) {
            setMessage('End date must be after start date');
            return;
        }

        const availabilityData = {startDate: startDate, endDate: endDate};
        const newAvailabilityObject = availabilityObject;
        newAvailabilityObject.push(availabilityData);
        setAvailabilityObject(newAvailabilityObject);

        setMessage(`Added availability between ${startDate} and ${endDate}`);
        resetForm();};
    const goToNextPage = () => {
        setPageNumber(pageNumber+1);
        setMessage('');
        resetForm();
    }
    const goToPreviousPage = () => {
        setPageNumber(pageNumber-1);
        setMessage('');
        resetForm();
    }
    const submitApplication = async () => {setError('');
        const filteredCompetenceObject = competenceObject.filter(item => item.experience !== null);
        if (filteredCompetenceObject.length === 0 || availabilityObject.length === 0) {
            setMessage("Competence or availability cannot be empty")
            return;
        }

        try {
            const response = await axios.post('/application/apply',
                {competenceProfile: filteredCompetenceObject, availability: availabilityObject}, { withCredentials: true });
            alert('Successfully submitted the application!');
        } catch (error) {
            // The backend responded with an error
            setError(error.response.data.message || 'Application failed. Please check your data.');

        }

        const requestData = {competenceProfile: filteredCompetenceObject, availability: availabilityObject};
        console.log(requestData);};

    return (
        <ApplyPositionView
            authorized={authorized}
            message={message}
            pageNumber={pageNumber}
            competenceObject={competenceObject}
            availabilityObject={availabilityObject}
            error={error}
            navigate={navigate}
            handleCompetenceChange={handleCompetenceChange}
            handleExperienceChange={handleExperienceChange}
            handleStartDateChange={handleStartDateChange}
            handleEndDateChange={handleEndDateChange}
            handleCompetenceSubmit={handleCompetenceSubmit}
            handleAvailabilitySubmit={handleAvailabilitySubmit}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            submitApplication={submitApplication}
            setError={setError}
            experience={experience}
            startDate={startDate}
            endDate={endDate}
            competenceNames={competenceNames}
        />
    );
};

export default ApplyPositionPresenter;
