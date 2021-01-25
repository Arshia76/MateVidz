import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { review, getReviews } from '../Actions/Posts';
import { toast } from 'react-toastify';

const Detail = () => {
  const [comment, setState] = useState('');
  const post = useSelector((state) => state.posts);
  const [reviews, setReviews] = useState(post.post.reviews);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getReview = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      comment,
      username: auth.user,
      userId: post.post.creator,
    });
    dispatch(review(post.post._id, data));
    setState('');
  };

  useEffect(() => {
    dispatch(getReviews(post.post._id));
    if (post.error) {
      toast.error(post.error.msg || post.error.errors[0].msg);
    }
    setReviews(post.reviews);
  }, [dispatch, post.post._id, post, post.post.error]);

  return (
    <Container>
      <Row className='p-4 text-center'>
        <Col xs={12} md={6}>
          <img
            src={`http://localhost:5000/${post.post.image}`}
            alt='post'
            className='w-100 mb-3 '
            style={{ height: '25rem' }}
          />
        </Col>
        <Col xs={12} md={6}>
          <h2>نظرات</h2>
          <hr className='bg-warning' />
          <div className='comment-container'>
            {reviews.map((review) => {
              return (
                <div className='comment'>
                  <h4 className='text-warning'>{review.username} </h4>
                  <h4 style={{ wordBreak: 'break-word' }}>{review.comment}</h4>
                </div>
              );
            })}
          </div>

          {post.post.creator !== auth.creator && (
            <Form>
              <Form.Control
                className='mb-3 text-right bg-primary text-success'
                type='text'
                placeholder='نظر خود را بنویسید'
                value={comment}
                onChange={(e) => setState(e.target.value)}
              />
              <Button
                onClick={getReview}
                className='w-25 btn-secondary'
                type='submit'
              >
                ثبت نظر
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Detail;
