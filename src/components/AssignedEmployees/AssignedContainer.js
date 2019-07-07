import React from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import AssignedEmployees from "./AssignedEmployees";
import Background from '../terra.jpg';

class AssignedContainer extends React.Component {

  render() {
    //const { admin} = this.props;

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

//const mapStateToProps = state => ({
     //admin: state.user.admin,
//   }
//);

export default AssignedContainer;
//export default connect(
//  mapStateToProps,
//  {}
//)(AssignedContainer);
