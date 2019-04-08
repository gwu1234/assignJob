import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import Employee from "./Employee";
import AddEmployeeModal from "./AddEmployeeModal";
import "./Employees.css";

class Employees extends React.Component {
   //state = {
    // display: true,
   //};

   /*onButtonClick = (display) => {
      this.setState({
          display: !display
      })
   };*/

   displayEmployees = employees =>
      employees.length > 0 &&
      employees.map(employee => (
          <Employee key={employee.employeeKey} employeeKey={employee.employeeKey} employee={employee.employee} />
     ));

     handleEditting = () => {
       //console.log("handle editting");
       window.alert("handle editting");
     };

     handleAdding = () => {
       //console.log("handle Adding");
       window.alert("handle adding");
     };

     /*dropdownOptions = () => [
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
     ];*/


  render() {
    const {employees, french} = this.props;
    //const {display} = this.state;

    let titleString = "Employee List";
    if (french) {
      titleString = "employe liste";
    }

    //console.log(employees);

    const employeeArray =[];
    for (var key in employees) {
       //console.log ("employees key = " + key );
       const newEmployee = {
         employeeKey: key,
         employee: employees[key]
       }
       employeeArray.push(newEmployee);
    }

    // sort the employee by the last name
    employeeArray.sort((a, b) => a.employee.lastname.localeCompare(b.employee.lastname));
    //console.log(employeeArray);

    /*<Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
        <Button icon size="mini" onClick={() => this.onButtonClick(displ ay)}> <Icon name='eye' size ="large"/> </Button> &nbsp; Client &nbsp; List &nbsp; &nbsp;
        <AddClientModal open={false} userName={userName} usertag = {usertag}/>
    </Menu.Header>*/

    return (
      <Menu.Menu className="EmployeesMenuMenu" >
      <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
          {titleString}
         <AddEmployeeModal usertag = {this.props.usertag}/>
        </Menu.Header>
        <Menu.Menu >
           {employees && this.displayEmployees(employeeArray)}
        </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
   //const reposData = state.user.reposData;
   //const usertag = state.user.usertag;
   //console.log(reposData);
   //const employees = reposData["employees"];
   //console.log(employees);
   return {
     employees: state.user.employeeList,
     usertag: state.user.usertag,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(Employees);
