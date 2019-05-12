import React, { Component } from 'react';
import firebase from "../../firebase";
//import Geocode from "react-geocode";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';


export default class AddLogModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    timestamp: '',
    employeeName: '',
    leadName: '',
    logTag: '',
    logMsg: '',
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
         //console.log("data is OK");
         const { employeeName, leadName, logMsg} = this.state;
         const {usertag, leadTag } = this.props;

         const date = new Date();
           // timestamp in second
         const timestamp = Math.round(date.getTime()/1000 + 0.5);
         const localtime = date.toLocaleString();

         const logTag = "repos/" + usertag + "/leads/" + leadTag +"/leadlogs";
         const logRef = firebase.database().ref(logTag);
         const logKey = logRef.push().getKey();

         const newLog = {
              date: localtime,
              timestamp: timestamp,
              employeeName: employeeName,
              leadName: leadName,
              logTag: logKey,
              logMsg: logMsg,
         }
         logRef.child(logKey).set(newLog);
         this.clearState ();
         this.handleOpen(false);

    }
  };

  isFormValid() {
      const { date, timestamp, employeeName, leadName, logMsg} = this.state;

      let  requred = false;
      if (employeeName && logMsg ){
              requred = true;
      }
      return requred ;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  clearState = () => {
      this.setState ( {
        date: '',
        timestamp: '',
        employeeName: '',
        leadName: '',
        logTag: '',
        logMsg: '',
     });
   }

  render() {
    const {userName} = this.props;
    const titleString = userName ? (userName + ":  " + "Add New Log") : "Add New Log";

    return (
      <Modal
        trigger={<Icon name='plus' size ="small" onClick={() => this.handleOpen(true)} style={{marginLeft: "15px"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='add user' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >

               <Form.Input size ="mini"
                           label='Employee Name'
                           placeholder='Alain'
                           name="employeeName"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Lead Contact Name'
                            placeholder='James Dubois'
                            name="leadName"
                            onChange={this.handleChange} />
               <Form.Input size ="mini"
                           label='Log Message'
                           placeholder='I send a email to Alain Pascale'
                           name="logMsg"
                           onChange={this.handleChange} />
          
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
