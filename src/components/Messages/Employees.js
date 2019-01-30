import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Button, Dropdown} from "semantic-ui-react";
import Employee from "./Employee";
import AddEmployeeModal from "./AddEmployeeModal";
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
          <Employee key={employee.key} employee={employee.employee} />
     ));

     handleEditting = () => {
       //console.log("handle editting");
       window.alert("handle editting");
     };

     handleAdding = () => {
       //console.log("handle Adding");
       window.alert("handle adding");
     };

     dropdownOptions = () => [
       {
         style: {height: "3.7em", border: "1px dotted brown"},
         key: "editEmployee",
         text: <span onClick={this.handleEditting}> Edit Employee </span>
       },
       {
         style: {height: "3.7em", border: "1px dotted brown"},
         key: "addEmployee",
         text: <Menu.Header as="h5" > Add Employee <AddEmployeeModal usertag = {this.props.usertag} /></Menu.Header>
       }
     ];


  render() {
    const {employees} = this.props;
    const {display} = this.state;

    const employeeArray =[];
    for (var key in employees) {
       const newEmployee = {
         key: key,
         employee: employees[key]
       }
       employeeArray.push(newEmployee);
    }

    return (
      <Menu.Menu className="EmployeesMenuMenu" >
      <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
          <Button icon size="mini" onClick={() => this.onButtonClick(display)}> <Icon name='eye' size ="large"/> </Button>
        <Dropdown
          trigger={
            <span style = {{color:"white"}}>
              &nbsp; Employees List
            </span>
          }
          options={this.dropdownOptions()}
          style = {{color: "white", left: "2px" }}
        />
        </Menu.Header>
        <Menu.Menu style = {this.state.employeesStyle}>
          {display && employees && this.displayEmployees(employeeArray)}
        </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     employees: state.user.employeeList,
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Employees);
