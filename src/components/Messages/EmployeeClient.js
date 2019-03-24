import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setDeliverys} from "../../actions";
import { Menu, Icon, Confirm} from "semantic-ui-react";
import "./Client.css";


class EmployeeClient extends React.Component {
  state = {
   open: false,
  };


  onButtonClick = (client, clientKey) => {
     this.openConfirm();
    };

    openConfirm = () => this.setState({ open: true })
    closeConfirm = () => {
        const {client, clientKey, employee, employeeKey} = this.props;
        const assigned = {
            clientKey: clientKey,
            clientTag: client.tag,
            clientName: client.name,
            clientStreet: client.street,
            clientCity: client.city,
            clientPostcode: client.postcode,
            clientLat: client.lat,
            clientLng: client.lng,
            employeeName: employee.name,
            employeeKey: employeeKey

        };
        //console.log(assigned);
        this.props.addAssigned(assigned);
        this.setState({ open: false });
    }
    closeCancel = () => this.setState({ open: false })

 render() {
    const {client, clientKey, employee, french} = this.props;

    let name= '';
    //let address ='';
    let confirmMsg ="";

    if (client) {
        name = client.lastname + ", " + client.firstname + ", " + client.street+ ", " + client.city ;
        //address = client.street+ ", " + client.city + ", " + client.postcode;
        confirmMsg = "Do You Want Assign " + client.lastname + " " + client.firstname + " to " + employee.name + " ?";
        if (french) {
          confirmMsg = "veuillez assigner " + client.lastname + " " + client.firstname + " a " + employee.name + " ?";
        }
    }

    return (
      <Menu.Menu>

         {client && <Menu.Item style = {{opacity: 1.0, color: "black",
                          fontSize: "1.0em", fontStyle: "normal",
                          paddingTop:"0.4em", paddingBottom:"0.4em",
                          border: "1px dotted gray"}} >
             <Icon name='plus' size ="small" onClick={() => this.onButtonClick(client, clientKey)} style ={{position: "relative", float: "right" }}/>
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
)(EmployeeClient);
