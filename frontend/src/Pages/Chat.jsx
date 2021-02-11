import React, { useEffect, useState } from 'react';
import ChatUsers from '../Components/ChatUsers';
import { Container, Col, Row } from 'react-bootstrap';
import io from 'socket.io-client';
import '../styles/chat-box.css';
import { toast } from 'react-toastify';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from '../Components/Message';

let socket;
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = location.state;

    socket = io('/');

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        toast.error(error);
      }
    });

    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
    //eslint-disable-next-line
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <Container>
      <Row style={{ direction: 'rtl' }}>
        <Col xs={12} sm={4}>
          <ChatUsers users={users} mb-3 mb-sm-0 />
        </Col>
        <Col xs={12} sm={8}>
          <div className='chat-box mb-3 mb-sm-0'>
            <div className='header'>
              <h3>{room}</h3>
            </div>

            <ScrollToBottom className='body'>
              {messages.map((message, i) => (
                <div key={i}>
                  <Message message={message} name={name} />
                </div>
              ))}
            </ScrollToBottom>

            <div className='footer'>
              <input
                type='text'
                name='message'
                value={message}
                placeholder='پیام خود را وارد کنید ...'
                onChange={(e) => setMessage(e.target.value)}
              />

              <div className='button'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={(e) => sendMessage(e)}
                  width='35'
                  height='35'
                  fill='currentColor'
                  className='bi bi-telegram'
                  viewBox='0 0 16 16'
                >
                  <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z' />
                </svg>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
