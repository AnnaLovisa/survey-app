import axios from 'axios';
import { FETCH_USER } from './types';

//Action creator intended to make a request to our backend-api that is in authRoutes
//The key is that an action creator always expects us to return (produce) an action
//The Redux Thunk breaks that rule that an action always has to be returned. It gives direct access to the dispatch-function to dispatch an action
//Whenever fetchUser is called, it will instantly return a function
export const fetchUser = () =>
  //Redux Thunk inspect whatever value the fetchUser
  //When Redux Thunk sees that we return a function, Redux Thunk will automatically
  //call the function and pass in dispatch as an argument and automatically forward the action to the different reducers
  //We want to dispatch an action after this request has been completed
  async (dispatch) => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
  };
  //Take token and send to backend-api
  //The action creator will be called with the token that we got back from Stripe

  export const handleToken = (token) => 
  
  async (dispatch) => {
    const res = await axios.post('/api/stripe', token);   //To send a Post-request to the api-backend-server along with some information. The routehandler can be called whatever we want
    //We can reuse the same type of action, as the backend-server sends back the same type of user-model that contains the updated number of credits
    //So anything that belongs to the user-model will be automatically updated in the authReducer, that the Header will show directly
    dispatch({ type: FETCH_USER, payload: res.data });  
  };