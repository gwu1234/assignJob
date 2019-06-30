import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import AssignedEmployee from "./AssignedEmployee";


class AssignedEmployees extends React.Component {
   constructor(props) {
       super(props);
    }

   displayAssignedEmployee = assignedEmployees =>
      assignedEmployees.length > 0 &&
      assignedEmployees.map(assignedEmployee => (
          <AssignedEmployee
               key={assignedEmployee.employeeKey}
               employeeKey={assignedEmployee.employeeKey}
               AssignedEmployee={assignedEmployee.assignedEmployee}
               clientList = {this.props.clientList}
               usertag={this.props.usertag}
               french = {this.props.french}
          />
     ));


  render() {
    const {assignedEmployees, usertag, french} = this.props;

    //converting nested objects to object array
    const assignedArray =[];
    for (var employeekey in assignedEmployees) {
       const employee = {
         employeeKey: employeekey,
         assignedEmployee: assignedEmployees[employeekey]
       }
       assignedArray.push(employee);
    }

    // sort list by the lastname
    assignedArray.sort((a, b) => {
      if (a.assignedEmployee && b.assignedEmployee) {
          return a.assignedEmployee.lastname.localeCompare(b.assignedEmployee.lastname);
      }
    });


    return (
      <Menu.Menu style={styles.container}>
          {assignedArray.length>0 && this.displayAssignedEmployee(assignedArray)}
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    width: "100%",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  let employeeList = null;
  let clientList = null;

  if (reposData) {
      employeeList = reposData["employees"];
      clientList = reposData["clients"]["data"];
      //console.log(employeeList);
  }

  return {
     usertag: state.user.usertag,
     assignedEmployees: employeeList,
     clientList: clientList,
     admin: state.user.admin,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps, null
)(AssignedEmployees);
