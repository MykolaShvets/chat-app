import React, {useState} from 'react';
import { Outlet } from 'react-router-dom';

import UserPanel from '../../components/UserPanel/UserPanel';
import DialogList from '../../components/DialogsList/DialogList';

import './ChatPage.scss';

const ChatPage = () => {
    const [isMobileSidebar, setIsMobileSidebar] = useState(true);

    return (
        <div className='chat__container'>
            <div className='chat__sidebar'>
                <UserPanel />
                <DialogList />
            </div>
            {!isMobileSidebar && <button className='sidebat__btn' onClick={() => setIsMobileSidebar(true)}> {'<'} </button>}
            <div className={isMobileSidebar ? "chat__mobile-sidebar visible" : "chat__mobile-sidebar"}>
                <UserPanel />
                <DialogList setIsMobileSidebar={setIsMobileSidebar} />
            </div>
            <div className='active__dialog'>
                <Outlet />
            </div>
        </div>
    );
};

export default ChatPage;
