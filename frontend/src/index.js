import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import SignUpView from './views/SignUpView';
import LoginView from './views/LoginView';
import reportWebVitals from './reportWebVitals';
import ApplyPositionView from "./views/ApplyPositionView";
import ApplicationsView from "./views/ApplicationsView";

// Create a root for rendering the application
const root = createRoot(document.getElementById('root'));

// Render the application using createRoot
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {/* Route for SignUpView */}
                <Route path="/signup" element={<SignUpView />} />

                {/* Default route for LoginView */}
                <Route path="/" element={<LoginView />} />

                {/* Route for applying */}
                <Route path="/apply" element={<ApplyPositionView />} />

                <Route path="/applications" element={<ApplicationsView />} />

                {/* Add more routes if needed */}
            </Routes>
        </Router>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
