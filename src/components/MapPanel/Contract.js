import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./Contract.css";
import EditContractModal from "./EditContractModal";

class Contract extends React.Component {

   state = {
     contractStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     //display: false,
   };

  render() {
    const {contract, contractKey} = this.props;
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    let contractDate = "";
    let contractWork = "";
    let price = "";
    if (contract) {
        contractDate = contract.date;
        contractWork = contract.work;
        if (contract.price){
           price = contract.price + " CAD";
        }
    }

    return (
      <Menu.Menu className ="ContractMenuMenu">
          {contractDate && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white"}}>
              <span> {contractDate} </span> <EditContractModal contract={contract} contractKey={contractKey} />
          </Menu.Item>}
          {contractWork && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
              marginTop:"0px", paddingTop:"0px",
              marginBottom:"0px", paddingBottom:"0px"}} >
              {contractWork}
          </Menu.Item>}
          {price && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
             marginTop:"0px", paddingTop:"0px",
             marginBottom:"0px", paddingBottom:"0px"}} >
              {price}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

export default Contract;
