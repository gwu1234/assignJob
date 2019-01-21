import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import "./Employee.css";

class Employees extends React.Component {
   state = {
     employeeStyle: {
       visibility: 'hidden'
     },
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

onButtonClick = () => {
  if (this.state.employeeStyle.visibility == "visible" ){
     //this.setState (contactStyle: {visibility: 'hidden', height: '10px'});
      this.setState({
          employeeStyle: {
              ...this.state.employeeStyle,
              visibility: "hidden",
              height: "2px",
          }
      })
  } else {
      this.setState({
          employeeStyle: {
            ...this.state.employeeStyle,
            visibility: "visible",
            height: ''
        }
     })
   }
};

toggleDisplay = (display) => {
    this.setState({
        display: !display,
    })
  }


  render() {
    const {employee} = this.props;
    const {display} = this.state;

    let name= '';
    if (employee) {
        name = employee.lastname + ", " + employee.firstname;
    }

    return (
      <Menu.Menu>
         <Menu.Item style={{opacity: 1.0, fontSize: "0.8em",color: "white", fontStyle: "bold"}} onClick={() => this.toggleDisplay(display)}>
              {employee && name}
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

export default Employees;
