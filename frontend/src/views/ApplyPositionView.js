import React from 'react';
import ReactModal from "react-modal";

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
                    <h2>Apply for a position</h2>
                    <h3>Page 1 of 3</h3>
                    <form onSubmit={handleCompetenceSubmit}>
                        <label>Choose competence:</label><br/>
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
                        <label>Years of Experience:</label><br/>
                        <input type="text" name="experience" value={experience} onChange={handleExperienceChange} placeholder="Enter years of experience" required/><br/>
                        <button type="submit" style={{marginTop: '10px'}}>Submit Competence</button>
                    </form>
                    <br/>
                    <button type="button" onClick={goToNextPage}>Go to next Page</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            {pageNumber === 2 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 2 of 3</h3>
                    <form onSubmit={handleAvailabilitySubmit}>
                        <label>Availability:</label><br/>
                        <label>Start date</label>
                        <input type="date" name="startDate" value={startDate} onChange={handleStartDateChange} required/><br/>
                        <label>End date</label>
                        <input type="date" name="endDate" value={endDate} onChange={handleEndDateChange} required/><br/>
                        <button type="submit" style={{marginTop: '10px'}}>Submit Availability</button>
                    </form>
                    <br/>
                    <button type="button" onClick={goToPreviousPage}>Go to previous Page</button>
                    <button type="button" onClick={goToNextPage}>Go to next Page</button>
                    {message && <p>{message}</p>}
                </div>
            )}
            {pageNumber === 3 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 3 of 3</h3>
                    <p style={{margin: '0', padding: '0'}}><b>Competence</b></p>
                    {competenceObject.filter(item => item.experience !== null).map((item, index) => (
                        <p style={{ margin: '0', padding: '0' }} key={index}>{`${getCompetenceName(item.competence)}: ${item.experience} years of experience`}</p>
                    ))}
                    <br/>
                    <p style={{margin: '0', padding: '0'}}><b>Availability</b></p>
                    {availabilityObject.map((item, index) => (
                        <p style={{ margin: '0', padding: '0' }} key={index}>{`Between ${item.startDate} and ${item.endDate}`}</p>
                    ))}
                    <br/>
                    <button type="button" onClick={goToPreviousPage}>Go to previous Page</button>
                    <button type="button" onClick={submitApplication}>Submit application</button>
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
            <p>You are not authorized to access this page. Please log in.</p>
            <button onClick={() => navigate('/')}>Log In</button>
        </div>
    );
};

export default ApplyPositionView;
