import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class AddPaymentModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         date: "",
         amount: "",
         method: "",
         paymentId: "",
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
         const {date,amount, method, paymentId} = this.state;
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
           "paymentId": String(paymentId),
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
    const {contact} = this.props;
    //console.log ("EditContractModal order = " );
    //console.log (contract);
    //console.log (contractKey);
    //console.log (contact);
    //console.log (contact.tag);
    //console.log (contact.clientKey);
    let titleString = "Add Payment";
    if (contact) {
         titleString = contact.name + " :  " + "Add New Payment";
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

        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

            <DayPicker
                     onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
                     month={new Date()}
                     selectedDays={[new Date()]}
            />

        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>

        <Form >
           <Form.Group inline width='equal' >
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
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Payment Id'
                            placeholder='p-2018-003344'
                            name="paymentId"
                            onChange={this.handleChange} />
           </Form.Group>
        </Form>
        </Grid.Column>
        </Grid>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => {
                 this.handleOpen(false);
                 this.setState ({
                   date: "",
                   amount: "",
                   method: "",
                   paymentId: "",
                 })}}
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
