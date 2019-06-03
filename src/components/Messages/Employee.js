import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Header } from "semantic-ui-react";
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
        style={styles.email}
      >
        {email}
      </Menu.Item>
    ));

    displayEmailHeader = () =>(
        <Menu.Item
          name='emails'
        >
          <Header
              style={styles.email}
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
                style={styles.email}
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
          style={styles.email}
        >
          {phone}
        </Menu.Item>
      ));

  displayCellHeader = () =>(
            <Menu.Item
              name="cells"
            >
              <Header
                  style={styles.email}
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
            style={styles.email}
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
    const {employee, employeeKey, usertag} = this.props;
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
      <Menu.Menu style={styles.container}>
         <Menu.Item style={styles.name} onClick={() => this.toggleDisplay(display)}>
              {employee && name} &nbsp; &nbsp; <EditEmployeeModal Modal open={false} employee = {employee} usertag = {usertag} employeeKey = {employeeKey}/>
         </Menu.Item>
         <Menu.Item style={styles.address} onClick={() => this.toggleDisplay(display)}>
              {display && employee && address}
         </Menu.Item>
            {display && employee && employee.emails && employee.emails.length>0 && this.displayEmailHeader ()}
            {display && employee && employee.emails && employee.emails.length>0 && this.displayEmails (employee.emails)}
            {display && employee && employee.phones && employee.phones.length>0 && this.displayPhoneHeader ()}
            {display && employee && employee.phones && employee.phones.length>0 && this.displayPhones (employee.phones)}
            {display && employee && employee.cells && employee.cells.length>0 && this.displayCellHeader ()}
            {display && employee && employee.cells && employee.cells.length>0 && this.displayCells (employee.cells)}
         </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    height: "100%",
    background: "#f2f4f7",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
    marginTop: "0px",
    marginBottom: "0px",
    paddingTop:"3px",
    paddingBottom:"3px",
  },
  name: {
    paddingTop: "5px",
    paddingBottom: "5px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  address: {
    paddingTop: "4px",
    paddingBottom: "4px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  email: {
    paddingTop: "5px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
};

//export default Employee;
const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Employee);
