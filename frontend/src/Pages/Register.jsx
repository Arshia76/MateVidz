import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { register } from '../Actions/Auth';
import { toast } from 'react-toastify';
import { clearErrors } from '../Actions/Auth';

const Register = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    userImage: '',
    username: '',
  });

  const error = useSelector((state) => state.auth.error);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error.msg || error.errors[0].msg);
    }
    dispatch(clearErrors());
    auth && history.push('/');
  }, [error, history, auth, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userImage', state.userImage);
    data.append('email', state.email);
    data.append('username', state.username);
    data.append('password', state.password);
    console.log(data);
    dispatch(register(data));
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Container
      className='bg-secondary my-5 rounded shadow-sm'
      style={{ direction: 'rtl' }}
    >
      <h1 className='text-center text-dark'>ثبت نام</h1>
      <Form className='bg-secondary p-4' encType='multipart/form-data'>
        <Form.Group className='text-center' controlId='formBasicText'>
          <Form.Control
            className='bg-primary text-success  w-75 mx-auto'
            style={{ borderRadius: '5rem' }}
            onChange={onChange}
            type='text'
            name='username'
            value={state.username}
            placeholder='نام کاربری'
          />
        </Form.Group>
        <Form.Group className='text-center' controlId='formBasicEmail'>
          <Form.Control
            className='bg-primary text-success  w-75 mx-auto'
            style={{ borderRadius: '5rem' }}
            onChange={onChange}
            type='email'
            value={state.email}
            name='email'
            placeholder='ایمیل'
          />
        </Form.Group>

        <Form.Group className='text-center' controlId='formBasicPassword'>
          <Form.Control
            className='bg-primary text-success w-75 mx-auto'
            style={{ borderRadius: '5rem' }}
            onChange={onChange}
            type='password'
            value={state.password}
            name='password'
            placeholder='رمز عبور'
          />
        </Form.Group>
        <Form.Group
          className='text-center w-75 mx-auto'
          controlId='formBasicFile'
        >
          <Form.File
            onChange={(e) => {
              setState({ ...state, userImage: e.target.files[0] });
              console.log(state);
            }}
            id='custom-file'
            className='bg-primary text-success'
            value={state.userImage}
            style={{
              borderRadius: '5rem',
              border: '1px solid white',
              padding: '.7rem',
            }}
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button
            variant='primary'
            onClick={submit}
            type='submit'
            style={{ borderRadius: '5rem', width: '8rem' }}
          >
            ثبت نام
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Register;
