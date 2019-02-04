import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./Delivery.css";
import EditDeliveryModal from "./EditDeliveryModal";

class Delivery extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     //display: false,
   };

  render() {
    const {delivery, deliveryKey} = this.props;
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    let date = "";
    let work = "";
    let employee ="";
    if (delivery) {
        date = delivery.date;
        work = delivery.work;
        employee = delivery.employee;
    }

    return (
      <Menu.Menu className ="DeliveryMenuMenu">
          {date && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}}>
              <span> {date} </span> <EditDeliveryModal delivery={delivery} deliveryKey={deliveryKey} />
          </Menu.Item>}
          {work && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}} >
              {work}
          </Menu.Item>}
          {employee && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}} >
              {employee}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

export default Delivery;
