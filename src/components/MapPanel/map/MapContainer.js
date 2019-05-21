import React, { Component, View, Text } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
//import { GiCircle } from "react-icons/gi";
import { connect } from "react-redux";
import firebase from "../../../firebase";
import CurrentLocation from './Map';
import InfoWindowEx from './InfoWindowEx'
import redDot from '../images/redDot.png';
import blueDot from '../images/blueDot.png';
import greenDot from '../images/greenDot.png';
import yellowDot from '../images/yellowDot2.png';
import redStar from '../images/redStar.png';
import snowplow from '../images/snowplow.png';
import DoneModal from  './DoneModal';
import RepeatModal from  './RepeatModal';
import MapUnassignModal from './MapUnassign';
import MapAssignModal from './MapAssign';
import {Button, Icon, Dropdown, Header, Menu} from 'semantic-ui-react';
//import svgMarker from './svgMarker';

const JOB_NOT_ACTIVE = 0;
const JOB_NEW = 1;
const JOB_ASSIGNED = 2;
const JOB_PROGRESS = 3;
const JOB_DONE = 4;

const EMPLOYEE_MARKER = 0;
const CLIENT_MARKER = 1;
const TRUCK_MARKER = 2 ;

/*const svgRedDot = {
   url: 'data:image/svg+xml;utf8,\
         <svg xmlns="http://www.w3.org/2000/svg">\
         <g> \
         <circle cx="8" cy="8" r="6" fill="red" stroke="red" stroke-width="1" />\
         <text x="5" y="10" fill="white" font-weight="normal" textlength="3">1</text>\
         </g>\
         </svg>',
   anchor: { x: 0, y: 0 },
};

const icon = {
    path: 'M 00 00 L 10 00 L 5 10 z',
    fillColor: 'red',
    strokeColor: 'blue',
    strokeWidth: 3,
    anchor: { x: 0, y: 0 },
  };*/



class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
       showingInfoWindow: false,
       showingGwindow: false,
       activeMarker: {},
       selectedPlace: {},
       selectedLatLng: {},
       //selectedAddress_string: '',
       //selectedAddress_components: {},
       selectedStreet: '',
       selectedCity: '',
       selectedProvince: '',
       selectedCountry: '',
       selectedPostcode: '',
       selectedLat: '',
       selectedLng: '',
    }
  }

  onMarkerClick = (props, marker, e) =>{
    //console.log("onMarkerClick");
    //console.log(marker);
    //console.log (props);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      //selectedLatLng: marker.pos,
      showingGwindow: false,
      //selectedAddress_string: '',
      //selectedAddress_components: {},
    });
  }

 /*workIsDone = (props, marker, e) =>{
   //console.log("at MapContainer workIsDone");
   //console.log(this.state.activeMarker.clientKey);
   //console.log(this.state.activeMarker.name);
   //console.log(marker);

   const {usertag, markers} = this.props;
   const {activeMarker} = this.state;
   //const {markers, activeMarker} = this.state;
   const date = new Date();
   // timestamp in second
   const timestamp = Math.round(date.getTime()/1000 + 0.5);
   const localtime = date.toLocaleString();

    var  equalPos = markers.findIndex((element, index) =>
     (
        index === this.state.activeMarker.id
     ));

    //console.log(this.state.activeMarker.name);
    //console.log(this.state.activeMarker.clientKey);
    if (equalPos >= 0) {
        markers[equalPos].status = JOB_DONE;
    }

    //console.log("equalPos = ");
    //console.log(equalPos);

    this.setState({
       //activeMarker: null,
       //markers: markers,
       showingInfoWindow: false
    });

    /*let statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id + "/status";
    let statusRef = firebase.database().ref(statusTag);

    if (statusRef == null) {
        statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id;
        statusRef = firebase.database().ref(statusTag).child("status").set(2);
    } else {
        statusRef.set(2);
    }*/
    //lastservicetime
    /*let lastTag = "repos/" + usertag + "/clients/tags/" + activeMarker.clientKey + "/lastservicetime";
    let lastRef = firebase.database().ref(lastTag);

    if (lastRef == null) {
        lastTag = "repos/" + usertag + "/clients/tags/" + activeMarker.clientKey;
        lastRef = firebase.database().ref(lastTag).child("lastservicetime").set(timestamp);
    } else {
        lastRef.set(timestamp);
    }
    const delTag = "repos/" + usertag + "/clients/data/" + activeMarker.clientTag + "/deliverys";
    //console.log(delTag);
    const delRef = firebase.database().ref(delTag);
    const delKey = delRef.push().getKey();
    //console.log(delKey);

    const newDelivery = {
      "date": localtime,
      "work": "DONE-" + timestamp,
      "employee": "admin",
      "clientKey": activeMarker.clientKey,
      "clientTag": activeMarker.clientTag,
      "deliveryKey": delKey,
    }
    //console.log (newDelivery);
    delRef.child(delKey).set(newDelivery);


    /*if (delRef == null) {
        delTag = "repos/" + usertag + "/clients/data/" + activeMarker.clientTag + "/deliverys";
        delRef = firebase.database().ref(delTag).child("lastservicetime").set(timestamp);
    } else {
        delRef.set(timestamp);
    }*/
  //}*/

  /*workNotDone = (props, marker, e) =>{
    const {markers} = this.props;
    var  equalPos = markers.findIndex((element, index) =>
      (
        index === this.state.activeMarker.id
      ));

    if (equalPos >= 0) {
      markers[equalPos].status =0;
    }

    this.setState({
       //activeMarker: null,
       markers: markers,
       showingInfoWindow: false
    });
  }*/

   /*workToRepeat = (props, marker, e) =>{
     //const {markers} = this.props;
     const {usertag, markers} = this.props;
     const {activeMarker} = this.state;
     const date = new Date();
     // timestamp in second
     const timestamp = Math.round(date.getTime()/1000 + 0.5);
     const localtime = date.toLocaleString();
     //console.log("at MapContainer workToRepeat");
     //console.log(this.state.activeMarker.clientKey);
     //console.log(this.state.activeMarker.name);
     //console.log(activeMarker.id);
     //console.log(this.props.usertag);
     var  equalPos = markers.findIndex((element, index) =>
       (
         index === this.state.activeMarker.id
       ));

     if (equalPos >= 0) {
       markers[equalPos].status = JOB_PROGRESS;
     }

     this.setState({
        //activeMarker: null,
        //markers: markers,
        showingInfoWindow: false
     });

     let statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id + "/status";
     let statusRef = firebase.database().ref(statusTag);

     if (statusRef == null) {
         statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id;
         statusRef = firebase.database().ref(statusTag).child("status").set(1);
     } else {
         statusRef.set(1);
     }
     let repeatTag = "repos/" + usertag + "/clients/tags/" + activeMarker.clientKey + "/repeattime";
     let repeatRef = firebase.database().ref(repeatTag);

     if (repeatRef == null) {
         repeatTag = "repos/" + usertag + "/clients/tags/" + activeMarker.clientKey;
         repeatRef = firebase.database().ref(repeatTag).child("repeattime").set(1);
     } else {
         repeatRef.set(timestamp);
     }

     const delTag = "repos/" + usertag + "/clients/data/" + activeMarker.clientTag + "/deliverys";
     //console.log(delTag);
     const delRef = firebase.database().ref(delTag);
     const delKey = delRef.push().getKey();
     console.log(delKey);

     const newDelivery = {
       "date": localtime,
       "work": "REPEAT-" + timestamp,
       "employee": "admin",
       "clientKey": activeMarker.clientKey,
       "clientTag": activeMarker.clientTag,
       "deliveryKey": delKey,
     }
     //console.log (newDelivery);
     delRef.child(delKey).set(newDelivery);

   } */

  onClose = () => {
    console.log("onClose()");
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        showingGwindow: false,
      });
    }
  };

  onGclose = () => {
    console.log("onGclose()");
    if (this.state.showingGwindow) {
      console.log("onGclose(): closing");
      this.setState({
        showingInfoWindow: false,
        showingGwindow: false,
      });
    }
  };

  createLead = () => {
    console.log("createLead()");
    const {usertag, markers} = this.props;
    const {selectedStreet, selectedCity, selectedProvince, selectedCountry,
      selectedPostcode, selectedLat, selectedLng} = this.state;

    // check the lead already exist or not
    const {leads} = this.props;
    //console.log(leads);
    for (var key in leads) {
         const {contact} = leads[key];
         if ( (contact.street   === selectedStreet &&
               contact.city     === selectedCity  &&
               contact.province === selectedProvince ) ||
              (contact.street=== selectedStreet &&
               contact.postcode === selectedPostcode ) ) {
              const address = selectedStreet + " " + selectedCity ;
              console.log("address existed already = " + address) ;
              this.onGclose();
              return;
         }
     }

    const date = new Date();
      // timestamp in second
    const timestamp = Math.round(date.getTime()/1000 + 0.5);
    const localtime = date.toLocaleString();

    const leadTag = "repos/" + usertag + "/leads";
    const leadRef = firebase.database().ref(leadTag);
    const leadKey = leadRef.push().getKey();

    const newLead = {
      "date": localtime,
      "timestamp": timestamp ,
      "leadTag": leadKey,
      "street": selectedStreet,
      "city":   selectedCity,
      "province": selectedProvince,
      "country": selectedCountry,
      "postcode": selectedPostcode,
      "lat": selectedLat,
      "lng": selectedLng,
    }
    //console.log (newDelivery);
    leadRef.child(leadKey).child("contact").set(newLead);
    this.onGclose();
  };

  displayActiveOrders = (orders) =>{
     if (orders.length > 0) {
         orders = orders.map(order => {
            return (
                <p>{order.work}</p>
            )
         });
         return orders;
    }
  };

  dropdownOptions = (orders) => {
      const statusList = [
        "JOB_NOT_ACTIVE",
        "JOB_NEW",
        "JOB_ASSIGNED",
        "JOB_PROGRESS",
        "JOB_DONE"
      ];

      let optionArray = [];

      for (var i = 0; i <orders.length; i++ ){
        console.log(orders[i]);
        const displayString = "order id: " + orders[i].orderId
                              + ", order work: " + orders[i].work
                              + ", order status: " + statusList[orders[i].orderStatus];
        optionArray.push({
           key: orders[i].orderKey,
           text: <span style = {styles.dropdownText}> {displayString} </span>,
           value: orders[i].orderId,
        });
      }

      return optionArray;
  }

  displayOrders = (orders) => {
    if (orders.length > 0) {
        orders = orders.map(order => {
            let status = "JOB_NOT_ACTIVE";
            switch(order.orderStatus) {
               case 0:
                  status = "JOB_NOT_ACTIVE";
                  break;
               case 1:
                  status = "JOB_NEW";
                  break;
               case 2:
                  status = "JOB_ASSIGNED";
                  break;
               case 3:
                  status = "JOB_PROGRESS";
                  break;
               case 4:
                  status = "JOB_DONE";
                  break;
               default:
                  status = "not_known";
             }

           return (
               <Menu.Menu style={styles.orderMenuMenu} key={order.orderId}>
               <Menu.Item style={{...styles.orderMenuItem, fontWeight:"bold", fontSize:"1.0em"}}>Id: {order.orderId}</Menu.Item>
               <Menu.Item style={styles.orderMenuItem}>Date: {order.date}</Menu.Item>
               <Menu.Item style={styles.orderMenuItem}>Work: {order.work}</Menu.Item>
               <Menu.Item style={styles.orderMenuItem}>Status: {status}</Menu.Item>
               </Menu.Menu>
           )
        });
        return orders;
    }
  }

  handleDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      const selectedValue = data.value
      console.log( data.value);
      this.setState({
         orderId: selectedValue,
         orderChange: true,
      });
  }

  clickOnMap = (latLng, pa) => {
     //console.log("MapContainer clickOnMap()");
     //console.log("Lat = " + latLng.lat());
     //console.log("Lng = " + latLng.lng());
     //console.log("X = " + pa.x);
     //console.log("Y = " + pa.y);
     this.geocodeLatLng (latLng);
  }

  geocodeLatLng = (latLng) => {

        const google = this.props.google;
        const maps = google.maps;
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({'location': latLng}, (results, status) =>{
          if (status === 'OK') {
            if (results[0]) {
              //console.log(results[0]);
              //console.log(results[0].formatted_address);
              //console.log(latLng);
              const street = results[0].address_components[0].long_name + " "
                          + results[0].address_components[1].long_name;

              const city = results[0].address_components[2].long_name ;
              const province = results[0].address_components[4].long_name ;
              const country = results[0].address_components[5].long_name ;
              const postcode = results[0].address_components[6].long_name ;

              this.setState({
                ...this.state,
                selectedLatLng: latLng,
                //showingInfoWindow: false,
                showingGwindow: true,
                //selectedAddress_string: results[0].formatted_address,
                //selectedAddress_components: results[0].address_components,
                selectedStreet: street,
                selectedCity: city,
                selectedProvince: province,
                selectedCountry: country,
                selectedPostcode: postcode,
                selectedLat: latLng.lat(),
                selectedLng: latLng.lng(),
              });

            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }


    render() {
      const {usertag, employees, markers, truckMarkers, employeeMarkers} = this.props;
      let {selectedLatLng} = this.state.selectedLatLng;

      if (!selectedLatLng) {
        // set a flake lat lng if null
        selectedLatLng = {lat:0.1, lng:0.1};
      }
      //const {markers} = this.state;

      /*const buttonStyle = {
         width: '5em',
         height: '2em',
         margin: '0.2em'
      }*/

      //console.log("at MapContainer : ");
      //console.log (this.state.showingInfoWindow);
      //console.log (this.state.activeMarker);
      //console.log (this.state.selectedPlace);
      //console.log (this.state.activeMarker.name);

      return (
      <CurrentLocation google={this.props.google} centerAroundCurrentLocation clickOnMap = {(latLng, pa)=>this.clickOnMap(latLng, pa)} >
      {markers && markers.map((marker, index)=> {

           let  image = "";
           if (marker.status === JOB_NEW){
               image = redDot;
           }
           else if (marker.status === JOB_PROGRESS)  {
               image = blueDot;
           }
           else if (marker.status === JOB_DONE) {
               image = greenDot;
           }
           else if (marker.status === JOB_NOT_ACTIVE) {
               image = yellowDot;
           }
           else {
               image = redDot;
           }

          return (
                 <Marker
                      key={index}
                      id = {index}
                      //position={{lat: parseFloat(marker.pos.lat), lng: parseFloat(marker.pos.lng)}}
                      position={marker.pos}
                      name = {marker.name}
                      onClick={this.onMarkerClick}
                      clientKey = {marker.clientKey}
                      clientTag = {marker.clientTag}
                      type = {marker.type}
                      clientStreet={marker.street}
                      clientCity={marker.city}
                      clientPostcode={marker.postcode}
                      clientLat={marker.lat}
                      clientLng={marker.lng}
                      activeOrdersNumber = {marker.activeOrdersNumber}
                      activeOrders = {marker.activeOrders}
                      icon = {{
                          url: image,
                          scaledSize: { width: 13, height: 13 }
                      }}
                  >

                 </Marker> )
          })}

          {this.state.selectedPlace.type === CLIENT_MARKER && <InfoWindowEx
                 marker={this.state.activeMarker}
                 visible={this.state.showingInfoWindow}
                 onClose={this.onClose} >
                 <div style={styles.calloutContainer}>
                     <div>
                         <p style={styles.calloutName}>{this.state.selectedPlace.name}</p>
                         <p style={styles.calloutAddress}>
                            {this.state.selectedPlace.clientStreet} , &nbsp;
                            {this.state.selectedPlace.clientCity} </p>
                         <p style={styles.calloutOrder}>active workorders: &nbsp; {this.state.selectedPlace.activeOrdersNumber}</p>
                     </div>

                     {this.state.selectedPlace.activeOrdersNumber > 0 &&
                        <Menu vertical={true} style={styles.orderMenu}>
                              {this.displayOrders(this.state.selectedPlace.activeOrders)}
                       </Menu>}

                     <div style={styles.calloutButtonContainer}>
                          <Button icon size="mini" color="green" onClick={this.onClose}>
                                    <Icon name='cancel' size ="large"/> Close
                          </Button>
                     </div>
                 </div>
          </InfoWindowEx> }

          {employeeMarkers && employeeMarkers.map((marker, index)=> {
              let image = redStar;

              return (
                     <Marker
                          key={index}
                          id = {index}
                          position={marker.pos}
                          name = {marker.name}
                          onClick={this.onMarkerClick}
                          street = {marker.street}
                          type = {marker.type}
                          city={marker.city}
                          employeeLat={marker.pos.lat}
                          employeeLng={marker.pos.lng}
                          icon = {{
                              url: image,
                              scaledSize: { width: 15, height: 15 }
                          }}
                      >

                     </Marker> )
              })}

              {this.state.selectedPlace.type === EMPLOYEE_MARKER && <InfoWindowEx
                     marker={this.state.activeMarker}
                     visible={this.state.showingInfoWindow}
                     onClose={this.onClose} >
                     <div>
                         <div>
                             <p style={styles.calloutName}>{this.state.selectedPlace.name}</p>
                              <span style={styles.calloutAddress}>
                             {this.state.selectedPlace.street} , &nbsp;
                             {this.state.selectedPlace.city} </span>
                         </div>
                         <div style={{marginTop: "2.0em"}}>
                              <Button icon size="mini" color="green" onClick={this.onClose}>
                                  <Icon name='cancel' size ="large"/> Close
                              </Button>
                         </div>
                     </div>
              </InfoWindowEx> }

          {truckMarkers && truckMarkers.map((marker, index)=> {
             let  image = snowplow;
             return (
                   <Marker
                        key={index}
                        id = {index}
                        position={marker.pos}
                        truckModel = {marker.truckModel}
                        truckColor = {marker.truckColor}
                        truckYear = {marker.truckYear}
                        employeeName = {marker.employeeName}
                        dateString = {marker.dateString}
                        onClick={this.onMarkerClick}
                        type = {marker.type}
                        icon = {{
                            url: image,
                            scaledSize: { width: 25, height: 25 }
                        }}
                    >
                   </Marker> )
            })}

            {this.state.selectedPlace.type === TRUCK_MARKER &&
              <InfoWindowEx
                   marker={this.state.activeMarker}
                   visible={this.state.showingInfoWindow}
                   onClose={this.onClose} >
                   <div>
                           <h3>{this.state.selectedPlace.truckModel}</h3>
                           <h5>{"year : " + this.state.selectedPlace.truckYear + ", "
                               +"color : " + this.state.selectedPlace.truckColor }</h5>
                           <h4>{"employee : " + this.state.selectedPlace.employeeName}</h4>
                           <h4>{"last updated  : " + this.state.selectedPlace.dateString}</h4>

                   </div>
            </InfoWindowEx>}


            <InfoWindowEx
                   position={selectedLatLng}
                   visible={this.state.showingGwindow}
                   onClose={this.onGclose} >
                   <div >
                       <div >
                           <p style={styles.calloutName}>{this.state.selectedStreet}</p>
                            <p style={styles.calloutAddress}>
                           {this.state.selectedCity} , &nbsp; {this.state.selectedProvince}</p>
                           <p style={styles.calloutAddress}>{this.state.selectedCountry}, &nbsp;
                           {this.state.selectedPostcode} </p>
                       </div>
                       <div style={{marginTop:"10px",marginBottom:"10px"}}>
                            <Button  style={{width: "100px", height:"40px", marginLeft:"8px"}}icon size="mini" color="green" onClick={this.onGclose}>
                                <Icon name='cancel' size ="large"/> Close
                            </Button>

                            <Button style={{width: "100px", height:"40px", marginLeft:"15px"}} icon size="mini" color="green" onClick={this.createLead}>
                                <Icon name='address card outline' size ="large"/> Create Lead
                            </Button>
                       </div>
                   </div>
            </InfoWindowEx>
      </CurrentLocation>
     )
   }
}

const styles = {
  imageStyle: {
    width: 16,
    height: 16,
  },
  redcircle: {
    width: "1em",
    height: "1em",
    backgroundColor: 'red',
  },
  bluecircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'blue',
  },
  greencircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'green',
  },
  blackcircle: {
    width: 16,
    height: 16,
    borderRadius: 16 / 2,
    backgroundColor: 'green',
    borderWidth: 4,
    borderColor: 'black',
  },
  pinText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 0,
  },
  pin: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
    marginBottom: 0,
  },
  calloutName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: "1.2em",
    color:'black',
    marginBottom: 0,
    marginTop: "2px",
    paddingTop: 0,
    paddingBottom: 0,
  },
  calloutAddress: {
    fontWeight: 'normal',
    textAlign: 'center',
    fontSize: "1.0em",
    color:'black',
    marginBottom: 0,
    marginTop: "3px",
    paddingTop: 0,
    paddingBottom: 0,
  },
  calloutOrder: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: "1.0em",
    color:'black',
    marginBottom: 0,
    marginTop: "5px",
    paddingTop: 0,
    paddingBottom: 0,
  },
  dropdownContainer: {
      width: 200,
      height: 60,
      marginTop: 3,
      marginBottom: 3,
    },
    dropdownText: {
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 13,
      color:'black',
      marginBottom: 0,
      marginTop: 2,
      marginBottom:2,
      paddingTop: 0,
      paddingBottom: 0,
    },
    calloutButtonContainer: {
        marginTop: 5,
      },
  calloutContainer: {
      marginTop: "10px",
      width: "240px",
      height: "230px",
    },
  orderMenu: {
      width:"100%",
      height: "100px",
      position: "relative",
      marginTop:"15px",
      marginLeft:"0px",
      marginRight:"0px",
      marginBottom: "10px",
      overflow: "scroll",
      backgroundColor: "rgb(49, 143, 249,0.1)",
      borderColor: "rgb(49, 143, 249,0.4)",
      borderWidth: "2px",
      borderStyle:"solid",
    },
  orderMenuMenu: {
        width:"100%",
        position: "relative",
        marginLeft:"0px",
        marginRight:"0px",
        paddingTop: "5px",
        paddingBottom:"5px",
        backgroundColor: "rgba(250,250,255,0.1)",
        borderColor: "rgb(49, 143, 249,0.6)",
        borderWidth: "2px",
        borderStyle:"solid",
      },
  orderMenuItem: {
        width:"100%",
        position: "relative",
        marginLeft:"0px",
        marginRight:"0px",
        paddingTop: "1px",
        paddingBottom:"1px",
        color: "black",
        fontWeight:"normal",
        fontSize: "0.9em",
   },
};

const mapStateToProps = state => ({
  markers: state.user.markers,
  truckMarkers: state.user.truckMarkers,
  employeeMarkers: state.user.employeeMarkers,
  usertag: state.user.usertag,
  employees: state.user.employeeList,
  leads: state.user.leads,
});

const WrappedContainer = GoogleApiWrapper({
   apiKey: 'AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE'
})(MapContainer);

export default connect(mapStateToProps,{})(WrappedContainer);

/*icon={{
   url: 'data:image/svg+xml;utf8,\
         <svg xmlns="http://www.w3.org/2000/svg">\
         <g> \
         <circle cx="8" cy="8" r="6" fill="red" stroke="red" stroke-width="1" />\
         <text x="5" y="10" fill="white" font-weight="normal" textlength="3">1</text>\
         </g>\
         </svg>',

   anchor: { x: 0, y: 0 },
}}*/

/*icon = {{
    url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="65" height="20" viewBox="0 0 65 20">\
<g fill-rule="evenodd"> \
<text font-size="8.276" font-weight="bold">\
<tspan x="4" y="13">5</tspan>\
</text>    \
<text font-size="8.276" font-weight="bold">\
<tspan x=".37" y="8">7</tspan>\
</text>\
</g>\
</svg>',
    scaledSize: { width: 65, height: 20}
}}*/
