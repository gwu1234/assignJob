import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class AddContractModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: "",
         work: "",
         price: "",
         tax: "",
         total: ""
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
         const {date,work, price, tax, total} = this.state;
         const {contact, usertag} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);

         let contractPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/contracts/";
         const contractRef = firebase.database().ref(contractPath);
         //console.log(contractPath);
         const contractKey = contractRef.push().getKey();

         const newContract = {
           "date":  String(date),
           "work":  String(work),
           "price": String(price),
           "tax":   String(tax),
           "total": String(total),
           "contractKey": String(contractKey),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.clientTag)
         }
         //console.log(newContract);
         contractRef.child(contractKey).set(newContract);
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

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {contact} = this.props;
    //console.log ("EditContractModal order = " );
    //console.log (contract);
    //console.log (contractKey);
    //console.log (contact);
    //console.log (contact.tag);
    //console.log (contact.clientKey);
    let titleString = "Add Contract";
    if (contact) {
         titleString = contact.name + " :  " + "Add New Contract";
    }
    //console.log (titleString);

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right", color:"white"}}/>}
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
                            placeholder='Feb. 1, 2019'
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             placeholder='cutting grass'
                            name="work"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Price'
                            placeholder='200.00'
                            name="price"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Tax'
                            placeholder='30.00'
                            name="tax"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Total'
                            placeholder='230.00'
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
   }
);

export default connect(
  mapStateToProps,
  {}
)(AddContractModal);
