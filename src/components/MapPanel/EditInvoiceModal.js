import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class EditInvoiceModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: this.props.invoice.date,
         work: this.props.invoice.work,
         amount: this.props.invoice.amount,
         tax: this.props.invoice.tax,
         total: this.props.invoice.total,
         invoiceId: this.props.invoice.invoiceId,
         //linkedContractId: this.props.invoice.linkedContractId,
         //linkedContractKey: this.props.invoice.linkedContractKey,
         //selectedContractId: null,
         //selectedContractKey: null,
         //selectContractChange: false,
         //fieldChange: false,
         linkedOrderId: this.props.invoice.linkedOrderId,
         linkedOrderKey: this.props.invoice.linkedOrderKey,
         selectedOrderId: null,
         selectedOrderKey: null,
         selectOrderChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const {work, amount, tax, total, invoiceId,
        selectedOrderId, selectedOrderKey,
        linkedOrderId, linkedOrderKey,
        selectOrderChange, fieldChange} = this.state;
    const {invoice, invoiceKey, usertag, contact} = this.props;
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

    //event.preventDefault();
    if (this.isFormValid()) {

         if (!selectOrderChange && fieldChange) {
              let invoicePath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/invoices/" +invoiceKey;
              const invoiceRef = firebase.database().ref(invoicePath);
              //console.log(contractPath);

              const newInvoice = {
                  "date":  String(date),
                  "work":  String(work),
                  "amount": String(amount),
                  "tax":   String(tax),
                  "total": String(total),
                  "invoiceId": String(invoiceId),
                  "invoiceKey": String(invoiceKey),
                  "clientKey": String(contact.clientKey),
                  "clientTag": String(contact.tag)
              }
              //console.log(newContract);
              invoiceRef.update(newInvoice);
              this.setState ({
                   fieldChange: false,
              })

              this.handleOpen(false);
         }

        else if (selectOrderChange) {
            let invoicePath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/invoices/" +invoiceKey;
            const invoiceRef = firebase.database().ref(invoicePath);
              //console.log(contractPath);

            const newInvoice = {
                "date":  String(date),
                "work":  String(work),
                "amount": String(amount),
                "tax":   String(tax),
                "total": String(total),
                "invoiceId": String(invoiceId),
                "invoiceKey": String(invoiceKey),
                "clientKey": String(contact.clientKey),
                "clientTag": String(contact.tag),
                "linkedOrderId": selectedOrderId,
                "linkedOrderKey":selectedOrderKey,
            }
              //console.log(newContract);
            invoiceRef.update(newInvoice);

            /*let contractPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/contracts";
            const contractRef = firebase.database().ref(contractPath);

              // a non-null work order selected
            if (selectedContractKey) {
                  const newInvoice = {
                     "linkedInvoiceId":  invoiceId,
                     "linkedInvoiceKey": invoiceKey,
                   }
                  contractRef.child(selectedContractKey).update(newInvoice);
            }*/

              // was linked before
            /*if (linkedContractKey) {
                  const nullInvoice = {
                      "linkedInvoiceId":  null,
                      "linkedInvoiceKey": null,
                  }
                  contractRef.child(linkedContractKey).update(nullInvoice);
            }*/
              //if (selectOrderChange) {
            this.setState ({
                  linkedOrderId:  selectedOrderId,
                  linkedOrderKey: selectedOrderKey,
                  selectOrderChange: false,
                  fieldChange: false,
                  selectedOrderId:  null,
                  selectedOrderKey: null,
            })
              //}
            this.handleOpen(false);
        }
    }
  };

  isFormValid() {
     const {date, work , amount, total, invoiceId} = this.state;
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

     if ( !invoiceId) {
        window.alert ("invoice Id is required");
        return false;
     }
     return true;
  }

  //event, data
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
        // remove blank space in the string
        selectedId = selectedId.replace(/ /g,'');
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
     const {linkedOrderKey} = this.props.invoice;

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
           </Form.Group>
           <Form.Group inline width='equal' >
                 <Form.Input size ="mini"
                             label='Tax'
                             defaultValue = {invoice.tax}
                             name="tax"
                             onChange={this.handleChange} />
            </Form.Group>
            <Form.Group inline width='equal' >
                  <Form.Input size ="mini"
                              label='Total'
                              defaultValue = {invoice.total}
                              name="total"
                              onChange={this.handleChange} />
             </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Invoice Id'
                            defaultValue = {invoice.invoiceId}
                            name="invoiceId"
                            onChange={this.handleChange} />
          </Form.Group>
        </Form>
        </Grid.Column>
        </Grid>


        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to order: {this.state.linkedOrderId}</h4>}
        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select order to change</h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to order  </h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select order to link</h4>}
        <Select placeholder='Select order Id'
                name="workorders"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedOrderId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectOrderChange && this.state.linkedOrderId && !this.state.selectedOrderId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to order. Click Submit to confirm</h4>}

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
    }
    //const clientContact = reposData["clients"];
    //console.log(clientContact);
    return {
          contact: clientContact,
          orders: workOrders,
          usertag: state.user.usertag,
          french: state.user.french,
          contracts: null,
    }
};

export default connect(
  mapStateToProps,
  {}
)(EditInvoiceModal);
