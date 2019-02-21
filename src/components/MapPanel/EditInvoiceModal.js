import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class EditInvoiceModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: this.props.invoice.date,
         work: this.props.invoice.work,
         amount: this.props.invoice.amount,
         tax: this.props.invoice.tax,
         total: this.props.invoice.total
     }
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
         const {date,work, amount, tax, total} = this.state;
         const {invoice, invoiceKey, usertag, contact} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);

         let invoicePath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/invoices/" +invoiceKey;
         const invoiceRef = firebase.database().ref(invoicePath);
         //console.log(contractPath);

         const newInvoice = {
           "date":  String(date),
           "work":  String(work),
           "amount": String(amount),
           "tax":   String(tax),
           "total": String(total),
           "invoiceKey": String(invoiceKey),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.tag)
         }
         //console.log(newContract);
         invoiceRef.update(newInvoice);
         this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, work , amount, total} = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
        return false;
     }
     if ( !amount) {
        window.alert ("amount is required");
        return false;
     }
     if ( !total) {
        window.alert ("total is required");
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
    const {invoice, contact, french} = this.props;
    //console.log ("EditContractModal order = " );
    //console.log (contract);
    //console.log (contractKey);
    //console.log (contact);
    //console.log (contact.tag);
    //console.log (contact.clientKey);
    let titleString = "Edit Invoice";
    if (contact) {
         titleString = contact.name + " :  " + "Edit Invoice";
         if (french) {
            titleString = contact.name + " :  " + "Modifier Facture";
         }
    }
    //if (french) {
    //   titleString = contact.name + " :  " + "Edit Invoice";
    //}
    //console.log (titleString);

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='clipboard outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Date'
                            defaultValue = {invoice.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {invoice.work}
                            name="work"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Amount'
                            defaultValue = {invoice.amount}
                            name="amount"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Tax'
                            defaultValue = {invoice.tax}
                            name="tax"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Total'
                            defaultValue = {invoice.total}
                            name="total"
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
)(EditInvoiceModal);
