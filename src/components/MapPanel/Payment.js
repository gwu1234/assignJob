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
    const {payment, paymentKey, activeInvoiceId, activeInvoiceKey} = this.props;
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

    const isActive = payment.linkedInvoiceId  === activeInvoiceId ||
                     payment.linkedInvoiceKey === activeInvoiceKey ;

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

const mapStateToProps = state => ({
     activeInvoiceId: state.user.activeInvoiceId,
     activeInvoiceKey: state.user.activeInvoiceKey,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Payment);

//export default Payment;
