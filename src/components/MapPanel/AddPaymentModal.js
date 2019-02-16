import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class AddPaymentModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: "",
         amount: "",
         method: "",
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
         const {date,amount, method} = this.state;
         const {contact, usertag} = this.props;

         let paymentPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/payments/";
         const paymentRef = firebase.database().ref(paymentPath);
         //console.log(contractPath);
          const paymentKey = paymentRef.push().getKey();

         const newPayment = {
           "date":  String(date),
           "amount":  String(amount),
           "method": String(method),
           "paymentKey": String(paymentKey),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.clientTag)
         }
         //console.log(newPayment);
         paymentRef.child(paymentKey).set(newPayment);
         this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, method, amount} = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !method) {
        window.alert ("method is required");
        return false;
     }
     if ( amount < 1.00 ) {
        window.alert ("amount larger than 1.00 CAD is required");
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
    let titleString = "Add Payment";
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
                            label='Amount'
                             placeholder='219.99'
                            name="amount"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Method'
                            placeholder='Credit Card'
                            name="method"
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
)(AddPaymentModal);
