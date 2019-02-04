import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
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
    const {payment, paymentKey} = this.props;
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

    return (
      <Menu.Menu className ="PaymentMenuMenu">
          {date && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}}>
              <span> {date} </span> <EditPaymentModal payment={payment} paymentKey={paymentKey} />
          </Menu.Item>}
          {amount && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}} >
              {amount}
          </Menu.Item>}
          {method && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}} >
              {method}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

export default Payment;
