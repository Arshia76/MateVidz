import React, { Fragment, useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Changer from './Changer';
import { deletePost } from '../Actions/Posts';
import { toast } from 'react-toastify';

const Post = ({ post }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.posts.error);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <Col xs={12} sm={6} lg={4} className='mt-5'>
        <Card style={{ width: '20rem' }}>
          <Card.Img style={{ height: '45vh' }} variant='top' src={post.image} />
          <Card.Body className='text-right'>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.message}</Card.Text>
            <Button
              onClick={() =>
                error
                  ? toast.error(error.errors[0].msg)
                  : dispatch(deletePost(post._id))
              }
              variant='primary'
              disabled={post.creator !== auth.creator}
              className='mr-2'
            >
              حذف
            </Button>
            <Button
              disabled={post.creator !== auth.creator}
              onClick={handleShow}
              variant='primary'
            >
              بروز رسانی
            </Button>
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

export default Post;
