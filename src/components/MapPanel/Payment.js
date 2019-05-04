import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./Payment.css";
import EditPaymentModal from "./EditPaymentModal";

class Payment extends React.Component {

   state = {
     //contractStyle: {
    //   visibility: 'hidden',
    //   height: "2px",
    // },
     //display: false,
   };

  render() {
    const {payment, paymentKey, orders} = this.props;

    let isActive = false;
    const linkedOrderId = payment["linkedOrderId"];
    const  linkedOrderKey = payment["linkedOrderKey"];
    //console.log("linkedOrderId = " + linkedOrderId);
    //console.log("linkedOrderKey = " + linkedOrderKey);

    for (var key in orders) {
       //console.log(key);
       //console.log(orders[key]);
       //console.log(orders[key]["isActive"]);
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
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    let date = "";
    let amount = "";
    let method = "";
    if (payment) {
        date = payment.date;
        method = payment.method;
        amount = payment.amount;
        if (amount){
           amount = amount + " CAD";
        }
    }

    //const isActive = (payment.linkedInvoiceId && payment.linkedInvoiceId  === activeInvoiceId) ||
    //                 (payment.linkedInvoiceKey && payment.linkedInvoiceKey === activeInvoiceKey) ;

    return (
      <Menu.Menu style = {isActive===true? {...styles.container, ...styles.active}:
                          styles.container}>
          {date && <Menu.Item style = {isActive===true? styles.activeItem:styles.item}>
              <span> {date} </span> <EditPaymentModal payment={payment} paymentKey={paymentKey} />
          </Menu.Item>}
          {amount && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {amount}
          </Menu.Item>}
          {method && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {method}
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
    backgroundColor: "rgba(0,0,255,0.5)",
  },
  item: {
    paddingTop: "1px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "bold",
    color: "black",
    opacity: 1.0,
  },
  activeItem: {
    paddingTop: "1px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "bold",
    color: "white",
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
)(Payment);

//export default Payment;
