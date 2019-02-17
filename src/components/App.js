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
import TopPanel from './SidePanel/TopPanel';

class App extends React.Component {

  render() {


    const {currentUser, mapView} = this.props;
    //console.log("App admin = " + admin);

    return (
      <Grid className ="app" style={{width: "100%", backgroundImage: `url(${Background})`}}>
        <TopPanel/>
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
