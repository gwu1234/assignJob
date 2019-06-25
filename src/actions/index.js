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

export const setClientTag = clientTag => {
  //console.log("action usertag = " + tag);
  return {
    type: actionTypes.SET_CLIENT_TAG,
    payload: {
      clienttag: clientTag
    }
  };
};

export const setLeadTag = leadTag => {
  return {
    type: actionTypes.SET_LEAD_TAG,
    payload: {
      leadTag: leadTag
    }
  };
};

export const setClientView = view => {
  return {
    type: actionTypes.SET_CLIENT_VIEW,
    payload: {
      view: view
    }
  };
};

export const setLeadMapView = () => {
  return {
    type: actionTypes.SET_LEAD_MAPVIEW,
  };
};

export const setClientContactView = view => {
  return {
    type: actionTypes.SET_CLIENT_CONTACT_VIEW,
    payload: {
      view: view
    }
  };
};

export const setCompanyInfoView = view => {
  //console.log("action usertag = " + tag);
  return {
    type: actionTypes.SET_COMPANY_INFOVIEW,
    payload: {
      view: view
    }
  };
};

export const setAssignedEmployeeView = view => {
  return {
    type: actionTypes.SET_ASSIGNED_EMPLOYEE_VIEW,
    payload: {
      view: view
    }
  };
};

export const setCurrentUser = user => {
  return {
    type: actionTypes.SET_CURRENT_USER,
    payload: {
      currentUser: user
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

export const setGeoEncoding = geoEncoding => {
  return {
    type: actionTypes.SET_GEOENCODING,
    payload: {
      geoEncoding: geoEncoding
    }
  }
}

export const setUnassignedClient = () => {
  return {
    type: actionTypes.SET_UNASSIGNED_CLIENTS,
  }
}


export const setFrench = french => {
  return {
    type: actionTypes.SET_FRENCH,
    payload: {
      french: french
    }
  }
}

export const setBadAccess = bad => {
  return {
    type: actionTypes.SET_BAD_ACCESS,
    payload: {
      badAccess: bad
    }
  }
}

export const setReposData = reposData => {
    return {
      type: actionTypes.SET_REPOS_DATA,
      payload: {
          reposData: reposData
      }
    }
}

export const setLeadView = () => {
  return {
    type: actionTypes.SET_LEAD_VIEW
  }
}
