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
import orangeDot from '../images/orangeDot.png';
import redStar from '../images/redStar.png';
import snowplow from '../images/snowplow.png';
import blackbulldozer from '../images/blackbulldozer.png';
import human from '../images/human.png';
import blackhuman from '../images/blackhuman.png';
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

const LEAD_POSITIVE = 1;  // green
const LEAD_RESPONSIVE = 2; // blue
const LEAD_NEW = 3;  // red
const LEAD_NOT_RESPONSIVE = 4; // orange
const LEAD_DECLINE = 5; // yellow

const EMPLOYEE_MARKER = 0;
const CLIENT_MARKER = 1;
const TRUCK_MARKER = 2 ;
const LEAD_MARKER = 3 ;
const HUMAN_MARKER = 4;

const CURRENT = 0;
const PAST = 1;

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
    //const { children } = this.props
    //console.log(children);
    //console.log(this.props.initialCenter);

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

       mouseoverPlace: {},
       mouseoverMarker: {},
       showingMouseoverWindow: false,

       currentLocation: {},
    }
  }

  componentDidMount() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
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
      selectedLatLng: marker.pos,
      showingGwindow: false,
      showingMouseoverWindow: false,
      //selectedAddress_string: '',
      //selectedAddress_components: {},
    });
  }

  onMouseoverMarker= (props, marker, e) =>{
    //console.log("onMouseoverMarker");
    //console.log(marker);
    //console.log (props);

    if (!this.state.showingMouseoverWindow) {
    this.setState({
      //selectedPlace: {},
      //activeMarker: {},
      //showingInfoWindow: false,
      //showingGwindow: false,
      mouseoverPlace: props,
      mouseoverMarker: marker,
      showingMouseoverWindow: true,
    });
    }
  }

  onClose = () => {
    console.log("onClose()");
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        //showingGwindow: false,
        //showingMouseoverWindow: false,
      });
    }
  };

  onGclose = () => {
    console.log("onGclose()");
    if (this.state.showingGwindow) {
      console.log("onGclose(): closing");
      this.setState({
        //showingInfoWindow: false,
        showingGwindow: false,
        //showingMouseoverWindow: false,
      });
    }
  };

  onMouseoutMarker =()=> {
    if (this.state.showingMouseoverWindow) {
      console.log("onMouseoutMarker: closing");
      this.setState({
        //showingInfoWindow: false,
        //showingGwindow: false,
        showingMouseoverWindow: false,
      });
    }
  }

  onMclose =()=> {
    if (this.state.showingMouseoverWindow) {
      //console.log("onMclose: closing");
      this.setState({
        showingInfoWindow: false,
        showingGwindow: false,
        showingMouseoverWindow: false,
      });
    }
  }

  createLead = () => {
    //console.log("createLead()");
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
              //console.log("address existed already = " + address) ;
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
        //console.log(orders[i]);
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
      //console.log( data.value);
      this.setState({
         orderId: selectedValue,
         orderChange: true,
      });
  }

  clickOnMap = (latLng, pa) => {
     //console.log("MapContainer clickOnMap()");
     //console.log("Lat = " + latLng.lat());
     //console.log("Lng = " + latLng.lng());
     //console.log("latLng = " );
     //console.log(latLng);

     this.geocodeLatLng (latLng);
  }

  geocodeLatLng = (latLng) => {

        const google = this.props.google;
        const maps = google.maps;
        var geocoder = new google.maps.Geocoder;

        geocoder.geocode({'location': latLng}, (results, status) =>{
          if (status === 'OK') {
            if (results[0] && results[0].address_components &&
                results[0].address_components[0] &&
                results[0].address_components[1] &&
                results[0].address_components[2] &&
                results[0].address_components[4] &&
                results[0].address_components[5] &&
                results[0].address_components[6] ) {
              //console.log(results[0]);
              //console.log(results[0].formatted_address);
              //console.log("geocodeLatLng()");
              //console.log(latLng);
              //console.log("Lat = " + latLng.lat());
              //console.log("Lng = " + latLng.lng());
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
              //window.alert('No results found');
            }
          } else {
            //window.alert('Geocoder failed due to: ' + status);
          }
        });
      }


    render() {
      const {usertag, employees, markers, truckMarkers, humanMarkers, employeeMarkers, leadMarkers} = this.props;
      let {selectedLat, selectedLng, currentLocation} = this.state;

      //console.log(currentLocation);
      let selectedLatLng = null;
      if (selectedLat && selectedLng ) {
           selectedLatLng = {lat: selectedLat, lng: selectedLng} ;
      }

      if (!selectedLatLng && currentLocation && currentLocation.lat && currentLocation.lng) {
           selectedLatLng = {lat: currentLocation.lat, lng: currentLocation.lng};
      }

      //console.log("at MapContainer : ");
      //console.log (leadMarkers);
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
                      onMouseover={this.onMouseoverMarker}
                      onMouseout = {this.onMouseoutMarker}
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

          {this.state.selectedPlace && this.state.selectedPlace.type === CLIENT_MARKER && <InfoWindowEx
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

          {this.state.mouseoverPlace && this.state.mouseoverPlace.type === CLIENT_MARKER && <InfoWindowEx
                 marker={this.state.mouseoverMarker}
                 visible={this.state.showingMouseoverWindow}
                 onClose={this.onMclose} >
                 <div style={styles.mouseoverContainer}>
                     <div>
                         <p style={styles.calloutName}>{this.state.mouseoverPlace.name}</p>
                         <p style={styles.calloutAddress}>
                            {this.state.mouseoverPlace.clientStreet} </p>
                          <p style={styles.calloutAddress}>
                            {this.state.mouseoverPlace.clientCity} </p>
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
                          onMouseover={this.onMouseoverMarker}
                          onMouseout = {this.onMouseoutMarker}
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

              {this.state.mouseoverPlace && this.state.mouseoverPlace.type === EMPLOYEE_MARKER && <InfoWindowEx
                     marker={this.state.mouseoverMarker}
                     visible={this.state.showingMouseoverWindow}
                     onClose={this.onMclose} >
                     <div style={styles.employeeContainer}>
                         <div>
                             <p style={styles.calloutAddress}>{this.state.mouseoverPlace.name}</p>
                         </div>
                     </div>
              </InfoWindowEx> }

              {leadMarkers && leadMarkers.map((marker, index)=> {
                  //let image = redDot;
                  //const LEAD_NEW = 1;  // red
                  //const LEAD_RESPONSIVE = 3; // blue
                  //const LEAD_POSITIVE = 4;  // green
                  //const LEAD_NOT_RESPONSIVE = 5; // orange
                  //const LEAD_DECLINE = 6; // yellow

                  let  image = redDot;
                  if (marker.status === LEAD_NEW){
                      image = redDot;
                  }
                  else if (marker.status === LEAD_RESPONSIVE)  {
                      image = blueDot;
                  }
                  else if (marker.status === LEAD_POSITIVE) {
                      image = greenDot;
                  }
                  else if (marker.status === LEAD_NOT_RESPONSIVE) {
                      image = orangeDot;
                  }
                  else if (marker.status === LEAD_DECLINE) {
                      image = yellowDot;
                  }
                  else {
                      image = redDot;
                  }

                  return (
                         <Marker
                              key={index}
                              id = {index}
                              position={marker.pos}
                              name = {marker.name}
                              onClick={this.onMarkerClick}
                              onMouseover={this.onMouseoverMarker}
                              onMouseout = {this.onMouseoutMarker}
                              street = {marker.street}
                              type = {marker.type}
                              city={marker.city}
                              icon = {{
                                  url: image,
                                  scaledSize: { width: 15, height: 15 }
                              }}
                          >

                         </Marker> )
                  })}

                  {this.state.selectedPlace && this.state.selectedPlace.type === LEAD_MARKER && <InfoWindowEx
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

                  {this.state.mouseoverPlace && this.state.mouseoverPlace.type === LEAD_MARKER && <InfoWindowEx
                         marker={this.state.mouseoverMarker}
                         visible={this.state.showingMouseoverWindow}
                         onClose={this.onMclose} >
                         <div style={styles.leadContainer}>
                             <div>
                                 {this.state.mouseoverPlace.name && <p style={styles.calloutAddress}>{this.state.mouseoverPlace.name}</p>}
                                 <p style={styles.calloutAddress}>{this.state.mouseoverPlace.street}</p>
                                 <p style={styles.calloutAddress}>{this.state.mouseoverPlace.city}</p>
                             </div>
                         </div>
                  </InfoWindowEx> }


          {truckMarkers && truckMarkers.map((marker, index)=> {
             //const CURRENT = 0;
             //const PAST = 1;
             let  image = snowplow;
             let imageWidth = 25;
             let imageHeight = 25;
             if (marker.timeStatus === PAST) {
                 image = blackbulldozer;
                 imageWidth = 30;
                 imageHeight = 30;
             }

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
                            scaledSize: { width: imageWidth, height: imageHeight }
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


            {humanMarkers && humanMarkers.map((marker, index)=> {
               //const CURRENT = 0;
               //const PAST = 1;
               let  image = human;
               let imageWidth = 25;
               let imageHeight = 25;
               if (marker.timeStatus === PAST) {
                   image = blackhuman;
                   imageWidth = 25;
                   imageHeight = 25;
               }

               return (
                     <Marker
                          key={index}
                          id = {index}
                          position={marker.pos}
                          employeeName = {marker.employeeName}
                          dateString = {marker.dateString}
                          onClick={this.onMarkerClick}
                          type = {marker.type}
                          icon = {{
                              url: image,
                              scaledSize: { width: imageWidth, height: imageHeight }
                          }}
                      >
                     </Marker> )
              })}

              {this.state.selectedPlace.type === HUMAN_MARKER &&
                <InfoWindowEx
                     marker={this.state.activeMarker}
                     visible={this.state.showingInfoWindow}
                     onClose={this.onClose} >
                     <div>
                             <h3>{"employee : " + this.state.selectedPlace.employeeName}</h3>
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
  mouseoverContainer: {
      marginTop: "10px",
      width: "150px",
      height: "80px",
  },
  employeeContainer: {
      marginTop: "10px",
      width: "130px",
      height: "50px",
  },
  leadContainer: {
      marginTop: "10px",
      width: "130px",
      height: "80px",
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
  leadMarkers: state.user.leadMarkers,
  humanMarkers: state.user.humanMarkers,
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
