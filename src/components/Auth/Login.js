import React from "react";
import firebase from "../../firebase";
import Geocode from "react-geocode";
//import response from "react-geocode";
import { connect } from "react-redux";
import {  setUserTag, setAdmin, setReposData, setBadAccess}
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
          let admin = false;
          //console.log (signedInUser.user) ;
          const emailString = signedInUser.user.email.replace(/[.,#$\[\]@ ]/g,'');
          const nameString = signedInUser.user.displayName.replace(/[.,#$\[\]@ ]/g,'');

          const tagName = (nameString + '+' + emailString).toLowerCase();
          const adminName = (nameString + '+' + emailString +"/admin").toLowerCase();;
          //console.log("login admin path = " + adminName);
          this.props.setUserTag(tagName);
          var adminRef = this.state.usersRef.child(adminName);

          adminRef.once('value')
            .then((snapshot) => {
              admin = snapshot.val();
              //console.log("login admin = " + admin);
              if (admin === true) {
                   this.props.setAdmin(true);
              } else {
                this.props.setAdmin(false);
              }
          })
           .catch(err => {
               console.log("reading admin error = " + err);
               console.error(err);
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

          const reposTag = "repos/" + tagName ;
          const reposRef = firebase.database().ref(reposTag)

          reposRef.on('value', snapshot => {
                const reposData = snapshot.val();
                //console.log("clients Data arrived ");

                if (reposData["clients"] && reposData["contact"]) {
                  //const firstname = clientsData["jamiebulger+25rueviney+h9j2t2"]["contact"]["firstname"];
                  //console.log(firstname);
                  //const total = clientsData["jamiebulger+25rueviney+h9j2t2"]["contracts"]["0"]["total"];
                  console.log("setReposData ");
                  this.props.setReposData(reposData);
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
  { setUserTag, setAdmin, setReposData, setBadAccess}
)(Login);
