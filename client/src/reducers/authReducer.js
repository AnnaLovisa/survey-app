import { FETCH_USER } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false; //The action.payload here is the user-model
    //If no change in state is necessary, return default
    default:
      return state;
  }
}