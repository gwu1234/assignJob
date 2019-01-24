import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react';

export default class AddClientModal extends Component {
  state = {
    modalOpen: false,
    lastname: '',
    firstname: '',
    street: '',
    city: '',
    postcode: '',
    province: '',
    country: '',
    phone1: '',
    phone2: '',
    phone3: '',
    cell1: '',
    cell2: '',
    cell3: '',
    email1: '',
    email2: '',
    email3: '',
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
         const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,phone3,cell1,cell2,cell3,
                 email1,email2,email3} = this.state;
         const {usertag } = this.props;
         const name = firstname + " " + lastname;
         let tagString = name + "+" + street + "+" + postcode ;
         const tag = (tagString.replace(/[.,#$\[\]@ ]/g,'')).toLowerCase();

         const newClient = {
           "city":  String(city),
           "lastname": String (lastname),
           "firstname": String(firstname),
           "street": String(street),
           "name": String(name),
           "postcode": String(postcode),
           "tag": String(tag),
         }
          //console.log(newClient);
         const clientPath = "repos/" + usertag + "/clients/tags";
         //console.log(clientPath);
         const clientRef = firebase.database().ref(clientPath);
         const clientKey = clientRef.push().getKey();
         console.log(clientKey);
         clientRef.child(clientKey).set(newClient);

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
         }
         //console.log(newContact);
         const contactPath = "repos/" + usertag + "/clients/data/" + tag +"/contact";
         //console.log(clientPath);
         const contactRef = firebase.database().ref(contactPath);
         //const contactKey = contactRef.push().getKey();
         //console.log(contactPath);
         contactRef.set(newContact);

         this.handleOpen(false);
    }
    console.log("submit clicked");
    //this.handleOpen(false);
  };

  isFormValid() {
    const {lastname, firstname, street, city, postcode, province, country,
           phone1, phone2, phone3, cell1, cell2, cell3, email1, email2, email3}
           = this.state;
    if (!lastname || !firstname ){
       window.alert("lastname and firstname are required");
       return false;
    }

    if (!street || !postcode ){
       window.alert("street name, number and post code are required");
       return false;
    }

    if (!phone1 && !phone2 && !phone3 && !cell1 && !cell2 && !cell3){
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

  render() {
    const {userName, usertag } = this.props;
    //console.log ("AddClientModal " + userName );
    //console.log(userName);
    //console.log ("AddClientModal " + usertag );
    const titleString = userName + ":  " + "Add New Client"
    //console.log (titleString);
    const { value } = this.state

    return (
      <Modal
        trigger={<Button icon size="mini" onClick={() => this.handleOpen(true)}> <Icon name='plus' size ="large"/> </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='add user' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='First Name'
                           placeholder='Alain'
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Last Name'
                            placeholder='Dubois'
                            name="lastname"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Street & No'
                           placeholder='120 Hymus Road'
                           name="street"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='City'
                            placeholder='Pointe Claire'
                            name="city"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='PostCode'
                            placeholder='H1A 1B1'
                            name="postcode"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='province'
                           placeholder='Quebec'
                           name="province"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Country'
                            placeholder='Canada'
                            name="country"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='Phone1'
                           placeholder='5141119999'
                           name="phone1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Phone2'
                            placeholder='8003391178'
                            name="phone2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Phone3'
                            placeholder='5148881111'
                            name="phone3"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='Cell 1'
                           placeholder='5143330123'
                           name="cell1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Cell 2'
                            placeholder='4381112222'
                            name="cell2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Cell 3'
                            placeholder='5140013344'
                            name="cell3"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="mini"
                           label='email 1'
                           placeholder='alain@hotmail.com'
                           name="email1"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='email 2'
                            placeholder='dubois@yahoo.com'
                            name="email2"
                            onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='email 3'
                            placeholder='alain@gmail.com'
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
