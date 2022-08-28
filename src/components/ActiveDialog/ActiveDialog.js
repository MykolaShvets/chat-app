import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';

import sendBtn from '../../images/sendbtn.svg';
import { jokeService } from './../../services/jokeService';
import { SendMessage, SetMessageStatus } from '../../store/slices/userSlice';

import './ActiveDialogs.scss';

const ActiveDialog = () => {
  const { contactId } = useParams();
  const { user, contacts, messages } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const currentContact = contacts.filter(contact => contact.id === contactId)[0];
  const [currentMessages, setCurrentMessages] = useState();
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (!message) {
      return;
    }
    const data = {
      id: uuid(),
      fromUser: user.id,
      toUser: contactId,
      message,
      createdAt: Date()
    };
    await dispatch(SendMessage({ message: data }))
    setMessage('')
    const { value } = await jokeService.getJoke();
    const answer = {
      id: uuid(),
      fromUser: contactId,
      toUser: user.id,
      message: value,
      createdAt: Date(),
      status: 'new'
    };
    setTimeout(() => {
      dispatch(SendMessage({ message: answer }));
    }, 15000);
  }

  useEffect(() => {
    const filteredMessages = messages
      .filter(message => (message.fromUser === contactId && (message.toUser === 0 || message.toUser === user.id))
        ||
        (message.fromUser === user.id && message.toUser === contactId))
    setCurrentMessages(filteredMessages)
    dispatch(SetMessageStatus({ contactId }))
  }, [messages, contactId, user.id]);

  return (
    <div className="active-dialog__container">
      <div className="active-dialog_header">
        <div className="current-contact__img">
          <img src={currentContact.photoURL} alt={currentContact.name} />
        </div>
        <p className="current-contact__name">{currentContact.name}</p>
      </div>
      <div className="active-dialog__body">
        {currentMessages && currentMessages.map(message => {
          return (<div className={message.fromUser === user.id ? 'message__box' : 'message__box inbox'} key={message.id}>
            <img src={currentContact.photoURL} alt={currentContact.name} />
            <div className="message">
              <p className='message__txt'>{message.message}</p>
              <p className='message__timestamp'>
                {`${message.createdAt.split(' ')[1]}/${message.createdAt.split(' ')[2]}/${message.createdAt.split(' ')[3]} 
                ${message.createdAt.split(' ')[4]}`}
              </p>
            </div>
          </div>);
        })}
      </div>
      <div className="active-dialog__footer">
        <div className='message__input'>
          <input type="text" placeholder='Type your message' value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessage}><img src={sendBtn} alt="send" /></button>
        </div>
      </div>
    </div>
  )
}

export default ActiveDialog;

