import * as types from '../Types';
import axios from 'axios';

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
