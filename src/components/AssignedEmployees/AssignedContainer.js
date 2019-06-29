import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Menu } from "semantic-ui-react";
//import Contact from "./Contact";
import AssignedEmployees from "./AssignedEmployees";
//import Trucks from "../SidePanel/Trucks";
//import Clients from "./Clients";
import Background from '../terra.jpg';

class AssignedContainer extends React.Component {

  render() {
    const { admin} = this.props;

    return (
      <Grid.Row style={styles.container}>
              <AssignedEmployees />
      </Grid.Row>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    width: "100%",
    backgroundImage: `url(${Background})`,
  },
};

const mapStateToProps = state => ({
     admin: state.user.admin,
     //usertag: state.user.usertag
   }
);


export default connect(
  mapStateToProps,
  {}
)(AssignedContainer);
