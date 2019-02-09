import React, { Component } from 'react';
import firebase from "../../../firebase";

import { Grid, Button, Header, Icon, Modal, Form, Menu} from 'semantic-ui-react';

class MapUnassignModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false
     }
}


  handleOpen = (open) => this.setState({ modalOpen: open })

  handleClose =() => {
    this.setState({ modalOpen: false });
  }

  handleCancel =() => {
    //console.log("handleClose")
    this.setState({
       modalOpen: false,
    });
  }


  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }

    const {employeeName, employeeKey, assignedKey, clientName, clientKey, usertag} = this.props;

    const clientPath = "repos/" + usertag + "/clients/tags/" + clientKey;
    const clientRef = firebase.database().ref(clientPath);
    const assignUpdate = {
        "isAssigned"   : false,
        "employeeName" : "",
        "employeeKey"  : "",
        "assignedKey"  : "",
     }
     clientRef.update(assignUpdate);

     //console.log("employeeName = " + employeeName);
     //console.log("employeeKey = " + employeeKey);
     //console.log("assignedKey = " + assignedKey);
     //console.log("clientName = " + clientName);
     //console.log("clientKey = " + clientKey);
     //console.log("usertag = " + usertag);
     //console.log(clientPath);
     //console.log(assignUpdate);

     const assignedPath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned/"+ assignedKey;
     //console.log(assignedPath);
     const assignedRef = firebase.database().ref(assignedPath);
      assignedRef.set(null);
     this.handleCancel();
  }

  render() {
    const {employeeName, clientName} = this.props;

    const titleString = "Remove " + clientName + " from Job List of " + employeeName + " ?";

    return (
      <Modal
        trigger={<Button icon size="mini" color="red" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "left"}}> Remove from Job List</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='mini'
        style={{background: "#ccc", paddingTop: "0em", paddingLeft:"3em", paddingRight:"2em", paddingBottom:"1em"}}
      >
        <Header icon='delete' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"red"}}/>

        <Modal.Actions>


        <Button color="green" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "green"}}
              >
              Cancel
        </Button>

          <Button color='red' size="small" inverted
                onClick={() =>this.handleSubmit()}
                style ={{position:"relative", float:"right", color: "red"}}
                >
                Submit
          </Button>

         </Modal.Actions>

      </Modal>
    )
  }
}

export default MapUnassignModal;
