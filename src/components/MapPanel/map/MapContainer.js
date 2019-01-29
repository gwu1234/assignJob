import React, { Component } from 'react';
import { GoogleApiWrapper, Marker } from 'google-maps-react';
import { connect } from "react-redux";
import CurrentLocation from './Map';
import InfoWindowEx from './InfoWindowEx'
import redDot from '../images/redDot.png';
import blueDot from '../images/blueDot.png';
import greenDot from '../images/greenDot.png';

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

  /*componentDidMount() {
    const {clients} = this.props;
    let markers = [];

    for (var key in clients) {
       const marker = {
         pos:
         {
            lat: clients[key].lat,
            lng: clients[key].lng
         },
         name: clients[key].name,
         id:  key,
         status: 0
       }
       markers.push(marker);
    }
    console.log(markers);

    this.setState({
      ...this.state,
      markers: markers
    });
  }*/

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
        activeMarker: null,
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
                         <button style={{...buttonStyle, backgroundColor:'green', color: 'white'}} onClick={this.workIsDone}>
                              <strong> Done </strong>
                         </button>

                         <button style={{...buttonStyle, backgroundColor:'red', color: 'white'}} onClick={this.workNotDone}>
                              <strong> Undo </strong>
                         </button>

                         <button style={{...buttonStyle, backgroundColor:'blue', color: 'white'}}  onClick={this.workToRepeat}>
                               <strong> Repeat</strong>
                         </button>

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
