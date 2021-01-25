import { combineReducers } from 'redux';
import Auth from '../Reducers/Auth';
import Posts from '../Reducers/Posts';
import Users from '../Reducers/Users';

const RootReducer = combineReducers({
  auth: Auth,
  posts: Posts,
  users: Users,
});

export default RootReducer;
