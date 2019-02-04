import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class EditOrderModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,

         date: this.props.delivery.date,
         work: this.props.delivery.work,
         employee: this.props.delivery.employee,
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
         const {date,work, employee} = this.state;
         const {delivery, deliveryKey, contact, usertag} = this.props;

         let deliveryPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/deliverys/" +deliveryKey;
         const deliveryRef = firebase.database().ref(deliveryPath);
         //console.log(deliveryPath);

         const newDelivery = {
           "date": String(date),
           "work": String(work),
           "employee": String (employee),
           "deliveryKey": String(deliveryKey),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.clientTag)
         }
         console.log(newDelivery);
         deliveryRef.set(newDelivery);
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
    const {delivery, contact} = this.props;

    let titleString = "Edit Delivery";
    if (contact) {
        titleString = contact.name + " :  " + "Edit Delivery";
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
                            defaultValue = {delivery.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {delivery.work}
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Employee'
                            defaultValue = {delivery.employee}
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
)(EditOrderModal);
