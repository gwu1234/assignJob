import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Button, Header, Icon, Modal, Form, Menu} from 'semantic-ui-react';
import DeleteEmployeeModal from "./DeleteEmployeeModal"
import EmployeeClient from "./EmployeeClient"

class EditEmployeeModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         lastname: this.props.employee.lastname,
         firstname: this.props.employee.firstname,
         street: this.props.employee.street,
         city: this.props.employee.city,
         postcode: this.props.employee.postcode,
         province:this.props.employee.province,
         country: this.props.employee.country,
         phone1: this.props.employee.phones?this.props.employee.phones[0]:'',
         phone2: this.props.employee.phones?
                 (this.props.employee.phones[1]?this.props.employee.phones[1]:''):
                 '',
         cell1: this.props.employee.cells?this.props.employee.cells[0]:'',
         cell2: this.props.employee.cells?
                 (this.props.employee.cells[1]?this.props.employee.cells[1]:''):
                 '',
         email1: this.props.employee.emails?this.props.employee.emails[0]:'',
         email2: this.props.employee.emails?
                 (this.props.employee.emails[1]?this.props.employee.emails[1]:''):
                 '',
         assigned: []
     }
}


  handleOpen = (open) => this.setState({ modalOpen: open })
  handleClose =() => {
    //console.log("handleClose")
    this.setState({ modalOpen: false });
  }

  handleDelete = () => this.setState({ modalOpen: false })

  deleteEmployee = () => {
      //console.log("deleteEmployee");
      const event = this.nativeEvent;
      if (event) {
          event.preventDefault();
      }

      const {usertag, id, employee } = this.props;
      const employeePath = "repos/" + usertag + "/employees/" + id;
      console.log (employeePath);
      const employeeRef = firebase.database().ref(employeePath);
      employeeRef.set(null);
      this.handleOpen(false);
  }

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid(this.state)) {
         //console.log("data is OK");
         const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,cell1,cell2,
                 email1,email2, assigned} = this.state;
         const {usertag, employeeKey, employee } = this.props;
         const name = firstname + " " + lastname;
         //let nameTag = firstname + lastname + Math.random().toString(36).substr(2, 4);
         //nameTag = (nameTag.replace(/[.,#$\[\]@ ]/g,'')).toLowerCase();

         let emails = [];
         let phones = [];
         let cells = [];

         if (email1) {
            emails.push (email1);
         }
         if (email2) {
            emails.push (email2);
         }

         if (phone1) {
            phones.push (phone1);
         }
         if (phone2) {
            phones.push (phone2);
         }

         if (cell1) {
            cells.push (cell1);
         }
         if (cell2) {
            cells.push (cell2);
         }

         const newEmployee = {
           "city":  String(city),
           "lastname": String (lastname),
           "firstname": String(firstname),
           "street": String(street),
           "name": String(name),
           "postcode": String(postcode),
           "country": String(country),
           "province":  String(province),
           "emails": emails,
           "phones": phones,
           "cells": cells,
           "tag": String (employee.tag? employee.tag: employeeKey),
         }
         //console.log(newEmployee);
         //console.log(nameTag);
         const employeePath = "repos/" + usertag + "/employees/" + employeeKey;
         //console.log(employeePath);
         const employeeRef = firebase.database().ref(employeePath);
         //const contactKey = contactRef.push().getKey();
         //console.log(contactPath);
         employeeRef.set(newEmployee);

         //const assignedArray =[];
         const assignedPath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned";
         const assignedRef = firebase.database().ref(assignedPath);

         //let newAssigned =[];
         for (var key in assigned) {
            const assignedKey = assignedRef.push().getKey();
            const newAssigned  = {
              ...assigned[key],
              assignedKey: assignedKey
            }
            console.log(newAssigned);
            assignedRef.child(assignedKey).set(newAssigned);

            const assignedClientPath = "repos/" + usertag + "/clients/tags/" + assigned[key].clientKey;
            const assignedClientRef = firebase.database().ref(assignedClientPath);
            assignedClientRef.child("isAssigned").set(true);
            assignedClientRef.child("employeeName").set(assigned[key].employeeName);
            assignedClientRef.child("employeeKey").set(assigned[key].employeeKey);
            assignedClientRef.child("assignedKey").set(assignedKey);
         }

         this.handleOpen(false);
    }
    //console.log("submit clicked");
    //this.handleOpen(false);
  };

  isFormValid() {
    const {lastname, firstname, street, postcode,
           phone1, phone2, cell1, cell2}
           = this.state;
    if (!lastname || !firstname ){
       window.alert("lastname and firstname are required");
       return false;
    }

    if (!street || !postcode ){
       window.alert("street name, number and post code are required");
       return false;
    }

    if (!phone1 && !phone2 && !cell1 && !cell2 ){
       window.alert("at least one phone or cell number is required");
       return false;
    }
    return true;
  }

  handleChange = event => {
      //console.log([event.target.name]);
      //console.log(event.target.value);
      this.setState({ [event.target.name]: event.target.value });
  };

  addAssigned = assigned => {
     let previous = this.state.assigned;
     previous.push(assigned);
     this.setState({
         assigned: previous
    });
    //console.log(this.state.assigned);
  }

  displayClients = clients =>
     clients.length > 0 &&
     clients.map(client => (
         <EmployeeClient
             key={client.clientKey}
             clientKey={client.clientKey}
             client={client.client}
             employee={this.props.employee}
             employeeKey={this.props.employeeKey}
             addAssigned={(assigned)=>this.addAssigned(assigned)}
         />
    ));


  render() {
    const {employee, employeeKey, usertag, id, clients} = this.props;
    const titleString = "Edit Employee : " + employee.name;
    let email1 = "";
    let email2 = "";
    let phone1 = "";
    let phone2 = "";
    let cell1 = "";
    let cell2 = "";

    //console.log ("EditEmployeeModal id = " + id);
    //console.log (employee.cells[0]);
    //console.log (employee.cells["0"]);

    if (employee.emails && employee.emails[0]) {
        email1 = employee.emails[0];
    }
    if (employee.emails && employee.emails[1]) {
        email2 = employee.emails[1];
    }

    if (employee.phones && employee.phones[0]) {
        phone1 = employee.phones[0];
    }
    if (employee.phones && employee.phones[1]) {
        phone2 = employee.phones[1];
    }

    if (employee.cells && employee.cells[0]) {
        cell1 = employee.cells[0];
    }
    if (employee.cells && employee.cells[1]) {
        cell2 = employee.cells[1];
    }


    //converting nested objects to object array
    const clientArray =[];
    for (var key in clients) {
       const newClient = {
         clientKey: key,
         client: clients[key]
       }
       if ((newClient.client.isAssigned==null) || (newClient.client.isAssigned==false)) {
           clientArray.push(newClient);
       }
    }

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc", paddingTop: "0em", paddingLeft:"3em", paddingRight:"2em", paddingBottom:"1em"}}
      >
        <Header icon='add user' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>
        <Grid>
        <Grid.Row style={{paddingTop: "0em", paddingBottom:"0em", marginBotton:"0px", border: "1px dotted white"}}>

        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='First Name'
                           placeholder = {employee.firstname}
                           defaultValue = {employee.firstname}
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Last Name'
                            placeholder= {employee.lastname}
                            defaultValue = {employee.lastname}
                            name="lastname"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Street & No'
                            defaultValue = {employee.street}
                            name="street"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="small"
                            label='City'
                            defaultValue = {employee.city}
                            name="city"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='PostCode'
                            defaultValue = {employee.postcode}
                            name="postcode"
                            onChange={this.handleChange} />
               <Form.Input size ="small"
                           label='Province'
                           defaultValue = {employee.province}
                           name="province"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Country'
                            defaultValue = {employee.country}
                            name="country"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='Phone1'
                           defaultValue = {phone1}
                           name="phone1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Phone2'
                            defaultValue = {phone2}
                            name="phone2"
                            onChange={this.handleChange} />
               <Form.Input size ="small"
                           label='Cell 1'
                           defaultValue = {cell1}
                           name="cell1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Cell 2'
                            defaultValue = {cell2}
                            name="cell2"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='email 1'
                           defaultValue = {email1}
                           name="email1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='email 2'
                            defaultValue = {email2}
                            name="email2"
                            onChange={this.handleChange} />
           </Form.Group>
        </Form>
        </Modal.Content>

        </Grid.Row>
        <Grid.Row columns='equal' style={{width: "100%", marginTop:"0px", paddingTop:"0px"}}>
        <Grid.Column style={{height: "200px", border: "1px dotted white", overflow: "scroll"}}>
            assigned
        </Grid.Column >
        <Grid.Column style={{height: "200px", border: "1px dotted white", overflow: "scroll"}}>
             <Menu.Menu >
                {clientArray.length>0 && this.displayClients(clientArray)}
            </Menu.Menu>
        </Grid.Column>
        </Grid.Row>

      </Grid>


        <Modal.Actions>

        <DeleteEmployeeModal
            name={employee.name}
            handleClose={()=>this.handleClose()}
            deleteEmployee={()=>this.deleteEmployee()}
        />


        <Button color="red" size="small" inverted
              onClick={() => this.handleOpen(false)}
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

const mapStateToProps = state => ({
     clients: state.user.clientList,
   }
);

export default connect(
  mapStateToProps,
  null
)(EditEmployeeModal);
