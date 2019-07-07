import React, { Component } from 'react';
import firebase from "../../firebase";
import Geocode from "react-geocode";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';


export default class AddLeadModal extends Component {
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

  async getLocations(lead, location) {
    Geocode.setApiKey("AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE");
      const r = await this.getLocation(location)
      if (r != null) {
          lead.lng = r.lng;
          lead.lat = r.lat;
          location.databaseRef.set(lead);
      }
      this.clearState ();
  }

  async getLocation(location) {
    try {
      let response = await Geocode.fromAddress(location.address);
      return (
        {
          lat: await response.results[0].geometry.location.lat,
          lng: await response.results[0].geometry.location.lng
        }
      );
    }
    catch(err) {
      //console.log("Error fetching geocode lat and lng:", err);
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
    if (this.isFormValid()) {
         //console.log("data is OK");
         const { lastname,firstname,street,city,postcode,province,
                 country,phone1,phone2,phone3,cell1,cell2,cell3,
                 email1,email2,email3} = this.state;
         const {usertag } = this.props;
         const name = firstname + " " + lastname;
         //let tagString = name + "+" + street + "+"
          //     + postcode + "+" +
          //     Math.random().toString(36).substr(2, 4);
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

         const date = new Date();
           // timestamp in second
         const timestamp = Math.round(date.getTime()/1000 + 0.5);
         const localtime = date.toLocaleString();

         const leadTag = "repos/" + usertag + "/leads";
         const leadRef = firebase.database().ref(leadTag);
         const leadKey = leadRef.push().getKey();

         const newLead = {
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
           "leadTag": leadKey,
           "timestamp": timestamp ,
           "date": localtime ,
         }

         if (  (street && city && postcode) ||
               (street && city && province && country) ) {
            const address = postcode?(street + ", " + city + ", " + postcode)
                                    :(street + ", " + city + ", " + province + ", " + country);
            const location = {
                address: address,
                key: leadTag,
                databaseRef: leadRef.child(leadKey).child("contact"),
            }

            this.getLocations (newLead,location);
            this.handleOpen(false);
        }
        else {
            leadRef.child(leadKey).child("contact").set(newLead);
            this.clearState ();
            this.handleOpen(false);
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
    this.setState({ [event.target.name]: event.target.value });
  };

  clearState = () => {
      this.setState ( {
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
     });
   }

  render() {
    const {userName, french} = this.props;
    const titleString = french? (userName + ":  " + "Ajouter Nouveau Lead") :
                                (userName + ":  " + "Add New Lead") ;

    return (
      <Modal
        trigger={<Icon name='plus' size ="small" onClick={() => this.handleOpen(true)} style={{marginLeft: "15px"}}/>}
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
                           label={french? 'Prénom': 'First Name'}
                           placeholder='Alain'
                           name="firstname"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={french? 'Nom': 'Last Name'}
                            placeholder='Dubois'
                            name="lastname"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={french? 'Rue & No': 'Street & No'}
                           placeholder='120 Hymus Road'
                           name="street"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={french? 'Ville': 'city'}
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
                            label={french? 'Pays': 'Country'}
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
