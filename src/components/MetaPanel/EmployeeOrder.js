import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys} from "../../actions";
import { Menu, Icon, Confirm} from "semantic-ui-react";
//import "./Client.css";


class EmployeeOrder extends React.Component {
  state = {
   open: false,
  };


    onButtonClick = (employee, employeeKey) => {
        this.openConfirm();
    };

    openConfirm = () => this.setState({ open: true })
    closeConfirm = () => {
        const {usertag, order, employee} = this.props;
        const assigned = {
            orderKey: order.orderKey,
            orderId: order.orderId,
            clientKey: order.clientTag,
            employeeName: employee.name,
            employeeKey: employee.tag,
            usertag: usertag
        };
        //console.log(assigned);
        this.props.addAssigned(assigned);
        this.setState({ open: false });
        this.props.handleClose();
    }

    closeCancel = () => {
      this.setState({ open: false });
      this.props.handleClose();
    }

 render() {
    const {order, orderKey, employee, french} = this.props;

    let name= '';
    //let address ='';
    let confirmMsg ="";

    if (employee) {
        name = employee.lastname + ", " + employee.firstname ;
        //address = client.street+ ", " + client.city + ", " + client.postcode;
        confirmMsg = french? ("Voudrais Attribuer " + order.orderId + " à " + name + " ?"):
                          ("Do You Want Assign " + order.orderId + " to " + name + " ?");
    }

    return (
      <Menu.Menu>

         {employee && <Menu.Item style = {{opacity: 1.0, color: "black",
                          fontSize: "1.0em", fontWeight: "normal",
                          paddingTop:"0.3em", paddingBottom:"0.3em",
                          border: "1px dotted gray"}} >
             <Icon name='plus' size ="small" onClick={() => this.onButtonClick(order, orderKey)} style ={{position: "relative", float: "right" }}/>
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
)(EmployeeOrder);
