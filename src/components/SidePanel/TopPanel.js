import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient, setFrench} from "../../actions";
import { Grid, Menu, Icon, Dropdown } from "semantic-ui-react";
import EmployeeJob from "./EmployeeJob";

class TopPanel extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        user: this.props.currentUser,
        mapview: false,
        usersRef: firebase.database().ref("users"),
     }
   }

   dropdownOptions = () => {
      let username = "";
      if (this.state.user) {
         username = this.state.user.displayName;
      }
      const titleArray =
       [{
          key: "user",
          text: (username)? (<span> Signed in as <strong>{username}</strong></span>):
                           (<span> Not Signed in </span>),
          disabled: true
       }];
      const signin = {
        key: "signout",
        text: <span onClick={this.handleSignout}>Sign In</span>
       };
      const signout = {
        key: "signout",
        text: <span onClick={this.handleSignout}>Sign Out</span>
       };
      if (!this.state.user) {
        titleArray.push(signin);
      } else {
        titleArray.push(signout);
      }
      return titleArray;
   }

   dropdownMapOptions = () => {
      let username = "";
      if (this.state.user) {
         username = this.state.user.displayName;
      }
      if (!username) {
         return [];
      }

      const titleArray =
      [
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

      const {employees} = this.props;
      for (var key in employees) {
         const newEmployee = {
           key: key,
           text: <EmployeeJob
                 displayAssigned={(employeeKey)=>this.displayAssigned(employeeKey)}
                 employee={employees[key]}
                 french={this.props.french}
                 />
         }
         titleArray.push(newEmployee);
      };

      return titleArray;
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
      //console.log("setMapView")
   };

   // display all employees
   setEmployeeView  = () => {
     //console.log("setEmployeeView")
      this.setState ({
          mapview: true
      });
      this.props.setEmployeeView();
   };

   setUnassignedView =() => {
     //console.log("setUnassignedView")
       this.setState ({
          mapview: true
       });
      this.props.setUnassignedClient();
 };

 displayAssigned(employee) {
   //this.setState ({
    //   mapview: true
   //});
   //console.log("displayAssigned")
   this.props.setSelectedEmployee(employee);
 }


  render() {
    const { currentUser, admin} = this.props;
    //console.log(currentUser);

    return (
      <Grid.Row columns='equal' style={{width:"100%",height:"8vh",color:"white",backgroundColor:"blue"}}>
          <Grid.Column style={{color:"white", textAlign: "center", paddingTop:"1px", fontSize:"1.2em"}}>
              <Icon name="truck" size="large" color="orange"
                   style={{position:"relative", float:"left"}}/>
                   <span> AssignJobs </span>
                     <Dropdown
                       placeholder=""
                       options={this.dropdownOptions()}
                       style = {{color: "white"}}
                     />
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> Company </span>
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> TextView </span>
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
               <span> MapView </span>
                 <Dropdown
                   placeholder=""
                   options={this.dropdownMapOptions()}
                   style = {{color: "white"}}
                 />
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
             <span> French </span>
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
             <span> Setting </span>
          </Grid.Column>
      </Grid.Row>


    );
  }
}

const mapStateToProps = state => ({
  employees: state.user.employeeList,
  currentUser: state.user.currentUser,
  french: state.user.french,
  usertag: state.user.usertag,
});

export default connect(
  mapStateToProps,
  {setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient, setFrench}
)(TopPanel);
