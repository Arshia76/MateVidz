import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector, connect } from 'react-redux';
import Changer from './Changer';
import { deletePost, getPostDetail, setLoding } from '../Actions/Posts';
import { setLoading } from '../Actions/Users';
import { updateUserFavorites } from '../Actions/Users';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const UserPost = ({ post, getPostDetail }) => {
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
              }}
              as='div'
            >
              <div
                className='d-flex align-items-center ml-4 '
                style={{ direction: 'ltr' }}
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

export default connect(null, { getPostDetail })(UserPost);
