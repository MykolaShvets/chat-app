import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DialogListItem from './../DialogListItem/DialogListItem';

import './DialogList.scss';

const DialogList = ({setIsMobileSidebar}) => {
  const { contacts, searchResult } = useSelector(state => state.userReducer);
  const [dialogs, setDialogs] = useState(contacts);

  useEffect(() => {
    if (!searchResult) {
      setDialogs(contacts);
      return;
    } else {
      setDialogs(searchResult);
    }
  }, [searchResult, contacts]);

  return (
    <div className='chat-list__container'>
      <h2>Chats</h2>
      {dialogs.map(dialog => <DialogListItem key={dialog.id} dialog={dialog} setIsMobileSidebar={setIsMobileSidebar} />)}
    </div>
  )
}

export default DialogList;

