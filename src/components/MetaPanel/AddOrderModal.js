import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form, Input } from 'semantic-ui-react';

export default class AddOrderModal extends Component {
  state = {
    modalOpen: false,
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
         /*(const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,phone3,cell1,cell2,cell3,
                 email1,email2,email3} = this.state;
         const {usertag } = this.props;
         const name = firstname + " " + lastname;
         let tagString = name + "+" + street + "+" + postcode ;
         const tag = (tagString.replace(/[.,#$\[\]@ ]/g,'')).toLowerCase();
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
         contactRef.set(newContact); */

         this.handleOpen(false);
    }
    console.log("submit clicked");
    //this.handleOpen(false);
  };

  isFormValid() {
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
    const titleString = userName + ":  " + "Add New Order"
    //console.log (titleString);
    const { value } = this.state

    return (
      <Modal
        trigger={<Button icon size="mini" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right"}}> <Icon name='plus' size ="large"/> </Button>}
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
                           label='Date'
                           placeholder='December 11, 2018'
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                            placeholder='snow removal'
                            name="work"
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
