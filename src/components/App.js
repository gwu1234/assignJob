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
import Contact from "./Messages/Contact";
import Employees from "./Messages/Employees";
import Trucks from "./SidePanel/Trucks";
import Clients from "./Messages/Clients";
import WorkOrders from "./MetaPanel/WorkOrders";
import Contracts from "./MapPanel/Contracts";
import Deliverys from "./MapPanel/Deliverys";
import Payments from "./MapPanel/Payments";
import ClientContact from "./MetaPanel/ClientContact";
import Invoices from "./MapPanel/Invoices";

class App extends React.Component {

  render() {


    const {currentUser, mapView, admin, companyInfoView, clientView, clientContactView} = this.props;
    //console.log("App companyInfoView = " + companyInfoView);
    //console.log("App mapView = " + mapView);
    //console.log("App admin = " + admin);
    //console.log("App clientView  = " + clientView);

    return (
      <Grid style={styles.container}>
        <TopPanel/>
        {admin && !mapView && !companyInfoView && !clientView && !clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"11%", height:"100%"}}>
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
        </Grid.Row>}

        {admin && mapView && !companyInfoView && !clientView && !clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"11%", height:"100%"}}>
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
            <Grid.Column style=
                 {{width: "89%", height:"92vh", margin:"0px", padding:"0px"}}>
                 <MapContainer/>
            </Grid.Column>
        </Grid.Row>}

        {admin && !mapView && companyInfoView && !clientView && !clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"11%", height:"88%"}}>
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
            <Grid.Column style=
                 {{width: "30%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                   <Contact />
                 </Menu>
            </Grid.Column>
            <Grid.Column style=
                 {{width: "30%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                   <Employees/>
                 </Menu>
            </Grid.Column>
            <Grid.Column style=
                 {{width: "29%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                    <Trucks/>
                 </Menu>
            </Grid.Column>
        </Grid.Row>}

        {!admin && !mapView && companyInfoView && !clientView && !clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style=
                 {{width: "33%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                   <Contact />
                 </Menu>
            </Grid.Column>
            <Grid.Column style=
                 {{width: "33%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                   <Employees/>
                 </Menu>
            </Grid.Column>
            <Grid.Column style=
                 {{width: "34%", height:"100%", margin:"0px", padding:"0px"}}>
                 <Menu
                   size="large"
                   inverted
                   floated
                   vertical
                   style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                 >
                    <Trucks/>
                 </Menu>
            </Grid.Column>
        </Grid.Row>}

        {!admin && mapView && !companyInfoView && !clientView && !clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style=
                 {{width: "100%", height:"92vh", margin:"0px", padding:"0px"}}>
                 <MapContainer/>
            </Grid.Column>
          </Grid.Row>}

        {!admin && !mapView && !companyInfoView && clientView && !clientContactView &&
          <Grid.Row style={styles.mainRow}>
                <Grid.Column style={styles.leftColumn}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={styles.MenuContainer}
                     >
                       <Clients/>
                     </Menu>
                </Grid.Column>
                <Grid.Column style={styles.middleColumn}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={styles.MenuContainer}
                     >
                     <WorkOrders />
                     <Contracts />

                     </Menu>
                </Grid.Column>
                <Grid.Column style={styles.middleColumn}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={styles.MenuContainer}
                     >
                     <Invoices />
                     <Payments />

                     </Menu>
                </Grid.Column>
                <Grid.Column style={styles.rightColumn}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={styles.MenuContainer}
                     >
                      <Deliverys />
                     </Menu>
                </Grid.Column>
            </Grid.Row>}

       {admin && !mapView && !companyInfoView && clientView && !clientContactView &&
         <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"11%", height:"100%"}}>
                <Menu
                  size="large"
                  inverted
                  floated
                  vertical
                  style={{ background: "#F2D79F", fontSize: "1.2rem", width:"100%",
                       height:"100%", margin:"0px", padding:"0px"}}>
                      <UserList currentUser={currentUser} />
                  </Menu>
            </Grid.Column>

            <Grid.Column style=
                  {{width: "22%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                     size="large"
                     inverted
                     floated
                     vertical
                     style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                   >
                       <Clients/>
                   </Menu>
            </Grid.Column>
            <Grid.Column style=
                  {{width: "22%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                     size="large"
                     inverted
                     floated
                     vertical
                     style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                   >
                   <WorkOrders />
                   <Contracts />

                  </Menu>
            </Grid.Column>
            <Grid.Column style=
                  {{width: "22%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                     size="large"
                     inverted
                     floated
                     vertical
                     style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                   >
                   <Invoices />
                   <Payments />
                  </Menu>
            </Grid.Column>
            <Grid.Column style=
                         {{width: "22%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                      size="large"
                      inverted
                      floated
                      vertical
                      style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                  >
                        <Deliverys />
                  </Menu>
             </Grid.Column>
        </Grid.Row>}

        {!admin && !mapView && !companyInfoView && !clientView && clientContactView &&
          <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
                <Grid.Column style=
                     {{width: "50%", height:"100%", margin:"0px", padding:"0px"}}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%", height:"92vh"}}
                     >
                       <Clients/>
                     </Menu>
                </Grid.Column>
                <Grid.Column style=
                     {{width: "50%", height:"100%", margin:"0px", padding:"0px"}}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                     >
                      <ClientContact />

                     </Menu>
                </Grid.Column>

            </Grid.Row>}

        {admin && !mapView && !companyInfoView && !clientView && clientContactView &&
         <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style={{margin:"0px", padding:"0px", width:"11%", height:"100%"}}>
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

            <Grid.Column style=
                  {{width: "45%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                     size="large"
                     inverted
                     floated
                     vertical
                     style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                   >
                       <Clients/>
                   </Menu>
            </Grid.Column>

            <Grid.Column style=
                         {{width: "44%", height:"100%", margin:"0px", padding:"0px"}}>
                  <Menu
                      size="large"
                      inverted
                      floated
                      vertical
                      style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                  >
                        <ClientContact />
                  </Menu>
             </Grid.Column>
        </Grid.Row>}

      </Grid>
    );
  }
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background: "#92c2e8",
    padding: "0.0em",
    backgroundImage: `url(${Background})`,
  },
  mainRow: {
    width: "100vw",
    height:"92vh",
    margin:"0px",
    padding:"0px",
    marginTop:"3px",
  },
  leftColumn: {
    width: "24.8%",
    height:"100%",
    margin:"0px",
    padding:"0px",
    marginRight:"1px",
  },
  rightColumn: {
    width: "24.8%",
    height:"100%",
    margin:"0px",
    padding:"0px",
    marginLeft:"1px",
  },
  middleColumn: {
    width: "24.8%",
    height:"100%",
    margin:"0px",
    padding:"0px",
    marginLeft:"2px",
    marginRight:"2px",    
  },
  MenuContainer: {
    background: "#f2f5f7",
    padding: "2px",
    width:"100%",
    height:"100%",
    backgroundImage: `url(${Background})`,
  },
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    mapView: state.user.mapView,
    admin: state.user.admin,
    companyInfoView: state.user.companyInfoView,
    clientView: state.user.clientView,
    clientContactView: state.user.clientContactView,
  });

export default connect(mapStateToProps)(App);
