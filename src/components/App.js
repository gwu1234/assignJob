import React from "react";
import { Grid, Menu } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";

//import ColorPanel from "./ColorPanel/ColorPanel";
//import SidePanel from "./SidePanel/SidePanel";
import UserList from "./SidePanel/UserList";
//import Messages from "./Messages/Messages";
//import MetaPanel from "./MetaPanel/MetaPanel";
import Background from './terra.jpg';
//import Contracts from "./MapPanel/Contracts";
//import PaymentPanel from "./MapPanel/PaymentPanel";
//import DeliveryPanel from "./MapPanel/DeliveryPanel";
//import MapPanel from "./MapPanel/MapPanel";
import MapContainer from './MapPanel/map/MapContainer';
import TopPanel from './SidePanel/TopPanel';

class App extends React.Component {

  render() {


    const {currentUser, mapView, admin} = this.props;
    console.log("App admin = " + admin);
    console.log(currentUser);

    return (
      <Grid className ="app" style={{width: "100%", backgroundImage: `url(${Background})`}}>
        <TopPanel/>
        {mapView && !admin && <Grid.Row style={{width: "100%", height:"100%", marginTop:"0px", paddingTop:"0px"}}>
            <MapContainer/>
        </Grid.Row>}
        {admin && <Grid.Row style={{width: "100%", height:"100%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"10%", height:"100%"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem", width:"100%",
                         height:"100%", margin:"0px", padding:"0px"}}>
                       <UserList currentUser={currentUser} />
                 </Menu>
            </Grid.Column>
            {mapView && <Grid.Column style=
                 {{width: "90%", height:"100%", margin:"0px", padding:"0px"}}>
                 <MapContainer/>
            </Grid.Column>}
        </Grid.Row>}

        {!admin && <Grid.Row style={{width: "100%", height:"100%", margin:"0px", padding:"0px"}}>
            {mapView && <Grid.Column style=
                 {{width: "87%", height:"100%", margin:"0px", padding:"0px"}}>
                 <MapContainer/>
            </Grid.Column>}
        </Grid.Row>}

      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    mapView: state.user.mapView,
    admin: state.user.admin
  });

export default connect(mapStateToProps)(App);
