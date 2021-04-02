import * as types from '../Types';

const initialState = {
  posts: [],
  loading: false,
  post: null,
  error: null,
  message: null,
  reviews: [],
  userPosts: [],
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
    case types.SET_LOADING_POST:
      return {
        ...state,
        loading: true,
      };

    case types.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case types.POST_DETAIL_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case types.POST_DETAIL_FAIL:
      return {
        ...state,
        post: null,
        loading: false,
        error: action.payload,
      };

    case types.POST_REVIEW_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        message: action.payload.msg,
      };

    case types.POST_REVIEW_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        message: null,
      };

    case types.GET_REVIEWS_SUCCESS:
      return {
        ...state,
        reviews: action.payload,
        error: null,
        loading: false,
      };

    case types.GET_REVIEWS_FAIL:
      return {
        ...state,
        error: action.payload.msg,
        loading: false,
        reviews: [...state.reviews, action.payload],
      };

    case types.LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post: action.payload,
      };

    case types.LIKE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userPosts: action.payload,
      };

    case types.USER_POSTS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.msg,
      };

    case types.SEARCH_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: null,
        loading: false,
      };

    case types.SEARCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Posts;
