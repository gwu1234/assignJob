import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select} from 'semantic-ui-react';

class EditContractModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: this.props.contract.date,
         work: this.props.contract.work,
         price: this.props.contract.price,
         tax: this.props.contract.tax,
         total: this.props.contract.total,
         contractId: this.props.contract.contractId,
         linkedOrderId: this.props.contract.linkedOrderId,
         linkedOrderKey: this.props.contract.linkedOrderKey,
         selectedOrderId: null,
         selectedOrderKey: null,
         selectOrderChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const {date,work, price, tax, total, contractId,
        selectedOrderId, selectedOrderKey,
        linkedOrderId, linkedOrderKey,
        selectOrderChange, fieldChange} = this.state;
    const {contact, contractKey, usertag} = this.props;

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
         /*const {date,work, price, tax, total, contractId,
           selectedOrderId, selectedOrderKey,
           linkedOrderId, linkedOrderKey,
           selectOrderChange} = this.state;
         const {contact, contractKey, usertag} = this.props;*/
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);

         if (!selectOrderChange && fieldChange) {
              let contractPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/contracts/" +contractKey;
              const contractRef = firebase.database().ref(contractPath);
              //console.log(contractPath);

              const newContract = {
                  "date":  String(date),
                  "work":  String(work),
                  "price": String(price),
                  "tax":   String(tax),
                  "total": String(total),
                  "contractId": String(contractId),
                  "contractKey": String(contractKey),
                  "clientKey": String(contact.clientKey),
                  "clientTag": String(contact.clientTag),
                  //"linkedOrderId": selectedOrderId,
                  //"linkedOrderKey":selectedOrderKey,
              }
              //console.log(newContract);
              contractRef.update(newContract);

              //if (selectOrderChange) {
              this.setState ({
                   //linkedOrderId:  selectedOrderId,
                   //linkedOrderKey: selectedOrderKey,
                   //selectOrderChange: false,
                   fieldChange: false,
                   //selectedOrderId:  null,
                   //selectedOrderKey: null,
              })
              //}
              this.handleOpen(false);
          }

          else if (selectOrderChange) {
               let contractPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/contracts/" +contractKey;
               const contractRef = firebase.database().ref(contractPath);
               //console.log(contractPath);

               const newContract = {
                   "date":  String(date),
                   "work":  String(work),
                   "price": String(price),
                   "tax":   String(tax),
                   "total": String(total),
                   "contractId": String(contractId),
                   "contractKey": String(contractKey),
                   "clientKey": String(contact.clientKey),
                   "clientTag": String(contact.clientTag),
                   "linkedOrderId": selectedOrderId,
                   "linkedOrderKey":selectedOrderKey,
               }
               //console.log(newContract);
               contractRef.update(newContract);

               let orderPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/workorders";
               const orderRef = firebase.database().ref(orderPath);

               // a non-null work order selected
               if (selectedOrderKey) {
                   const newOrder = {
                      "linkedContractId":  contractId,
                      "linkedContractKey": contractKey,
                    }
                    orderRef.child(selectedOrderKey).update(newOrder);
               }

               // was linked before
               if (linkedOrderKey) {
                    const nullOrder = {
                       "linkedContractId":  null,
                       "linkedContractKey": null,
                    }
                    orderRef.child(linkedOrderKey).update(nullOrder);
               }
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
     const {date, work } = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
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
     const {linkedOrderKey} = this.props.contract;

     const Options = [
       {
          key: 1111,
          text: <span>no order</span>,
          value: "no order",
       }
     ];

     for (var key in orders) {
        if ( key !== linkedOrderKey
            && !orders[key].linkedContractKey
            && !orders[key].linkedContractId) {
           //if (key !== linkedOrderKey) {
            const option = {
               key: key,
               text: <span> {orders[key].orderId} </span>,
               value: orders[key].orderKey,
            }
            Options.push(option);
        }
     };
     return Options;
  }

  render() {
    const {contract, contact} = this.props;
    //console.log ("EditContractModal order = " );
    //console.log (contract);
    //console.log (contractKey);
    //console.log (contact);
    //console.log (contact.tag);
    //console.log (contact.clientKey);
    let titleString = "Edit Contract";
    if (contact) {
         titleString = contact.name + " :  " + "Edit Contract";
    }

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
                            defaultValue = {contract.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {contract.work}
                            name="work"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Price'
                            defaultValue = {contract.price}
                            name="price"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Tax'
                            defaultValue = {contract.tax}
                            name="tax"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Total'
                            defaultValue = {contract.total}
                            name="total"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                 <Form.Input size ="mini"
                             label='Contract Id'
                             defaultValue = {contract.contractId}
                             name="contractId"
                             onChange={this.handleChange} />
            </Form.Group>
        </Form>

        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to work order: {this.state.linkedOrderId}</h4>}
        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select work order to change</h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to work order </h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select work order to link</h4>}
        <Select placeholder='Select Order Id'
                name="orders"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedOrderId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectOrderChange && this.state.linkedOrderId && !this.state.selectedOrderId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to work order. Click Submit to confirm</h4>}

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
     orders: state.user.workOrder,
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditContractModal);
