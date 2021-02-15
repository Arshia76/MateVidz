import * as types from '../Types';

const initialState = {
  user: null,
  error: null,
  loading: false,
  message: '',
  users: [],
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };

    case types.GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        user: null,
      };

    case types.USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
        favorites: [],
      };

    case types.USER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.USER_FAVORITES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        message: action.payload.msg,
        user: action.payload.user,
      };

    case types.USER_FAVORITES_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload,
      };

    case types.GET_ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default Users;
