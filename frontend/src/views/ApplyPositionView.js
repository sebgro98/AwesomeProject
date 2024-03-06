import React from 'react';
import ReactModal from "react-modal";

/**
 * Represents the view component for applying for a position.
 * This component displays a multi-step form allowing users to submit their competence and availability details.
 * It also handles the display of error messages and an error modal for any form submission errors.
 *
 * @param {boolean} authorized - Boolean flag indicating whether the user is authorized to view the page.
 * @param {string} message - Message to be displayed to the user.
 * @param {number} pageNumber - Current page number in the multi-step form.
 * @param {Object[]} competenceObject - Array of objects representing user competences and experience.
 * @param {Object[]} availabilityObject - Array of objects representing user availability.
 * @param {string} error - Any error message to be displayed.
 * @param {Function} navigate - Function to navigate to a different page.
 * @param {Function} handleCompetenceChange - Callback function to handle changes in competence selection.
 * @param {Function} handleExperienceChange - Callback function to handle changes in years of experience input.
 * @param {Function} handleStartDateChange - Callback function to handle changes in start date input.
 * @param {Function} handleEndDateChange - Callback function to handle changes in end date input.
 * @param {Function} handleCompetenceSubmit - Callback function to handle competence submission.
 * @param {Function} handleAvailabilitySubmit - Callback function to handle availability submission.
 * @param {Function} goToNextPage - Callback function to navigate to the next page in the form.
 * @param {Function} goToPreviousPage - Callback function to navigate to the previous page in the form.
 * @param {Function} submitApplication - Callback function to submit the application.
 * @param {string} experience - Value of the years of experience input field.
 * @param {string} startDate - Value of the start date input field.
 * @param {string} endDate - Value of the end date input field.
 * @param {Function} setError - Function to set an error message.
 * @param {string[]} competenceNames - Array of competence names.
 * @param {Function} getCompetenceName - Function to get the translated name of a competence.
 * @param {Function} languageData - Function to retrieve language-specific text.
 */
const ApplyPositionView = ({
                               authorized,
                               message,
                               pageNumber,
                               competenceObject,
                               availabilityObject,
                               error,
                               navigate,
                               handleCompetenceChange,
                               handleExperienceChange,
                               handleStartDateChange,
                               handleEndDateChange,
                               handleCompetenceSubmit,
                               handleAvailabilitySubmit,
                               goToNextPage,
                               goToPreviousPage,
                               submitApplication,
                               experience,
                               startDate,
                               endDate,
                               setError,
                               competenceNames,
                               getCompetenceName,
                               languageData
                           }) => {

    return authorized ? (
        <>
            {pageNumber === 1 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto'}}>
                    <h2>{languageData("application.apply_for_a_position.apply_for_a_position")}</h2>
                    <h3>{languageData("application.apply_for_a_position.page")} 1 {languageData("application.apply_for_a_position.of")} 3</h3>
                    <form onSubmit={handleCompetenceSubmit}>
                        <label>{languageData("application.apply_for_a_position.choose_competence")}:</label><br/>
                        {competenceNames.map((competence, index) => (
                            <>
                                <label key={index}>
                                    {competence.translated_name}
                                    <input
                                        type="radio"
                                        name="competence"
                                        value={competence.competence_id}
                                        onChange={() => handleCompetenceChange(competence.competence_id)}
                                        required
                                    />
                                </label>
                                <br/>
                            </>
                        ))}<br/>
                        <label>{languageData("application.apply_for_a_position.years_of_experience")}:</label><br/>
                        <input type="text" name="experience" value={experience} onChange={handleExperienceChange} placeholder={languageData("application.apply_for_a_position.enter_years_of_experience")} required/><br/>
                        <button type="submit" style={{marginTop: '10px'}}>{languageData("application.apply_for_a_position.submit_competence")}</button>
                    </form>
                    <br/>
                    <button type="button" onClick={goToNextPage}>{languageData("application.apply_for_a_position.next_page")}</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            {pageNumber === 2 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto'}}>
                    <h2>{languageData("application.apply_for_a_position.apply_for_a_position")}</h2>
                    <h3>{languageData("application.apply_for_a_position.page")} 2 {languageData("application.apply_for_a_position.of")} 3</h3>
                    <form onSubmit={handleAvailabilitySubmit}>
                        <label>{languageData("application.apply_for_a_position.availability")}:</label><br/>
                        <label>{languageData("application.apply_for_a_position.start_date")}</label>
                        <input type="date" name="startDate" value={startDate} onChange={handleStartDateChange} required/><br/>
                        <label>{languageData("application.apply_for_a_position.end_date")}</label>
                        <input type="date" name="endDate" value={endDate} onChange={handleEndDateChange} required/><br/>
                        <button type="submit" style={{marginTop: '10px'}}>{languageData("application.apply_for_a_position.submit_availability")}</button>
                    </form>
                    <br/>
                    <button type="button" onClick={goToPreviousPage}>{languageData("application.apply_for_a_position.previous_page")}</button>
                    <button type="button" onClick={goToNextPage}>{languageData("application.apply_for_a_position.next_page")}</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            {pageNumber === 3 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto'}}>
                    <h2>{languageData("application.apply_for_a_position.apply_for_a_position")}</h2>
                    <h3>{languageData("application.apply_for_a_position.page")} 3 {languageData("application.apply_for_a_position.of")} 3</h3>
                    <p style={{margin: '0', padding: '0'}}><b>{languageData("application.apply_for_a_position.competence")}</b></p>
                    {competenceObject.filter(item => item.experience !== null).map((item, index) => (
                        <p style={{ margin: '0', padding: '0' }} key={index}>{`${getCompetenceName(item.competence)}: ${item.experience}`} {languageData("application.apply_for_a_position.years_of_experience")}</p>
                    ))}
                    <br/>
                    <p style={{margin: '0', padding: '0'}}><b>{languageData("application.apply_for_a_position.availability")}</b></p>
                    {availabilityObject.map((item, index) => (
                        <p style={{ margin: '0', padding: '0' }} key={index}> {languageData("application.apply_for_a_position.added_availability_between")} {`${item.startDate}`} {languageData("application.apply_for_a_position.and")} {`${item.endDate}`}</p>
                    ))}
                    <br/>
                    <button type="button" onClick={goToPreviousPage}>{languageData("application.apply_for_a_position.previous_page")}</button>
                    <button type="button" onClick={submitApplication}>{languageData("application.apply_for_a_position.submit_application")}</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            <ReactModal
                isOpen={!!error}
                onRequestClose={() => setError('')}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    },
                    content: {
                        position: 'static',
                        inset: 'auto',
                        border: 'none',
                        background: 'none',
                        padding: 'none',
                        overflow: 'visible'
                    }
                }}
            >
                <div className="errorModalContent">
                    <h2 className="errorModalHeader">Error</h2>
                    <p>{error}</p>
                    <button onClick={() => setError('')} className="errorModalButton">
                        Close
                    </button>
                </div>
            </ReactModal>
        </>
    ) : (
        <div>
            <p>{languageData("application.unauthorized.unauthorized_message")}</p>
            <button onClick={() => navigate('/')}>{languageData("application.unauthorized.login")}</button>
        </div>
    );
};

export default ApplyPositionView;
