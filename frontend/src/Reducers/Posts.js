import * as types from '../Types';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const Posts = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };

    case types.ALL_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.POST_CREATE_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: null,
      };

    case types.POST_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.POST_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.filter((post) => post._id !== action.payload.id),
      };

    case types.POST_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.msg,
      };

    case types.POST_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,

        posts: state.posts.map((post) =>
          post._id === action.payload._id &&
          post.creator === action.payload.creator
            ? action.payload
            : post
        ),
      };

    case types.POST_UPDATE_FAIL:
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

    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default Posts;
