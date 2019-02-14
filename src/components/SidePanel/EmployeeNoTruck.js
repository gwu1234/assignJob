import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys} from "../../actions";
import { Menu, Icon, Header, Button, Confirm} from "semantic-ui-react";
//import "./Client.css";


class EmployeeNoTruck extends React.Component {
  state = {
   open: false,
  };


    onButtonClick = (employee, employeeKey) => {
        this.openConfirm();
    };

    openConfirm = () => this.setState({ open: true })
    closeConfirm = () => {
        const {truck, truckKey, employee, employeeKey} = this.props;
        const assigned = {
            truckKey: truckKey,
            truckModel: truck.model,
            truckYear: truck.year,
            truckColor: truck.color,
            employeeName: employee.name,
            employeeKey, employeeKey

        };
        this.props.removeAssigned(assigned);
        this.setState({ open: false });
        this.props.handleClose();
    }

    closeCancel = () => {
      this.setState({ open: false });
      this.props.handleClose();
    }

 render() {
    const {truck, usertag, truckKey, employee, employeeKey} = this.props;

    let name= '';
    let address ='';
    let confirmMsg ="";

    if (employee) {
        name = employee.lastname + ", " + employee.firstname ;
        //address = client.street+ ", " + client.city + ", " + client.postcode;
        confirmMsg = "Do You Want remove " + truck.model + " " + truck.year + " from " + name + " ?";
    }

    return (
      <Menu.Menu>

         {employee && <Menu.Item style = {{opacity: 1.0, color: "black",
                          fontSize: "1.0em", fontStyle: "normal",
                          paddingTop:"0.4em", paddingBottom:"0.4em",
                          border: "1px dotted gray"}} >
             <Icon name='minus circle' size ="large" onClick={() => this.onButtonClick(truck, truckKey)} style ={{position: "relative", float: "right" }}/>
             <span style ={{position: "relative", left: "0px" }}> {name} </span>
             <Confirm open={this.state.open} style={{color:"black", fontSize:"1.2em", fontStyle:"bold"}} content={confirmMsg} onCancel={()=>this.closeCancel()} onConfirm={()=>this.closeConfirm()} />
         </Menu.Item>}

         </Menu.Menu>
     );
   }
}

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  null
)(EmployeeNoTruck);
