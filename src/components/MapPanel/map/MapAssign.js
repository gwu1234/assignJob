import React, { Component } from 'react';
import firebase from "../../../firebase";
import EmployeeJob from "../../SidePanel/EmployeeJob";

import { Grid, Button, Header, Icon, Modal, Form, Menu, Dropdown} from 'semantic-ui-react';

class MapAssignModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         selectedEmployee: null
     }
}


  handleOpen = (open) => this.setState({ modalOpen: open })

  handleClose =() => {
    this.setState({ modalOpen: false });
  }

  handleCancel =() => {
    this.setState({
       modalOpen: false,
       selectedEmployee: null
    });
  }

  dropdownOptions = (employees) => {
      let options = [];
      for (var key in employees) {
          const employee = {
          key: key,
          text: <EmployeeJob
                displayAssigned={(employee)=>this.displayAssigned(employee)}
                employee={employees[key]}
                />
        }
        options.push(employee);
      };
      return options;
  }

  displayAssigned(employee) {
    const {clientName, clientKey, usertag} = this.props;
    this.setState ({
        selectedEmployee: employee,
    });
  }

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       event.preventDefault();
    }

    const {clientName, clientKey, clientStreet, clientCity,
           clientPostcode, clientLat, clientLng, usertag} = this.props;
    const {selectedEmployee} = this.state;

    //console.log("clientName = " + clientName);
    //console.log("clientKey = " + clientKey);
    //console.log("usertag = " + usertag);
    //console.log(selectedEmployee);

    const assignedPath = "repos/" + usertag + "/employees/" + selectedEmployee.tag +"/assigned";
    //console.log(assignedPath);
    const assignedRef = firebase.database().ref(assignedPath);
    let assignedKey = assignedRef.push().getKey();

    const assigned = {
         assignedKey: assignedKey,
         clientKey: clientKey,
         clientName: clientName,
         clientStreet: clientStreet,
         clientCity: clientCity,
         clientPostcode: clientPostcode,
         clientLat: clientLat,
         clientLng: clientLng,
         employeeName: selectedEmployee.name,
         employeeKey: selectedEmployee.tag

     };
     //console.log(assigned);
     assignedRef.child(assignedKey).update(assigned);

     const clientPath = "repos/" + usertag + "/clients/tags/" + clientKey;
     const clientRef = firebase.database().ref(clientPath);
     const assignUpdate = {
        "isAssigned"   : true,
        "employeeName" : selectedEmployee.name,
        "employeeKey"  : selectedEmployee.tag,
        "assignedKey"  : assignedKey,
      }
      //console.log(assignUpdate);
      clientRef.update(assignUpdate);

      this.handleCancel();
  }

  render() {
    const {clientName, employees} = this.props;
    const {selectedEmployee} = this.state;

    const titleString = clientName + " : Assign Job";

    let contentString = "Assigning " + clientName + " to an Employee";
    if (selectedEmployee) {
        contentString = "Assign " + clientName + " to " + selectedEmployee.name + " ?";
    }

    return (
      <Modal
        trigger={<Button icon size="mini" color="green" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "left"}}> Add to Job List</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='mini'
        style={{background: "#ccc", paddingTop: "0em", paddingLeft:"3em", paddingRight:"2em", paddingBottom:"1em"}}
      >
        <Header icon='add' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"green"}}/>

        <Dropdown
            placeholder='Select Employee'
            selection
            options={this.dropdownOptions(employees)}
            style = {{color: "white", left: "10px", fontSize:"0.9em"}}
        />

        {selectedEmployee && <h4 style = {{color:"red"}}> {contentString} </h4>}

        <Modal.Actions>


        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "red"}}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                style ={{position:"relative", float:"right", color: "green"}}
                >
                Submit
          </Button>

         </Modal.Actions>

      </Modal>
    )
  }
}

export default MapAssignModal;
