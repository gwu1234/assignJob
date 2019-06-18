import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys} from "../../actions";
import { Menu, Icon, Confirm} from "semantic-ui-react";
//import "./Client.css";


class EmployeeNoOrder extends React.Component {
  state = {
   open: false,
  };


    onButtonClick = () => {
        this.openConfirm();
    };

    openConfirm = () => this.setState({ open: true })
    closeConfirm = () => {
        const {assignedEmployee} = this.props;
        const assigned = {
            orderKey: assignedEmployee.orderKey,
            orderId: assignedEmployee.orderId,
            clientKey: assignedEmployee.clientKey,
            employeeName: assignedEmployee.employeeName,
            employeeKey: assignedEmployee.employeeKey,
            usertag: assignedEmployee.usertag

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
    const {assignedEmployee} = this.props;

    let name= '';
    //let address ='';
    let confirmMsg ="";

    if (assignedEmployee) {
        name = assignedEmployee.employeeName;
        //address = client.street+ ", " + client.city + ", " + client.postcode;
        confirmMsg = "Do You Want remove " + assignedEmployee.orderId + " from " + name + " ?";
    }

    return (
      <Menu.Menu>

         {assignedEmployee && <Menu.Item style = {{opacity: 1.0, color: "black",
                          fontSize: "1.0em", fontStyle: "normal",
                          paddingTop:"0.4em", paddingBottom:"0.4em",
                          border: "1px dotted gray"}} >
             <Icon name='minus circle' size ="small" onClick={() => this.onButtonClick()} style ={{position: "relative", float: "right" }}/>
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
)(EmployeeNoOrder);
