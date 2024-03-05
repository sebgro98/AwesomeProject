// HeaderPresenter.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../views/HeaderView'; // Assume this is the path to your view component

const HeaderPresenter = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Place your logout logic here, for example, clearing user tokens
        navigate('/');
    };

    return (
        <HeaderView onLogout={handleLogout} />
    );
};

export default HeaderPresenter;
