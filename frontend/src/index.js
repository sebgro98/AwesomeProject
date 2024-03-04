import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import SignUpPresenter from './presenter/SignUpPresenter';
import LoginPresenter from './presenter/LoginPresenter';
import reportWebVitals from './reportWebVitals';
import ApplyPositionPresenter from "./presenter/ApplyPositionPresenter";
import ApplicationsPresenter from "./presenter/ApplicationsPresenter";

// Create a root for rendering the application
const root = createRoot(document.getElementById('root'));

// Render the application using createRoot
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* Route for SignUpView */}
                <Route path="/signup" element={<SignUpPresenter />} />

                {/* Default route for LoginView */}
                <Route path="/" element={<LoginPresenter />} />

                {/* Route for applying */}
                <Route path="/apply" element={<ApplyPositionPresenter />} />

                <Route path="/applications" element={<ApplicationsPresenter />} />

                {/* Add more routes if needed */}
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
