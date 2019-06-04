import React, { Component } from 'react';
import firebase from "../../firebase";
import Geocode from "react-geocode";
import { connect } from "react-redux";
import { Grid, Button, Header, Icon, Modal, Form, Menu, Message} from 'semantic-ui-react';
import DeleteEmployeeModal from "./DeleteEmployeeModal"
import EmployeeClient from "./EmployeeClient"
import EmployeeAssigned from "./EmployeeAssigned"

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
         assigned: [],
         newAssigned: false,
         unassigned:[],
         newUnassigned: false,
         contactChanged: false,
         access: this.props.employee.access,
     }
}


  handleOpen = (open) => this.setState({ modalOpen: open })
  handleClose =() => {
    //console.log("handleClose")
    this.setState({ modalOpen: false });
  }

  handleCancel =() => {
    //console.log("handleClose")
    this.setState({
       modalOpen: false,
       newAssigned: false,
       assigned: [],
       unassigned:[],
       newUnassigned: false,
       contactChanged: false,
    });
  }


  handleDelete = () => this.setState({ modalOpen: false })

  deleteEmployee = () => {
      //console.log("deleteEmployee");
      const event = this.nativeEvent;
      if (event) {
          event.preventDefault();
      }

      const {usertag, employee} = this.props;
      const employeePath = "repos/" + usertag + "/employees/" + employee.tag;
      console.log (employeePath);
      const employeeRef = firebase.database().ref(employeePath);
      employeeRef.set(null);
      this.handleOpen(false);
  }

  async getLocations(client, location) {
    Geocode.setApiKey("AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE");
      const r = await this.getLocation(location)
      if (r != null) {
          client.lng = r.lng;
          client.lat = r.lat;
          //console.log (location.key) ;
          //console.log (location.databaseRef);
          location.databaseRef.update(client);
      }
  }

  async getLocation(location) {
    try {
      let response = await Geocode.fromAddress(location.address);
      //console.log("RESULT:", location.address, await response.results[0].geometry.location);
      return (
        {
          lat: await response.results[0].geometry.location.lat,
          lng: await response.results[0].geometry.location.lng
        }
      );
    }
    catch(err) {
      console.log("Error fetching geocode lat and lng:", err);
    }
    return null;
  }


  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid(this.state)) {
         const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,cell1,cell2, access,
                 email1,email2, assigned, unassigned,
                 newAssigned, newUnassigned, contactChanged} = this.state;
         const {usertag, employeeKey, employee } = this.props;
         const name = firstname + " " + lastname;

         if (contactChanged) {
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
                "access":access,
                "tag": String (employee.tag? employee.tag: employeeKey),
             }

             const employeePath = "repos/" + usertag + "/employees/" + employeeKey;
             const employeeRef = firebase.database().ref(employeePath);

             const address = street + ", " + city + ", " + postcode;
             const location = {
                address: address,
                databaseRef: employeeRef
             }

             this.getLocations (newEmployee,location);

             const userPath = "users/" + usertag + "/accesses/" + employeeKey;
             const userRef = firebase.database().ref(userPath);
             const newAccess = {
                 "employeeKey": String (employee.tag? employee.tag: employeeKey),
                 "access":access,
             }
             userRef.update(newAccess);
         }

         /*if (newAssigned) {
             const assignedPath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned";
             const assignedRef = firebase.database().ref(assignedPath);

             for (var key in assigned) {
                let assignedKey = assignedRef.push().getKey();
                const newAssigned  = {
                    ...assigned[key],
                    assignedKey: assignedKey
                 }
                 assignedRef.child(assignedKey).set(newAssigned);

                 const assignedClientPath = "repos/" + usertag + "/clients/tags/" + assigned[key].clientKey;
                 const assignedClientRef = firebase.database().ref(assignedClientPath);
                 assignedClientRef.child("isAssigned").set(true);
                 assignedClientRef.child("employeeName").set(assigned[key].employeeName);
                 assignedClientRef.child("employeeKey").set(assigned[key].employeeKey);
                 assignedClientRef.child("assignedKey").set(assignedKey);
             }
         }*/

         /*if (newUnassigned) {
               //const assignedPath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned";
               //const assignedClientPath = "repos/" + usertag + "/clients/tags/" + assigned[key].clientKey;
               //const unassignedEmployeePath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned";
               //const unassignedEmployeeRef = firebase.database().ref(assignedPath);
               //const unassignedClientPath = "repos/" + usertag + "/clients/tags";
               //const unassignedClientRef = firebase.database().ref(assignedClientPath);

               for (var key in unassigned) {
                  const unassignedEmployeePath = "repos/" + usertag + "/employees/" + employeeKey +"/assigned/" + unassigned[key].assignedKey;
                  const unassignedEmployeeRef = firebase.database().ref(unassignedEmployeePath);
                  const unassignedClientPath = "repos/" + usertag + "/clients/tags/" + unassigned[key].clientKey;
                  const unassignedClientRef = firebase.database().ref(unassignedClientPath);

                  //console.log (unassignedEmployeePath);
                  //console.log (unassignedClientPath);

                  unassignedEmployeeRef.set(null);

                  unassignedClientRef.child("isAssigned").set(false);
                  unassignedClientRef.child("employeeName").set(null);
                  unassignedClientRef.child("employeeKey").set(null);
                  unassignedClientRef.child("assignedKey").set(null);
              }
         }*/

         this.handleCancel();
    }
  };

  isFormValid() {
    const {lastname, firstname, street, postcode, city,
           phone1, phone2, cell1, cell2}
           = this.state;
           if (!lastname || !firstname ){
              window.alert("lastname and firstname are required");
              return false;
           } else if (lastname.length < 2) {
              window.alert("full lastname please");
              return false;
           } else if (firstname.length < 2) {
              window.alert("full firstname please");
              return false;
           }

           if (!street || !postcode ){
              window.alert("street name, number and post code are required");
              return false;
           } else if (street.length < 3) {
             window.alert("full street name and number please");
             return false;
           } else if (postcode.length < 5) {
             window.alert("full postcode please");
             return false;
           }

           if (!city){
              window.alert("city is required");
              return false;
           } else if (city.length < 3) {
             window.alert("full city name please");
             return false;
           }

           if (!phone1 && !cell1 && !phone2 && !cell2){
              window.alert("at least one phone, one cell is required");
              return false;
           }

    return true;
  }

  handleChange = event => {
      //console.log([event.target.name]);
      //console.log(event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
        contactChanged: true,
      });
  };

  /*addAssigned = assigned => {
     let previous = this.state.assigned;
     //console.log(assigned);
     previous.push(assigned);
     this.setState({
         assigned: previous,
         newAssigned: true,
    });
    //console.log(this.state.newAssigned);
  }*/

  /*addUnassigned = unassigned => {
     let previous = this.state.unassigned;
     //console.log(assigned);
     previous.push(unassigned);
     this.setState({
         unassigned: previous,
         newUnassigned: true,
    });
    //console.log(this.state.newUnassigned);
  }*/

  /*isNewAssigned (clientKey) {
      const {assigned} = this.state;
      let result = false;

      for (var key in assigned ) {
          if (assigned[key].clientKey === clientKey) {
            //console.log (clientKey);
            //console.log (key);
            result = true;
            return result;
          }
       }
      return result;
  }*/

  //assignedKey: key,
  //assigned: employee.assigned[key]
/*displayAssigned = assigneds =>
   assigneds.length > 0 &&
   assigneds.map(assigned => (
       <EmployeeAssigned
           key={assigned.assignedKey}
           assignedKey = {assigned.assignedKey}
           employee={this.props.employee}
           employeeKey={assigned.assigned.employeeKey}
           assigned = {assigned.assigned}
           addUnassigned={(unassigned)=>this.addUnassigned(unassigned)}
       />
  ));*/

/*  displayClients = clients =>
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
    ));*/


  render() {
    const {employee, clients, french} = this.props;
    //const {assigned, unassigned} = this.state;

    let titleString = "Edit Employee : " + employee.name;
    if (french) {
       titleString = "modifier employe : " + employee.name;
    }
    const firstname = french? "Prénom" : "Firstname" ;
    const lastname = french? "Nom de Famille" : "Lastname" ;
    const street = french? "Rue & No." : "Street & No."
    const city = french? "Ville" : "City"

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
    /*const clientArray =[];
    for (var key in clients) {
       const newClient = {
         clientKey: key,
         client: clients[key]
       }
       if (  (newClient.client.isAssigned===null || newClient.client.isAssigned===false)
          && !this.isNewAssigned (key) ) {
           clientArray.push(newClient);
       }
    }*/

    //converting nested objects to object array
    const assignedArray = [];

    for (var key in employee.assigned) {
       //console.log(employee.assigned);
       //console.log (key);
       //console.log();
       const assignedClient = {
         assignedKey: key,
         assigned: employee.assigned[key]
       }
       //console.log(assignedClient);
       assignedArray.push(assignedClient);
    }

    /*const newAssignedNotice = assigned.length
                 + " New Clients Just Assigned to " + employee.name
                 + " , Click Submit to Commit ";

    const unassignedNotice = "Removing " + unassigned.length
                  + " Clients from " + employee.name + " Job List"
                  + " , Click Submit to Commit ";*/

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
                           label={firstname}
                           placeholder = {employee.firstname}
                           defaultValue = {employee.firstname}
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label={lastname}
                            placeholder= {employee.lastname}
                            defaultValue = {employee.lastname}
                            name="lastname"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label={street}
                            defaultValue = {employee.street}
                            name="street"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="small"
                            label={city}
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
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='access code'
                           defaultValue = {employee.access}
                           name="access"
                           onChange={this.handleChange} />
           </Form.Group>
        </Form>
        {employee.truckAssigned && <Message style={{marginTop: "0em", paddingTop:"0.2em", marginBottom:"0.5em", paddingBottom:"0.2em"}}>
            <Message.Header>truck assigned: {" " + employee.truckModel + " , " + employee.truckYear} </Message.Header>
        </Message>}
        </Modal.Content>

        </Grid.Row>
      </Grid>


        <Modal.Actions>

        <DeleteEmployeeModal
            name={employee.name}
            truckAssigned = {employee.truckAssigned}
            french = {french}
            handleClose={()=>this.handleClose()}
            deleteEmployee={()=>this.deleteEmployee()}
        />


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

const mapStateToProps = state => ({
     clients: state.user.clientList,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  null
)(EditEmployeeModal);
