import React from 'react';
import { Outlet } from 'react-router-dom';

import UserPanel from '../../components/UserPanel/UserPanel';
import DialogList from '../../components/DialogsList/DialogList';

import './ChatPage.scss';

const ChatPage = () => {
    return (
        <div className='chat__container'>
            <div className='chat__sidebar'>
                <UserPanel />
                <DialogList />
            </div>
            <div className='active__dialog'>
                <Outlet />
            </div>
        </div>
    );
};

export default ChatPage;
