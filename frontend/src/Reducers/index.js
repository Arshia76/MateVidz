import { combineReducers } from 'redux';
import Auth from '../Reducers/Auth';
import Posts from '../Reducers/Posts';
import Users from '../Reducers/Users';
import Search from './Search';

const RootReducer = combineReducers({
  auth: Auth,
  posts: Posts,
  users: Users,
  search: Search,
});

export default RootReducer;
