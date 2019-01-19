import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import "./Contact.css";

class Contact extends React.Component {
  state = {
    //contact: {},
    //loadedUsers.push(snap.val());
    //this.setState({ users: loadedUsers }, () => this.setFirstUser());
  };

  displayContact = () => {
      const contactRef = firebase.database().ref
            ("repos/" + this.props.usertag +"/contact");
      //contact = {};
      contactRef.once('value')
        .then((snapshot) => {
          const contact = snapshot.val();
          //this.setState({ contact: contact });
          if (contact) {
              console.log(contact.street);
              <Menu.Menu  style = {{bottom: "1.0em",
               top: "0.1em",
               border: "1px dotted black",
               height: "420px",
               position: "absolute"}}>
               <Menu.Item
                className = "contactitem"
                name = {contact.street}
                style= {{
                  opacity: 1.0,
                  fontSize: "0.8em",
                  top: "0.0em",
                }}
                active={true}
              >
                hello
              </Menu.Item>
              </Menu.Menu>
          }
      });
  }

  render() {
    //this.displayContact();
    //const { contact} = this.state;

    return (
          <menu>
           {this.displayContact()}
           </menu>

    );
  }
}

const mapStateToProps = state => ({
     usertag: state.user.usertag,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Contact);
