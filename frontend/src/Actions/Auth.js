import axios from 'axios';
import * as types from '../Types';

export const SignUp = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', formData);

    dispatch({
      type: types.REGISTER_SUCCESSFUL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    dispatch({
      type: types.LOGIN_SUCCESSFUL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: types.LOGOUT,
  });
};

export const loadUser = () => async (dispatch) => {
  const res = await axios.get('/api/auth/user', {
    headers: {
      'notify-auth-token': localStorage.getItem('notify-auth-token'),
    },
  });
  dispatch({
    type: types.LOAD_USER,
    payload: res.data,
  });
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_ERRORS,
  });
};
