import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../views/HeaderView';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";


const HeaderPresenter = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const { t, i18n } = useTranslation('translation');
    const [supportedLngs, setSupportedLngs] = useState([]);

    useEffect(() => {
        const allLngs = i18n.options.supportedLngs;
        const filteredLngs = allLngs ? allLngs.filter(lang => lang !== 'cimode') : [];
        console.log('--------------',allLngs)
        console.log('Filtered Supported Languages:', filteredLngs); // Add console log here
        setSupportedLngs(filteredLngs);
    }, [i18n.options.supportedLngs]); // Ensure useEffect runs when supportedLngs change

    const changeLang = (e) => {
        i18n.changeLanguage(e.target.name);
    }

    return (
        <HeaderView
            onLogout={handleLogout}
            changeLang={changeLang}
            supportedLngs={supportedLngs}
        />
    );
};

export default HeaderPresenter;
