import React, { useEffect, useState } from 'react';
import UserPosts from '../Components/UserPosts';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../Actions/Users';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const userError = useSelector((state) => state.users.error);
  const postError = useSelector((state) => state.posts.error);
  const [state, setState] = useState({
    username: user.username,
    userImage: user.image,
    email: user.email,
  });
  useEffect(() => {
    if (userError) {
      toast.error(userError.msg || userError.errors[0].msg);
    } else if (postError) {
      toast.error(postError.msg || postError.errors[0].msg);
    } else {
      setState({
        ...state,
        username: user.username,
        userImage: user.image,
        email: user.email,
      });
    }
  }, [userError, postError, user]);

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userImage', state.userImage);
    data.append('email', state.email);
    data.append('username', state.username);
    dispatch(updateUser(user._id, data));
    setState({
      ...state,
      userImage: '',
    });
  };
  return (
    <Container className='p-4 mt-5' fluid>
      <Col className='bg-dark shadow-lg rounded'>
        <Form encType='multipart/form-data' style={{ direction: 'rtl' }}>
          <Row>
            <Col className='text-center w-100' xs={12} sm={6}>
              <img
                style={{
                  margin: 'auto',
                  borderRadius: '50%',
                  marginTop: '.5rem',
                  height: '75%',
                  width: '75%',
                }}
                src={state.userImage}
                alt='user'
              />
            </Col>
            <Col className='text-center w-100 ' xs={12} sm={6}>
              <Form.Group
                className='mt-4'
                as={Row}
                controlId='formHorizontalText'
              >
                <Form.Label column sm='2' className='text-right text-sm-center'>
                  نام کاربری
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    onChange={onChange}
                    name='username'
                    type='text'
                    value={state.username}
                    placeholder='نام کاربری'
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className='mt-4'
                as={Row}
                controlId='formHorizontalEmail'
              >
                <Form.Label column sm='2' className='text-right text-sm-center'>
                  ایمیل
                </Form.Label>
                <Col sm='10'>
                  <Form.Control
                    type='email'
                    onChange={onChange}
                    name='email'
                    value={state.email}
                    placeholder='ایمیل'
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className='mt-4  d-flex align-items-center'
                as={Row}
                controlId='formHorizontalFile'
              >
                <Form.Label column sm='2' className='text-right text-sm-center'>
                  عکس پروفایل
                </Form.Label>
                <Col sm='10'>
                  <Form.File
                    onChange={(e) =>
                      setState({
                        ...state,
                        userImage: e.target.files[0],
                      })
                    }
                    id='custom-file'
                  />
                </Col>
              </Form.Group>

              <Form.Group className='mt-4 mx-auto w-50' as={Row}>
                <Col>
                  <Button onClick={submit} className='w-100' type='submit'>
                    ثبت تغییرات
                  </Button>
                </Col>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <hr className='bg-secondary' />
        <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>پست های من</h1>
        <UserPosts />
      </Col>
    </Container>
  );
};

export default Dashboard;
