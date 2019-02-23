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
         selectedValue: null,
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
         const {date,work, price, tax, total, contractId} = this.state;
         const {contact, contractKey, usertag} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);

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
           "clientTag": String(contact.clientTag)
         }
         //console.log(newContract);
         contractRef.set(newContract);
         this.handleOpen(false);
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

  handleSelectChange = (name, event) => {
      let value;

      console.log(name);
      console.log(event);
      console.log(event.target.value);
      console.log(event.target.textContent);

      if (event.target.value !== undefined) {
        value = event.target.value;
      } else {
        value = event.target.textContent;
      }
     this.setState({ selectedValue: value});
      //let newExtraInfo = Object.assign(this.state.extraInfo, { [name]: value })

      //this.setState({ extraInfo: newExtraInfo});
    }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

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
    //console.log (titleString);

    const orderOptions = [
       { key: '001', text: 'Order-001' },
       { key: '002', text: 'Order-002' },
       { key: '003', text: 'Order-003' },
       { key: '004', text: 'Order-004' },
       { key: '005', text: 'Order-005' },
       { key: '006', text: 'Order-006' }
     ];

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
        <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.5em"}}>select linked work order id: </h4>
        <Select placeholder='Select Order Id'
                name="orders"
                defaultValue ={"select linked work order id"}
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={(e) => this.handleSelectChange('orders', e)}
                options={orderOptions} />
        {this.state.selectedValue && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedValue} &nbsp; selected. Click Submit to confirm</h4>}
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
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditContractModal);
