import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";

//import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import Background from './terra.jpg';
//import Contracts from "./MapPanel/Contracts";
//import PaymentPanel from "./MapPanel/PaymentPanel";
//import DeliveryPanel from "./MapPanel/DeliveryPanel";
import MapPanel from "./MapPanel/MapPanel";
import MapContainer from './MapPanel/map/MapContainer';

class App extends React.Component {

  render() {
    /*const markers = [
      {pos: {lat: 45.4474017, lng: -73.8300837}, name: 'Lake Shore', id: 0, status: 0},
      {pos: {lat: 45.4524017, lng: -73.8410837}, name: 'Stillview', id: 0, status: 0},
      {pos: {lat: 45.4608017, lng: -73.8408837}, name: 'Fairview Shopping', id: 0, status: 0},
      {pos: {lat: 45.4574017, lng: -73.8400837}, name: 'position 5', id: 0, status: 0},
      {pos: {lat: 45.4394017, lng: -73.8510837}, name: 'position 6', id: 0, status: 0},
      {pos: {lat: 45.4408017, lng: -73.8608837}, name: 'position 7', id: 0, status: 0},
      {pos: {lat: 45.4506017, lng: -73.8507837}, name: 'Bruce', id: 0, status: 0}
    ];*/

    const {currentUser, mapView} = this.props;
    //console.log("App admin = " + admin);

    return (
      <Grid className ="app" style={{width: "100%", backgroundImage: `url(${Background})`}}>
        <Grid.Row columns='equal' style={{width:"100%",height:"8vh",color:"white",backgroundColor:"blue"}}>
            <Grid.Column style={{textAlign: "center"}}>
               <span> user </span>
            </Grid.Column >
            <Grid.Column style={{textAlign: "center"}}>
               <span> setting </span>
            </Grid.Column>
            <Grid.Column style={{textAlign: "center"}}>
              <span> map </span>
            </Grid.Column>
            <Grid.Column style={{textAlign: "center"}}>
               <span> Francaise </span>
            </Grid.Column>
        </Grid.Row>

        <Grid.Row style={{width: "100%"}}>

        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    mapView: state.user.mapView
  });

export default connect(mapStateToProps)(App);
