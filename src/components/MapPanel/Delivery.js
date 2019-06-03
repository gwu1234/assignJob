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
    const {delivery, deliveryKey, orders} = this.props;
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}

    let isActive = false;
    const linkedOrderId = delivery["linkedOrderId"];
    const  linkedOrderKey = delivery["linkedOrderKey"];
    //console.log("linkedOrderId = " + linkedOrderId);
    //console.log("linkedOrderKey = " + linkedOrderKey);

    for (var key in orders) {
       //console.log("order key = " +  key);
       //console.log(orders[key]);
       //console.log("order isActive = " + orders[key]["isActive"]);
       const isOrderActive = orders[key]["isActive"];
       //console.log("order key = " + key);
       //console.log("isActive in order = " +  isOrderActive );

       //const orderId = orders[key]["orderId"];
       //if (key === linkedOrderKey && linkedOrderId === orderId) {
       if (key === linkedOrderKey && isOrderActive === "true") {
          //console.log("active order found key =" + key);
          isActive = true;
          break;
       }
    }

    let date = "";
    let work = "";
    let employee ="";
    if (delivery) {
        date = delivery.date;
        work = delivery.work;
        employee = delivery.employee;
    }

    //const isActive = (delivery.linkedOrderId && delivery.linkedOrderId  === activeOrderId) ||
    //                 (delivery.linkedOrderKey && delivery.linkedOrderKey === activeOrderKey) ;

    return (
      <Menu.Menu style = {isActive? {...styles.container, ...styles.active}: styles.container }>
          {date && <Menu.Item style = {isActive===true? styles.activeItem:styles.item}>
              <span> {date} </span> <EditDeliveryModal delivery={delivery} deliveryKey={deliveryKey} />
          </Menu.Item>}
          {work && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {work}
          </Menu.Item>}
          {employee && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {employee}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    paddingTop: "2px",
    paddingBottom: "2px",
    position: "relative",
    borderStyle:"solid",
    borderWidth:"3px",
    borderColor:"#b0caf4",
    height:"70px",
  },
  active: {
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  item: {
    paddingTop: "1px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  activeItem: {
    paddingTop: "1px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "bold",
    color: "black",
    opacity: 1.0,
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let workOrders = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      workOrders = reposData["clients"]["data"][clienttag]?
      reposData["clients"]["data"][clienttag]["workorders"] : null;
      //console.log(clientContact);
  }
  return {
     orders: workOrders,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(Delivery);

//export default Delivery;
