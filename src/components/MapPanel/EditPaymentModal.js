import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class EditPaymentModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: this.props.payment.date,
         amount: this.props.payment.amount,
         method: this.props.payment.method,
         paymentId: this.props.payment.paymentId,
         linkedOrderId: this.props.payment.linkedInvoiceId,
         linkedOrderKey: this.props.payment.linkedInvoiceKey,
         //linkedInvoiceSubkey: this.props.payment.linkedInvoiceSubkey,
         selectedOrderId: null,
         selectedOrderKey: null,
         selectOrderChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const {amount, method, paymentId,
        selectedOrderId, selectedOrderKey,
        linkedOrderId, linkedOrderKey,
        selectOrderChange, fieldChange} = this.state;
    const {paymentKey, contact, usertag} = this.props;
    let {date} = this.state;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    date = (new Date(date)).toLocaleDateString("en-US", options);

    const event = this.nativeEvent;

    if (event) {
       //console.log(event);
       event.preventDefault();
    }

    if (!selectOrderChange && !fieldChange) {
        this.handleOpen(false);
    }

    if (this.isFormValid()) {

         if (!selectOrderChange && fieldChange) {
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
        else if (selectOrderChange) {

          /*let invoiceSubkey = "";
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
          }*/

            // was linked before
          /*if (linkedInvoiceKey) {
                const nullPayment = {
                    "linkedPaymentId":  null,
                    "linkedPaymentKey": null,
                }
                const invoicePath = "repos/"+usertag+"/clients/data/"+ contact.clientTag
                                    + "/invoices/" + selectedInvoiceKey +"/linkedPayments/linkedInvoiceSubkey";
                const invoiceRef = firebase.database().ref(invoicePath);
                invoiceRef.update(nullPayment);
          }*/

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
                "linkedOrderId": selectedOrderId,
                "linkedOrderKey":selectedOrderKey,
            }
              //console.log(newContract);
            paymentRef.update(newPayment);

            this.setState ({
                  linkedOrderId:  selectedOrderId,
                  linkedOrderKey: selectedOrderKey,
                  selectOrderChange: false,
                  fieldChange: false,
                  selectedOrderId:  null,
                  selectedOrderKey: null,
            })

            this.handleOpen(false);
        }
    }
  };

  isFormValid() {
     const {date, amount, method, paymentId } = this.state;
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

     if ( !paymentId) {
        window.alert ("payment Id is required");
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

      if (selectedKey ==="no order" || selectedId ==="no order"){
          selectedId = null;
          selectedKey = null;
      }

      this.setState({
          selectedOrderId:  selectedId,
          selectedOrderKey: selectedKey,
          selectOrderChange: true,
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
     const {orders} = this.props;
     //const {linkedOrderId, linkedOrderKey} = this.props.contract;
     const {linkedOrderKey} = this.props.payment;

     const Options = [
       {
          key: 1111,
          text: <span>no order</span>,
          value: "no order",
       }
     ];

     for (var key in orders) {
        if ( key !== linkedOrderKey) {
            const option = {
               key: key,
               text: <span>{orders[key].orderId}</span>,
               value: orders[key].orderKey,
            }
            Options.push(option);
        }
     };
     return Options;
  }

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }

    //console.log(day);
    //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //console.log(day.toLocaleDateString("en-US", options));
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = day.toLocaleDateString("en-US", options);

    this.setState({
       date: date,
       fieldChange: true,
    })
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


        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

            <DayPicker
                     onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
                     month={new Date(this.state.date)}
                     selectedDays={[new Date(this.state.date)]}
            />

        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>
        <Form >
           <Form.Group inline width='equal' >
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

        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to order: {this.state.linkedOrderId}</h4>}
        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select order to change</h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to order </h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select order to link</h4>}
        <Select placeholder='Select Invoice Id'
                name="invoices"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedOrderId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectOrderChange && this.state.linkedOrderId && !this.state.selectedOrderId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to order. Click Submit to confirm</h4>}

          </Grid.Column>
          </Grid>

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
const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const clienttag = state.user.clienttag;
   let clientContact = null;
   let workOrders = null;
   let invoices = null;

   //console.log(clienttag);
   if (clienttag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["clients"]["data"][clienttag]) {
            clientContact = reposData["clients"]["data"][clienttag]["contact"];
            clientContact = {...clientContact, clientTag: clienttag}
       } else {
          clientContact = {};
       }
       //console.log(clientContact);
       workOrders = reposData["clients"]["data"][clienttag]?
       reposData["clients"]["data"][clienttag]["workorders"] : null;

      // invoices = reposData["clients"]["data"][clienttag]?
      // reposData["clients"]["data"][clienttag]["invoices"] : null;
   }
   //const clientContact = reposData["clients"];
   //console.log(clientContact);
   return {
     contact: clientContact,
     orders: workOrders,
     usertag: state.user.usertag,
     french: state.user.french,
     //invoices: invoices,
   }
};

export default connect(
  mapStateToProps,
  {}
)(EditPaymentModal);
