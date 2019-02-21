import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./Invoice.css";
import EditInvoiceModal from "./EditInvoiceModal";

class Invoice extends React.Component {

   state = {
     contractStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     //display: false,
   };

  render() {
    const {invoice, invoiceKey} = this.props;
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    let invoiceDate = "";
    let invoiceWork = "";
    let amount = "";
    let total ="";
    if (invoice) {
        invoiceDate = invoice.date;
        invoiceWork = invoice.work;
        amount = invoice.amount;
        if (invoice.total){
           total = invoice.total + " CAD";
        }
    }

    return (
      <Menu.Menu className ="InvoiceMenuMenu">
          {invoiceDate && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
          marginTop:"0px", paddingTop:"0px",
          marginBottom:"0px", paddingBottom:"0px"}}>
              <span> {invoiceDate} </span> <EditInvoiceModal invoice={invoice} invoiceKey={invoiceKey} />
          </Menu.Item>}
          {invoiceWork && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}} >
              {invoiceWork}
          </Menu.Item>}
          {total && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
             marginTop:"0px", paddingTop:"0px",
             marginBottom:"0px", paddingBottom:"0px"}} >
              {total}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

export default Invoice;
