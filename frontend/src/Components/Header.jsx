import React, { Fragment, useState } from 'react';
import { Navbar, Form, Nav, FormControl, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Changer from './Changer';
import { logout } from '../Actions/Auth';

const Header = () => {
  const [show, setShow] = useState(false);
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Fragment>
      <Navbar
        style={{ direction: 'rtl' }}
        bg='primary'
        variant='dark'
        expand='lg'
        className='text-right text-lg-center'
      >
        <Navbar.Brand
          src='https://cdn2.iconfinder.com/data/icons/valentines-day-flat-line-1/50/love-notebook-128.png'
          as='img'
          href='#home'
          style={{ height: '6rem', width: '6rem' }}
        />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Link className='link' to='/'>
              <Nav.Link as='li'>صفحه اصلی</Nav.Link>
            </Link>
            {auth ? (
              <>
                <Link className='link' to='/dashboard'>
                  <Nav.Link as='li'> سلام {user}</Nav.Link>
                </Link>
                <Link className='link' onClick={handleShow}>
                  <Nav.Link as='li'>ایجاد پست</Nav.Link>
                </Link>
                <Link className='link' onClick={() => dispatch(logout())}>
                  <Nav.Link as='li'>خروج</Nav.Link>
                </Link>
              </>
            ) : (
              <>
                <Link className='link' to='/login'>
                  <Nav.Link as='li'>ورود</Nav.Link>
                </Link>
                <Link className='link' to='/register'>
                  <Nav.Link as='li'>ثبت نام</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
          <Form style={{ direction: 'rtl' }} inline>
            <FormControl
              type='text'
              placeholder='جستجو'
              className='ml-sm-2 mb-4 mb-lg-0'
            />
            <Button className='mb-4 mb-lg-0' variant='outline-info'>
              جستجو
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Changer type='پست جدید' show={show} handleClose={handleClose} />
    </Fragment>
  );
};

export default Header;
