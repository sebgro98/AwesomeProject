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

import global_en from './translations/en/global.json';
import global_sv from './translations/sv/global.json';
import i18next from 'i18next';
import {I18nextProvider} from "react-i18next";

i18next.init({
    interpolation: {escapeValue: false},
    lng: "sv",
    resources: {
        en: {
            global: global_en
        },
        sv: {
            global: global_sv
        },
    }
})

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
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
        </I18nextProvider>
    </React.StrictMode>
);

reportWebVitals();
