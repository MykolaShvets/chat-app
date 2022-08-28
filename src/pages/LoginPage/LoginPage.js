import React from 'react';
import { useDispatch } from 'react-redux';

import { signInWithGoogle } from '../../store/slices/userSlice';

import './LoginPage.scss';

const LoginPage = () => {
    const dispatch = useDispatch();

    const login = () => {
        dispatch(signInWithGoogle());
    };

    return (
        <div className='login-page__container'>
            <button onClick={login}> Sign in with Google </button>
        </div>
    );
};

export default LoginPage;
