import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class AddInvoiceModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: '',
    amount: "",
    tax:"",
    total:"",
    invoiceId:""
  }


  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
         const {date,work, amount, tax, total, invoiceId} = this.state;
         const {usertag, contact} = this.props;

         //"repos/"+usertag+"/clients/data/"+ contact.clientTag
         let invoiceString = "repos/"+usertag+"/clients/data/"+contact.clientTag+"/invoices";
         const invoicetag = invoiceString.replace(/[.,#$\[\]@ ]/g,'');
         const invoiceRef = firebase.database().ref(invoicetag);
         const invoicekey = invoiceRef.push().getKey();
         //console.log(ordertag);
         //console.log (orderkey);
         //console.log(orderRef);
         //"clientKey": String(contact.clientKey),
         //"clientTag": String(contact.clientTag)
         const newInvoice = {
           "date": String(date),
           "total": String(total),
           "work": String(work),
           "tax": String(tax),
           "amount": String(amount),
           "tag": String(invoicekey),
           "invoiceId": String(invoiceId),
           "invoiceKey": String(invoicekey),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.clientTag),
         }
         //console.log(newOrder);
         invoiceRef.child(invoicekey).set(newInvoice);
         this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, total, amount } = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !total) {
        window.alert ("total is required");
        return false;
     }
     if ( !amount) {
        window.alert ("amount is required");
        return false;
     }
     return true;
  }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    //const {clientname, french} = this.props;
    const {contact, french} = this.props;
    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );

    let titleString = "Add New Invoice";
    let workString ="Work";
    let totalString="Total";
    let taxString ="Tax";
    let amountString = "Amount";

    if (contact) {
       titleString = contact.name + ":  " + "Add New Invoice";
    }

    //let totallabel ="Total";
    if (french) {
       titleString = "ajouter nouveau facture";
       if (contact) {
            titleString = contact.name + ":  " + "ajouter nouveau facture";
       }
       workString = "Travail";
       taxString ="Impot";
       amountString="Somme";
    }

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)}
        style = {{position: "relative", float: "right", color:"white"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='folder outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Date'
                           placeholder='December 11, 2018'
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={workString}
                            placeholder='snow removal'
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={amountString}
                           placeholder='500.00'
                           name="amount"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={taxString}
                            placeholder='45.00'
                            name="tax"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label="Total"
                            placeholder='545.00'
                            name="total"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Invoice Id'
                            placeholder='i-2018-001188'
                            name="invoiceId"
                            onChange={this.handleChange} />
          </Form.Group>
        </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleOpen(false)}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                >
                Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
const mapStateToProps = state => ({
     contact: state.user.clientContact,
     usertag: state.user.usertag,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  {}
)(AddInvoiceModal);
