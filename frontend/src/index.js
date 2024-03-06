import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './presenter/HeaderPresenter'; // Importing the Header component (adjust the path as necessary)
import Footer from './views/Footer'; // Importing the Footer component (adjust the path as necessary)
import SignUpPresenter from './presenter/SignUpPresenter';
import LoginPresenter from './presenter/LoginPresenter';
import ApplyPositionPresenter from "./presenter/ApplyPositionPresenter";
import ApplicationsPresenter from "./presenter/ApplicationsPresenter";
import reportWebVitals from './reportWebVitals';
import i18n from './i18n'; // Importing i18n instance for internationalization
import { I18nextProvider } from "react-i18next";

const root = createRoot(document.getElementById('root'));

// Rendering the React application
root.render(
    <React.StrictMode>
        {/* Providing the i18n instance to the application for internationalization */}
        <I18nextProvider i18n={i18n}>
            <Router>
                {/* Including the Header component */}
                <Header/>
                {/* Defining routes for different paths */}
                <Routes>
                    {/* Routing for different paths */}
                    <Route path="/signup" element={<SignUpPresenter />} />
                    <Route path="/" element={<LoginPresenter />} />
                    <Route path="/apply" element={<ApplyPositionPresenter />} />
                    <Route path="/applications" element={<ApplicationsPresenter />} />
                </Routes>
                {/* Including the Footer component */}
                <Footer/>
            </Router>
        </I18nextProvider>
    </React.StrictMode>
);

// Reporting web vitals
reportWebVitals();
