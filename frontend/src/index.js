import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import HeaderPresenter from './presenter/HeaderPresenter'; // Adjust the path as necessary
import Footer from './views/Footer'; // Adjust the path as necessary
import SignUpPresenter from './presenter/SignUpPresenter';
import LoginPresenter from './presenter/LoginPresenter';
import ApplyPositionPresenter from "./presenter/ApplyPositionPresenter";
import ApplicationsPresenter from "./presenter/ApplicationsPresenter";
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Router>
            <HeaderPresenter />
            <Routes>
                <Route path="/signup" element={<SignUpPresenter />} />
                <Route path="/" element={<LoginPresenter />} />
                <Route path="/apply" element={<ApplyPositionPresenter />} />
                <Route path="/applications" element={<ApplicationsPresenter />} />
            </Routes>
            <Footer />
        </Router>
    </React.StrictMode>
);

reportWebVitals();
