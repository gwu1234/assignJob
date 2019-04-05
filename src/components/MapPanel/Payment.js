import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./Payment.css";
import EditPaymentModal from "./EditPaymentModal";

class Payment extends React.Component {

   state = {
     contractStyle: {
       visibility: 'hidden',
       height: "2px",
     },
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
      <Menu.Menu className ="PaymentMenuMenu"
                 style = {isActive? {backgroundColor:"blue"}:{} }>
          {date && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}}>
              <span> {date} </span> <EditPaymentModal payment={payment} paymentKey={paymentKey} />
          </Menu.Item>}
          {amount && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}} >
              {amount}
          </Menu.Item>}
          {method && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}} >
              {method}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

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
