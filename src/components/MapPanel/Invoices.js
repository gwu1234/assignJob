import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import Invoice from "./Invoice";
import AddInvoiceModal from "./AddInvoiceModal";
import "./Invoices.css";

class Invoices extends React.Component {

   /*state = {
     contractsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };*/

   /*onButtonClick = (display) => {
       if (display){
           this.setState({
               contractsStyle: {
                   ...this.state.contractsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               ordersStyle: {
                 ...this.state.contractsStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "390px",
             },
             display: true,
          })
        }
   };*/


   displayInvoices = (invoices) =>
      invoices.length > 0 &&
      invoices.map(invoice => (
          <Invoice key={invoice.invoiceKey} invoiceKey={invoice.invoiceKey} invoice={invoice.invoice}/>
     ));



  render() {
    const {invoices, french} = this.props;
    //const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}
    let titleString = "Invoice";
    if (french) {
       titleString ="facture";
    }

    const invoiceArray =[];
    //const keyArray = [];
    for (var key in invoices) {
       //console.log(clients[key]);
       //console.log(key);
       const newInvoice = {
         invoiceKey: key,
         invoice: invoices[key]
       }
       invoiceArray.push(newInvoice);
    }
    // sort list by the timestamp
    invoiceArray.sort((a, b) =>  (new Date (b.invoice.date)).getTime() - (new Date (a.invoice.date)).getTime() );



    return (
      <Menu.Menu className ="InvoicesMenuMenu" style={{marginBottom:"0.4em"}}>
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                 {titleString}
            </Menu.Header>
          <Menu.Menu style={{visibility: "visible", paddingTop: "0.0em", position: "relative",
                             color: "white", size: "tiny",
                             overflow: "scroll", height: "37vh"}} >
              {invoices && this.displayInvoices(invoiceArray)}
              <Menu.Item style={{margin:"1em"}}>
                  <span style={{color:"white", fontStyle:"bold"}}> add new invoice</span> <AddInvoiceModal />
              </Menu.Item>

          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let invoices = null;
  console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      invoices = reposData["clients"]["data"][clienttag] ?
                 reposData["clients"]["data"][clienttag]["invoices"] :
                 null;
      //console.log(clientContact);
  }
  return{
     invoices: invoices,
     french: state.user.french,
   }
};

export default connect(
  mapStateToProps,
  {}
)(Invoices);
