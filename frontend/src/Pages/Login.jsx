import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { login } from '../Actions/Auth';
import { clearErrors } from '../Actions/Auth';

const Login = ({ history }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
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
  }, [error, auth, history, dispatch]);

  const submit = (e) => {
    e.preventDefault();
    dispatch(login(JSON.stringify(state)));
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
      <h1 className='text-center text-dark'>ورود</h1>
      <Form className='bg-secondary p-4'>
        <Form.Group className='text-center' controlId='formBasicEmail'>
          <Form.Control
            className='bg-primary text-success  w-75 mx-auto'
            value={state.email}
            style={{ borderRadius: '5rem' }}
            onChange={onChange}
            type='email'
            name='email'
            placeholder='ایمیل'
          />
        </Form.Group>

        <Form.Group className='text-center' controlId='formBasicPassword'>
          <Form.Control
            className='bg-primary text-success w-75 mx-auto'
            style={{ borderRadius: '5rem' }}
            value={state.pass}
            onChange={onChange}
            type='password'
            name='password'
            placeholder='رمز عبور'
          />
        </Form.Group>

        <div style={{ textAlign: 'center' }}>
          <Button
            variant='primary'
            onClick={submit}
            type='submit'
            style={{ borderRadius: '5rem', width: '8rem' }}
          >
            ورود
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Login;
