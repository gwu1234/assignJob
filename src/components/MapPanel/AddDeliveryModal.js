import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class AddDeliveryModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: '',
    deliveryId:"",
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
         const {date,work, employee, deliveryId} = this.state;
         const {contact, usertag} = this.props;

         let deliveryPath = "repos/"+usertag+"/clients/data/"+ contact.clientKey +"/deliverys/";
         const deliveryRef = firebase.database().ref(deliveryPath);
         //console.log(contractPath);
         const deliveryKey = deliveryRef.push().getKey();

         const newDelivery = {
             "date":  String(date),
             "work":  String(work),
             "employee": String(employee),
             "deliveryId": String(deliveryId),
             "deliveryKey": String(deliveryKey),
             "clientKey": String(contact.clientKey),
         }
         //console.log(newDelivery);
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
    const {contact } = this.props;

    let titleString = "Add Delivery";
    if (contact) {
         titleString = contact.name + " :  " + "Add New Contract";
    }

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right", color:"black"}}/>}
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
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Delivery Id'
                           placeholder='d-00011145'
                           name="deliveryId"
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
                  date: '',
                  work: '',
                  deliveryId:"",
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

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let clientContact = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      clientContact = reposData["clients"]["data"][clienttag]?
             reposData["clients"]["data"][clienttag]["contact"]:{};
      //console.log(clientContact);
  }
  return {
     contact: clientContact,
     usertag: state.user.usertag,
     french: state.user.french,
   }
};

export default connect(
  mapStateToProps,
  {}
)(AddDeliveryModal);
