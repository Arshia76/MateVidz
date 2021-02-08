import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import '../styles/join.css';
import { toast } from 'react-toastify';

const Join = ({ history }) => {
  const [room, setRoom] = useState('');
  const name = useSelector((state) => state.auth.user);

  const submit = (e) => {
    e.preventDefault();
    if (room !== '') {
      history.push({
        pathname: '/chat',
        state: {
          room,
          name,
        },
      });
    } else toast.error('لطفا گروه خود را مشخص کنید');
  };
  return (
    <Container className='container-join'>
      <h1>لطفا گروه خود را مشخص کنید</h1>
      <Form className='form'>
        <Form.Group style={{ margin: '1.5rem 0 ' }}>
          <Form.Control
            type='text'
            value={name}
            readonly
            style={{ textAlign: 'right' }}
          />
        </Form.Group>
        <Form.Group style={{ margin: '1.5rem 0' }}>
          <Form.Control
            style={{ textAlign: 'right' }}
            type='text'
            placeholder='نام گروه'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </Form.Group>
        <div style={{ textAlign: 'center' }}>
          <Button type='submit' onClick={submit} style={{ width: '100% ' }}>
            ورود
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Join;
