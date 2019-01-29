import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from "react-redux";
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
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

 workIsDone = (props, marker, e) =>{
   const {markers} = this.props;
   var  equalPos = markers.findIndex((element, index) =>
     (
       index === this.state.activeMarker.id
     ));

   if (equalPos >= 0) {
     markers[equalPos].status =2;
   }

   this.setState({
      activeMarker: null,
      markers: markers,
      showingInfoWindow: false
   });
  }

  workNotDone = (props, marker, e) =>{
    const {markers} = this.props;
    var  equalPos = markers.findIndex((element, index) =>
      (
        index === this.state.activeMarker.id
      ));

    if (equalPos >= 0) {
      markers[equalPos].status =0;
    }

    this.setState({
       activeMarker: null,
       markers: markers,
       showingInfoWindow: false
    });
   }

   workToRepeat = (props, marker, e) =>{
     const {markers} = this.props;
     var  equalPos = markers.findIndex((element, index) =>
       (
         index === this.state.activeMarker.id
       ));

     if (equalPos >= 0) {
       markers[equalPos].status = 1;
     }

     this.setState({
        activeMarker: null,
        markers: markers,
        showingInfoWindow: false
     });
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

      console.log("at MapContainer : ");
      console.log (this.state.showingInfoWindow);
      console.log (this.state.activeMarker);
      console.log (this.state.selectedPlace);
      console.log (this.state.activeMarker.name);

      return (
      <CurrentLocation google={this.props.google} centerAroundCurrentLocation>
        {markers && markers.map((marker, index)=> {
           const status = marker.status;

           var image = redDot;
           if (status === 1)  {
               image = blueDot;
           } else if (status === 2) {
               image = greenDot;
           }

          return (
                 <Marker
                      key={index}
                      id = {index}
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
                         <DoneModal clientname ={this.state.activeMarker.name} />
                         <RepeatModal clientname ={this.state.activeMarker.name} />

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
  markers: state.user.markers
});

const WrappedContainer = GoogleApiWrapper({
   apiKey: 'AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE'
})(MapContainer);

export default connect(mapStateToProps,{})(WrappedContainer);
