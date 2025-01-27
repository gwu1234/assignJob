import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import { setActiveInvoiceId, setActiveInvoiceKey} from "../../actions";
import "./Invoice.css";
import EditInvoiceModal from "./EditInvoiceModal";

class Invoice extends React.Component {

   state = {
     //contractStyle: {
    //   visibility: 'hidden',
    //   height: "2px",
    // },
     //isActive: false,
   };



  render() {
    const {invoice, invoiceKey, orders} = this.props;
    //const {isActive} = this.state;

    let isActive = false;
    const linkedOrderId = invoice["linkedOrderId"];
    const  linkedOrderKey = invoice["linkedOrderKey"];
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

    //let isActive = (invoice.linkedContractId  && invoice.linkedContractId  === activeContractId) ||
    //               (invoice.linkedContractKey && invoice.linkedContractKey === activeContractKey) ;

    /*if (isActive) {
          this.props.setActiveInvoiceId(invoice.invoiceId);
          this.props.setActiveInvoiceKey(invoice.invoiceKey)
    }
    else if  (  (invoice.linkedContractId  && null === activeContractId) ||
                (invoice.linkedContractKey && null === activeContractKey) ){
        isActive = false;
        this.props.setActiveInvoiceId(null);
        this.props.setActiveInvoiceKey(null)
    }*/

    return (
      <Menu.Menu style = {isActive===true? {...styles.container, ...styles.active}:
                          styles.container}>
          {invoiceDate && <Menu.Item style = {isActive===true? styles.activeItem:styles.item}>
              <span> {invoiceDate} </span> <EditInvoiceModal key={invoice.clientKey+invoiceKey} invoice={invoice} invoiceKey={invoiceKey} />
          </Menu.Item>}
          {invoiceWork && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {invoiceWork}
          </Menu.Item>}
          {total && <Menu.Item style = {isActive===true? styles.activeItem:styles.item} >
              {total}
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
  //return {
     //activeOrderId: state.user.activeOrderId,
     //activeOrderKey: state.user.activeOrderKey,
  // }
};

export default connect(
  mapStateToProps, {}
)(Invoice);

//export default Invoice;
