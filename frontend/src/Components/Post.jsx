import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector, connect } from 'react-redux';
import Changer from './Changer';
import { deletePost, getPostDetail, like, setLoding } from '../Actions/Posts';
import { setLoading } from '../Actions/Users';
import { updateUserFavorites } from '../Actions/Users';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const Post = ({ post, getPostDetail }) => {
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.users.user);
  const [color, setColor] = useState(
    user !== null
      ? user.favorites.some((fav) => fav._id === post._id)
        ? 'red'
        : 'white'
      : 'white'
  );
  const history = useHistory();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    setColor(
      user !== null
        ? user.favorites.some((fav) => fav._id === post._id)
          ? 'red'
          : 'white'
        : 'white'
    );
  }, [user, post._id]);

  const Like = () => {
    dispatch(setLoding());
    dispatch(like(post._id, post.creator));
  };

  const updateFavorites = () => {
    dispatch(setLoading());
    dispatch(updateUserFavorites(post._id, auth.creator));
  };

  return (
    <Fragment>
      <Col xs={12} sm={6} lg={4} className='mt-4'>
        <Card style={{ width: '100%', margin: 'auto' }}>
          <Card.Title
            className='d-flex align-items-center justify-content-between my-2 mx-4'
            style={{ direction: 'rtl' }}
          >
            <h3>{post.user !== undefined && post.user.username}</h3>
            <img
              src={post.user !== undefined && post.user.userimage}
              style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
              alt='user img'
            />
          </Card.Title>
          <Card.Img
            onClick={async () => {
              await getPostDetail(post._id);
              history.push(`/detail/${post._id}`);
            }}
            style={{ height: '20rem', cursor: 'pointer' }}
            variant='top'
            src={post.image}
          />

          <Card.Body className='text-right'>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text style={{ wordBreak: 'break-word' }}>
              {post.message}
            </Card.Text>
            <Card.Text
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                direction: 'rtl',
                marginBottom: '1.5rem',
              }}
              as='div'
            >
              <div
                className='d-flex align-items-center ml-4 '
                style={{
                  direction: 'ltr',
                }}
              >
                <svg
                  onClick={Like}
                  style={{ cursor: 'pointer' }}
                  width='20px'
                  height='20px'
                  viewBox='0 0 16 16'
                  className='bi bi-hand-thumbs-up mb-2 mr-1'
                  fill='currentColor'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16v-1c.563 0 .901-.272 1.066-.56a.865.865 0 0 0 .121-.416c0-.12-.035-.165-.04-.17l-.354-.354.353-.354c.202-.201.407-.511.505-.804.104-.312.043-.441-.005-.488l-.353-.354.353-.354c.043-.042.105-.14.154-.315.048-.167.075-.37.075-.581 0-.211-.027-.414-.075-.581-.05-.174-.111-.273-.154-.315L12.793 9l.353-.354c.353-.352.373-.713.267-1.02-.122-.35-.396-.593-.571-.652-.653-.217-1.447-.224-2.11-.164a8.907 8.907 0 0 0-1.094.171l-.014.003-.003.001a.5.5 0 0 1-.595-.643 8.34 8.34 0 0 0 .145-4.726c-.03-.111-.128-.215-.288-.255l-.262-.065c-.306-.077-.642.156-.667.518-.075 1.082-.239 2.15-.482 2.85-.174.502-.603 1.268-1.238 1.977-.637.712-1.519 1.41-2.614 1.708-.394.108-.62.396-.62.65v4.002c0 .26.22.515.553.55 1.293.137 1.936.53 2.491.868l.04.025c.27.164.495.296.776.393.277.095.63.163 1.14.163h3.5v1H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z'
                  />
                </svg>
                <h5 className='m-0'>{post.likes.like}</h5>
              </div>
              <div
                className='d-flex align-items-center ml-4 '
                style={{
                  direction: 'ltr',
                }}
              >
                <h4 className='mr-1 m-0'>نظر</h4>
                <h5 className='m-0'>{post.reviews.length}</h5>
              </div>
              <svg
                onClick={updateFavorites}
                xmlns='http://www.w3.org/2000/svg'
                style={{
                  cursor: 'pointer',
                }}
                width='20'
                height='20'
                fill={color}
                className='bi bi-suit-heart-fill mb-1'
                viewBox='0 0 16 16'
              >
                <path d='M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z' />
              </svg>
            </Card.Text>
            {post.creator === auth.creator && (
              <Fragment>
                <Button
                  onClick={() => {
                    if (error) toast.error(error.errors[0].msg);
                    else {
                      dispatch(setLoding());
                      dispatch(deletePost(post._id));
                    }
                  }}
                  variant='secondary'
                  className='mr-2'
                >
                  حذف
                </Button>
                <Button onClick={handleShow} variant='secondary'>
                  بروز رسانی
                </Button>
              </Fragment>
            )}
          </Card.Body>
        </Card>
      </Col>

      <Changer
        post={post}
        type='بروز رسانی'
        show={show}
        handleClose={handleClose}
      />
    </Fragment>
  );
};

export default connect(null, { getPostDetail })(Post);
