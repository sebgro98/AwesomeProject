// SignUpView.js
import React, { useState } from 'react';
import axios from "axios";

const ApplyPositionView = () => {
    const [message, setMessage] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [competence, setCompetence] = useState(null)
    const [experience, setExperience] = useState('')

    function handleCompetenceSubmit(e){
        e.preventDefault();
        console.log("hello");
        resetForm();
        setMessage('Added competence');
    }

    function goToNextPage() {
        setPageNumber(pageNumber+1);
        setMessage('');
        resetForm();
    }

    function goToPreviousPage() {
        setPageNumber(pageNumber-1);
        setMessage('');
        resetForm();
    }

    function resetForm() {
        setExperience('');

        document.querySelectorAll('input[type="radio"]').forEach((radio) => {
            radio.checked = false;
        });
    }


    return (
        <>
        {pageNumber===1 && (
            <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
                <h2>Apply for a position</h2>
                <h3>Page 1 of 4</h3>
                <form onSubmit={handleCompetenceSubmit}>

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

                    <label>
                        Years of Experience:

                    </label><br/>
                    <input type="number" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Enter years of experience" required/>
                    <br/>

                    <button type="submit" style={{marginTop: '10px'}}>Submit Competence</button>
                </form>
                <br/>
                <button type="button" onClick={goToNextPage}>Go to next Page</button>
                {message && <p>{message}</p>}
            </div>
        )};
            {pageNumber===2 && (
                <div style={{display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto'}}>
                    <h2>Apply for a position</h2>
                    <h3>Page 2 of 4</h3>
                    <form onSubmit={handleCompetenceSubmit}>

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

                        <label>
                            Years of Experience:

                        </label><br/>
                        <input type="number" name="experience" value={experience}
                               onChange={(e) => setExperience(e.target.value)} placeholder="Enter years of experience"
                               required/>
                        <br/>

                        <button type="submit" style={{marginTop: '10px'}}>Submit Competence</button>
                    </form>
                    <br/>
                    <button type="button" onClick={goToPreviousPage}>Go to previous Page</button>
                    <button type="button" onClick={goToNextPage}>Go to next Page</button>
                    {message && <p>{message}</p>}
                </div>
            )}
        </>
    );
};

export default ApplyPositionView;
