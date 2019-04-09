import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const GEOCODING_DONE = 1;
//const GEOCODING_RENEWED = 2;

const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;


const EMPLOYEE_MARKER = 0;
const CLIENT_MARKER = 1;
const TRUCK_MARKER = 2 ;

const initialUserState = {
  currentUser: null, // user object
  isLoading: true,
  admin: false,
  usertag: null,
  clienttag: null,
  //userContact: null,
  employeeList: null,
  clientList: null,
  //clientContact: null,
  //workOrder: null,
  mapView: false,
  geoEncoding: GEOCODING_DONE,
  markers: [],
  truckMarkers: [],
  //contracts: null,
  //payments:null,
  //deliverys: null,
  //invoices: null,
  selectedEmployee: null,
  repeathours: 5,
  french: false,
  //trucks: [],
  badAccess: false,
  companyInfoView: false,
  clientView: false,
  clientContactView: false,
  //activeOrderId: null,
  //activeOrderKey: null,
  //activeContractId: null,
  //activeContractKey: null,
  //activeInvoiceId: null,
  //activeInvoiceKey: null,
  reposData: null,
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
        isLoading: false,
        currentUser: null,
      };
    case actionTypes.SET_ADMIN:
      return {
        ...state,
        admin: action.payload.admin
    };
    case actionTypes.SET_CURRENT_USER:
        //console.log(action.payload.currentUser);
        return {
        ...state,
        currentUser: action.payload.currentUser
    };
    case actionTypes.SET_REPOS_DATA:
        const reposData = action.payload.reposData;
        let dataList = null;
        let clientList = {};

        if (reposData) {
            dataList = reposData["clients"]["data"];
            for (var key in dataList) {
               let contact = dataList[key]["contact"];
               contact = {...contact, tag: key, clientTag: key};
               //console.log (contact) ;
               clientList = {...clientList, [key]: contact}
            }
        }
        return {
           ...state,
           clientList: clientList,
           employeeList: action.payload.reposData["employees"],
           reposData: action.payload.reposData
    };

    case actionTypes.SET_TAG:
        //console.log ("reducer = " + action.payload.usertag);
        return {
          ...state,
          usertag: action.payload.usertag
    };
    case actionTypes.SET_CLIENT_TAG:
        //console.log ("reducer = " + action.payload.usertag);
        return {
          ...state,
          clienttag: action.payload.clienttag
    };

    case actionTypes.SET_COMPANY_INFOVIEW:
        //console.log("SET_COMPANY_INFOVIEW");
        //console.log(action.payload.view);
        return {
        ...state,
        companyInfoView: action.payload.view,
        clientView: false,
        clientContactView: false,
        mapView: false,
    };
    case actionTypes.SET_MAP_VIEW:
         const clients = state.clientList;
         const clientData = state.reposData["clients"]["data"];

         let clientMarkers = [];
         for (var clientKey in clients) {
           let status = JOB_NOT_ACTIVE;
           const {workorders, deliverys} = clientData[clientKey];

           let statusArray = [];
           let activeOrders = 0;
           let deliveryTimes = 0;
           for (var orderKey in workorders) {
              let {isActive,isRepeat,repeatTimes} = workorders[orderKey];
              statusArray = [];
              activeOrders = 0;

              isActive = (isActive && isActive === "true")? true:false;
              isRepeat = (isRepeat && isRepeat === "true")? true:false;
              repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
              //deliveryTimes = deliveryTimes? parseInt(deliveryTimes, 10) : 0;

              // need to calculate deliveryTimes
              //console.log(orderKey);
              for (var deliveryKey in deliverys) {
                 let {linkedOrderKey} = deliverys[deliveryKey];
                 //console.log(linkedOrderKey);
                 //console.log(orderKey);

                 if (linkedOrderKey === orderKey) {
                     //console.log("delivery found");
                     deliveryTimes ++;
                 }
              }

              //console.log(deliveryTimes);

              if (isActive) {
                  if (!isRepeat && deliveryTimes > 0) {
                     //status = JOB_DONE;
                     statusArray.push(JOB_DONE);
                  } else if (isRepeat && repeatTimes === 0) {
                     statusArray.push(JOB_PROGRESS);
                  } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
                     statusArray.push(JOB_DONE);
                  } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
                     statusArray.push(JOB_PROGRESS);
                  }
                  else {
                    statusArray.push(JOB_NEW);
                  }
                  activeOrders ++;
              }

              if (activeOrders) {
                 status = statusArray[0];
              }
              for (var i=0; i++; i < activeOrders) {
                  status = status < statusArray[i]? status: statusArray[i];
              }
           }

           const marker = {
               pos:
               {
                 lat: clients[clientKey].lat,
                 lng: clients[clientKey].lng
               },
               name: clients[clientKey].name,
               id:  clientKey,
               status: status,
               isAssigned: clients[clientKey].isAssigned,
               employeeName: clients[clientKey].employeeName,
               street: clients[clientKey].street,
               city: clients[clientKey].city,
               assignedKey: clients[clientKey].assignedKey,
               employeeKey: clients[clientKey].employeeKey,
               clientTag: clients[clientKey].clientTag,
               clientKey: clientKey,
               activeOrders: activeOrders,
           }

           clientMarkers.push(marker);
        }

        // find truck location
        //const truckList = state.trucks;
        const truckList = state.reposData["trucks"];
        let dateString = null;

        let truckMarker = [];
        for (var key in truckList) {
           if (truckList[key].assigned && truckList[key].assigned === true) {
              const timestamp = truckList[key].timestamp;
              dateString = (new Date(timestamp)).toLocaleString();
              //console.log("datestring = ");
              //console.log(dateString);

              const marker = {
                  pos:
                  {
                     lat: truckList[key].latitude,
                     lng: truckList[key].longitude
                  },
                  truckModel: truckList[key].model,
                  truckColor: truckList[key].color,
                  truckYear: truckList[key].year,
                  employeeName: truckList[key].employeeName,
                  dateString: dateString,
                  id:  key,
                  type: TRUCK_MARKER,
              }
             truckMarker.push(marker);
           }
         }

         //clientMarkers = clientMarkers.concat(truckMarker);

        return {
            ...state,
           markers: clientMarkers,
           truckMarkers: truckMarker,
           mapView: true,
           clientContactView: false,
           clientView: false,
           companyInfoView: false,
      };
    case actionTypes.SET_EMPLOYEE_VIEW:
        const employees = state.employeeList;
        let employeeMarkers = [];

        for (var key in employees) {
            let status = JOB_NEW;
            if (employees[key].status) {
                status = employees[key].status;
            }
            const marker = {
                pos:
                {
                   lat: employees[key].lat,
                   lng: employees[key].lng
                },
                name: employees[key].name,
                id:  key,
                status: status,
                type: EMPLOYEE_MARKER
            }
           employeeMarkers.push(marker);
      }

      return {
          ...state,
         markers: employeeMarkers,
         mapView: true,
         clientContactView: false,
         clientView: false,
         companyInfoView: false,
    };
    case actionTypes.SET_TEXT_VIEW:
      //console.log ("reducer");
      //console.log ("SET_TEXT_VIEW");
      return {
          ...state,
         markers: [],
         mapView: false,
         clientContactView: false,
         clientView: false,
         companyInfoView: false,
    };
    case actionTypes.SET_GEOENCODING:
            //console.log ("reducer SET_GEOENCODING = " );
            //console.log (action.payload.geoEncoding);
            return {
                     ...state,
                     geoEncoding: action.payload.geoEncoding
        };

    case actionTypes.SET_CLIENT_VIEW:
            //console.log(action.payload.view);
            return {
                    ...state,
                    clientView: action.payload.view,
                    clientContactView: false,
                    mapView: false,
                    companyInfoView: false,
        };

   case actionTypes.SET_CLIENT_CONTACT_VIEW:
            //console.log("SET_CLIENT_CONTACT_VIEW");
            //console.log(action.payload.view);
           return {
                    ...state,
                    clientContactView: action.payload.view,
                    clientView: false,
                    mapView: false,
                    companyInfoView: false,
        };

    case actionTypes.SET_REPEAT_HOURS:
     //console.log("at reducer = ::");
     //console.log (action.payload.repeathours);
            return {
                   ...state,
                   repeathours: action.payload.repeathours
      };
    case actionTypes.SET_FRENCH:
            return {
                   ...state,
                   french: action.payload.french
      };
   case actionTypes.SET_BAD_ACCESS:
            return {
                   ...state,
                   badAccess: action.payload.badAccess
      };
   case actionTypes.SET_SELECTED_EMPLOYEE:
         const selectedEmployee = action.payload.selected
         console.log (selectedEmployee);

         let selectedMarkers = [];
         const selectedMarker = {
             pos:
             {
                lat: selectedEmployee.lat,
                lng: selectedEmployee.lng
             },
             name: selectedEmployee.name,
             id:  selectedEmployee.tag,
             type: EMPLOYEE_MARKER
         }
         selectedMarkers.push(selectedMarker);

         const assignedJobs = selectedEmployee.assigned;
         for (var key in assignedJobs) {

             const {clientLat, clientLng, clientName, clientStreet, workorders} = assignedJobs[key];

             let statusArray = [];
             let activeOrder= 0;
             let status = 0;

             for (var orderKey in workorders) {
                 //console.log(orderKey);
                 //console.log(workorders[orderKey]);
                 let {isActive,isRepeat,repeatTimes, previousDelivery} = workorders[orderKey];
                 statusArray = [];
                 activeOrder= 0;

                 isActive = (isActive && isActive === "true")? true:false;
                 isRepeat = (isRepeat && isRepeat === "true")? true:false;
                 repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
                 previousDelivery = previousDelivery? parseInt(previousDelivery, 10) : 0;
                 let deliveryTimes = previousDelivery;

                 if (!isRepeat && deliveryTimes > 0) {
                    //status = JOB_DONE;
                    statusArray.push(JOB_DONE);
                 } else if (isRepeat && repeatTimes === 0) {
                    statusArray.push(JOB_PROGRESS);
                 } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
                    statusArray.push(JOB_DONE);
                 } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
                    statusArray.push(JOB_PROGRESS);
                 }
                 else {
                   statusArray.push(JOB_NEW);
                 }
                 activeOrder ++;
             }

             if (activeOrder) {
                status = statusArray[0];
             }
             for (var i=0; i++; i < activeOrder) {
                 status = status < statusArray[i]? status: statusArray[i];
             }

             //let status = JOB_NEW;

             const assignedMarker = {
                 pos:
                 {
                    lat: clientLat,
                    lng: clientLng
                 },
                 name: clientName,
                 id:  key,
                 status: status,
                 street: clientStreet,
                 type: CLIENT_MARKER,
                 isAssigned: true,
                 employeeName: selectedEmployee.name,
                 //assignedKey: assignedJobs[key].assignedKey,
                 //employeeKey: assignedJobs[key].employeeKey,
                 //clientKey: assignedJobs[key].clientKey,
                 //clientTag: assignedClient.clientTag,
             }
            selectedMarkers.push(assignedMarker);
       }
            return {
                    ...state,
                    markers: selectedMarkers,
                    clientContactView: false,
                    clientView: false,
                    mapView: true,
                    companyInfoView: false,
                    truckMarkers:[],
      };
case actionTypes.SET_UNASSIGNED_CLIENTS:
      //const clients = state.clientList;
      const allClientData = state.reposData["clients"]["data"];

      let unClientMarkers = [];
      let status = JOB_NOT_ACTIVE;
      let statusArray =[];
      let activeOrderAccount = 0;

      for (var dataKey in allClientData) {
           const {contact, workorders, deliverys} = allClientData[dataKey];
           statusArray.length = 0; // clear array
           activeOrderAccount = 0;

           // step 1: find active workorders for this clients
           for (var workKey in workorders) {
              let {isActive, isRepeat, repeatTimes, isEmployeeAssigned} = workorders[workKey];
              isActive = isActive? (isActive === "true"? true: false) : false;
              isRepeat = isRepeat? (isRepeat === "true"? true: false) : false;
              repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
              isEmployeeAssigned = isEmployeeAssigned? (isEmployeeAssigned === "true"? true: false) : false;

              // ignore not active work orders and ignore assigned order
              if (!isActive || isEmployeeAssigned) {
                  continue;
              }

              // step 2, for an active workorder, find clientTag, and orderKey, and repeatTimes
              //clientTag = workorders[workKey]["clientTag"];
              activeOrderAccount ++;

              //let clientTag = null;
              let orderKey = workKey;

              // step 3, for this active workorder, find deliveryTimes
              let deliveryTimes = 0;
              let linkedOrderKey = null;
              for (var deliveryKey in deliverys) {
                 linkedOrderKey = deliverys[deliveryKey]["linkedOrderKey"];
                 if (orderKey && linkedOrderKey && orderKey===linkedOrderKey) {
                    deliveryTimes ++;
                 }
              }

              if (!isRepeat && deliveryTimes > 0) {
                 //status = JOB_DONE;
                 statusArray.push(JOB_DONE);
              } else if (isRepeat && repeatTimes === 0) {
                 statusArray.push(JOB_NEW);
              } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
                 statusArray.push(JOB_DONE);
              } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
                 statusArray.push(JOB_PROGRESS);
              }
              else {
                statusArray.push(JOB_NEW);
              }
           }

           // step 4, if this client has active workorders, save to array
           if (activeOrderAccount) {
              status = statusArray[0];

              for (var i=0; i++; i < activeOrderAccount) {
                 status = status < statusArray[i]? status: statusArray[i];
              }

              const marker = {
                pos:
                {
                 lat: contact.lat,
                 lng: contact.lng
                },
                name: contact.name,
                street: contact.street,
                city: contact.city,
                postcode: contact.postcode,
                lat: contact.lat,
                lng: contact.lng,
                clientTag: contact.clientTag,
                clientKey: contact.clientTag,
                id:  dataKey,
                status: status,
             }
             unClientMarkers.push(marker);
           }
    }

    const allemployees = state.employeeList;
    //let allemployeeMarkers = [];

    for (var key in allemployees) {
        const marker = {
            pos:
            {
               lat: allemployees[key].lat,
               lng: allemployees[key].lng
            },
            name: allemployees[key].name,
            id:  key,
            type: EMPLOYEE_MARKER
        }
       unClientMarkers.push(marker);
    }

    return {
        ...state,
       markers: unClientMarkers,
       clientContactView: false,
       clientView: false,
       mapView: true,
       companyInfoView: false,
  };

  /*case actionTypes.SET_ACTIVE_ORDER_ID:
     return {
            ...state,
            activeOrderId: action.payload.activeId
     };

  case actionTypes.SET_ACTIVE_ORDER_KEY:
        return {
            ...state,
            activeOrderKey: action.payload.activeKey
    }; */

  /*case actionTypes.SET_ACTIVE_CONTRACT_ID:
       return {
            ...state,
            activeContractId: action.payload.activeId
    };

  case actionTypes.SET_ACTIVE_CONTRACT_KEY:
       return {
            ...state,
            activeContractKey: action.payload.activeKey
   };

   case actionTypes.SET_ACTIVE_INVOICE_ID:
        return {
             ...state,
             activeInvoiceId: action.payload.activeId
     };

   case actionTypes.SET_ACTIVE_INVOICE_KEY:
        return {
             ...state,
             activeInvoiceKey: action.payload.activeKey
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
