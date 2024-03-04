import React from 'react';
const LoginView = ({
                       username,
                       password,
                       error,
                       handleUsernameChange,
                       handlePasswordChange,
                       handleSubmit,
                       redirectToSignUp
                   }) => (
    <div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={handleUsernameChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
            </div>
            <button type="submit">Login</button>
            <button type="button" onClick={redirectToSignUp}>Sign Up</button>

            <h6>If you are an existing user and want to create a new account, please do so by verifying your email on the registration page.</h6>
        </form>
    </div>
);

export default LoginView;
