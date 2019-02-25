import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select} from 'semantic-ui-react';

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
         linkedContractId: this.props.invoice.linkedContractId,
         linkedContractKey: this.props.invoice.linkedContractKey,
         selectedContractId: null,
         selectedContractKey: null,
         selectContractChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const {date,work, amount, tax, total, invoiceId,
        selectedContractId, selectedContractKey,
        linkedContractId, linkedContractKey,
        selectContractChange, fieldChange} = this.state;
    const {invoice, invoiceKey, usertag, contact} = this.props;

    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }

    if (!selectContractChange && !fieldChange) {
        this.handleOpen(false);
    }

    //event.preventDefault();
    if (this.isFormValid()) {

         if (!selectContractChange && fieldChange) {
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

        else if (selectContractChange) {
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
                "linkedContractId": selectedContractId,
                "linkedContractKey":selectedContractKey,
            }
              //console.log(newContract);
            invoiceRef.update(newInvoice);

            let contractPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/contracts";
            const contractRef = firebase.database().ref(contractPath);

              // a non-null work order selected
            if (selectedContractKey) {
                  const newInvoice = {
                     "linkedInvoiceId":  invoiceId,
                     "linkedInvoiceKey": invoiceKey,
                   }
                  contractRef.child(selectedContractKey).update(newInvoice);
            }

              // was linked before
            if (linkedContractKey) {
                  const nullInvoice = {
                      "linkedInvoiceId":  null,
                      "linkedInvoiceKey": null,
                  }
                  contractRef.child(linkedContractKey).update(nullInvoice);
            }
              //if (selectOrderChange) {
            this.setState ({
                  linkedContractId:  selectedContractId,
                  linkedContractKey: selectedContractKey,
                  selectContractChange: false,
                  fieldChange: false,
                  selectedContractId:  null,
                  selectedContractKey: null,
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
      }

      if (selectedKey ==="no contract" || selectedId ==="no contract"){
          selectedId = null;
          selectedKey = null;
      }

      this.setState({
          selectedContractId:  selectedId,
          selectedContractKey: selectedKey,
          selectContractChange: true,
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
     const {contracts} = this.props;
     //const {linkedOrderId, linkedOrderKey} = this.props.contract;
     const {linkedContractKey} = this.props.invoice;

     const Options = [
       {
          key: 1111,
          text: <span>no contract</span>,
          value: "no contract",
       }
     ];

     for (var key in contracts) {
        if ( key !== linkedContractKey
             && !contracts[key].linkedInvoiceKey
             && !contracts[key].linkedInvoiceId) {
             const option = {
                key: key,
                text: <span> {contracts[key].contractId} </span>,
                value: contracts[key].contractKey,
             }
             Options.push(option);
        }
     };
     return Options;
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
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Invoice Id'
                            defaultValue = {invoice.invoiceId}
                            name="invoiceId"
                            onChange={this.handleChange} />
          </Form.Group>
        </Form>

        {this.state.linkedContractId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to contract: {this.state.linkedContractId}</h4>}
        {this.state.linkedContractId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select contract to change</h4>}
        {!this.state.linkedContractId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to contract </h4>}
        {!this.state.linkedContractId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select contract to link</h4>}
        <Select placeholder='Select Contract Id'
                name="contracts"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedContractId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedContractId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectContractChange && this.state.linkedContractId && !this.state.selectedContractId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to contract. Click Submit to confirm</h4>}

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
     contracts: state.user.contracts,
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditInvoiceModal);
