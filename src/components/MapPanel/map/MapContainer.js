import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
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
import {Button, Icon} from 'semantic-ui-react';

const JOB_NEW = 0;
const JOB_REPEAT = 1;
const JOB_DONE = 2;
const JOB_SOON = 3;

const EMPLOYEE_MARKER = 0;
const TRUCK_MARKER = 2;
//const CLIENT_MARKER = 1;

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       selectedPlace: {},
       //markers : this.props.markers,
    }
  }

  onMarkerClick = (props, marker, e) =>{
    //console.log("onMarkerClick");
    //console.log(marker);
    //console.log (props);

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

 workIsDone = (props, marker, e) =>{
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
    let lastTag = "repos/" + usertag + "/clients/tags/" + activeMarker.clientKey + "/lastservicetime";
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
  }

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

   workToRepeat = (props, marker, e) =>{
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
       markers[equalPos].status = JOB_REPEAT;
     }

     this.setState({
        //activeMarker: null,
        //markers: markers,
        showingInfoWindow: false
     });

     /*let statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id + "/status";
     let statusRef = firebase.database().ref(statusTag);

     if (statusRef == null) {
         statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id;
         statusRef = firebase.database().ref(statusTag).child("status").set(1);
     } else {
         statusRef.set(1);
     }*/
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

    }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        //activeMarker: null,
      });
    }
  };

    render() {
      const {usertag, employees, markers, truckMarkers} = this.props;
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
      <CurrentLocation google={this.props.google} centerAroundCurrentLocation>
        {markers && markers.map((marker, index)=> {

           let  image = "";
           if (marker.type === EMPLOYEE_MARKER) {
               image = redStar;
           }
           else if (marker.status === JOB_NEW){
               image = redDot;
           }
           else if (marker.status === JOB_REPEAT)  {
               image = blueDot;
           }
           else if (marker.status === JOB_DONE) {
               image = greenDot;
           }
           else if (marker.status === JOB_SOON) {
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
                      isAssigned = {marker.isAssigned}
                      employeeName = {marker.employeeName}
                      employeeKey = {marker.employeeKey}
                      assignedKey = {marker.assignedKey}
                      clientKey = {marker.clientKey}
                      clientTag = {marker.clientTag}
                      type = {marker.type}
                      clientStreet={marker.street}
                      clientCity={marker.city}
                      clientPostcode={marker.postcode}
                      clientLat={marker.lat}
                      clientLng={marker.lng}
                      icon = {{
                          url: image,
                          scaledSize: { width: 13, height: 13 }
                      }}
                  >
                 </Marker> )
          })}

          <InfoWindowEx
                 marker={this.state.activeMarker}
                 visible={this.state.showingInfoWindow}
                 onClose={this.onClose} >
                 <div>
                     <div>
                         <h3>{this.state.selectedPlace.name}</h3>
                         {this.state.selectedPlace.street &&
                           <span style={{fontSize:"1.0em", fontStyle:"bold", color:"black"}}> {this.state.selectedPlace.street} </span>}
                         {this.state.selectedPlace.isAssigned &&
                           <h5>employee: &nbsp; {this.state.selectedPlace.employeeName}</h5>}
                     </div>
                     <div>
                         {(this.state.selectedPlace.type !== EMPLOYEE_MARKER) &&
                              <DoneModal workIsDone={this.workIsDone}
                              clientname ={this.state.activeMarker.name} />}
                         {(this.state.selectedPlace.type !== EMPLOYEE_MARKER) &&
                              <RepeatModal workToRepeat={this.workToRepeat}
                              clientname ={this.state.activeMarker.name} /> }
                         {(this.state.selectedPlace.type !== EMPLOYEE_MARKER) &&
                              <Button icon size="mini" color="red" onClick={this.onClose}>
                                  <Icon name='cancel' size ="large"/> Cancel
                              </Button>}
                     </div>
                     <div>
                        {this.state.selectedPlace.isAssigned && <h5> &nbsp;</h5>}
                        {this.state.selectedPlace.isAssigned &&
                            <MapUnassignModal
                                 clientKey={this.state.selectedPlace.clientKey}
                                 clientName={this.state.selectedPlace.name}
                                 assignedKey={this.state.selectedPlace.assignedKey}
                                 employeeKey={this.state.selectedPlace.employeeKey}
                                 employeeName={this.state.selectedPlace.employeeName}
                                 usertag={usertag}
                                 onClose={()=>this.onClose()}
                                 />}
                        {!this.state.selectedPlace.isAssigned && <h5> &nbsp;</h5>}
                        {!this.state.selectedPlace.isAssigned &&
                          this.state.selectedPlace.type !== EMPLOYEE_MARKER &&
                            <MapAssignModal
                                 clientKey={this.state.selectedPlace.clientKey}
                                 clientName={this.state.selectedPlace.name}
                                 clientStreet={this.state.selectedPlace.clientStreet}
                                 clientCity={this.state.selectedPlace.clientCity}
                                 clientPostcode={this.state.selectedPlace.clientPostcode}
                                 clientLat={this.state.selectedPlace.clientLat}
                                 clientLng={this.state.selectedPlace.clientLng}
                                 usertag={usertag}
                                 employees={employees}
                                 onClose={()=>this.onClose()}
                                />}
                     </div>
                 </div>
          </InfoWindowEx>

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

                   </div>
            </InfoWindowEx>}
      </CurrentLocation>
     )
   }
}

const mapStateToProps = state => ({
  markers: state.user.markers,
  truckMarkers: state.user.truckMarkers,
  usertag: state.user.usertag,
  employees: state.user.employeeList,
  //timestamp: state.user.timestamp,
});

const WrappedContainer = GoogleApiWrapper({
   apiKey: 'AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE'
})(MapContainer);

export default connect(mapStateToProps,{})(WrappedContainer);
