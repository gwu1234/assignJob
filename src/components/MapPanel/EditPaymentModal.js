import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select} from 'semantic-ui-react';

class EditPaymentModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: this.props.payment.date,
         amount: this.props.payment.amount,
         method: this.props.payment.method,
         paymentId: this.props.payment.paymentId,
         linkedInvoiceId: this.props.payment.linkedInvoiceId,
         linkedInvoiceKey: this.props.payment.linkedInvoiceKey,
         linkedInvoiceSubkey: this.props.payment.linkedInvoiceSubkey,
         selectedInvoiceId: null,
         selectedInvoiceKey: null,
         selectInvoiceChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const {date,amount, method, paymentId,
        selectedInvoiceId, selectedInvoiceKey,
        linkedInvoiceId, linkedInvoiceKey, linkedInvoiceSubkey,
        selectInvoiceChange, fieldChange} = this.state;
    const {paymentKey, contact, usertag} = this.props;

    const event = this.nativeEvent;

    if (event) {
       //console.log(event);
       event.preventDefault();
    }

    if (!selectInvoiceChange && !fieldChange) {
        this.handleOpen(false);
    }

    if (this.isFormValid()) {

         if (!selectInvoiceChange && fieldChange) {
             let paymentPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/payments/" +paymentKey;
             const paymentRef = firebase.database().ref(paymentPath);
             //console.log(contractPath);

             const newPayment = {
                 "date":  String(date),
                 "amount":  String(amount),
                 "method": String(method),
                 "paymentKey": String(paymentKey),
                 "paymentId": String(paymentId),
                 "clientKey": String(contact.clientKey),
                 "clientTag": String(contact.clientTag)
             }
             //console.log(newPayment);
             paymentRef.update(newPayment);
             this.handleOpen(false);
        }
        else if (selectInvoiceChange) {

          let invoiceSubkey = "";
            // a non-null invoice selected
          if (selectedInvoiceKey) {
                const newPayment = {
                   "linkedPaymentId":  paymentId,
                   "linkedPaymentKey": paymentKey,
                 }
                const invoicePath = "repos/"+usertag+"/clients/data/"+ contact.clientTag
                                    + "/invoices/" + selectedInvoiceKey +"/linkedPayments";
                const invoiceRef = firebase.database().ref(invoicePath);
                invoiceSubkey = invoiceRef.push().getKey();
                invoiceRef.child(invoiceSubkey).update(newPayment);
          }

            // was linked before
          if (linkedInvoiceKey) {
                const nullPayment = {
                    "linkedPaymentId":  null,
                    "linkedPaymentKey": null,
                }
                const invoicePath = "repos/"+usertag+"/clients/data/"+ contact.clientTag
                                    + "/invoices/" + selectedInvoiceKey +"/linkedPayments/linkedInvoiceSubkey";
                const invoiceRef = firebase.database().ref(invoicePath);
                invoiceRef.update(nullPayment);
          }

            let paymentPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/payments/" +paymentKey;
            const paymentRef = firebase.database().ref(paymentPath);

            const newPayment = {
                "date":  String(date),
                "amount":  String(amount),
                "method": String(method),
                "paymentKey": String(paymentKey),
                "paymentId": String(paymentId),
                "clientKey": String(contact.clientKey),
                "clientTag": String(contact.clientTag),
                "linkedInvoiceId": selectedInvoiceId,
                "linkedInvoiceKey":selectedInvoiceKey,
                "linkedInvoiceSubkey":invoiceSubkey,
            }
              //console.log(newContract);
            paymentRef.update(newPayment);

            this.setState ({
                  linkedInvoiceId:  selectedInvoiceId,
                  linkedInvoiceKey: selectedInvoiceKey,
                  linkedInvoiceSubkey: invoiceSubkey,
                  selectInvoiceChange: false,
                  fieldChange: false,
                  selectedInvoiceId:  null,
                  selectedInvoiceKey: null,
            })

            this.handleOpen(false);
        }
    }
  };

  isFormValid() {
     const {date, amount, method } = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !amount) {
        window.alert ("amount is required");
        return false;
     }
     if ( !method) {
        window.alert ("method is required");
        return false;
     }
     return true;
  }

  handleSelectChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      let selectedId = null;
      let selectedKey = null;
      //console.log(data.value);
      //console.log("textContent = " + event.target.textContent);

      if (data !== undefined) {
        selectedKey = data.value;
      }

      if (event.target !== undefined) {
        selectedId = event.target.textContent;
      }

      if (selectedKey ==="no contract" || selectedId ==="no contract"){
          selectedId = null;
          selectedKey = null;
      }

      this.setState({
          selectedInvoiceId:  selectedId,
          selectedInvoiceKey: selectedKey,
          selectInvoiceChange: true,
       });
    }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({
        [event.target.name]: event.target.value,
        fieldChange: true,
     });
  };

  selectOptions = () => {
       const {invoices} = this.props;
       const {linkedInvoiceKey} = this.props.payment;

       const Options = [
         {
            key: 1111,
            text: <span>no invoice</span>,
            value: "no invoice",
         }
       ];

       for (var key in invoices) {
          if ( key !== linkedInvoiceKey ) {
               const option = {
                  key: key,
                  text: <span> {invoices[key].invoiceId} </span>,
                  value: invoices[key].invoiceKey,
               }
               Options.push(option);
          }
       };
       return Options;
  }

  render() {
    const {payment, contact} = this.props;
    //console.log ("EditContractModal order = " );
    //console.log (contract);
    //console.log (contractKey);
    //console.log (contact);
    //console.log (contact.tag);
    //console.log (contact.clientKey);
    let titleString = "Edit Payment";
    if (contact) {
         titleString = contact.name + " :  " + "Edit Payment";
    }
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
                           defaultValue = {payment.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Amount'
                            defaultValue = {payment.amount}
                            name="amount"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Method'
                            defaultValue = {payment.method}
                            name="method"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Payment Id'
                            defaultValue = {payment.paymentId}
                            name="paymentId"
                            onChange={this.handleChange} />
           </Form.Group>
        </Form>

        {this.state.linkedInvoiceId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to invoice: {this.state.linkedContractId}</h4>}
        {this.state.linkedInvoiceId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select invoice to change</h4>}
        {!this.state.linkedInvoiceId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to invoice </h4>}
        {!this.state.linkedInvoiceId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select invoice to link</h4>}
        <Select placeholder='Select Invoice Id'
                name="invoices"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedInvoiceId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedInvoiceId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectInvoiceChange && this.state.linkedInvoiceId && !this.state.selectedInvoiceId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to invoice. Click Submit to confirm</h4>}


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
     invoices: state.user.invoices,
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditPaymentModal);
