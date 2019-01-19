import React from "react";
import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image, Menu } from "semantic-ui-react";
import "./UserPanel.css";

class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser
  };

  dropdownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{this.state.user.displayName}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  render() {
    const { user } = this.state;
    console.log ("userPanel User displayName = ", user.displayName);

    return (
      <Menu.Menu className="UserPanelMenuMenu">
            <Menu.Header as="h1" className="UserPanelMenuHeader">
              <Icon name="truck" /> AssignJobs
            </Menu.Header>

              <Dropdown
                trigger={
                  <span style = {{color: "white"}}>
                    <Image src={user.photoURL} spaced="right" avatar />
                    &nbsp; &nbsp; {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />

      </Menu.Menu>
    );
  }
}

//const mapStateToProps = state => ({
//  currentUser: state.user.currentUser
//});

//export default connect(mapStateToProps)(UserPanel);

export default UserPanel;
