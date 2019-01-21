import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import Employee from "./Employee";
import "./Employees.css";

class Employees extends React.Component {
   state = {
     employeesStyle: {
       visibility: 'visible'
     }
   };

   onButtonClick = () => {
     if (this.state.employeesStyle.visibility == "visible" ){
        //this.setState (contactStyle: {visibility: 'hidden', height: '10px'});
         this.setState({
             employeesStyle: {
                 ...this.state.employeesStyle,
                 visibility: "hidden",
                 height: "2px",
             }
         })
     } else {
         this.setState({
             employeesStyle: {
               ...this.state.employeesStyle,
               visibility: "visible",
               height: ''
           }
        })
      }
   };

   displayEmployees = employees =>
      employees.length > 0 &&
      employees.map(employee => (
          <Employee key={employee.name} employee={employee} />
     ));


  render() {
    const {employees} = this.props;
    console.log("employees employees list = ");
    console.log(employees);

    return (
      <Menu.Menu className="EmployeesMenuMenu" >
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Button icon size="mini" onClick={this.onButtonClick}> <Icon name='eye' size ="small"/> </Button> &nbsp; Employee &nbsp; List
            </Menu.Header>
          <Menu.Menu style = {this.state.employeesStyle}>
              {employees && this.displayEmployees(employees)}
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
