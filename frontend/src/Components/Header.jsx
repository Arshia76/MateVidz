import React, { Fragment, useState, useEffect } from 'react';
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Changer from './Changer';
import { logout } from '../Actions/Auth';
import { searchPosts, clearErrors } from '../Actions/Serach';
import { getUserPosts } from '../Actions/Posts';
import { toast } from 'react-toastify';

const Header = () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const id = useSelector((state) => state.auth.creator);
  const error = useSelector((state) => state.search.error);
  const [state, setText] = useState({ username: '' });
  useEffect(() => {
    if (error) toast.error(error.msg || error.errors[0].msg);
    dispatch(clearErrors());
  }, [error]);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onChange = (e) => {
    setText({ username: e.target.value });
  };
  const search = (e) => {
    e.preventDefault();
    dispatch(searchPosts(state));
    setText({ username: '' });
  };
  return (
    <Fragment>
      <Navbar
        style={{ direction: 'rtl' }}
        bg='primary'
        variant='dark'
        expand='lg'
        className='text-right text-lg-center sticky-top'
      >
        <Navbar.Brand
          src='https://cdn3.iconfinder.com/data/icons/social-media-2169/24/social_media_social_media_logo_facebook_messenger-128.png'
          as='img'
          href='#home'
          style={{ height: '5.5rem', width: '5.5rem' }}
        />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {auth ? (
              <>
                <Link className='link' to='/'>
                  <Nav.Link as='li'>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-house-fill'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z'
                      />
                      <path
                        fill-rule='evenodd'
                        d='M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z'
                      />
                    </svg>
                    صفحه اصلی
                  </Nav.Link>
                </Link>
                <Link className='link' to='/dashboard'>
                  <Nav.Link as='li' onClick={() => dispatch(getUserPosts(id))}>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-person-circle'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z' />
                      <path
                        fill-rule='evenodd'
                        d='M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                      />
                      <path
                        fill-rule='evenodd'
                        d='M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z'
                      />
                    </svg>
                    سلام {user}
                  </Nav.Link>
                </Link>

                <Link className='link' onClick={handleShow}>
                  <Nav.Link as='li'>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-plus-square'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z'
                      />
                      <path
                        fill-rule='evenodd'
                        d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z'
                      />
                    </svg>
                    ایجاد پست
                  </Nav.Link>
                </Link>
                <Link className='link' onClick={() => dispatch(logout())}>
                  <Nav.Link as='li'>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-box-arrow-left'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
                      />
                      <path
                        fill-rule='evenodd'
                        d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
                      />
                    </svg>
                    خروج
                  </Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link className='link' to='/login'>
                  <Nav.Link as='li'>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-box-arrow-in-left'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z'
                      />
                      <path
                        fill-rule='evenodd'
                        d='M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
                      />
                    </svg>
                    ورود
                  </Nav.Link>
                </Link>
                <Link className='link' to='/register'>
                  <Nav.Link as='li'>
                    <svg
                      width='1em'
                      height='1em'
                      style={{ marginLeft: '.5rem' }}
                      viewBox='0 0 16 16'
                      class='bi bi-person-plus-fill'
                      fill='currentColor'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fill-rule='evenodd'
                        d='M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.5-3a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z'
                      />
                    </svg>
                    ثبت نام
                  </Nav.Link>
                </Link>
              </>
            )}
          </Nav>
          {auth && (
            <Form style={{ direction: 'rtl' }} inline>
              <FormControl
                type='text'
                placeholder='جستجو'
                onChange={onChange}
                value={state.username}
                className='ml-sm-2 mb-4 mb-lg-0'
              />
              <Button
                onClick={search}
                type='submit'
                className='mb-4 mb-lg-0'
                variant='outline-info'
              >
                جستجو
              </Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Changer type='پست جدید' show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Header;
