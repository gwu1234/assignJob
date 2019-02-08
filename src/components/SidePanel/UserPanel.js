import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image, Menu } from "semantic-ui-react";
import "./UserPanel.css";
import { setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient} from "../../actions";
import EmployeeJob from "./EmployeeJob";


class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    mapview: false
  };

  displayAssigned(employee) {
    this.setState ({
        mapview: true
    });
    this.props.setSelectedEmployee(employee);
  }

  dropdownOptions = (employees) => {
      let optionArray = [];

      let username = "";
      if (this.state.user) {
          username = this.state.user.displayName;
      }

      const titleArray =
  [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{username}</strong>
        </span>
      ),
      disabled: true
    }];

    const userOptions =
    [
    {
      key: "textview",
      text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setTextView}> text view </span>
    },
    {
      key: "mapview",
      text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setMapView}> all clients </span>
    },
    {
      key: "employeeview",
      text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setEmployeeView}> all employees </span>
    },
    {
      key: "unassignedview",
      text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setUnassignedView}> not assigned </span>
    }
   ];

   if (this.state.user) {
     optionArray= titleArray.concat(userOptions);
   }

  for (var key in employees) {
     const newEmployee = {
       key: key,
       text: <EmployeeJob
             displayAssigned={(employeeKey)=>this.displayAssigned(employeeKey)}
             employee={employees[key]}
             />
     }
     optionArray.push(newEmployee);
  };

  const signin = {
    key: "signout",
    text: <span onClick={this.handleSignout}>Sign In</span>
  };

  const signout = {
    key: "signout",
    text: <span onClick={this.handleSignout}>Sign Out</span>
  };

  if (!this.state.user) {
    optionArray.push(signin);
  } else {
    optionArray.push(signout);
  }

  //optionArray.push(signout);

  return optionArray;
}



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

  setUnassignedView =() => {
      this.setState ({
         mapview: true
      });
     this.props.setUnassignedClient();
};


  render() {
    const { user } = this.state;
    const {employees} = this.props;
    //console.log ("userPanel User displayName = ", user.displayName);

    return (
      <Menu.Menu className="UserPanelMenuMenu">
            <Menu.Header as="h1" className="UserPanelMenuHeader">
              <Icon name="truck" /> AssignJobs
            </Menu.Header>
              <Dropdown
                placeholder='Dropdown Control Menu'
                selection
                options={this.dropdownOptions(employees)}
                style = {{color: "white", left: "10px", fontSize:"0.9em"}}
              />

      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
   employees: state.user.employeeList,
   currentUser: state.user.currentUser,
});

export default connect(
  mapStateToProps, {setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient}
)(UserPanel);
