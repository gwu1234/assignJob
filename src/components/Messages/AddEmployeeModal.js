import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

export default class AddEmployeeModal extends Component {
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
    cell1: '',
    cell2: '',
    email1: '',
    email2: '',
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
                 country,phone1,phone2,cell1,cell2,
                 email1,email2} = this.state;
         const {usertag } = this.props;
         const name = firstname + " " + lastname;
         let nameTag = firstname + lastname + Math.random().toString(36).substr(2, 4);
         nameTag = (nameTag.replace(/[.,#$\[\]@ ]/g,'')).toLowerCase();

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
           "tag": String(nameTag),
         }
         //console.log(newEmployee);
         //console.log(nameTag);
         const employeePath = "repos/" + usertag + "/employees/" + nameTag;
         //console.log(employeePath);
         const employeeRef = firebase.database().ref(employeePath);
         //const contactKey = contactRef.push().getKey();
         //console.log(contactPath);
         employeeRef.set(newEmployee);

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

  render() {
    //const {clientname, usertag, clienttag } = this.props;
    //const {clientname} = this.props;
    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );

    const titleString = "Add New Employee";
    //console.log (titleString);
    //const { value } = this.state

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='add user' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='First Name'
                           placeholder='Alain'
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Last Name'
                            placeholder='Dubois'
                            name="lastname"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='Street & No'
                           placeholder='1988 Henri-Bourassa Boulevard West'
                           name="street"
                           onChange={this.handleChange} />
          </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="small"
                            label='City'
                            placeholder='Pointe Claire'
                            name="city"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='PostCode'
                            placeholder='H1A 1B1'
                            name="postcode"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='province'
                           placeholder='Quebec'
                           name="province"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Country'
                            placeholder='Canada'
                            name="country"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='Phone1'
                           placeholder='5141119999'
                           name="phone1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Phone2'
                            placeholder='8003391178'
                            name="phone2"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='Cell 1'
                           placeholder='5143330123'
                           name="cell1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Cell 2'
                            placeholder='4381112222'
                            name="cell2"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label='email 1'
                           placeholder='alain@hotmail.com'
                           name="email1"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='email 2'
                            placeholder='dubois@yahoo.com'
                            name="email2"
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
