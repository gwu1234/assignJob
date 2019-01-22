import React from "react";
import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
//import Client from "./Client";
import "./WorkOrder.css";

class WorkOrder extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

  render() {
    const {order} = this.props;
    const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}

    return (
      <Menu.Menu className ="OrderMenuMenu">
          <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}}>
              {order && order.date}
          </Menu.Item>
          <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}} >
              {order && order.work}
          </Menu.Item>
      </Menu.Menu>
    );
  }
}

export default WorkOrder;
