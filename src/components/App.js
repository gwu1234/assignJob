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


class App extends React.Component {

  render() {


    const {currentUser, mapView, admin, companyInfoView, clientView} = this.props;
    //console.log("App companyInfoView = " + companyInfoView);
    //console.log("App mapView = " + mapView);
    //console.log("App admin = " + admin);
    //console.log("App clientView  = " + clientView);

    return (
      <Grid className ="app" style={{width: "100%", backgroundImage: `url(${Background})`}}>
        <TopPanel/>
        {admin && !mapView && !companyInfoView && !clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
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

        {admin && mapView && !companyInfoView && !clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
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

        {admin && !mapView && companyInfoView && !clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
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

        {!admin && !mapView && companyInfoView && !clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
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

        {!admin && mapView && !companyInfoView && !clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
            <Grid.Column style=
                 {{width: "100%", height:"92vh", margin:"0px", padding:"0px"}}>
                 <MapContainer/>
            </Grid.Column>
          </Grid.Row>}

        {!admin && !mapView && !companyInfoView && clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
                <Grid.Column style=
                     {{width: "25%", height:"100%", margin:"0px", padding:"0px"}}>
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
                     {{width: "25%", height:"100%", margin:"0px", padding:"0px"}}>
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
                     {{width: "25%", height:"100%", margin:"0px", padding:"0px"}}>
                     <Menu
                       size="large"
                       inverted
                       floated
                       vertical
                       style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
                     >

                     <Payments />

                     </Menu>
                </Grid.Column>
                <Grid.Column style=
                     {{width: "25%", height:"100%", margin:"0px", padding:"0px"}}>
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

       {admin && !mapView && !companyInfoView && clientView && <Grid.Row style={{width: "100%", height:"92%", margin:"0px", padding:"0px"}}>
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


      </Grid>
    );
  }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    mapView: state.user.mapView,
    admin: state.user.admin,
    companyInfoView: state.user.companyInfoView,
    clientView: state.user.clientView,
  });

export default connect(mapStateToProps)(App);
