import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from "react-redux";
import firebase from "../../../firebase";
import CurrentLocation from './Map';
import InfoWindowEx from './InfoWindowEx'
import redDot from '../images/redDot.png';
import blueDot from '../images/blueDot.png';
import greenDot from '../images/greenDot.png';
import DoneModal from  './DoneModal';
import RepeatModal from  './RepeatModal';
import {Button, Icon} from 'semantic-ui-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
       showingInfoWindow: false,
       activeMarker: {},
       selectedPlace: {},
       //markers : [],
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
   console.log(this.state.activeMarker.id);
   //console.log(this.state.activeMarker.name);
   //console.log(marker);

   const {markers, usertag} = this.props;
   const {activeMarker} = this.state;

    var  equalPos = markers.findIndex((element, index) =>
     (
        index === this.state.activeMarker.id
     ));

    if (equalPos >= 0) {
        markers[equalPos].status =2;
    }

    this.setState({
       //activeMarker: null,
       markers: markers,
       showingInfoWindow: false
    });

    let statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id + "/status";
    let statusRef = firebase.database().ref(statusTag);

    if (statusRef == null) {
        statusTag = "repos/" + usertag + "/clients/tags/" + activeMarker.id;
        statusRef = firebase.database().ref(statusTag).child("status").set(2);
    } else {
        statusRef.set(2);
    }
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
     const {markers, usertag} = this.props;
     const {activeMarker} = this.state;
     //console.log("at MapContainer workToRepeat");
     //console.log(this.state.activeMarker.id);
     //console.log(this.state.activeMarker.name);
     //console.log(marker);
     //console.log(this.props.usertag);
     var  equalPos = markers.findIndex((element, index) =>
       (
         index === this.state.activeMarker.id
       ));

     if (equalPos >= 0) {
       markers[equalPos].status = 1;
     }

     this.setState({
        //activeMarker: null,
        markers: markers,
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
    }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        //activeMarker: null,
      });
    }
  };

    render() {
      const {markers} = this.props;
      //const {clients} = this.props;

      const buttonStyle = {
         width: '5em',
         height: '2em',
         margin: '0.2em'
      }

      //console.log("at MapContainer : ");
      //console.log (this.state.showingInfoWindow);
      //console.log (this.state.activeMarker);
      //console.log (this.state.selectedPlace);
      //console.log (this.state.activeMarker.name);

      return (
      <CurrentLocation google={this.props.google} centerAroundCurrentLocation>
        {markers && markers.map((marker, index)=> {
           const status = marker.status;
           //console.log(marker.id);
           var image = redDot;
           if (status === 1)  {
               image = blueDot;
           } else if (status === 2) {
               image = greenDot;
           }

          return (
                 <Marker
                      key={index}
                      id = {marker.id}
                      position={marker.pos}
                      name = {marker.name}
                      onClick={this.onMarkerClick}
                      icon = {{
                          url: image,
                          scaledSize: { width: 20, height: 20 }
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
                     </div>
                         <DoneModal workIsDone={this.workIsDone} clientname ={this.state.activeMarker.name} />
                         <RepeatModal workToRepeat={this.workToRepeat} clientname ={this.state.activeMarker.name} />

                         <Button icon size="mini" color="red" onClick={this.onClose}>
                              <Icon name='cancel' size ="large"/> Cancel
                         </Button>
                 </div>
          </InfoWindowEx>
      </CurrentLocation>
     )
   }
}

const mapStateToProps = state => ({
  markers: state.user.markers,
  usertag: state.user.usertag
});

const WrappedContainer = GoogleApiWrapper({
   apiKey: 'AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE'
})(MapContainer);

export default connect(mapStateToProps,{})(WrappedContainer);
