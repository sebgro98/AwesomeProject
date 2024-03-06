import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ApplyPositionView from "../views/ApplyPositionView";
import {useTranslation} from "react-i18next";

/**
 * ApplyPositionPresenter component manages the state and logic for applying to a position.
 * <ApplyPositionPresenter />
 */
const ApplyPositionPresenter = () => {

    const [t, i18n] = useTranslation("translation");

    useEffect(() => {
        const getCompetences = async () => {
            try {
                const response = await axios.post('/application/retrieveCompetences', {lang: i18n.language},{withCredentials: true});
                setCompetenceNames(response.data);
                setMessage("");
            } catch (error) {
                console.error('Error retrieving competences:', error);
            }
        }
        getCompetences();
    }, [i18n.language]);

    /**
     * State to store success/error messages.
     * @type {string}
     * @default ''
     */
    const [message, setMessage] = useState('');

    /**
     * State to store the current page number in the application process.
     * @type {number}
     * @default 1
     */
    const [pageNumber, setPageNumber] = useState(1);

    /**
     * State to store selected competence.
     * @type {number|null}
     * @default null
     */
    const [competence, setCompetence] = useState(null);

    /**
     * State to store years of experience.
     * @type {string}
     * @default ''
     */
    const [experience, setExperience] = useState('');

    /**
     * State to store the start date for availability.
     * @type {string}
     * @default ''
     */
    const [startDate, setStartDate] = useState('');

    /**
     * State to store the end date for availability.
     * @type {string}
     * @default ''
     */
    const [availabilityObject, setAvailabilityObject] = useState([]);

    /**
     * State to store the end date for availability.
     * @type {string}
     * @default ''
     */
    const [endDate, setEndDate] = useState('');

    /**
     * State to store competence data.
     * @type {Array}
     * @default []
     */
    const [competenceObject, setCompetenceObject] = useState([]);

    /**
     * State to store error messages.
     * @type {string}
     * @default ''
     */
    const [error, setError] = useState('');

    /**
     * State to track user authorization status.
     * @type {boolean}
     * @default false
     */
    const [authorized, setAuthorized] = useState(false);

    /**
     * React Router navigation hook.
     * @type {Function}
     */
    const navigate = useNavigate();

    /**
     * State to store competence names
     * @type {Array}
     * @default []
     */
    const [competenceNames, setCompetenceNames] = useState([]);


    /**
     * Check user authorization on component mount.
     * Redirects to login page if not authorized.
     * @function
     * @async
     * @returns {void}
     */
    useEffect(() => {
        const checkAuthorization = async () => {
            try {
                const response = await axios.post('/person/authorizeApplicant', { withCredentials: true });
                if (response.status === 200) {
                    setAuthorized(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };
        checkAuthorization();
    }, []);

    function getCompetenceName(id) {
        const competenceName = competenceNames.find(competence => competence.competence_id === id)
        return competenceName ? competenceName.translated_name : null;
    }


    /**
     * Handle change in selected competence.
     * @function
     * @param {number} id - CompetenceTranslator ID.
     * @returns {void}
     */
    const handleCompetenceChange = (id) => setCompetence(id);

    /**
     * Handle change in years of experience input.
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     * @returns {void}
     */
    const handleExperienceChange = (e) => setExperience(e.target.value);

    /**
     * Handle change in start date input.
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     * @returns {void}
     */
    const handleStartDateChange = (e) => setStartDate(e.target.value);

    /**
     * Handle change in end date input.
     * @function
     * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event.
     * @returns {void}
     */
    const handleEndDateChange = (e) => setEndDate(e.target.value);

    /**
     * Reset form inputs.
     * @function
     * @returns {void}
     */
    const resetForm = () => {
        setExperience('');
        setStartDate('');
        setEndDate('');
        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });
    };

    /**
     * Handle competence form submission.
     * Validates input and updates competenceObject state.
     * @function
     * @param {React.FormEvent} e - Form submission event.
     * @returns {void}
     */
    const handleCompetenceSubmit = (e) => {
        e.preventDefault();

        let experienceNumber = parseFloat(experience);

        if (isNaN(experienceNumber)) {
            setMessage(t("application.apply_for_a_position.year_of_experience_not_a_number"));
            return;
        }

        experienceNumber = experienceNumber.toFixed(2);

        if (experienceNumber.length > 5) {
            setMessage(t("application.apply_for_a_position.year_of_experience_number_too_large"));
            return;
        }

        const competenceData = { competence: competence, experience: experienceNumber };
        const newCompetenceObject = competenceObject.slice();
        newCompetenceObject[competence - 1] = competenceData;
        setCompetenceObject(newCompetenceObject);

        setMessage(t("application.apply_for_a_position.added_competence") + " " + getCompetenceName(competence) + " " + t("application.apply_for_a_position.with") + " " + experienceNumber + " " + t("application.apply_for_a_position.years_of_experience"));
        resetForm();
    };

    /**
     * Handle availability form submission.
     * Validates input and updates availabilityObject state.
     * @function
     * @param {React.FormEvent} e - Form submission event.
     * @returns {void}
     */
    const handleAvailabilitySubmit = (e) => {
        e.preventDefault();

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        const tomorrow  = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        if (startDateObj < tomorrow) {
            setMessage(t("application.apply_for_a_position.start_date_error"));
            return;
        }

        if (endDateObj <= startDateObj) {
            setMessage(t("application.apply_for_a_position.end_date_error"));
            return;
        }

        const availabilityData = { startDate: startDate, endDate: endDate };
        const newAvailabilityObject = availabilityObject.slice();
        newAvailabilityObject.push(availabilityData);
        setAvailabilityObject(newAvailabilityObject);

        setMessage(t("application.apply_for_a_position.added_availability_between") + " " + startDate + " " + t("application.apply_for_a_position.and") + " " + endDate);
        resetForm();
    };

    /**
     * Move to the next page in the application process.
     * @function
     * @returns {void}
     */
    const goToNextPage = () => {
        setPageNumber(pageNumber+1);
        setMessage('');
        resetForm();
    }

    /**
     * Move to the previous page in the application process.
     * @function
     * @returns {void}
     */

    const goToPreviousPage = () => {
        setPageNumber(pageNumber-1);
        setMessage('');
        resetForm();
    }

    /**
     * Submit the application to the server.
     * @function
     * @async
     * @returns {void}
     */
    const submitApplication = async () => {setError('');
        const filteredCompetenceObject = competenceObject.filter(item => item.experience !== null);

        if (filteredCompetenceObject.length === 0 || availabilityObject.length === 0) {
            setMessage(t("application.apply_for_a_position.competence_or_availability_cannot_be_empty"));
            return;
        }

        try {
            const response = await axios.post('/application/apply',
                { competenceProfile: filteredCompetenceObject, availability: availabilityObject }, { withCredentials: true });

            alert(t("application.apply_for_a_position.application_success_alert"));
        } catch (error) {
            setError(error.response?.data?.message || t("application.apply_for_a_position.application_error"));
        }
    };

    /**
     * Render the ApplyPositionView component with the necessary props.
     * @returns {JSX.Element} - The rendered React component.
     */
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
            getCompetenceName={getCompetenceName}
            languageData={t}
        />
    );
};

export default ApplyPositionPresenter;
