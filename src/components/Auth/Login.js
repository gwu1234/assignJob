import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setUserTag, setAdmin, setUserContact, setEmployeeList, setClientList } from "../../actions";

import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
//import { setAdmin } from "../../actions";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users")
  };

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
          const tagName = nameString + '+' + emailString;
          const adminName = nameString + '+' + emailString +"/admin";
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
          console.log(employeeTag);
          var employeeRef = firebase.database().ref(employeeTag)

           employeeRef.on('value', snapshot => {
                const employees = snapshot.val();
                //console.log(employees)
                if (employees) {
                    this.props.setEmployeeList(employees);
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
                    this.props.setClientList(clients);
               } else {
                   this.props.setClientList(null);
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

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    //const { admin} = this.props;
    const { email, password, errors, loading } = this.state;

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
          <Message>
            Do not have an account? <Link to="/register">Register</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

/*const mapStateToProps = state => ({
  admin: state.user.admin
});*/

/*export default connect(
  null,
  { setAdmin }
)(Login);*/

/*export default connect(
  mapStateToProps,
  { setAdmin }
)(Login);*/
//export default Login;
//export default Register;
export default connect(
  null,
  { setUserTag, setAdmin, setUserContact, setEmployeeList, setClientList }
)(Login);
