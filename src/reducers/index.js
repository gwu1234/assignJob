import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialUserState = {
  currentUser: null, // user object
  isLoading: true,
  admin: false,
  usertag: 'initial-tag',
  userContact: null,
  employeeList: null,
  clientList: null,
  clientContact: null,
  workOrder: null,
  mapView: false
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
    case actionTypes.SET_USER_CONTACT:
    //console.log ("reducer user contact = " );
    //console.log (action.payload.userContact);
        return {
        ...state,
        userContact: action.payload.userContact
    };
    case actionTypes.SET_TAG:
        //console.log ("reducer = " + action.payload.usertag);
        return {
          ...state,
          usertag: action.payload.usertag
    };
    case actionTypes.SET_EMPLOYEE_LIST:
        //console.log ("reducer employees list = ");
        //console.log (action.payload.employeeList);
        return {
          ...state,
          employeeList: action.payload.employeeList
    };
    case actionTypes.SET_CLIENT_LIST:
        //console.log ("reducer employees list = ");
        //console.log (action.payload.clientList);
        return {
          ...state,
          clientList: action.payload.clientList
    };
    case actionTypes.SET_CLIENT_CONTACT:
        //.log ("reducer client contact = " );
        //console.log (action.payload.clientContact);
        return {
        ...state,
        clientContact: action.payload.clientContact
    };
    case actionTypes.SET_WORK_ORDER:
        //console.log ("reducer work order  = " );
        //console.log (action.payload.workOrder);
        return {
        ...state,
        workOrder: action.payload.workOrder
    };
    case actionTypes.SET_MAP_VIEW:
        //console.log ("reducer mapView  = " );
        //console.log (action.payload.mapView);
        return {
        ...state,
        mapView: action.payload.mapView
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
