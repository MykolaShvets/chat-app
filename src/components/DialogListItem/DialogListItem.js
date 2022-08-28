import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './DialogListItem.scss';

const DialogListItem = ({ dialog, setIsMobileSidebar }) => {
  const { messages, user } = useSelector(state => state.userReducer);
  const [lastMessage, setLastMessage] = useState('');
  const currentMessages = messages
    .filter((message) => message.fromUser === dialog.id && (message.toUser === 0 || message.toUser === user.id));

  useEffect(() => {
    setLastMessage(currentMessages[currentMessages.length - 1]);
  }, [currentMessages])

  return (
    <Link
      to={`/${dialog.id}`}
      className={lastMessage.status === 'new' ? 'chat-item__container new' : 'chat-item__container'}
      onClick={() => setIsMobileSidebar(false)}>
      <div className="contact__img"><img src={dialog.photoURL} alt={dialog.name} /></div>
      <div className="contact__info">
        <div className="contact__info_txt">
          <p className="contact__name">{dialog.name}</p>
          <p className="contact__last-message">{lastMessage.message}</p>
        </div>
        <p className="contact__info_date">{lastMessage.createdAt
          &&
          `${lastMessage.createdAt.split(' ')[1]}/${lastMessage.createdAt.split(' ')[2]}/${lastMessage.createdAt.split(' ')[3]}`}
        </p>
      </div>

    </Link>
  )
}

export default DialogListItem;