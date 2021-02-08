import React from 'react';
import '../styles/chat-users.css';
const ChatUsers = ({ users }) => {
  return (
    <div className='chat-users'>
      <h3>اعضای گروه</h3>
      <hr />
      <div className='users'>
        {users ? users.map((user) => <h4>{user.name}</h4>) : null}
      </div>
    </div>
  );
};

export default ChatUsers;
