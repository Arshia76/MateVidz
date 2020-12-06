import * as types from '../Types';

const initialState = {
  user: null,
  error: null,
  loading: false,
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
    default:
      return state;
  }
};

export default Users;
