import * as types from '../Types';
import axios from 'axios';
export const getUser = (id) => async (dispatch) => {
  setLoding();
  try {
    const res = await axios.get(`/api/users/${id}`, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });

    dispatch({
      type: types.GET_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_USER_FAIL,
      payload: err.response.data,
    });
  }
};

export const updateUser = (id, data) => async (dispatch) => {
  setLoding();
  try {
    const res = await axios.put(`/api/users/update/${id}`, data, {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: types.USER_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_UPDATE_FAIL,
      payload: err.response.data,
    });
  }
};

export const setLoding = () => (dispatch) => {
  dispatch({
    type: types.SET_LOADING,
  });
};

export const updateUserFavorites = (pid, uid) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/users/favorites/${pid}/${uid}/update`,
      null,
      {
        headers: {
          'notify-auth-token': localStorage.getItem('notify-auth-token'),
        },
      }
    );

    dispatch({
      type: types.USER_FAVORITES_UPDATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.USER_FAVORITES_UPDATE_FAIL,
      payload: err.response.data,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/users', {
      headers: {
        'notify-auth-token': localStorage.getItem('notify-auth-token'),
      },
    });
    dispatch({
      type: types.GET_ALL_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_ALL_USERS_FAIL,
      payload: err.response.data,
    });
  }
};
