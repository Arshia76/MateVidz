import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Posts from '../Components/Posts';
import { toast } from 'react-toastify';
import { getAllPosts, clearErrors } from '../Actions/Posts';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.posts.error);
  useEffect(() => {
    if (error) {
      error.errors.forEach((err) => toast.error(err.msg));
    }
    dispatch(clearErrors());

    dispatch(getAllPosts());
  }, [error, dispatch]);
  return (
    <Container>
      <Posts />
    </Container>
  );
};

export default Home;
