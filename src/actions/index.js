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
/*export const setCurrentChannel = channel => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: {
      currentChannel: channel
    }
  }
}*/

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

export const setClientContact = contact => {
  return {
    type: actionTypes.SET_CLIENT_CONTACT,
    payload: {
      clientContact: contact
    }
  }
}

export const setWorkOrder = order => {
  return {
    type: actionTypes.SET_WORK_ORDER,
    payload: {
      workOrder: order
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

export const setClientList = clientList => {
  return {
    type: actionTypes.SET_CLIENT_LIST,
    payload: {
      clientList: clientList
    }
  }
}

export const setMapView = () => {
  return {
    type: actionTypes.SET_MAP_VIEW,
  }
}

export const setTextView = () => {
  return {
    type: actionTypes.SET_TEXT_VIEW,
  }
}


export const setEmployeeView = () => {
  return {
    type: actionTypes.SET_EMPLOYEE_VIEW
  }
}

export const setSelectedEmployee = selected => {
  return {
    type: actionTypes.SET_SELECTED_EMPLOYEE,
    payload: {
      selected: selected
    }
  }
}
/*export const setLatLng = latlng => {
  return {
    type: actionTypes.SET_LAT_LNG,
    payload: {
      latlng: latlng
    }
  }
}*/
export const setGeoEncoding = geoEncoding => {
  return {
    type: actionTypes.SET_GEOENCODING,
    payload: {
      geoEncoding: geoEncoding
    }
  }
}

export const setContracts = contracts => {
  return {
    type: actionTypes.SET_CONTRACTS,
    payload: {
      contracts: contracts
    }
  }
}

export const setPayments = payments => {
  return {
    type: actionTypes.SET_PAYMENTS,
    payload: {
      payments: payments
    }
  }
}

export const setDeliverys = deliverys => {
  return {
    type: actionTypes.SET_DELIVERYS,
    payload: {
      deliverys: deliverys
    }
  }
}

export const setTrucks = trucks => {
  return {
    type: actionTypes.SET_TRUCKS,
    payload: {
      trucks: trucks
    }
  }
}

export const setUnassignedClient = () => {
  return {
    type: actionTypes.SET_UNASSIGNED_CLIENTS,
  }
}

export const setRepeatHours= repeathours => {
  return {
    type: actionTypes.SET_REPEAT_HOURS,
    payload: {
      repeathours: repeathours
    }
  }
}
//export const SET_FRENCH= "SET_FRENCH";
export const setFrench = french => {
  return {
    type: actionTypes.SET_FRENCH,
    payload: {
      french: french
    }
  }
}
