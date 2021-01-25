import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Posts from '../Components/Posts';
import { toast } from 'react-toastify';
import { getAllPosts, clearErrors } from '../Actions/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/Users';

const Home = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.creator);
  const error = useSelector((state) => state.posts.error);
  const post = useSelector((state) => state.posts.post);
  const userError = useSelector((state) => state.users.error);

  useEffect(() => {
    if (error) {
      error.errors
        ? error.errors.forEach((err) => toast.error(err.msg))
        : toast.error(error.msg);
    }
    if (userError) {
      userError.errors
        ? userError.errors.forEach((err) => toast.error(err.msg))
        : toast.error(userError.msg);
    }
    dispatch(getUser(authUser));
    dispatch(clearErrors());

    dispatch(getAllPosts());
  }, [error, dispatch, authUser, userError, post]);

  return (
    <Container fluid>
      <Posts />
    </Container>
  );
};

export default Home;
