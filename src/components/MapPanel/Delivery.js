import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
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
    const {delivery, deliveryKey, activeOrderId, activeOrderKey} = this.props;
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

    const isActive = (delivery.linkedOrderId && delivery.linkedOrderId  === activeOrderId) ||
                     (delivery.linkedOrderKey && delivery.linkedOrderKey === activeOrderKey) ;

    return (
      <Menu.Menu className ="DeliveryMenuMenu"
                 style = {isActive? {backgroundColor:"blue"}: {} }>
          {date && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}}>
              <span> {date} </span> <EditDeliveryModal delivery={delivery} deliveryKey={deliveryKey} />
          </Menu.Item>}
          {work && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
               marginTop:"0px", paddingTop:"0px",
               marginBottom:"0px", paddingBottom:"0px"}} >
              {work}
          </Menu.Item>}
          {employee && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}} >
              {employee}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     activeOrderId: state.user.activeOrderId,
     activeOrderKey: state.user.activeOrderKey,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Delivery);

//export default Delivery;
