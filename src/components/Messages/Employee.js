import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Header, Button, Icon } from "semantic-ui-react";
import EditEmployeeModal from "./EditEmployeeModal"
import "./Employee.css";

class Employee extends React.Component {
   state = {
     display: false,
   };

  displayEmails = emails =>
    emails.length > 0 &&
    emails.map(email => (
      <Menu.Item
        key={email}
        style={{
            opacity: "1.0",
            fontSize: "0.7em",
            color: "white",
            marginLeft: "2.0em",
            visibility: this.state.visibility
        }}
      >
        {email}
      </Menu.Item>
    ));

    displayEmailHeader = () =>(
        <Menu.Item
          name='emails'
        >
          <Header
              as='h4'
              style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
          >
              emails:
          </Header>
        </Menu.Item>
      );

    displayPhoneHeader = () =>(
          <Menu.Item
            name="phones"
          >
            <Header
                as='h4'
                style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
            >
                phones
            </Header>
          </Menu.Item>
        );

    displayPhones = phones =>
      phones.length > 0 &&
      phones.map(phone => (
        <Menu.Item
          key={phone}
          style={{
              opacity: "1.0",
              fontSize: "0.7em",
              color: "white",
              marginLeft: "2.0em"
          }}
        >
          {phone}
        </Menu.Item>
      ));

  displayCellHeader = () =>(
            <Menu.Item
              name="cells"
            >
              <Header
                  as='h4'
                  style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
              >
                  cells:
              </Header>
            </Menu.Item>
          );

  displayCells = cells =>
        cells.length > 0 &&
        cells.map(cell => (
          <Menu.Item
            key={cell}
            style={{
                opacity: "1.0",
                fontSize: "0.7em",
                color: "white",
                marginLeft: "2.0em"
            }}
          >
            {cell}
          </Menu.Item>
        ))


toggleDisplay = (display) => {
    this.setState({
        display: !display,
    })
  }


  render() {
    const {employee, id, usertag} = this.props;
    const {display} = this.state;

    //console.log ("Employee id = "  + id);

    let name= '';
    if (employee) {
        name = employee.lastname + ", " + employee.firstname;
    }

    let address = '';
    if (employee) {
        address = employee.street + ", " +employee.city + ", " + employee.postcode;
    }

    return (
      <Menu.Menu className="EmployeeMenuMenu" >
         <Menu.Item style={{opacity: 1.0, fontSize: "0.8em",color: "white", fontStyle: "bold"}} onClick={() => this.toggleDisplay(display)}>
              {employee && name} &nbsp; &nbsp; <EditEmployeeModal Modal open={false} employee = {employee} usertag = {usertag} id = {id}/>
         </Menu.Item>
         <Menu.Item style={{opacity: 1.0, fontSize: "0.8em",color: "white", fontStyle: "bold"}} onClick={() => this.toggleDisplay(display)}>
              {display && employee && address}
         </Menu.Item>
            {display && employee && employee.emails && employee.emails.length>0 && this.displayEmailHeader ()}
            {display && employee && employee.emails && employee.emails.length>0 && this.displayEmails (employee.emails)}
            {display && employee && employee.phones.length>0 && this.displayPhoneHeader ()}
            {display && employee && employee.phones.length>0 && this.displayPhones (employee.phones)}
            {display && employee && employee.cells.length>0 && this.displayCellHeader ()}
            {display && employee && employee.cells.length>0 && this.displayCells (employee.cells)}
         </Menu.Menu>
     );
   }
}
//export default Employee;
const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Employee);
