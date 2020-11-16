import * as types from '../Types';

const initialState = {
  token: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  user: null,
  creator: null,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_SUCCESSFUL:
      localStorage.setItem('auth-token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.username,
        error: null,
        creator: action.payload.id,
      };

    case types.REGISTER_FAIL:
      localStorage.removeItem('auth-token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
        creator: null,
      };
    case types.LOGIN_SUCCESSFUL:
      localStorage.setItem('auth-token', action.payload.token);

      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        user: action.payload.username,
        error: null,
        creator: action.payload.id,
      };

    case types.LOGIN_FAIL:
      localStorage.removeItem('auth-token');

      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
        creator: null,
      };

    case types.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case types.LOGOUT:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        error: action.payload,
        loading: false,
        user: null,
        creator: null,
      };

    case types.LOAD_USER:
      return {
        ...state,
        token: localStorage.getItem('auth-token'),
        isAuthenticated: true,
        error: null,
        loading: false,
        user: action.payload.user,
        creator: action.payload.creator,
      };

    case types.CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export default Auth;
