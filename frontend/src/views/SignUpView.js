import React from 'react';
import ReactModal from 'react-modal';

const SignUpView = ({
                        error,
                        isNewUser,
                        verificationCode,
                        showVerificationView,
                        formData,
                        handleChange,
                        handleSubmit,
                        handleVerificationSubmit,
                        redirectToLogIn,
                        handleCheckboxChange,
                        setError,
                        setVerificationCode,
                    }) => {
    return (
        <div>
            <h2>Sign Up</h2>
            {showVerificationView ? (
                <div>
                    <p>Please enter the verification code sent to your email:</p>
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} required />
                    <button type="button" onClick={handleVerificationSubmit}>
                        Verify
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' }}>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </label>

                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </label>

                    <label>
                        Email:
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </label>

                    <label>
                        Person Number YYYYMMDD-XXXX:
                        <input type="text" name="personNumber" value={formData.personNumber} onChange={handleChange} required />
                    </label>

                    <label>
                        Username:
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </label>

                    <label>
                        Password:
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </label>

                    <button type="submit" style={{ marginTop: '10px' }}>
                        Sign Up
                    </button>

                    <button type="button" onClick={redirectToLogIn}>
                        Go back to log in
                    </button>
                </form>
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
        </div>
    );
};

export default SignUpView;
