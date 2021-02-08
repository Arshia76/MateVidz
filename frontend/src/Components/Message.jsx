import React from 'react';

import '../styles/message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyStart '>
      <p className='sentText pr-10 pl-2'>{trimmedName}</p>
      <div className='messageBox backgroundBlue mt-2'>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyEnd'>
      <div className='messageBox backgroundLight mt-2'>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10 mr-2 '>{user}</p>
    </div>
  );
};

export default Message;
