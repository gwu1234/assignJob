import React from "react";
import { Grid } from "semantic-ui-react";
import "./App.css";
import { connect } from "react-redux";

import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";
import Background from './terra.jpg';
import ContractPanel from "./MapPanel/ContractPanel";
import PaymentPanel from "./MapPanel/PaymentPanel";
import DeliveryPanel from "./MapPanel/DeliveryPanel";
//import MapPanel from "./MapPanel/MapPanel";

class App extends React.Component {

  render() {
    const {currentUser, admin} = this.props;
    console.log("App admin = " + admin);

    return (
      <Grid columns='equal' className ="app" style={{width: "100%", backgroundImage: `url(${Background})`}}>
        <Grid.Column >
             <SidePanel currentUser={currentUser} />
        </Grid.Column >
        <Grid.Column >
          <Messages />
        </Grid.Column>

        <Grid.Column width = {9} >
           <Grid columns='equal'>
           <Grid.Column>
              <MetaPanel />
           </Grid.Column>
           <Grid.Column>
               <ContractPanel />
               <PaymentPanel />
               <DeliveryPanel />
           </Grid.Column>
           </Grid>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    admin: state.user.admin
  });

export default connect(mapStateToProps)(App);
