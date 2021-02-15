import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Posts from '../Components/Posts';
import { toast } from 'react-toastify';
import { getAllPosts, clearErrors, setLoding } from '../Actions/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/Users';
import Loader from '../Loader/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.creator);
  const error = useSelector((state) => state.posts.error);
  const loading = useSelector((state) => state.posts.loading);
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

    dispatch(clearErrors());
  }, [error, dispatch, userError]);

  useEffect(() => {
    dispatch(getUser(authUser));

    //eslint-disable-next-line
  }, [authUser]);

  useEffect(() => {
    dispatch(setLoding());
    dispatch(getAllPosts());

    //eslint-disable-next-line
  }, [post]);

  return <Container fluid>{loading ? <Loader /> : <Posts />}</Container>;
};

export default Home;
