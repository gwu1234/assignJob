import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const GEOCODING_DONE = 1;
//const GEOCODING_RENEWED = 2;

const JOB_NEW = 0;
const JOB_REPEAT = 1;
const JOB_DONE = 2;
const JOB_SOON = 3;

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
  //employeeList: null,
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
  activeOrderId: null,
  activeOrderKey: null,
  activeContractId: null,
  activeContractKey: null,
  activeInvoiceId: null,
  activeInvoiceKey: null,
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
               contact = {...contact, tag: key, clientTag: dataList[key]["contact"]};
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
    /*case actionTypes.SET_USER_CONTACT:
    //console.log ("reducer user contact = " );
    //console.log (action.payload.userContact);
        return {
        ...state,
        userContact: action.payload.userContact
    };*/
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

    /*case actionTypes.SET_EMPLOYEE_LIST:
        //console.log ("reducer employees list = ");
        //console.log (action.payload.employeeList);
        return {
          ...state,
          employeeList: action.payload.employeeList
    };*/
    /*case actionTypes.SET_CLIENT_LIST:
        //console.log("set_client_list");
        return {
          ...state,
          clientList: action.payload.clientList,

    };*/
    /*case actionTypes.SET_CLIENT_CONTACT:
        //.log ("reducer client contact = " );
        //console.log (action.payload.clientContact);
        return {
        ...state,
        clientContact: action.payload.clientContact
    };*/
    /*case actionTypes.SET_WORK_ORDER:
        //console.log ("reducer work order  = " );
        //console.log (action.payload.workOrder);
        return {
        ...state,
        workOrder: action.payload.workOrder
    };*/
    /*case actionTypes.SET_INVOICES:
        //console.log ("reducer invoices  = " );
        //console.log (action.payload.invoices);
        return {
        ...state,
        invoices: action.payload.invoices
    };*/
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
         //console.log ("reducer SET_MAP_View  " );
        //console.log (action.payload.mapView);
         const clients = state.clientList;
         //const timestamp = state.timestamp;
         const repeathours = state.repeathours;
         const date = new Date();
         // timestamp in second
         const timestamp = Math.round(date.getTime()/1000 + 0.5);
           //const timestamp = 1000;
         //console.log (timestamp);
         //console.log (repeathours);

         let clientMarkers = [];

         for (var key in clients) {
           const repeattime = clients[key].repeattime;
           const lastservicetime = clients[key].lastservicetime;
           const repeatseconds = repeathours * 60 * 60;
           let status = JOB_NEW;

           // case 1: it is a new client
           if (!repeattime && !lastservicetime) {
               status = JOB_NEW;
            // case 2: it is a one time job
           } else if (repeatseconds === 0) {
               if (!repeattime && lastservicetime) {
                   status = JOB_DONE;
               } else if (repeattime && !lastservicetime) {
                   status = JOB_REPEAT;
               } else if (repeattime && lastservicetime && lastservicetime>repeattime) {
                  status = JOB_DONE;
               } else {
                  status = JOB_REPEAT;
               }
           }
           // case 3: should not happen, no service record, but repeat button pressed
           // by accident
           else if (repeattime && !lastservicetime){
               const remainingseconds = repeatseconds - (timestamp - repeattime);
               if (remainingseconds < 5 ) {
                   status = JOB_NEW;
               } else {
                   status = JOB_REPEAT;
               }
           }
           // case 4: repeat button pressed after being serviced
           else if (repeattime && lastservicetime && repeattime>lastservicetime ){
               const remainingseconds = repeatseconds - (timestamp - repeattime);
               if (remainingseconds < 5 ) {
                   status = JOB_NEW;
               } else {
                   status = JOB_REPEAT;
               }
           }
           // case 5: no repeat button pressed after being serviced
           else if (repeattime && lastservicetime && repeattime<lastservicetime ){
                const remainingseconds = repeatseconds - (timestamp - lastservicetime);
                // 20 minutes before delivery time, it is a JOB_DONE
                if (remainingseconds > 60 * 20 ) {
                    status = JOB_DONE;
                }
                // between 20 minutes and 5 seconds, a job need to be repeated soon
                else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                   status = JOB_SOON
                }
                // it is a job to be done asap
                else {
                    status = JOB_NEW;
                }
           }
           // case 6: repeat button never pressed
           else if (!repeattime && lastservicetime) {
                const remainingseconds = repeatseconds - (timestamp - lastservicetime);
                // 20 minutes before delivery time, it is a JOB_DONE
                if (remainingseconds > 60 * 20 ) {
                    status = JOB_DONE;
                }
                // between 20 minutes and 5 seconds, a job need to be repeated soon
                else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                    status = JOB_SOON
                }
                // it is a job to be done asap
                else {
                    status = JOB_NEW;
                }
           }
           // should not come
           else {
                console.log("should bot come here");
                status = JOB_NEW;
           }


           const marker = {
             pos:
             {
                lat: clients[key].lat,
                lng: clients[key].lng
             },
             name: clients[key].name,
             id:  key,
             status: status,
             isAssigned: clients[key].isAssigned,
             employeeName: clients[key].employeeName,
             street: clients[key].street,
             assignedKey: clients[key].assignedKey,
             employeeKey: clients[key].employeeKey,
             clientTag: clients[key].tag,
             clientKey: key
           }
           clientMarkers.push(marker);
        }

        // find truck location
        const truckList = state.trucks;
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
        //console.log ("reducer");
        //console.log ("SET_EMPLOYEE_VIEW");

        //console.log (timestamp);
        //console.log (repeathours);

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
      //console.log(markers);

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
    /*case actionTypes.SET_CONTRACTS:
           //console.log ("reducer SET_GEOENCODING = " );
           //console.log (action.payload.geoEncoding);
            return {
                     ...state,
                     contracts: action.payload.contracts
        };*/
    /*case actionTypes.SET_PAYMENTS:
            return {
                    ...state,
                    payments: action.payload.payments
        };*/
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

/*    case actionTypes.SET_DELIVERYS:
     //console.log (action.payload.deliverys);
            return {
                    ...state,
                    deliverys: action.payload.deliverys
      };*/
    /*case actionTypes.SET_TRUCKS:
       const trucks = action.payload.trucks;
       let truckMarkers = [];

       for (var key in trucks) {
          if (trucks[key].assigned && trucks[key].assigned === true) {

             const marker = {
                 pos:
                 {
                    lat: trucks[key].latitude,
                    lng: trucks[key].longitude
                 },
                 name: trucks[key].model,
                 id:  key,
                 status: JOB_NEW,
                 type: TRUCK_MARKER
             }
            truckMarkers.push(marker);
          }
        }

        const markers = state.markers;

        return {
                  ...state,
                  trucks: action.payload.trucks,
                  markers: markers.concat(truckMarkers),
      };*/
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
         const assignedClients = state.clientList;
         //const selectedtimestamp = state.timestamp;
         const selectedrepeathours = state.repeathours;
         const date1 = new Date();
         // timestamp in second
         const selectedtimestamp = Math.round(date1.getTime()/1000 + 0.5);
         //const selectedtimestamp = 100;
         //console.log ("reducer");
         //console.log ("SET_SELECTED_EMPLOYEE");

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

             const assignedClient = assignedClients[assignedJobs[key].clientKey];
             const repeattime = assignedClient.repeattime;
             const lastservicetime = assignedClient.lastservicetime;
             const repeatseconds = selectedrepeathours * 60 * 60;
             let status = JOB_NEW;

             // case 1: it is a new client
             if (!repeattime && !lastservicetime) {
                 status = JOB_NEW;
              // case 2: it is a one time job
             } else if (repeatseconds === 0) {
                 if (!repeattime && lastservicetime) {
                     status = JOB_DONE;
                 } else if (repeattime && !lastservicetime) {
                     status = JOB_REPEAT;
                 } else if (repeattime && lastservicetime && lastservicetime>repeattime) {
                    status = JOB_DONE;
                 } else {
                    status = JOB_REPEAT;
                 }
             }
             // case 3: should not happen, no service record, but repeat button pressed
             // by accident
             else if (repeattime && !lastservicetime){
                 const remainingseconds = repeatseconds - (selectedtimestamp - repeattime);
                 if (remainingseconds < 5 ) {
                     status = JOB_NEW;
                 } else {
                     status = JOB_REPEAT;
                 }
             }
             // case 4: repeat button pressed after being serviced
             else if (repeattime && lastservicetime && repeattime>lastservicetime ){
                 const remainingseconds = repeatseconds - (selectedtimestamp - repeattime);
                 if (remainingseconds < 5 ) {
                     status = JOB_NEW;
                 } else {
                     status = JOB_REPEAT;
                 }
             }
             // case 5: no repeat button pressed after being serviced
             else if (repeattime && lastservicetime && repeattime<lastservicetime ){
                  const remainingseconds = repeatseconds - (selectedtimestamp - lastservicetime);
                  // 20 minutes before delivery time, it is a JOB_DONE
                  if (remainingseconds > 60 * 20 ) {
                      status = JOB_DONE;
                  }
                  // between 20 minutes and 5 seconds, a job need to be repeated soon
                  else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                     status = JOB_SOON
                  }
                  // it is a job to be done asap
                  else {
                      status = JOB_NEW;
                  }
             }
             // case 6: repeat button never pressed
             else if (!repeattime && lastservicetime) {
                  const remainingseconds = repeatseconds - (selectedtimestamp - lastservicetime);
                  // 20 minutes before delivery time, it is a JOB_DONE
                  if (remainingseconds > 60 * 20 ) {
                      status = JOB_DONE;
                  }
                  // between 20 minutes and 5 seconds, a job need to be repeated soon
                  else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                      status = JOB_SOON
                  }
                  // it is a job to be done asap
                  else {
                      status = JOB_NEW;
                  }
             }
             // should not come
             else {
                  console.log("should bot come here");
                  status = JOB_NEW;
             }


             const assignedMarker = {
                 pos:
                 {
                    lat: assignedJobs[key].clientLat,
                    lng: assignedJobs[key].clientLng
                 },
                 name: assignedJobs[key].clientName,
                 id:  assignedJobs[key].assignedKey,
                 status: status,
                 street: assignedJobs[key].clientStreet,
                 type: CLIENT_MARKER,
                 isAssigned: true,
                 employeeName: selectedEmployee.name,
                 assignedKey: assignedJobs[key].assignedKey,
                 employeeKey: assignedJobs[key].employeeKey,
                 clientKey: assignedJobs[key].clientKey,
                 clientTag: assignedClient.tag,
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
      };
case actionTypes.SET_UNASSIGNED_CLIENTS:
     //console.log ("reducer");
     //console.log ("SET_UNASSIGNED_CLIENTS");

     const allclients = state.clientList;
     //const alltimestamp = state.timestamp;
     const allrepeathours = state.repeathours;
     const date2 = new Date();
     // timestamp in second
     const alltimestamp = Math.round(date2.getTime()/1000 + 0.5);
     //const alltimestamp = 1000;
     //console.log (alltimestamp);
     //console.log (allrepeathours);

     let unClientMarkers = [];

     for (var key in allclients) {
       if (!allclients[key].isAssigned) {

            const repeattime = allclients[key].repeattime;
            const lastservicetime = allclients[key].lastservicetime;
            const repeatseconds = allrepeathours * 60 * 60;
            let status = JOB_NEW;

            // case 1: it is a new client
            if (!repeattime && !lastservicetime) {
                status = JOB_NEW;
             // case 2: it is a one time job
            } else if (repeatseconds === 0) {
                if (!repeattime && lastservicetime) {
                    status = JOB_DONE;
                } else if (repeattime && !lastservicetime) {
                    status = JOB_REPEAT;
                } else if (repeattime && lastservicetime && lastservicetime>repeattime) {
                   status = JOB_DONE;
                } else {
                   status = JOB_REPEAT;
                }
            }
            // case 3: should not happen, no service record, but repeat button pressed
            // by accident
            else if (repeattime && !lastservicetime){
                const remainingseconds = repeatseconds - (alltimestamp - repeattime);
                if (remainingseconds < 5 ) {
                    status = JOB_NEW;
                } else {
                    status = JOB_REPEAT;
                }
            }
            // case 4: repeat button pressed after being serviced
            else if (repeattime && lastservicetime && repeattime>lastservicetime ){
                const remainingseconds = repeatseconds - (alltimestamp - repeattime);
                if (remainingseconds < 5 ) {
                    status = JOB_NEW;
                } else {
                    status = JOB_REPEAT;
                }
            }
            // case 5: no repeat button pressed after being serviced
            else if (repeattime && lastservicetime && repeattime<lastservicetime ){
                 const remainingseconds = repeatseconds - (alltimestamp - lastservicetime);
                 // 20 minutes before delivery time, it is a JOB_DONE
                 if (remainingseconds > 60 * 20 ) {
                     status = JOB_DONE;
                 }
                 // between 20 minutes and 5 seconds, a job need to be repeated soon
                 else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                    status = JOB_SOON
                 }
                 // it is a job to be done asap
                 else {
                     status = JOB_NEW;
                 }
            }
            // case 6: repeat button never pressed
            else if (!repeattime && lastservicetime) {
                 const remainingseconds = repeatseconds - (alltimestamp - lastservicetime);
                 // 20 minutes before delivery time, it is a JOB_DONE
                 if (remainingseconds > 60 * 20 ) {
                     status = JOB_DONE;
                 }
                 // between 20 minutes and 5 seconds, a job need to be repeated soon
                 else if (remainingseconds <= 60*20 && remainingseconds > 5) {
                     status = JOB_SOON
                 }
                 // it is a job to be done asap
                 else {
                     status = JOB_NEW;
                 }
            }
            // should not come
            else {
                 console.log("should bot come here");
                 status = JOB_NEW;
            }



            const marker = {
            pos:
            {
               lat: allclients[key].lat,
               lng: allclients[key].lng
            },
            name: allclients[key].name,
            street: allclients[key].street,
            city: allclients[key].city,
            postcode: allclients[key].postcode,
            lat: allclients[key].lat,
            lng: allclients[key].lng,
            clientTag: allclients[key].tag,
            clientKey: key,
            id:  key,
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

  case actionTypes.SET_ACTIVE_ORDER_ID:
     return {
            ...state,
            activeOrderId: action.payload.activeId
     };

  case actionTypes.SET_ACTIVE_ORDER_KEY:
        return {
            ...state,
            activeOrderKey: action.payload.activeKey
    };

  case actionTypes.SET_ACTIVE_CONTRACT_ID:
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
    };

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
