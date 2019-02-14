import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys} from "../../actions";
import { Menu, Icon, Header, Button, Confirm} from "semantic-ui-react";
import "./Client.css";


class EmployeeAssigned extends React.Component {
  state = {
   open: false,
  };


  onButtonClick = (assigned) => {
     //console.log(assigned);
     this.openConfirm();
    };

    openConfirm = () => this.setState({ open: true })
    closeConfirm = () => {
        const {assigned, assignedKey, employee, employeeKey} = this.props;
        const unassigned = {
            assignedKey: assignedKey,
            clientKey: assigned.clientKey,
            clientName: assigned.clientName,
            clientStreet: assigned.clientStreet,
            clientCity: assigned.clientCity,
            clientPostcode: assigned.clientPostcode,
            clientLat: assigned.clientLat,
            clientLng: assigned.clientLng,
            employeeName: employee.name,
            employeeKey, employeeKey

        };
        //console.log(assigned);
        this.props.addUnassigned(unassigned);
        this.setState({ open: false });
    }
    closeCancel = () => this.setState({ open: false })

 render() {
    const {usertag, employee, employeeKey, assigned, french} = this.props;

    let name= '';
    let address ='';
    let confirmMsg ="";

    if (assigned) {
        name = assigned.clientName + ", " + assigned.clientStreet+ " " + assigned.clientCity;
        confirmMsg = "Do You Want Remove " + name + " from " + employee.name + " Job List?";
        if (french) {
           confirmMsg = "veuillez enlever " + name + " de la " + employee.name + " travail liste?";
        }
    }

    return (
      <Menu.Menu>

         {assigned && <Menu.Item style = {{opacity: 1.0, color: "black",
                          fontSize: "1.0em", fontStyle: "normal",
                          paddingTop:"0.4em", paddingBottom:"0.4em",
                          border: "1px dotted gray"}} >
             <Icon name='minus' size ="large" onClick={() => this.onButtonClick(assigned)} style ={{position: "relative", float: "right", color: "red"}}/>
             <span style ={{position: "relative", left: "0px" }}> {name} </span>
             <Confirm open={this.state.open} style={{color:"black", fontSize:"1.5em", fontStyle:"bold"}} content={confirmMsg} onCancel={()=>this.closeCancel()} onConfirm={()=>this.closeConfirm()} />
         </Menu.Item>}

         </Menu.Menu>
     );
   }
}

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  null
)(EmployeeAssigned);
