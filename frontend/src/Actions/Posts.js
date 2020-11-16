import axios from 'axios';
import * as types from '../Types';

export const getAllPosts = () => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.get('api/posts/', {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
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

export const createPost = (post) => async (dispatch) => {
  try {
    setLoding();
    const res = await axios.post('api/posts/create', post, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
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
    const res = await axios.delete(`api/posts/delete/${id}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
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
    const res = await axios.put(`api/posts/update/${id}`, data, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
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
