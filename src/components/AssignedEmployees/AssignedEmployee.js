import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid} from "semantic-ui-react";
import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
import AssignedEmployeeOrders from "./AssignedEmployeeOrders";

class AssignedEmployee extends React.Component {



  render() {
    const {AssignedEmployee, usertag, employeeKey, french, clientList} = this.props;

    return (
          <Grid.Row style={styles.container}>
           <AssignedEmployeeHeader
                employeeKey={employeeKey}
                AssignedEmployee={AssignedEmployee}
                usertag={usertag}
                french = {french}
            />
            <AssignedEmployeeOrders
                 employeeKey={employeeKey}
                 AssignedEmployee={AssignedEmployee}
                 usertag={usertag}
                 french = {french}
                 clientList = {clientList}
             />

           </Grid.Row>
     );
   }
}

const styles = {
  container: {
    paddingTop: "7px",
    paddingBottom: "7px",
    background: "#f2f4f7",
    borderStyle:"solid",
    borderBottomWidth: "10px",
    borderTopWidth: "2px",
    borderRightWidth: "0px",
    borderColor:"#C3C5C2",
    width: "100%",
  },
};

export default AssignedEmployee;
