import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import UserPanel from "./UserPanel";
import UserList from "./UserList";
import { Grid, Menu, Icon } from "semantic-ui-react";
import Contact from "../Messages/Contact";
import Employees from "../Messages/Employees";
import Trucks from "./Trucks";

class TopPanel extends React.Component {
   state = {
        usersRef: firebase.database().ref("users")
   };

  render() {
    const { currentUser, admin} = this.props;

    return (
      <Grid.Row columns='equal' style={{width:"100%",height:"8vh",color:"white",backgroundColor:"blue"}}>
          <Grid.Column style={{color:"white", textAlign: "left", paddingTop:"1px", fontSize:"1.2em"}}>
              <Icon name="truck" size="large" color="white"
                   style={{position:"relative", float:"left"}}/>
                   AssignJobs
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> Company </span>
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> TextView </span>
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
            <span> MapView </span>
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
     admin: state.user.admin,
     //usertag: state.user.usertag
   }
);


export default connect(
  mapStateToProps,
  {}
)(TopPanel);
