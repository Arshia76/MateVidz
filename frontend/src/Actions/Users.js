import * as types from '../Types';
import axios from 'axios';
export const getUser = (id) => async (dispatch) => {
  setLoding();
  try {
    const res = await axios.get(`/api/users/${id}`, {
      headers: {
        'auth-token': localStorage.getItem('auth-token'),
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
        'auth-token': localStorage.getItem('auth-token'),
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
