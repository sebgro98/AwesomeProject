
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../views/HeaderView';
import {useTranslation} from "react-i18next";

const HeaderPresenter = () => {
    const [language, i18n] = useTranslation("global");
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <HeaderView
            onLogout={handleLogout}
            language={language}
        />
    );
};

export default HeaderPresenter;
