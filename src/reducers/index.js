import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null, // user object
  isLoading: true,
  admin: false,
  usertag: 'initial-tag'
  //modal: false
};

const user_reducer = (state = initialUserState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLoading: false
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        isLoading: false
      };
    case actionTypes.SET_ADMIN:
      return {
        ...state,
        admin: action.payload.admin
    };
    case actionTypes.SET_CURRENT_USER:
        return {
        ...state,
        currentUser: action.payload.currentUser
    };
    case actionTypes.SET_TAG:
        console.log ("reducer = " + action.payload.usertag);
        return {
          ...state,
          usertag: action.payload.usertag
    };
    /*case actionTypes.SET_OPEN_MODAL:
        console.log ("reducer = " + action.payload.modal);
        return {
          ...state,
          modal: action.payload.modal
    };*/
    default:
      return state;
  }
};

/*const initialChannelState = {
  currentChannel: null,
  currentUser: null
};

const channel_reducer = (state = initialChannelState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }

    case actionTypes.SET_CURRENT_USER:
        return {
        ...state,
        currentUser: action.payload.currentUser
      }
    default:
      return state;
  }
} */


/*const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});*/

const rootReducer = combineReducers({
  user: user_reducer
});

export default rootReducer;