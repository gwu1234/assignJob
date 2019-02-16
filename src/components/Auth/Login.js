import React from "react";
import firebase from "../../firebase";
import Geocode from "react-geocode";
//import response from "react-geocode";
import { connect } from "react-redux";
import {  setUserTag, setAdmin, setUserContact, setEmployeeList,
          setClientList, setGeoEncoding, setTrucks, setBadAccess}
        from "../../actions";

import { Grid, Form, Segment, Button, Header, Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";


const GEOCODING_DONE = 1;
const GEOCODING_RENEWED = 2;

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
    access: "",
    usersRef: firebase.database().ref("users"),
  };

  //const GEOCODING_DONE = 1;
  //const GEOCODING_RENEWED = 2;

  /*componentDidMount() {
    const {coords, usertag} = this.props;

    console.log (usertag);
    console.log(coords.length);
    console.log(coords);
  }*/


  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  //componentWillUnmount() {
  //  this.state.usersRef.off();
    //this.props.setAdmin(this.props.admin);
  //}

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      //var admin = false;

      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          const emailString = signedInUser.user.email.replace(/[.,#$\[\]@ ]/g,'');
          const nameString = signedInUser.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
          const tagName = (nameString + '+' + emailString).toLowerCase();
          const adminName = (nameString + '+' + emailString +"/admin").toLowerCase();;
          //console.log(tagName);
          this.props.setUserTag(tagName);
          var adminRef = this.state.usersRef.child(adminName);

          adminRef.once('value')
            .then((snapshot) => {
              const admin = snapshot.val();
              //console.log(admin);
              if (admin === true) {
                   this.props.setAdmin(true);
              } else {
                this.props.setAdmin(false);
              }
          });

          const accessName = (nameString + '+' + emailString +"/access").toLowerCase();
          //console.log(accessName);
          var accessRef = this.state.usersRef.child(accessName);
          accessRef.once('value')
            .then((snapshot) => {
              const accessInput = snapshot.val();
              //console.log(accessInput);
              const {access} = this.state;
              //console.log(access);
              if (parseInt(access) !== parseInt(accessInput)) {
                this.props.setBadAccess(true);
                firebase
                  .auth()
                  .signOut()
                  .then(() => console.log("signed out!"));
              } else {
                 this.props.setBadAccess(false);
              }
          });

          const contactTag = "repos/" + tagName +"/contact";
          //console.log(contactTag);
          var contactRef = firebase.database().ref(contactTag)
          //starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
          /*contactRef.on('value')
             .then((snapshot) => {
                const contact = snapshot.val();
                console.log(contact)
                if (contact) {
                    this.props.setUserContact(contact);
               } else {
                   this.props.setUserContact(null);
               }
           })*/

           contactRef.on('value', snapshot => {
                //this.setState({
                //posts: snapshot.val()
                //});
                const contact = snapshot.val();
                //console.log(contact)
                if (contact) {
                    this.props.setUserContact(contact);
               } else {
                   this.props.setUserContact(null);
               }
          });


          const employeeTag = "repos/" + tagName +"/employees";
          //console.log(employeeTag);
          var employeeRef = firebase.database().ref(employeeTag)

           employeeRef.on('value', snapshot => {
                const employees = snapshot.val();
                //console.log(employees)
                if (employees) {
                  if (this.isGeocodeReady(employees)) {
                      //console.log("lat and longitudes ready");
                      this.props.setEmployeeList(employees);
                      //const GEOCODING_DONE = 1;
                      //const GEOCODING_RENEWED = 2;
                      this.props.setGeoEncoding(GEOCODING_DONE);
                  }
                  else {
                      const addresses =[];
                       for (var key in employees) {
                         if (!employees[key].lat || !employees[key].lng ){
                             const addressStr =   employees[key].street + ", "
                                         + employees[key].city + ", "
                                         + employees[key].postcode;

                             const address = {
                                 address: addressStr,
                                 key : key
                             }
                             addresses.push (address);
                         }
                      }
                      this.getLocations(employees, addresses, true);
                      //console.log(coords.length);
                      //console.log(coords);
                  }
               } else {
                   this.props.setEmployeeList(null);
               }
          });

          const clientsTag = "repos/" + tagName +"/clients/tags";
          //console.log("clientsTag = " + clientsTag);
          const clientsRef = firebase.database().ref(clientsTag)

           clientsRef.on('value', snapshot => {
                const clients= snapshot.val();
                //console.log("user list Clients = ");
                //console.log(clients)
                if (clients) {
                    if (this.isGeocodeReady(clients)) {
                        //console.log("lat and longitudes ready");
                        this.props.setClientList(clients);
                        //const GEOCODING_DONE = 1;
                        //const GEOCODING_RENEWED = 2;
                        this.props.setGeoEncoding(GEOCODING_DONE);
                    }
                    else {
                        const addresses =[];
                         for (var key in clients) {
                           if (!clients[key].lat || !clients[key].lng ){
                               const addressStr =   clients[key].street + ", "
                                           + clients[key].city + ", "
                                           + clients[key].postcode;

                               const address = {
                                   address: addressStr,
                                   key : key
                               }
                               addresses.push (address);
                           }
                        }
                        this.getLocations(clients, addresses, false);
                        //console.log(coords.length);
                        //console.log(coords);
                    }
               } else {
                   this.props.setClientList(null);
               }
          });

          const trucksTag = "repos/" + tagName +"/trucks";
          //console.log("clientsTag = " + clientsTag);
          const trucksRef = firebase.database().ref(trucksTag)

           trucksRef.on('value', snapshot => {
                const trucks= snapshot.val();
                //console.log("truck list = ");
                //console.log(trucks)
                if (trucks) {
                  this.props.setTrucks (trucks)
                } else {
                   this.props.setTrucks (null);
               }
          });

        })
        .catch(err => {
          console.error(err);
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

  isFormValid = ({ email, password }) => email && password;

  isGeocodeReady = (clients) => {
        //console.log("at isGeocodeReady");
        let result = true;

        for (var key in clients) {
           if (!clients[key].lat || !clients[key].lng ){
              return false;
           }
        }
        return result;
  }

  async getLocations(clients, locations, isEmployee) {
    Geocode.setApiKey("AIzaSyBieaKdJKdipZ6bsaiOUhqUCdCc9JU4OlE");
    const coords = []
    for (const l of locations) {
      const r = await this.getLocation(l)
      if (r == null) continue; // or display error message or whatever
      coords.push(r)
      clients[r.key].lng = r.lng;
      clients[r.key].lat = r.lat;
      //this.setState({annotations}); // move this after the loop if you want only one update
    }
    //console.log(coords);
    //console.log(coords.length);
    //console.log(clients);
    if (isEmployee) {
       this.props.setEmployeeList(clients);
       this.props.setGeoEncoding(GEOCODING_RENEWED);
    } else {
       this.props.setClientList(clients);
       this.props.setGeoEncoding(GEOCODING_RENEWED);
    }
    //this.props.setLatLng (coords);
    //return coords;
  }

  async getLocation(location) {
    try {
      let response = await Geocode.fromAddress(location.address);
      //console.log("RESULT:", location.address, await response.results[0].geometry.location);
      return (
        {
          address: location.address,
          key: location.key,
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


  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    //const { admin} = this.props;
    const { email, password, errors, loading, access } = this.state;
    //const { usertag, coords } = this.props;

    //if (coords.length > 0) {
       //console.log ("login loading = " + loading);
    //   console.log (coords.length);
    //}

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="truck" color="violet" />
            Login to AssignJobs
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                className={this.handleInputError(errors, "email")}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Form.Input
                fluid
                name="access"
                icon="lock"
                iconPosition="left"
                placeholder="Access Code"
                onChange={this.handleChange}
                value={access}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="violet"
                fluid
                size="large"
              >
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          {this.props.badAccess && <Message style={{color:"red", fontSize:"1.1em", fontStyle:"bold"}}>
             Invalid Access Code, Try Again
          </Message>}
          <Message>
            Do not have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  badAccess: state.user.badAccess,
});

export default connect(
  mapStateToProps,
  { setUserTag, setAdmin, setUserContact, setEmployeeList, setClientList, setGeoEncoding, setTrucks, setBadAccess}
)(Login);
