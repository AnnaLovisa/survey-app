import { combineReducers } from 'redux';
import authReducer from './authReducer';
//Whatever key we provide to the objects that we are passing in to the combineReducer are representing the keys
//that exists in the state object
export default combineReducers({
  auth: authReducer
});