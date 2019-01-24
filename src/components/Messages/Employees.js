import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import Employee from "./Employee";
import "./Employees.css";

class Employees extends React.Component {
   state = {
     display: false,
   };

   onButtonClick = (display) => {
      this.setState({
          display: !display
      })
   };

   displayEmployees = employees =>
      employees.length > 0 &&
      employees.map(employee => (
          <Employee key={employee.name} employee={employee} />
     ));


  render() {
    const {employees} = this.props;
    const {display} = this.state;

    return (
      <Menu.Menu className="EmployeesMenuMenu" >
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Button icon size="mini" onClick={() => this.onButtonClick(display)}> <Icon name='eye' size ="large"/> </Button> &nbsp; Employee &nbsp; List
            </Menu.Header>
          <Menu.Menu style = {this.state.employeesStyle}>
              {display && employees && this.displayEmployees(employees)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     employees: state.user.employeeList,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Employees);
