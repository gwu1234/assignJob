import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import md5 from "md5";
//import { setOpenModal } from "../../actions";
import {Grid,Form,Segment,Button,Header,Message,Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
    loading: false,
    usersRef: firebase.database().ref("users"),
    reposRef: firebase.database().ref("repos")
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(createdUser => {
          //console.log(createdUser);
          createdUser.user
            .updateProfile({
              displayName: this.state.username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )}?d=identicon`
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                this.createRepo(createdUser).then(() => {
                    console.log("repo created");
                    //this.props.setOpenModal(true);
                })
              });
            })
            .catch(err => {
              console.error(err);
              this.setState({
                errors: this.state.errors.concat(err),
                loading: false
              });
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


  saveUser = createdUser => {
    // remove ".", "#", "$", "[", or "]"
    const emailString = createdUser.user.email.replace(/[.,#$\[\]@ ]/g,'');
    //console.log(emailString);
    const nameString = createdUser.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
    const childName = nameString + '+' + emailString;
    //this.props.setUserTag(childName);
    //console.log (childName);
    //const childName = createdUser.user.displayName + '+' + createdUser.user.email;
    return this.state.usersRef.child(childName).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      tag: childName
    });
  };

  createRepo = createdUser => {
    // remove ".", "#", "$", "[", or "]"
    const emailString = createdUser.user.email.replace(/[.,#$\[\]@ ]/g,'');
    //console.log(emailString);
    const nameString = createdUser.user.displayName.replace(/[.,#$\[\]@ ]/g,'');
    const childName = nameString + '+' + emailString;
    //console.log (childName);
    //const repoRef = firebase.database().ref("repos");

    return this.state.reposRef.child(childName).set({
      name: createdUser.user.displayName,
      email: createdUser.user.email,
      tag: childName
    });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };


  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  openModal = () =>  this.props.setOpenModal(true);
  closeModal = () => this.props.setOpenModal(false);


  render() {
    const {
      username,
      email,
      password,
      passwordConfirmation,
      errors,
      loading
    } = this.state;

   const {modal} = this.props;

    return (
      //{modal} = this.props;

      <React.Fragment>
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />

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
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                onChange={this.handleChange}
                value={passwordConfirmation}
                className={this.handleInputError(errors, "password")}
                type="password"
              />

              <Button
                disabled={loading}
                className={loading ? "loading" : ""}
                color="orange"
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
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
      </React.Fragment>
    );
  }
}

export default Register;
/*export default connect(
  null,
  { setUserTag, setAdmin}
)(Register);*/
/*const mapStateToProps = state => (
  {modal: state.user.modal}
  //console.log(state)
);

export default connect(mapStateToProps, { setOpenModal })(Register);*/
