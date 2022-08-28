import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchContact, signOutFromGoogle } from '../../store/slices/userSlice';

import './UserPanel.scss';

const UserPanel = () => {
    const { user, contacts } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(signOutFromGoogle());
        navigate('/');
    };

    const searchContact = (e) => {
        const data = contacts.filter(contact => contact.name.toLowerCase().includes(e.target.value.toLowerCase()));
        dispatch(SearchContact({ result: data }));
    };

    return (
        <div className='user-panel__container'>
            <div className="user__info">
                <div className='user__img'>
                    <img src={user.photoURL} alt="user" />
                </div>
                <button className='exit__btn' onClick={logout}></button>
            </div>
            <div className='search__input'>
                <input type="text" placeholder='Search or start new chat' onChange={(e) => searchContact(e)} />
            </div>
        </div>
    )
}

export default UserPanel;