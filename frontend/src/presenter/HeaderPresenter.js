import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../views/HeaderView';
import { useTranslation } from 'react-i18next';

/**
 * HeaderPresenter component manages the state and logic for the header section of the application.
 * Handles language selection, user logout, and rendering the HeaderView.
 * <HeaderPresenter />
 */
const HeaderPresenter = () => {
    // Translation hook for language support
    const [t, i18n] = useTranslation('translation');
    const navigate = useNavigate();
    let originalLngs = i18n.options.supportedLngs;
    const languages = originalLngs.filter((lang) => lang !== 'cimode');

    // Effect hook to check stored language or use navigator language on component mount
    useEffect(() => {
        const storedLanguage = localStorage.getItem('selectedLanguage');
        if (storedLanguage) {
            i18n.changeLanguage(storedLanguage);
        } else {
            i18n.changeLanguage(navigator.language);
        }
    }, []);

    // Handle user logout by navigating to the login page
    const handleLogout = () => {
        navigate('/');
    };

    // Handle language change and update localStorage
    const changeLang = (e) => {
        i18n.changeLanguage(e.target.value);
        localStorage.setItem('selectedLanguage', e.target.value);
    };

    // Render the HeaderView component with necessary props
    return (
        <HeaderView
            onLogout={handleLogout}
            languageData={t}
            changeLang={changeLang}
            languages={languages}
        />
    );
};

export default HeaderPresenter;
