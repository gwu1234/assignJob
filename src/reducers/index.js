import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const GEOCODING_DONE = 1;
//const GEOCODING_RENEWED = 2;

const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;

const LEAD_POSITIVE = 1;  // green
const LEAD_RESPONSIVE = 2; // blue
const LEAD_NEW = 3;  // red
const LEAD_NOT_RESPONSIVE = 4; // orange
const LEAD_DECLINE = 5; // yellow

const EMPLOYEE_MARKER = 0;
const CLIENT_MARKER = 1;
const TRUCK_MARKER = 2 ;
const LEAD_MARKER = 3;
const HUMAN_MARKER = 4;


const CURRENT = 0;
const PAST = 1;

const initialUserState = {
  currentUser: null, // user object
  isLoading: true,
  admin: false,
  usertag: null,
  clienttag: null,
  //userContact: null,
  employeeList: null,
  clientList: null,
  leads: null,
  mapView: false,
  geoEncoding: GEOCODING_DONE,
  markers: [],
  truckMarkers: [],
  employeeMarkers:[],
  humanMarkers:[],
  leadMarkers:[],
  selectedEmployee: null,
  french: false,
  badAccess: false,
  companyInfoView: false,
  assignedEmployeeView: false,
  clientView: false,
  clientContactView: false,
  reposData: null,
  leadView: false,
  leadTag: null,
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
        let leads = {};

        if (reposData) {
            dataList = reposData["clients"]["data"];
            for (var key in dataList) {
               let contact = dataList[key]["contact"];
               contact = {...contact, tag: key, clientTag: key};
               //console.log (contact) ;
               clientList = {...clientList, [key]: contact}
            }
            leads = dataList = reposData["leads"];
        }
        return {
           ...state,
           clientList: clientList,
           leads: leads,
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
    case actionTypes.SET_LEAD_TAG:
        return {
          ...state,
          leadTag: action.payload.leadTag
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
        leadView: false,
    };

case actionTypes.SET_ASSIGNED_EMPLOYEE_VIEW:
    return {
    ...state,
    companyInfoView: false,
    clientView: false,
    clientContactView: false,
    mapView: false,
    leadView: false,
    assignedEmployeeView: action.payload.view,
};
    case actionTypes.SET_MAP_VIEW:
         const clients = state.clientList;
         const clientData = state.reposData["clients"]["data"];

         let clientMarkers = [];
         //let orders = [];
         for (var clientKey in clients) {
           let status = JOB_NOT_ACTIVE;
           const {workorders, deliverys} = clientData[clientKey];

           let statusArray = [];
           let activeOrders = 0;
           let deliveryTimes = 0;
           let orders = [];
           for (var orderKey in workorders) {
              let {isActive,isRepeat,repeatTimes} = workorders[orderKey];
              //statusArray = [];
              //activeOrders = 0;

              isActive = (isActive && isActive === "true")? true:false;
              isRepeat = (isRepeat && isRepeat === "true")? true:false;
              //repeatTimes = repeatTimes? parseInt(repeatTimes, 10) : 0;
              repeatTimes = repeatTimes? (repeatTimes !== "undefined" ?
                                           parseInt(repeatTimes, 10): 0) : 0;
              //deliveryTimes = deliveryTimes? parseInt(deliveryTimes, 10) : 0;

              // need to calculate deliveryTimes
              //console.log(orderKey);
              deliveryTimes = 0;
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
              let theStatus = JOB_NOT_ACTIVE;
              if (isActive) {
                  if (!isRepeat && deliveryTimes > 0) {
                     //status = JOB_DONE;
                     statusArray.push(JOB_DONE);
                     theStatus = JOB_DONE;
                  } else if (!isRepeat && deliveryTimes === 0) {
                     //status = JOB_DONE;
                     statusArray.push(JOB_NEW);
                     theStatus = JOB_NEW;
                  }
                  else if (isRepeat && repeatTimes === 0 && deliveryTimes === 0) {
                     statusArray.push(JOB_DONE);
                     theStatus = JOB_DONE;
                  }
                  else if (isRepeat && repeatTimes === 0 && deliveryTimes > 0) {
                     statusArray.push(JOB_PROGRESS);
                     theStatus = JOB_PROGRESS;
                  } else if (isRepeat && repeatTimes !== 0 && deliveryTimes === 0) {
                     statusArray.push(JOB_NEW);
                     theStatus = JOB_NEW;
                  }
                  else if (isRepeat && repeatTimes !== 0 && deliveryTimes !== 0 && repeatTimes <= deliveryTimes) {
                     statusArray.push(JOB_DONE);
                     theStatus = JOB_DONE;
                  } else if (isRepeat && repeatTimes !== 0 && repeatTimes > deliveryTimes) {
                     statusArray.push(JOB_PROGRESS);
                     theStatus = JOB_PROGRESS;
                  }
                  else {
                    statusArray.push(JOB_NEW);
                    theStatus = JOB_NEW;
                  }
                  activeOrders ++;
                  //orders.push (workorders[orderKey]);
                  orders.push ({...workorders[orderKey], orderStatus: theStatus});
              }
           }

           if (statusArray.length > 0) {
              status = statusArray[0];
              //console.log(statusArray.length);
           }

           var i= 0;
           for (i = 0; i < statusArray.length; i++) {
               status = status <= statusArray[i]? status: statusArray[i];
               //console.log(status);
               //console.log(statusArray[i]);
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
               street: clients[clientKey].street,
               city: clients[clientKey].city,
               clientTag: clients[clientKey].clientTag,
               clientKey: clientKey,
               activeOrdersNumber: activeOrders,
               activeOrders: orders,
               type: CLIENT_MARKER,
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

              const currentTimestamp = Date.now();
              const fiveMinute = 5 * 60 * 1000; // millisecond
              const timeStatus = ((currentTimestamp - timestamp) > fiveMinute) ?
                                 PAST : CURRENT;
              //const timeStatus = CURRENT;

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
                  timeStatus: timeStatus,
                  id:  key,
                  type: TRUCK_MARKER,
              }
             truckMarker.push(marker);
           }
         }

         const employeeList = state.employeeList;
         let humanMarker = [];

         for (var key in employeeList) {
            if (!employeeList[key].truckAssigned || employeeList[key].truckAssigned ==="false") {
               const {currentLocation} = employeeList[key];

               if (currentLocation) {
                   const timestamp = currentLocation.timestamp;
                   dateString = (new Date(timestamp)).toLocaleString();
                   const currentTimestamp = Date.now();
                   const fiveMinute = 5 * 60 * 1000; // millisecond
                   const timeStatus = ((currentTimestamp - timestamp) > fiveMinute) ?
                                  PAST : CURRENT;
                   //const timeStatus = CURRENT;

                   const marker = {
                      pos:
                      {
                         lat: currentLocation.lat,
                         lng: currentLocation.lng
                      },
                      employeeName: employeeList[key].name,
                      dateString: dateString,
                      timeStatus: timeStatus,
                      id:  key,
                      type: HUMAN_MARKER,
                  }
                  humanMarker.push(marker);
              }
            }
          }

        return {
            ...state,
           markers: clientMarkers,
           truckMarkers: truckMarker,
           employeeMarkers:[],
           leadMarkers:[],
           humanMarkers: humanMarker,
           mapView: true,
           clientContactView: false,
           clientView: false,
           companyInfoView: false,
           leadView: false,
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
                street: employees[key].street,
                city: employees[key].city,
                id:  key,

                type: EMPLOYEE_MARKER
            }
            //console.log(marker);
           employeeMarkers.push(marker);
      }

      return {
          ...state,
         employeeMarkers: employeeMarkers,
         markers:[],
         leadMarkers:[],
         mapView: true,
         clientContactView: false,
         clientView: false,
         companyInfoView: false,
         leadView: false,
    };

    case actionTypes.SET_LEAD_MAPVIEW:
        const leadList = state.leads;
        let leadMarkers = [];

        for (var key in leadList) {
            //let status = LEAD_NEW;
            let {contact} = leadList[key];

            if (contact && contact.lat && contact.lng) {
                let name = contact.name;
                if (!name || name === "undefined") {
                   name = null;
                }

                let street = contact.street;
                if (!street || street === "undefined") {
                    street = null;
                }

                let status = contact.status;
                if (!status || status === "undefined" || status === undefined) {
                    let status = LEAD_NEW;;
                }

                let city = contact.city;
                if (!city || city === "undefined") {
                    city = null;
                }

                let postcode = contact.postcode;
                if (!postcode || postcode === "undefined") {
                    postcode = null;
                }

                let phone = null;
                if (contact.phones && contact.phones !== "undefined" && contact.phones.length > 0) {
                    phone = contact.phones[0];
                }

                let cell = null;
                if (contact.cells && contact.cells !== "undefined" && contact.cells.length > 0) {
                    cell = contact.cells[0];
                }

                let email = null;
                if (contact.emails && contact.emails !== "undefined" && contact.emails.length > 0) {
                    email = contact.emails[0];
                }

                const marker = {
                   pos:
                   {
                     lat: contact.lat,
                     lng: contact.lng
                   },
                   name: name,
                   status: status,
                   street: street,
                   city: city,
                   postcode: postcode,
                   phone: phone,
                   cell: cell,
                   email: email,
                   type: LEAD_MARKER
                }
                //console.log(marker);
                leadMarkers.push(marker);
           }
      }

      //console.log(leadMarkers);

      return {
          ...state,
         leadMarkers: leadMarkers,
         employeeMarkers: [],
         markers:[],
         mapView: true,
         clientContactView: false,
         clientView: false,
         companyInfoView: false,
         leadView: false,
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
         leadView: false,
    };
    case actionTypes.SET_LEAD_VIEW:
      return {
          ...state,
          mapView: false,
          clientContactView: false,
          clientView: false,
          companyInfoView: false,
          leadView: true,
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
                    leadView: false,
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
                    leadView: false,
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
         //console.log (selectedEmployee);

         let marker4Employee = [];
         let selectedMarkers = [];
         const employeeMarker = {
             pos:
             {
                lat: selectedEmployee.lat,
                lng: selectedEmployee.lng
             },
             name: selectedEmployee.name,
             street: selectedEmployee.street,
             city: selectedEmployee.city,
             id:  selectedEmployee.tag,
             type: EMPLOYEE_MARKER
         }
         //console.log(employeeMarker);
         marker4Employee.push(employeeMarker);

         //const assignedJobs = selectedEmployee.assigned;
         const assignedOrders = selectedEmployee.assignedOrders;
         let employeeKeyList = [];
         let clientKeyList = [];
         let usertag = "1";
         let clientAssigned  = {};

         for (var assignedkey in assignedOrders) {
            usertag = assignedOrders[assignedkey].usertag;
            employeeKeyList.push (assignedOrders[assignedkey].employeeKey);
            clientKeyList.push (assignedOrders[assignedkey].clientKey);
         }

         clientList = state.reposData["clients"]["data"];
         for (var clientkey in clientList) {
            if (clientKeyList.includes(clientkey)) {
                //let clientAssigned  = {};
                clientAssigned[clientkey] = {};
                let contact = clientList[clientkey].contact;
                clientAssigned[clientkey]["city"] = contact["city"];
                clientAssigned[clientkey]["clientKey"] = contact["clientTag"] || contact["tag"];
                clientAssigned[clientkey]["country"] = contact["country"];
                clientAssigned[clientkey]["cells"] = contact["cells"];
                clientAssigned[clientkey]["emails"] = contact["emails"];
                clientAssigned[clientkey]["firstname"] = contact["firstname"];
                clientAssigned[clientkey]["lastname"] = contact["lastname"];
                clientAssigned[clientkey]["lat"] = contact["lat"];
                clientAssigned[clientkey]["lng"] = contact["lng"];
                clientAssigned[clientkey]["name"] = contact["name"];
                clientAssigned[clientkey]["phones"] = contact["phones"];
                clientAssigned[clientkey]["postcode"] = contact["postcode"];
                clientAssigned[clientkey]["street"] = contact["street"];
                let workorders = clientList[clientkey].workorders;
                let deliverys = clientList[clientkey].deliverys;
                let orderAssigned  = {};
                let activeOrders = 0 ;
                for (var orderkey in workorders) {
                    let assignedEmployees = workorders[orderkey].assignedEmployees;
                    for (var employeekey in assignedEmployees) {
                        let coworkers = {};
                        if (employeeKeyList.includes(employeekey)) {
                            const { clientKey, employeeKey, employeeName, orderId,
                                 orderKey, usertag } = assignedEmployees[employeekey];

                            const {deliveryTimes,isActive,isRepeat,repeatTimes,work, photo} = workorders[orderkey];
                            activeOrders ++;

                            orderAssigned[orderkey] = {
                                   clientKey: clientKey,
                                   employeeKey: employeeKey,
                                   employeeName: employeeName,
                                   orderId: orderId,
                                   orderKey: orderKey,
                                   usertag: usertag,
                                   deliveryTimes: deliveryTimes,
                                   isActive: isActive,
                                   isRepeat: isRepeat,
                                   repeatTimes: repeatTimes,
                                   work: work,
                                   photo: photo
                            };
                            orderAssigned[orderkey]["coworkers"] = {
                                 ...assignedEmployees,
                                 [employeekey]: null,
                            };

                            let delivery4order = {};
                            for (var deliverykey in deliverys) {
                                if (deliverys[deliverykey].linkedOrderKey === orderkey) {
                                     delivery4order[deliverykey] = deliverys[deliverykey];
                                }
                            }
                            orderAssigned[orderkey]["deliverys"] = delivery4order;
                        }
                    }
                }

               clientAssigned[clientkey]["workorders"] = orderAssigned;
               clientAssigned[clientkey]["activeOrders"] = activeOrders;
             }
          }

          //console.log(clientAssigned)

         for (var akey in clientAssigned) {

                  const {lat, lng, name, clientTag, clientKey, street, city, workorders} = clientAssigned[akey];

                  let statusArray = [];
                  let activeOrder= 0;
                  let status = 0;
                  let orders = [];

                  for (var orderKey in workorders) {
                        //console.log(orderKey);
                        //console.log(workorders[orderKey]);
                      let {isActive,isRepeat,repeatTimes, previousDelivery, presentDelivery, deliverys} = workorders[orderKey];
                         //statusArray = [];
                         //activeOrder= 0;
                         //let orders = [];

                      isActive = (isActive && isActive === "true")? true:false;
                      isRepeat = (isRepeat && isRepeat === "true")? true:false;
                      //console.log("isActive = " + isActive);
                      //console.log("isRepeat = " + isRepeat);
                      repeatTimes = repeatTimes? (repeatTimes !== "undefined" ?
                                              parseInt(repeatTimes, 10): 0) : 0;
                      //console.log("repeatTimes = " + repeatTimes);
                      //previousDelivery = previousDelivery? (previousDelivery!== "undefined" ?
                      //                        parseInt(previousDelivery, 10): 0) : 0;
                      //console.log("previousDelivery = " + previousDelivery);
                      //presentDelivery = presentDelivery? (presentDelivery !== "undefined" ?
                      //                        parseInt(presentDelivery, 10): 0) : 0;
                      //console.log("presentDelivery = " + presentDelivery);
                      let deliveryTimes = 0;
                      //console.log("deliveryTimes = " + deliveryTimes);

                      for (var deliverykey in deliverys) {
                           deliveryTimes ++;
                      }

                      let status = JOB_NEW;
                      if (!isRepeat && deliveryTimes > 0) {
                           status = JOB_DONE;
                           statusArray.push(status);
                      } else if (isRepeat && repeatTimes === 0 && deliveryTimes === 0) {
                          //statusArray.push(JOB_PROGRESS);
                          status = JOB_NEW;
                          statusArray.push(status);
                      } else if (isRepeat && repeatTimes === 0 && deliveryTimes > 0) {
                          //statusArray.push(JOB_PROGRESS);
                          status = JOB_DONE;
                          statusArray.push(status);
                      }
                       else if (isRepeat && repeatTimes !== 0 && deliveryTimes === 0) {
                          statusArray.push(JOB_NEW);
                          statusArray.push(status);
                      }
                      else if (isRepeat && repeatTimes !== 0 && deliveryTimes !== 0 && repeatTimes <= deliveryTimes) {
                         //statusArray.push(JOB_DONE);
                         status = JOB_DONE;
                         statusArray.push(status);
                      } else if (isRepeat && repeatTimes !== 0 && deliveryTimes !== 0 && repeatTimes > deliveryTimes) {
                         //statusArray.push(JOB_PROGRESS);
                         status = JOB_PROGRESS;
                         statusArray.push(status);
                      }
                      else {
                          statusArray.push(JOB_NEW);
                          status = JOB_NEW;
                          statusArray.push(status);
                      }
                          activeOrder ++;
                          orders.push ({...workorders[orderKey], orderStatus: status});
                      }

            if (statusArray.length > 0) {
                         status = statusArray[0];
                        //console.log("status Array length = " + statusArray.length);
            }

            var i= 0;
            for (i = 0; i < statusArray.length; i++) {
                         status = status <= statusArray[i]? status: statusArray[i];
                        //console.log("status = " + status);
                         //console.log("status = "  + statusArray[i]);
            }

                    //let status = JOB_NEW;

            const assignedMarker = {
                   pos:
                   {
                     lat: lat,
                     lng: lng
                   },
                   name: name,
                   id:  key,
                   status: status,
                   street: street,
                   type: CLIENT_MARKER,
                   isAssigned: true,
                   employeeName: selectedEmployee.name,
                   city: city,
                   clientTag: clientTag,
                   clientKey: clientKey,
                   activeOrdersNumber: activeOrder,
                   activeOrders: orders,
                   type: CLIENT_MARKER,
             }

                   //console.log("assignedMarker = " );
                   //console.log(assignedMarker) ;
             selectedMarkers.push(assignedMarker);
     }
     return {
             ...state,
             markers: selectedMarkers,
             employeeMarkers: marker4Employee,
             clientContactView: false,
             clientView: false,
             mapView: true,
             companyInfoView: false,
             leadView: false,
             truckMarkers:[],
             leadMarkers:[],
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
           //let statusArray = [];
           //let activeOrders = 0;
           let deliveryTimes = 0;
           let orders = [];
           // step 1: find active workorders for this clients
           for (var workKey in workorders) {
              let {isActive, isRepeat, repeatTimes, assignedEmployees} = workorders[workKey];
              isActive = isActive? (isActive === "true"? true: false) : false;
              isRepeat = isRepeat? (isRepeat === "true"? true: false) : false;
              repeatTimes = repeatTimes? (repeatTimes !== "undefined" ?
                                           parseInt(repeatTimes, 10): 0) : 0;
              //isEmployeeAssigned = isEmployeeAssigned? (isEmployeeAssigned === "true"? true: false) : false;
              const employeeAssigned = ( assignedEmployees === null ||
                                         assignedEmployees === undefined ||
                                         assignedEmployees === "undefined")? false: true ;
              // ignore not active work orders and ignore assigned order
              if (!isActive || employeeAssigned) {
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

              let orderStatus = JOB_NEW;
              if (!isRepeat && deliveryTimes > 0) {
                 orderStatus = JOB_DONE;
                 statusArray.push(orderStatus);
              } else if (isRepeat && repeatTimes === 0) {
                 //statusArray.push(JOB_NEW);
                 orderStatus = JOB_NEW;
                 statusArray.push(orderStatus);
              } else if (isRepeat && repeatTimes !== 0 && repeatTimes <= deliveryTimes) {
                 //statusArray.push(JOB_DONE);
                 orderStatus = JOB_DONE;
                 statusArray.push(orderStatus);
              } else if (isRepeat && repeatTimes !== 0 && deliveryTimes !== 0 && repeatTimes > deliveryTimes) {
                 //statusArray.push(JOB_PROGRESS);
                 orderStatus = JOB_PROGRESS;
                 statusArray.push(orderStatus);
              }
              else if (isRepeat && repeatTimes !== 0 && deliveryTimes === 0) {
                 statusArray.push(JOB_NEW);
                 orderStatus = JOB_NEW;
              }
              else {
                //statusArray.push(JOB_NEW);
                orderStatus = JOB_NEW;
                statusArray.push(orderStatus);
              }

              orders.push ({...workorders[workKey], orderStatus: orderStatus});
           }

           // step 4, if this client has active workorders, save to array
          if (activeOrderAccount) {
              status = statusArray[0];

              for (var i=0; i < activeOrderAccount; i++) {
                 status = status <= statusArray[i]? status: statusArray[i];
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
                type: CLIENT_MARKER,
                activeOrdersNumber: activeOrderAccount,
                activeOrders: orders,
             }
             unClientMarkers.push(marker);
        }
    }


    return {
        ...state,
       markers: unClientMarkers,
       employeeMarkers:[],
       truckMarkers:[],
       leadMarkers:[],
       clientContactView: false,
       clientView: false,
       mapView: true,
       companyInfoView: false,
       leadView: false,
  };

    default:
      return state;
  }
};


/*const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer
});*/

const rootReducer = combineReducers({
  user: user_reducer

});

export default rootReducer;
