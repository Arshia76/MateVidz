import axios from 'axios';
import * as types from '../Types';

export const getAllPosts = () => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.get('/api/posts/', {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.GET_ALL_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.ALL_POSTS_FAIL,
      payload: err.response.data,
    });
  }
};

export const getPostDetail = (id) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.get(`/api/posts/detail/${id}`, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });

    dispatch({
      type: types.POST_DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_DETAIL_FAIL,
      payload: err.response.data,
    });
  }
};

export const review = (id, commentData) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.post(`/api/posts/review/${id}`, commentData, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: types.POST_REVIEW_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_REVIEW_FAIL,
      payload: err.response.data,
    });
  }
};

export const like = (id, user) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.put(`/api/posts/likes/${id}`, user, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.LIKE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.LIKE_FAIL,
      payload: err.response.data,
    });
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.post('/api/posts/create', post, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.POST_CREATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_CREATE_FAIL,
      payload: err.response.data,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.delete(`/api/posts/delete/${id}`, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.POST_DELETE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_DELETE_FAIL,
      payload: err.response.data,
    });
  }
};

export const updatePost = (id, data) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.put(`/api/posts/update/${id}`, data, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
        'Content-Type': 'application/json',
      },
    });
    dispatch({
      type: types.POST_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.POST_UPDATE_FAIL,
      payload: err.response.data,
    });
  }
};

export const searchPosts = (username) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.post('/api/search/user', username, {
      'Content-Type': 'application/json',
    });
    dispatch({
      type: types.SEARCH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.SEARCH_FAIL,
      payload: err.response.data,
    });
  }
};

export const setLoding = () => (dispatch) => {
  dispatch({
    type: types.SET_LOADING,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ERRORS,
  });
};

export const getReviews = (id) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.get(`/api/posts/reviews/${id}`, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });

    dispatch({
      type: types.GET_REVIEWS_SUCCESS,
      payload: res.data.reviews,
    });
  } catch (err) {
    dispatch({
      type: types.GET_REVIEWS_FAIL,
      payload: err.response.data,
    });
  }
};

export const getUserPosts = (id) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.get(`/api/posts/${id}`, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.USER_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_POSTS_FAIL,
      payload: err.response.data,
    });
  }
};
