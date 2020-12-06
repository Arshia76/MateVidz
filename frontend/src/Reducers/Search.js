import * as types from '../Types';

const initialState = {
  posts: null,
  loading: false,
  error: null,
};

const Search = (state = initialState, action) => {
  switch (action.type) {
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
        posts: null,
        error: action.payload,
        loading: false,
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

export default Search;
