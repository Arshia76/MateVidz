import React, { useEffect, useState } from 'react';
import UserPosts from '../Components/UserPosts';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../Actions/Users';
import { toast } from 'react-toastify';
import { getUserPosts, clearErrors } from '../Actions/Posts';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const post = useSelector((state) => state.posts.post);
  const userError = useSelector((state) => state.users.error);
  const postError = useSelector((state) => state.posts.error);
  const [state, setState] = useState({
    username: user.username,
    userImage: user.image,
    email: user.email,
  });
  const [title, setTitle] = useState('پست های من');
  useEffect(() => {
    if (userError) {
      toast.error(userError.msg || userError.errors[0].msg);
      dispatch(clearErrors());
    } else if (postError) {
      toast.error(postError.msg || postError.errors[0].msg);
      dispatch(clearErrors());
    } else {
      setState({
        ...state,
        username: user.username,
        userImage: user.image,
        email: user.email,
      });
    }
    //eslint-disable-next-line
  }, [userError, postError, user.favorites]);

  useEffect(() => {
    dispatch(getUserPosts(user._id));

    //eslint-disable-next-line
  }, [dispatch, post]);

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
    <Container className='p-2 mt-5' fluid>
      <Col className='bg-dark shadow-lg rounded'>
        <Form encType='multipart/form-data' style={{ direction: 'rtl' }}>
          <Row>
            <Col className='text-center w-100' xs={12} sm={6}>
              <img
                style={{
                  margin: 'auto',
                  borderRadius: '50%',
                  marginTop: '.5rem',
                  height: '25rem',
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
        <Container className='d-flex align-items-center justify-content-center w-100 mt-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => setTitle('پست های من')}
            style={{ cursor: 'pointer' }}
            width='40'
            height='40'
            fill='currentColor'
            className='bi bi-bookmark-fill mr-5'
            viewBox='0 0 16 16'
          >
            <path d='M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z' />
          </svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            onClick={() => setTitle('علایق من')}
            style={{ cursor: 'pointer' }}
            width='40'
            height='40'
            fill='currentColor'
            className='bi bi-bookmark-heart-fill'
            viewBox='0 0 16 16'
          >
            <path d='M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z' />
          </svg>
        </Container>

        <UserPosts title={title} />
      </Col>
    </Container>
  );
};

export default Dashboard;
