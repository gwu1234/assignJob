import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentUser, setUserTag, setUserContact } from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import "./UserList.css";

class UserList extends React.Component {
  state = {
    user: this.props.currentUser,
    activeUser: "", // it is a user tag only
    users: [],      // user object
    userName: "",
    userDetails: "",
    usersRef: firebase.database().ref("users"),
    modal: false,
    firstLoad: true,
    userContact: null,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", snap => {
      loadedUsers.push(snap.val());
      this.setState({ users: loadedUsers }, () => this.setFirstUser());
    });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  setFirstUser = () => {
    const firstUser = this.state.users[0];
    if (this.state.firstLoad && this.state.users.length > 0) {
      this.props.setCurrentUser(firstUser);
      this.setActiveUser(firstUser);
    }
    this.setState({ firstLoad: false });
  };

  changeUser = user => {
    this.setActiveUser(user);
    this.props.setCurrentUser(user);
    //this.props.setUserTag(user.tag);
    this.findUserContact(user.tag);
  };

  findUserContact = (tag) => {
     const {userContact} = this.state;
     console.log("usertag =" + tag);
     const contactRef = firebase.database().ref
          ("repos/" + tag +"/contact");
     console.log("userContact = ");
     console.log(userContact);
     contactRef.once('value')
        .then((snapshot) => {
           const contact = snapshot.val();

           if (contact) {
              if ( userContact && userContact.postcode != contact.postcode &&
                         userContact.street   != contact.street)
              {
                 this.props.setUserContact(contact);
                 this.setState (
                   {userContact: contact}
                 );
              }
              else if ( !userContact )
              {
                 this.props.setUserContact(contact);
                 this.setState (
                   {userContact: contact}
                 );
              }
          } else if (userContact != null) {
              this.props.setUserContact(null);
              this.setState (
                {userContact: null}
              );
          }
      })
  };

  setActiveUser = user => {
    this.setState({ activeUser: user.tag });
  };

  displayUsers = users =>
    users.length > 0 &&
    users.map(user => (
      <Menu.Item
        key={user.tag}
        onClick={() => this.changeUser(user)}
        name = {user.name}
        style={{
            opacity: "1.0",
            fontSize: "0.8em",
        }}
        active={user.tag === this.state.activeUser}
      >
        {user.name}
      </Menu.Item>
    ));

  render() {
    const { users} = this.state;
    //this.findUserContact();

    return (
        <Menu.Menu className = "MenuMenu" >
           <Menu.Header as="h4" className="MenuHeader">
              <Icon name="address book" /> <span> Company &nbsp; List
                  &nbsp;  </span> ({users.length})
           </Menu.Header>
           {this.displayUsers(users)}
        </Menu.Menu>
    );
  }
}

//const mapStateToProps = state => ({
     //usertag: state.user.usertag
//   }
//);

export default connect(
  null,
  { setUserContact, setCurrentUser }
)(UserList);
