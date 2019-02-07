import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image, Menu } from "semantic-ui-react";
import "./UserPanel.css";
import { setMapView, setEmployeeView, setTextView} from "../../actions";


class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    mapview: false
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
      key: "textview",
      text: <span style ={{fontStyle: "bold"}} onClick={this.setTextView}> text view </span>
    },
    {
      key: "mapview",
      text: <span style ={{fontStyle: "bold"}} onClick={this.setMapView}> display all clients </span>
    },
    {
      key: "employeeview",
      text: <span style ={{fontStyle: "bold"}} onClick={this.setEmployeeView}> display all employees </span>
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

  // display all clients
  setMapView  = () => {
     this.setState ({
         mapview: true
     });
     this.props.setMapView();
  };

  // display all employees
  setEmployeeView  = () => {
     this.setState ({
         mapview: true
     });
     this.props.setEmployeeView();
  };

  setTextView  = () => {
      this.setState ({
            mapview: false
      });
      this.props.setTextView();
  };

  render() {
    const { user } = this.state;
    //console.log ("userPanel User displayName = ", user.displayName);

    return (
      <Menu.Menu className="UserPanelMenuMenu">
            <Menu.Header as="h1" className="UserPanelMenuHeader">
              <Icon name="truck" /> AssignJobs
            </Menu.Header>

              <Dropdown
                trigger={
                  <span style = {{color:"white"}}>
                    <Icon name='tasks' size ="large"/>
                    &nbsp; {user.displayName}
                  </span>
                }
                options={this.dropdownOptions()}
                style = {{color: "white", left: "15px" }}
              />

      </Menu.Menu>
    );
  }
}

//const mapStateToProps = state => ({
//   currentUser: state.user.currentUser
//});

//export default connect(mapStateToProps)(UserPanel);

//export default UserPanel;
export default connect(
  null, {setMapView, setEmployeeView, setTextView}
)(UserPanel);
