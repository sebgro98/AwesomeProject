import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
import reportWebVitals from './reportWebVitals';
import ApplyPositionView from "./views/ApplyPositionView";
/**
 * Main entry point for the React application.
 * Renders the application using React Router.
 */
ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* Route for SignUpView */}
                <Route path="/signup" element={<SignUpView />} />

                {/* Default route for LoginView */}
                <Route path="/" element={<LoginView />} />

                {/* Route for applying */}
                <Route path="/apply" element={<ApplyPositionView />} />

                {/* Add more routes if needed */}
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();