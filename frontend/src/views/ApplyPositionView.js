import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

/**
 * ApplyPositionView component for applying for a position.
 */
const ApplyPositionView = () => {
    // State variables for component
    const [message, setMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [competence, setCompetence] = useState(null)
    const [experience, setExperience] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [competenceObject, setCompetenceObject] = useState([{competence: 1, experience: null}, {competence: 2, experience: null}, {competence: 3, experience: null}]);
    const [availabilityObject, setAvailabilityObject] = useState([]);

    // State for authorization status
    const [authorized, setAuthorized] = useState(false);

    // Navigation hook for page redirection
    const navigate = useNavigate();

    // Effect to check user authorization on component mount
    useEffect(() => {
        // Use an API call or any other method to check user authorization
        // If authorized, setAuthorized(true); otherwise, handle unauthorized state
        // Example:
        const checkAuthorization = async () => {
            try {
                const response = await axios.get('http://localhost:8000/application/authorize', { withCredentials: true });
                if (response.status === 200) {
                    setAuthorized(true);
                } else {
                    // Handle unauthorized state, e.g., redirect to login
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authorization:', error);
            }
        };

        checkAuthorization();
    }, []);

    /**
     * Handles the submission of competence form.
     * @param {Object} e - Event object.
     */
    function handleCompetenceSubmit(e){
        e.preventDefault();

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
        resetForm();
    }

    /**
     * Returns the name of the competence based on its ID.
     * @param {number} id - Competence ID.
     * @returns {string} - Competence name.
     */
    function getCompetenceName(id) {
        switch(id) {
            case 1:
                return "ticket sales";
            case 2:
                return "lotteries"
            case 3:
                return "roller coaster operation"
        }
    }

    /**
     * Handles the submission of availability form.
     * @param {Object} e - Event object.
     */
    function handleAvailabilitySubmit(e){
        e.preventDefault();

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
        resetForm();
    }

    /**
     * Navigates to the next page.
     */
    function goToNextPage() {
        setPageNumber(pageNumber+1);
        setMessage('');
        resetForm();
    }

    /**
     * Navigates to the previous page.
     */
    function goToPreviousPage() {
        setPageNumber(pageNumber-1);
        setMessage('');
        resetForm();
    }

    /**
     * Resets the form fields.
     */
    function resetForm() {
        setExperience('');
        setStartDate('');
        setEndDate('');

        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });
    }

    /**
     * Submits the final application.
     */
    async function submitApplication() {
        const filteredCompetenceObject = competenceObject.filter(item => item.experience !== null);
        if (filteredCompetenceObject.length === 0 || availabilityObject.length === 0) {
            setMessage("Competence or availability cannot be empty")
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/application/apply',
                {competenceProfile: filteredCompetenceObject, availability: availabilityObject}, { withCredentials: true });
            alert('Successfully submitted the application!');
        } catch (error) {
            // Handle failed application submission
            setMessage('Application submission failed, try again or contact support');
        }

        const requestData = {competenceProfile: filteredCompetenceObject, availability: availabilityObject};
        console.log(requestData);
    }

    // Render component based on authorization status
    return authorized ? (
        // Render the application form based on the current page number
        <>
            {pageNumber===1 && (
                // Page 1: Competence Selection
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 1 of 3</h3>
                    <form onSubmit={handleCompetenceSubmit}>
                        {/* Competence selection radio buttons */}
                        <label>Choose competence:</label><br/>
                        <label>
                            Ticket sales
                            <input type="radio" name="competence" value="1" onChange={() => setCompetence(1)} required/>
                        </label><br/>
                        <label>
                            Lotteries
                            <input type="radio" name="competence" value="2" onChange={() => setCompetence(2)} required/>
                        </label><br/>
                        <label>
                            Roller Coaster Operation
                            <input type="radio" name="competence" value="3" onChange={() => setCompetence(3)} required/>
                        </label>
                        <br/><br/>
                        {/* Years of experience input */}
                        <label>
                            Years of Experience:
                        </label><br/>
                        <input type="text" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter years of experience" required/>
                        <br/>
                        {/* Submit button */}
                        <button type="submit" style={{marginTop: '10px'}}>Submit Competence</button>
                    </form>
                    <br/>
                    {/* Navigation buttons */}
                    <button type="button" onClick={goToNextPage}>Go to next Page</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            {pageNumber===2 && (
                // Page 2: Availability Selection
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 2 of 3</h3>
                    <form onSubmit={handleAvailabilitySubmit}>
                        {/* Start date and end date inputs */}
                        <label>Availability:</label><br/>
                        <label>Start date</label>
                        <input type="date" name="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/><br/>
                        <label>End date</label>
                        <input type="date" name="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/><br/>
                        {/* Submit button */}
                        <button type="submit" style={{marginTop: '10px'}}>Submit Availability</button>
                    </form>
                    <br/>
                    {/* Navigation buttons */}
                    <button type="button" onClick={goToPreviousPage}>Go to previous Page</button>
                    <button type="button" onClick={goToNextPage}>Go to next Page</button>
                    {message && <p>{message}</p>}
                </div>
            )}

            {pageNumber===3 && (
                // Page 3: Summary and Submission
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 3 of 3</h3>

                    {/* Display selected competences */}
                    <p style={{ margin: '0', padding: '0' }}><b>Competence</b></p>
                    {competenceObject
                        .filter(item => item.experience !== null)
                        .map((item) => (
                            <p style={{ margin: '0', padding: '0' }}>{`${getCompetenceName(item.competence)}: ${item.experience} years of experience`}</p>
                        ))
                    }<br/>
                    {/* Display selected availability */}
                    <p style={{ margin: '0', padding: '0' }}><b>Availability</b></p>
                    {availabilityObject.map((item) => (
                        <p style={{ margin: '0', padding: '0' }}>{`Between ${item.startDate} and ${item.endDate}`}</p>
                    ))}
                    <br/>
                    {/* Navigation buttons */}
                    <button type="button" onClick={goToPreviousPage}>Go to previous Page</button>
                    <button type="button" onClick={submitApplication}>Submit application</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </>
    ) : (
        // Unauthorized state - You can redirect or display an unauthorized message
        <div>
            <p>You are not authorized to access this page. Please log in.</p>
            {/* You can add a button or link to redirect the user to the login page */}
            <button onClick={() => navigate('/')}>Log In</button>
        </div>
    );
};

export default ApplyPositionView;
