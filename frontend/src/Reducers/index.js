import { combineReducers } from 'redux';
import Auth from '../Reducers/Auth';
import Posts from '../Reducers/Posts';

const RootReducer = combineReducers({
  auth: Auth,
  posts: Posts,
});

export default RootReducer;
