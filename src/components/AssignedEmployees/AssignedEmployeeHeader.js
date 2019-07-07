import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Message} from "semantic-ui-react";

class AssignedEmployeeHeader extends React.Component {

  render() {
    const {AssignedEmployee, usertag, employeeKey, french} = this.props;

    const employeeName = french ? ("Employe : " + AssignedEmployee.name)
                                : ("Employee : "+ AssignedEmployee.name);

    const isTruckAssigned = AssignedEmployee &&
                            ( AssignedEmployee.truckAssigned === true ||
                              AssignedEmployee.truckAssigned === "true" );

    let truckName = "";
    if (isTruckAssigned) {
          truckName = french ? ("Camion Attribué : " + AssignedEmployee.name)
                                : ("Assigned Truck : "+ AssignedEmployee.truckModel + " " + AssignedEmployee.truckYear);
    }

    return (
       <Message style ={styles.container}>
          <Message.Header>{employeeName}</Message.Header>
             {isTruckAssigned && <p> {truckName}</p>}
       </Message>
     );
   }
}

const styles = {
  container: {
    paddingTop: "4px",
    paddingBottom: "4px",
    background: "#f2f4f7",
    width: "100%",
  },
};

export default AssignedEmployeeHeader;
