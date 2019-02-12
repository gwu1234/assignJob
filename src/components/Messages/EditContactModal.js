import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

export default class EditContactModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,

         street: this.props.contact.street,
         city: this.props.contact.city,
         postcode: this.props.contact.postcode,
         province:this.props.contact.province,
         country: this.props.contact.country,
         phone1: this.props.contact.phones?this.props.contact.phones[0]:'',
         phone2: this.props.contact.phones?
                 (this.props.contact.phones[1]?this.props.contact.phones[1]:''):
                 '',
         phone3: this.props.contact.phones?
                 (this.props.contact.phones[2]?this.props.contact.phones[2]:''):
                 '',
         phone4: this.props.contact.phones?
                 (this.props.contact.phones[3]?this.props.contact.phones[3]:''):
                 '',
         cell1: this.props.contact.cells?this.props.contact.cells[0]:'',
         cell2: this.props.contact.cells?
                 (this.props.contact.cells[1]?this.props.contact.cells[1]:''):
                 '',
         cell3: this.props.contact.cells?
                 (this.props.contact.cells[2]?this.props.contact.cells[2]:''):
                 '',
         cell4: this.props.contact.cells?
                (this.props.contact.cells[3]?this.props.contact.cells[3]:''):
                '',
         email1: this.props.contact.emails?this.props.contact.emails[0]:'',
         email2: this.props.contact.emails?
                 (this.props.contact.emails[1]?this.props.contact.emails[1]:''):
                 '',
         email3: this.props.contact.emails?
                 (this.props.contact.emails[2]?this.props.contact.emails[2]:''):
                 '',
         email4: this.props.contact.emails?
                 (this.props.contact.emails[3]?this.props.contact.emails[3]:''):
                 '',
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
    if (this.isFormValid(this.state)) {
         //console.log("data is OK");
         const { street,city,postcode,province,
                 country,phone1,phone2, phone3, phone4,
                 cell1,cell2, cell3, cell4,
                 email1, email2, email3, email4} = this.state;
         const {usertag, contact} = this.props;

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
         if (email4) {
            emails.push (email4);
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
         if (phone4) {
            phones.push (phone4);
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
         if (cell4) {
            cells.push (cell3);
         }

         const newContact = {
           "city":  String(city),
           "street": String(street),
           "postcode": String(postcode),
           "country": String(country),
           "province":  String(province),
           "emails": emails,
           "phones": phones,
           "cells": cells
         }
         //console.log(newEmployee);
         //console.log(nameTag);
         const contactPath = "repos/" + usertag + "/contact";
         //console.log(employeePath);
         const contactRef = firebase.database().ref(contactPath);
         //const contactKey = contactRef.push().getKey();
         //console.log(contactPath);
         contactRef.set(newContact);

         this.handleOpen(false);
    }
    //console.log("submit clicked");
    //this.handleOpen(false);
  };

  isFormValid() {
    const {street, postcode, city,
           phone1, phone2, phone3, phone4,
           cell1, cell2, cell3, cell4,
           email1, email2, email3, email4}
           = this.state;

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


    if (!phone1 && !cell1 && !email1){
       window.alert("at least one phone, one cell or one email is required");
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
    const {contact, usertag} = this.props;
    let titleString = "Edit Company Info : ";

    if (contact.name) {
      titleString = titleString + contact.name;
    }

    let email1 = "";
    let email2 = "";
    let email3 = "";
    let email4 = "";
    let phone1 = "";
    let phone2 = "";
    let phone3 = "";
    let phone4 = "";
    let cell1 = "";
    let cell2 = "";
    let cell3 = "";
    let cell4 = "";

    //console.log ("EditContactModal id = " + id);
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
    if (contact.emails && contact.emails[3]) {
        email4 = contact.emails[3];
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
    if (contact.phones && contact.phones[3]) {
        phone4 = contact.phones[3];
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
    if (contact.cells && contact.cells[3]) {
        cell4 = contact.cells[3];
    }

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)} style={{position: 'relative', float: 'left'}} />}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc"}}
      >
        <Header icon='add user' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='Street & No'
                           defaultValue = {contact.street}
                           name="street"
                           onChange={this.handleChange} />
          </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="small"
                            label='City'
                            defaultValue = {contact.city}
                            name="city"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='PostCode'
                            defaultValue = {contact.postcode}
                            name="postcode"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='Province'
                           defaultValue = {contact.province}
                           name="province"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Country'
                            defaultValue = {contact.country}
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
                            label='Phone3'
                            defaultValue = {phone3}
                            name="phone3"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Phone4'
                            defaultValue = {phone4}
                            name="phone4"
                            onChange={this.handleChange} />

           </Form.Group>
           <Form.Group inline width='equal'>
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
                <Form.Input size ="small"
                            label='Cell 3'
                            defaultValue = {cell3}
                            name="cell3"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                           label='Cell 4'
                           defaultValue = {cell4}
                           name="cell4"
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
                <Form.Input size ="small"
                            label='email 3'
                            defaultValue = {email3}
                            name="email3"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='email 4'
                            defaultValue = {email4}
                            name="email4"
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
