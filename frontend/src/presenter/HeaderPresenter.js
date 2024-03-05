
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderView from '../views/HeaderView';

const HeaderPresenter = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <HeaderView onLogout={handleLogout} />
    );
};

export default HeaderPresenter;
