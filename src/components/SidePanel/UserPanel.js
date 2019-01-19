import React from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";

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

    return (
      <Grid style={{ background: "#4c3c4c" }}>
          <Grid.Row >
            {/* App Header */}
            <Header inverted floated="left" as="h1" style={{paddingTop:"0.6em",paddingLeft:"0.6em"}}>
              <Icon name="truck" />
              <Header.Content>AssignJobs</Header.Content>
            </Header>

            {/* User Dropdown  */}
            <Header style={{ paddingLeft: "1.5em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src={user.photoURL} spaced="right" avatar />
                    {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
              />
            </Header>
          </Grid.Row>
      </Grid>
    );
  }
}

export default UserPanel;
