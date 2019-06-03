import React, { Component } from 'react';
import firebase from "../../firebase";
//import { connect } from "react-redux";
import Geocode from "react-geocode";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

//const JOB_NEW = 0;
//const JOB_REPEAT = 1;
//const JOB_DONE = 2;

class EditClientContactModal extends Component {
  constructor(props) {
      super(props);
      const {contact} = this.props;
      this.state = {
         modalOpen: false,
         lastname: contact.lastname,
         firstname: contact.firstname,
         street: contact.street,
         city: contact.city,
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
         });
      }
    }


  handleOpen = (open) => this.setState({ modalOpen: open })

  async getLocations(client, location) {
    Geocode.setApiKey("AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE");
      const r = await this.getLocation(location)
      if (r != null) {
          client.lng = r.lng;
          client.lat = r.lat;
          //console.log (location.key) ;
          //console.log (location.databaseRef);
          //console.log (location.address);
          //console.log(client);
          //location.databaseRef.set(client);
          location.databaseRef.update(client);
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
    //event.preventDefault();
    if (this.isFormValid(this.state)) {
         //console.log("data is OK");
         const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,phone3,cell1,cell2,cell3,
                 email1,email2,email3} = this.state;
         const {usertag, contact } = this.props;
         const name = firstname + " " + lastname;
         //let tagString = name + "+" + street + "+" + postcode ;
         //const tag = (tagString.replace(/[.,#$\[\]@ ]/g,'')).toLowerCase();

         let emails = [];
         let phones = [];
         let cells = [];

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

         const newClientContact = {
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
           "tag": String(contact.clientTag),
           "clientTag": String(contact.clientTag),
           "clientKey": String(contact.clientKey)
         }

         /*const newClient = {
           "city":  String(city),
           "lastname": String (lastname),
           "firstname": String(firstname),
           "street": String(street),
           //"status" : JOB_NEW,
           "name": String(name),
           "postcode": String(postcode),
           "tag": String(contact.clientTag),
           "clientKey": String(contact.clientKey)
         }*/

         //console.log(newClient);
         const clientPath = "repos/" + usertag + "/clients/data/" + contact.clientTag +"/contact";
         console.log(clientPath);
         const clientKey = contact.clientKey;
         const clientRef = firebase.database().ref(clientPath);
         //const clientKey = clientRef.push().getKey();
         //console.log(clientKey);

         const address = street + ", " + city + ", " + postcode;
         const location = {
            address: address,
            key: clientKey,
            databaseRef: clientRef
         }

         this.getLocations (newClientContact,location);
         //clientRef.child(clientKey).set(newClient);

         /*let emails = [];
         let phones = [];
         let cells = [];

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

         const newContact = {
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
           "tag": String(contact.clientTag),
           "clientKey": String(contact.clientKey)
         }
         //console.log(newContact);
         const contactPath = "repos/" + usertag + "/clients/data/" + contact.clientTag +"/contact";
         //console.log(contactPath);
         const contactRef = firebase.database().ref(contactPath);
         //const contactKey = contactRef.push().getKey();
         //console.log(contactPath);
         contactRef.set(newContact);*/

         this.handleOpen(false);
    }
    //console.log("submit clicked");
    //this.handleOpen(false);
  };

  isFormValid() {
    const {lastname, firstname, street, postcode, city}
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

    return true;
  }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {contact, french} = this.props;
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

    if (contact.emails && contact.emails[0]) {
        email1 = contact.emails[0];
    }
    if (contact.emails && contact.emails[1]) {
        email2 = contact.emails[1];
    }
    if (contact.emails && contact.emails[2]) {
        email3 = contact.emails[2];
    }
    if (contact.phones && contact.phones[0]) {
        phone1 = contact.phones[0];
    }
    if (contact.phones && contact.phones[1]) {
        phone2 = contact.phones[1];
    }
    if (contact.phones && contact.phones[2]) {
        phone3 = contact.phones[2];
    }
    if (contact.cells && contact.cells[0]) {
        cell1 = contact.cells[0];
    }
    if (contact.cells && contact.cells[1]) {
        cell2 = contact.cells[1];
    }
    if (contact.cells && contact.cells[2]) {
        cell3 = contact.cells[2];
    }
    const titleString=french? (contact.name+":  " + "Modifier Client Contact Info"):
                              (contact.name+":  " + "Edit Client Contact Info");
    const firstName = french?  "Prénom" : "First Name";
    const lastName = french?  "nom de famille" : "Last Name";
    const streetName = french?  "Rue & No." : "Street & No.";
    const city = french?  "Ville" : "City";

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() =>this.handleOpen(true)}/>}
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
                           label={firstName}
                           defaultValue = {contact.firstname}
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={lastName}
                            defaultValue = {contact.lastname}
                            name="lastname"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={streetName}
                           defaultValue = {contact.street}
                           name="street"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={city}
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
                            label='Country'
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

export default EditClientContactModal;
//const mapStateToProps = state => ({
//     usertag: state.user.usertag,
     //contact: state.user.clientContact
//   }
//);

//export default connect(
//  mapStateToProps,
//  null
//)(EditClientContactModal);
