import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import Geocode from "react-geocode";
import { Button, Header, Icon, Modal, Form, Message, Dropdown} from 'semantic-ui-react';
const LEAD_POSITIVE = 1;  // green
const LEAD_RESPONSIVE = 2; // blue
const LEAD_NEW = 3;  // red
const LEAD_NOT_RESPONSIVE = 4; // orange
const LEAD_DECLINE = 5; // yellow

class EditLeadContactModal extends Component {
  constructor(props) {
      super(props);
      const {contact} = this.props;
      this.state = {
         modalOpen: false,
         lastname: contact.lastname,
         firstname: contact.firstname,
         street: contact.street,
         city: contact.city,
         status: contact.status,
         postcode: contact.postcode,
         province:contact.province,
         country: contact.country,
         phone1: contact.phones?contact.phones[0]:'',
         phone2: contact.phones?
                 (contact.phones[1]?contact.phones[1]:''):
                 '',
         phone3: contact.phones?
                 (contact.phones[2]?contact.phones[2]:''):
                 '',
         cell1: contact.cells?contact.cells[0]:'',
         cell2: contact.cells?
                (contact.cells[1]?contact.cells[1]:''):
                 '',
         cell3: contact.cells?
                (contact.cells[2]?contact.cells[2]:''):
                '',
         email1: contact.emails?contact.emails[0]:'',
         email2: contact.emails?
                 (contact.emails[1]?contact.emails[1]:''):
                 '',
         email3: contact.emails?
                 (contact.emails[2]?contact.emails[1]:''):
                 '',

        fieldChange: false,
        isEmployeeAssigned : false,
        employeeAssigned : null,
        isEmployeeUnassigned : false,
        employeeUnassignedKey : null,
     }
  }

  componentWillReceiveProps(nextProps) {
      const {contact} = nextProps;
      if (contact) {

        this.setState ( {

             lastname: contact.lastname,
             firstname: contact.firstname,
             street: contact.street,
             city: contact.city,
             postcode: contact.postcode,
             province:contact.province,
             country: contact.country,
             status: contact.status,
             phone1: contact.phones?contact.phones[0]:'',
             phone2: contact.phones?
                     (contact.phones[1]?contact.phones[1]:''):
                     '',
             phone3: contact.phones?
                     (contact.phones[2]?contact.phones[2]:''):
                     '',
             cell1: contact.cells?contact.cells[0]:'',
             cell2: contact.cells?
                    (contact.cells[1]?contact.cells[1]:''):
                     '',
             cell3: contact.cells?
                    (contact.cells[2]?contact.cells[2]:''):
                    '',
             email1: contact.emails?contact.emails[0]:'',
             email2: contact.emails?
                     (contact.emails[1]?contact.emails[1]:''):
                     '',
             email3: contact.emails?
                     (contact.emails[2]?contact.emails[1]:''):
                     '',
             fieldChange: false,
             isEmployeeAssigned : false,
             employeeAssigned : null,
             isEmployeeUnassigned : false,
             employeeUnassignedKey : null,
         });
      }
    }


  handleOpen = (open) => this.setState({ modalOpen: open })

  async getLocations(lead, location) {
    Geocode.setApiKey("AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE");
      const r = await this.getLocation(location)
      if (r != null) {
          lead.lng = r.lng;
          lead.lat = r.lat;

          if (location && location.leadContactRef) {
              location.leadContactRef.update(lead);
          }

          if (location && location.employeeLeadRef) {
              //location.employeeLeadRef.update(lead);
              location.employeeLeadRef.update({
                    ...lead,
                    "employeeKey": null,
                    "employeeTag": null,
                    "employeeFirstname": null,
                    "employeeLastName" : null,
                    "isEmployeeAssigned" : null,
              });
          }
      }
  }

  async getLocation(location) {
    try {
      let response = await Geocode.fromAddress(location.address);
      console.log("RESULT:", location.address, await response.results[0].geometry.location);
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

    if (this.isFormValid()) {
         //console.log("data is OK");
         const { lastname,firstname,street,city,postcode,province,
                 country,status,phone1,phone2,phone3,cell1,cell2,cell3,
                 email1,email2,email3, fieldChange, isEmployeeAssigned,
                 employeeAssigned, isEmployeeUnassigned, employeeUnassignedKey} = this.state;
         const {usertag, contact} = this.props;
         const name = (firstname && lastname) ? (firstname + " " + lastname) : "";

         let emails = [];
         let phones = [];
         let cells = [];

         if ( !fieldChange ) {
            this.clearState ();
            this.handleOpen(false);
            return;
         }

         if (email1) {
            emails.push (email1);
         }
         if (email2) {
            emails.push (email2);
         }
         if (email3) {
            emails.push (email3);
         }

         if (phone1) {
            phones.push (phone1);
         }
         if (phone2) {
            phones.push (phone2);
         }
         if (phone3) {
            phones.push (phone3);
         }

         if (cell1) {
            cells.push (cell1);
         }
         if (cell2) {
            cells.push (cell2);
         }
         if (cell3) {
            cells.push (cell3);
         }

         const date = new Date();
           // timestamp in second
         const timestamp = Math.round(date.getTime()/1000 + 0.5);
         const localtime = date.toLocaleString();

         if (isEmployeeAssigned) {
            const leadTag = "repos/" + usertag + "/leads";
            const leadRef = firebase.database().ref(leadTag);
            //const leadKey = leadRef.push().getKey();
            let leadKey = contact.leadTag;
            if (!leadKey) {
               leadKey = leadRef.push().getKey();
            }

            const employeeTag = "repos/" + usertag + "/employees/" + employeeAssigned.tag + "/leads/" + leadKey;
            const employeeRef = firebase.database().ref(employeeTag);

            const newLead = {
               "city":  (city? String(city):""),
               "lastname": (lastname? String(lastname):""),
               "firstname": (firstname? String(firstname):""),
               "street": (street? String(street):""),
               "name": (name? String(name):""),
               "postcode": (postcode? String(postcode):""),
               "country": (country? String(country):""),
               "province":  (province? String(province):""),
               "status": status,
               "emails": emails,
               "phones": phones,
               "cells": cells,
               "leadTag": leadKey,
               "timestamp": timestamp,
               "date": localtime ,
               "employeeKey": employeeAssigned.tag,
               "employeeTag": employeeAssigned.tag,
               "employeeFirstname": employeeAssigned.firstname,
               "employeeLastName" : employeeAssigned.lastname,
               "isEmployeeAssigned" : "true",
            }

            if (  (street && city && postcode) ||
               (street && city && province && country) ) {
               const address = postcode?(street + ", " + city + ", " + postcode)
                                    :(street + ", " + city + ", " + province + ", " + country);
               const location = {
                   address: address,
                   key: leadKey,
                   leadContactRef: leadRef.child(leadKey).child("contact"),
                   employeeLeadRef: employeeRef,
               }
                this.getLocations (newLead,location);
                this.clearState ();
                this.handleOpen(false);
            } else {
               leadRef.child(leadKey).child("contact").set(newLead);
               employeeRef.set({
                     ...newLead,
                     "employeeKey": null,
                     "employeeTag": null,
                     "employeeFirstname": null,
                     "employeeLastName" : null,
                     "isEmployeeAssigned" : null,
               });
               this.clearState ();
               this.handleOpen(false);
             }
         }

         else if (isEmployeeUnassigned) {
           //const leadTag = "repos/" + usertag + "/leads";
           //const leadRef = firebase.database().ref(leadTag);
           //const leadKey = leadRef.push().getKey();
           let leadKey = contact.leadTag;
           if (!leadKey) {
              this.clearState ();
              this.handleOpen(false);
              return;
           }
           const leadTag = "repos/" + usertag + "/leads/" + leadKey + "/contact";
           const leadRef = firebase.database().ref(leadTag);
           const employeeTag = "repos/" + usertag + "/employees/" + employeeUnassignedKey + "/leads/" + leadKey;
           const employeeRef = firebase.database().ref(employeeTag);
           employeeRef.set(null);

           const newLead = {
              "city":  (city? String(city):""),
              "lastname": (lastname? String(lastname):""),
              "firstname": (firstname? String(firstname):""),
              "street": (street? String(street):""),
              "name": (name? String(name):""),
              "postcode": (postcode? String(postcode):""),
              "country": (country? String(country):""),
              "province":  (province? String(province):""),
              "status": status,
              "emails": emails,
              "phones": phones,
              "cells": cells,
              "leadTag": leadKey,
              "timestamp": timestamp,
              "date": localtime ,
              "employeeKey": null,
              "employeeTag": null,
              "employeeFirstname": null,
              "employeeLastName" : null,
              "isEmployeeAssigned" : "false",
           }

           if (  (street && city && postcode) ||
              (street && city && province && country) ) {
              const address = postcode?(street + ", " + city + ", " + postcode)
                                   :(street + ", " + city + ", " + province + ", " + country);
              const location = {
                  address: address,
                  key: leadKey,
                  leadContactRef: leadRef,
              }
               this.getLocations (newLead,location);
               this.clearState ();
               this.handleOpen(false);
           } else {
              leadRef.set(newLead);
              this.clearState ();
              this.handleOpen(false);
            }
         }
      }
  };

  isFormValid() {
    const { street, postcode, city, phone1, phone2, phone3,
            cell1, cell2, cell3, email1, email2, email3 }
           = this.state;

           let  requred = false;
           if (street && postcode ){
              requred = true;
           }
           if (street && city){
              requred = true;
           }
           if (cell1 || cell2 || cell3) {
             requred = true;
           }
           if (email1 || email2 || email3) {
             requred = true;
           }
           if (phone1 || phone2 || phone3) {
             requred = true;
           }

    return requred ;
  }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
      fieldChange: true,
    });
  };

  clearState  = () => {
      this.setState ({
          lastname: "",
          firstname: "",
          street: "",
          city: "",
          postcode: "",
          province:"",
          country: "",
          phones: [],
          cells: [],
          emails: [],
          fieldChange: false,
          isEmployeeAssigned : false,
          employeeAssigned : null,
          isEmployeeUnassigned : false,
          employeeUnassignedKey : null,
      });
  }

  dropdownOptions = () => {
      let optionArray = [
        {
            key: String (LEAD_POSITIVE),
            text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > LEAD_POSITIVE </span>,
            value: LEAD_POSITIVE,
        },
        {
            key: String (LEAD_RESPONSIVE),
            text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > LEAD_RESPONSIVE </span>,
            value: LEAD_RESPONSIVE,
        },
        {
            key: String (LEAD_NEW),
            text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > LEAD_NEW </span>,
            value: LEAD_NEW,
        },
        {
            key: String (LEAD_NOT_RESPONSIVE),
            text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > LEAD_NOT_RESPONSIVE </span>,
            value: LEAD_NOT_RESPONSIVE,
        },
        {
            key: String (LEAD_DECLINE),
            text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > LEAD_DECLINE </span>,
            value: LEAD_DECLINE,
        }
      ];

      return optionArray;
  }

  handleDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      const selectedValue = data.value
      //console.log( data.value);
      this.setState({
         status: selectedValue,
         fieldChange: true,
      });
  }

  employeeOptions = () => {
      const {employees, contact} = this.props;
      let employeeOptions = [];

      //console.log (order);
      const isEmployeeAssigned = contact.isEmployeeAssigned? (contact.isEmployeeAssigned==="true"? true: false): false;
      //console.log(employeeAssigned);

      if (isEmployeeAssigned === false) {
          for (var key in employees) {
             employeeOptions.push({
                   key: key,
                   text: <p style ={styles.DropdownMenu}> {employees[key].name} </p>,
                   value: key,
              });
          }
      }
      else  {
          employeeOptions.push({
             key: '1234',
             text: <p style ={styles.DropdownMenu} > {"Remove Assignment"} </p>,
             value: "none",
          });
      }
      return employeeOptions;
  }

  selectEmployee = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      const {employees, contact} = this.props;
      const employeeKey = data.value;

      //console.log(order);
      if (employeeKey !== "none") {
           //console.log("employee tag = " + employees[employeeKey].tag);
           //console.log("employee name = " + employees[employeeKey].name);
           //console.log("client tag = " + clienttag);
           this.setState({
             isEmployeeAssigned : true,
             employeeAssigned : employees[employeeKey],
             isEmployeeUnassigned: false,
             fieldChange: true,
           });
      } else {
          const employeeAssignedKey = contact ["employeeKey"];
          console.log(employeeAssignedKey);

          if (employeeAssignedKey) {
               this.setState({
                   isEmployeeAssigned : false,
                   employeeUnassignedKey : employeeAssignedKey,
                   isEmployeeUnassigned: true,
                   fieldChange: true,
               });
          }
      }
  }


  render() {
    const {contact, french} = this.props;
    let {isEmployeeAssigned, employeeFirstname, employeeLastName} = contact;
    //console.log ("EditClientModal " );
    //console.log(contact);
    //const titleString = "Edit Client : " + contact.name;
    let email1 = "";
    let email2 = "";
    let email3 ="";
    let phone1 = "";
    let phone2 = "";
    let phone3 ="";
    let cell1 = "";
    let cell2 = "";
    let cell3 = "";

    //console.log ("EditEmployeeModal id = " + id);
    //console.log (employee.cells[0]);
    //console.log (employee.cells["0"]);
    let employeeName = employeeFirstname + " " + employeeLastName;
    if ( !isEmployeeAssigned || isEmployeeAssigned === "undefined" || isEmployeeAssigned === "false")  {
         isEmployeeAssigned = false;
         employeeFirstname = "";
         employeeLastName = "";
         employeeName = "";
    }

    if (contact && contact.emails && contact.emails[0]) {
        email1 = contact.emails[0];
    }
    if (contact && contact.emails && contact.emails[1]) {
        email2 = contact.emails[1];
    }
    if (contact && contact.emails && contact.emails[2]) {
        email3 = contact.emails[2];
    }
    if (contact && contact.phones && contact.phones[0]) {
        phone1 = contact.phones[0];
    }
    if (contact && contact.phones && contact.phones[1]) {
        phone2 = contact.phones[1];
    }
    if (contact && contact.phones && contact.phones[2]) {
        phone3 = contact.phones[2];
    }
    if (contact && contact.cells && contact.cells[0]) {
        cell1 = contact.cells[0];
    }
    if (contact && contact.cells && contact.cells[1]) {
        cell2 = contact.cells[1];
    }
    if (contact && contact.cells && contact.cells[2]) {
        cell3 = contact.cells[2];
    }

    let titleString = french? "modifier Lead Contact Info" : "Edit Lead Contact Info";
    if (contact && contact.name) {
          titleString = contact.name + ":  " + titleString;
    }

    let statusString = "LEAD_NEW";
    if (contact && contact.status) {
       switch(contact.status) {
          case LEAD_POSITIVE:
            statusString = "LEAD_POSITIVE";
            break;
          case LEAD_RESPONSIVE:
            statusString = "LEAD_RESPONSIVE";
            break;
          case LEAD_NEW:
            statusString = "LEAD_NEW";
            break;
          case LEAD_NOT_RESPONSIVE:
            statusString = "LEAD_NOT_RESPONSIVE";
            break;
          case LEAD_DECLINE:
            statusString = "LEAD_DECLINE";
            break;
          default:
            statusString = "LEAD_NEW";
       }
    }

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="small" onClick={() =>this.handleOpen(true)} style={{marginLeft: "15px"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='edit outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={french? 'Prénom': 'First Name'}
                           defaultValue = {contact.firstname}
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={french? 'Nom': 'Last Name'}
                            defaultValue = {contact.lastname}
                            name="lastname"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={french? 'Rue & No': 'Street & No'}
                           defaultValue = {contact.street}
                           name="street"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={french? 'Ville': 'City'}
                            defaultValue = {contact.city}
                            name="city"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='PostCode'
                            placeholder='H1A 1B1'
                            defaultValue = {contact.postcode}
                            name="postcode"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='province'
                           defaultValue = {contact.province}
                           name="province"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={french? 'Pays': 'Country'}
                            defaultValue = {contact.country}
                            name="country"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='Phone1'
                           defaultValue = {phone1}
                           name="phone1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Phone2'
                            defaultValue = {phone2}
                            name="phone2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Phone3'
                            defaultValue = {phone3}
                            name="phone3"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='Cell 1'
                           defaultValue = {cell1}
                           name="cell1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Cell 2'
                            defaultValue = {cell2}
                            name="cell2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Cell 3'
                            defaultValue = {cell3}
                            name="cell3"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='email 1'
                           defaultValue = {email1}
                           name="email1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='email 2'
                            defaultValue = {email2}
                            name="email2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='email 3'
                            defaultValue = {email3}
                            name="email3"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Field>
                <Message style = {{color: "black", background: "#ccc", fontSize:"1.0em", padding:"0.2em", marginTop:"0.4em", marginBottom:"0.2em"}}>
                    {french? ("Actuel Statu Est " + statusString  + " .  Choisiez Nouveau Lead Statu"):
                    ("Current Statu Is " + statusString  + " .  Select New Lead Status") }
                </Message>

                 <Dropdown
                    placeholder="Lead Status"
                    fluid
                    selection
                    onChange={this.handleDropdownChange}
                    options={this.dropdownOptions()}
                 />
           </Form.Field>
           {!isEmployeeAssigned && <Form.Field>
                <Message style = {{color: "black", background: "#ccc", fontSize:"1.0em", padding:"0.2em", marginTop:"0.4em", marginBottom:"0.2em"}}>
                    {french ? "Attribuer ce Lead à un Employé": "Assign this Lead to an employee"}
                </Message>

                 <Dropdown
                    placeholder="select employee"
                    fluid
                    selection
                    style={styles.DropdownDisplay}
                    onChange={this.selectEmployee}
                    options={this.employeeOptions()}
                 />
           </Form.Field>}
           {isEmployeeAssigned && <Form.Field>
                <Message style = {{color: "black", background: "#ccc", fontSize:"1.0em", padding:"0.2em", marginTop:"0.4em", marginBottom:"0.2em"}}>
                    this Lead is asigned to employee: {employeeName}, select Remove Assignment to unassign
                </Message>

                 <Dropdown
                    selection
                    style={styles.DropdownDisplay}
                    onChange={this.selectEmployee}
                    options={this.employeeOptions()}
                    placeholder="Remove Employee Assignment"
                 />
           </Form.Field>}
        </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleOpen(false)}
              >
              Cancel
        </Button>

          {contact && contact.leadTag && <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                >
                Submit
          </Button>}
        </Modal.Actions>
      </Modal>
    )
  }
}

const styles = {
  DropdownMenu: {
    padding: "6px",
    margin: "0px",
    width: "100%",
    position: "relative",
    backgroundColor: "rgb(66,152,244, 0.2)",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
  DropdownDisplay: {
    padding: "6px",
    margin: "0px",
    width: "100%",
    position: "relative",
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
};

//export default EditLeadContactModal;
const mapStateToProps = state => ({
     usertag: state.user.usertag,
     employees: state.user.employeeList,
     clienttag: state.user.clienttag,
   }
);

export default connect(
  mapStateToProps,
  null
)(EditLeadContactModal);
