import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class EditOrderModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,

         date: this.props.order.date,
         work: this.props.order.work,
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
         const {date,work} = this.state;
         const {orderKey, contact, usertag} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);

         let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
         const orderRef = firebase.database().ref(orderPath);
         //console.log(orderPath);

         const newOrder = {
           "date": String(date),
           "work": String(work),
           "orderKey": String(orderKey),
           "clientKey": String(contact.clientKey),
           "tag": String(contact.tag)
         }
         //console.log(newOrder);
         orderRef.set(newOrder);
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
    const {order, contact} = this.props;
    //console.log ("EditOrderModal order = " );
    //console.log (order);
    //console.log (orderKey);
    //console.log (contact.tag);
    //console.log (contact.name);
    //console.log (contact.clientKey);

    const titleString = contact.name + " :  " + "Edit Order";
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
                            defaultValue = {order.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {order.work}
                            name="work"
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
