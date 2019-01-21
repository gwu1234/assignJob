import * as actionTypes from "./types";

/* User Actions */
export const setUser = user => {
  return {
    type: actionTypes.SET_USER,
    payload: {
      currentUser: user
    }
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER
  };
};

export const setAdmin = admin => {
  return {
    type: actionTypes.SET_ADMIN,
    payload: {
      admin: admin
    }
  };
};

export const setUserTag = tag => {
  //console.log("action usertag = " + tag);
  return {
    type: actionTypes.SET_TAG,
    payload: {
      usertag: tag
    }
  };
};

/*export const setOpenModal = modal => {
  console.log("action modal = " + modal);
  return {
    type: actionTypes.SET_OPEN_MODAL,
    payload: {
      modal: modal
    }
  };
};*/

/* Channel Actions */
export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}

export const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: {
      currentUser: user
    }
  }
}

export const setUserContact = contact => {
  return {
    type: actionTypes.SET_USER_CONTACT,
    payload: {
      userContact: contact
    }
  }
}

export const setEmployeeList = employeeList => {
  return {
    type: actionTypes.SET_EMPLOYEE_LIST,
    payload: {
      employeeList: employeeList
    }
  }
}
