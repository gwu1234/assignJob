import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class AddDeliveryModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: ''
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
         const {date,work, employee} = this.state;
         const {contact, usertag} = this.props;

         let deliveryPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/deliverys/";
         const deliveryRef = firebase.database().ref(deliveryPath);
         //console.log(contractPath);
         const deliveryKey = deliveryRef.push().getKey();

         const newDelivery = {
             "date":  String(date),
             "work":  String(work),
             "employee": String(employee),
             "deliveryKey": String(deliveryKey),
             "clientKey": String(contact.clientKey),
             "clientTag": String(contact.clientTag)
         }
         console.log(newDelivery);
         deliveryRef.child(deliveryKey).set(newDelivery);
         this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, work, employee} = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
        return false;
     }
     if ( !employee) {
        window.alert ("employee is required");
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
    const {delivery, contact, deliveryKey} = this.props;

    let titleString = "Add Delivery";
    if (contact) {
         titleString = contact.name + " :  " + "Add New Contract";
    }

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
                           placeholder='December 11, 2018'
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                            placeholder='snow removal'
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Employee'
                           placeholder='Alain Dubois'
                           name="employee"
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
)(AddDeliveryModal);
