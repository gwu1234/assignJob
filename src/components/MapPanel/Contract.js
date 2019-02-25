import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { setActiveContractId, setActiveContractKey} from "../../actions";
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
    const {contract, contractKey, activeOrderId, activeOrderKey} = this.props;
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
    //console.log(contract);
    //console.log(contract.linkedOrderId);
    //console.log(contract.linkedOrderKey);
    //console.log(isActive);
    //console.log(activeOrderId);
    //console.log(activeOrderKey);
    let isActive = (contract.linkedOrderId && contract.linkedOrderId  === activeOrderId) ||
                     (contract.linkedOrderKey && contract.linkedOrderKey === activeOrderKey) ;

    // it is an active work order
    if (isActive === true) {
        //console.log(contract);
        console.log("active order id = " + contract.linkedOrderId);
        console.log("active order key = " + contract.linkedOrderKey);
        console.log("active id = " + activeOrderId);
        console.log("active key = " + activeOrderKey);
        //console.log(isActive);
        this.props.setActiveContractId(contract.contractId);
        this.props.setActiveContractKey(contract.contractKey)
    }
    // active work order changed
    else if  ( (contract.linkedOrderId && null === activeOrderId) ||
                 (contract.linkedOrderKey && null === activeOrderKey) ){
        isActive = false;
        //console.log(contract.linkedOrderId);
        //console.log(contract.linkedOrderKey);
        //console.log(activeOrderId);
        //console.log(activeOrderKey);
        //console.log(isActive);
        this.props.setActiveContractId(null);
        this.props.setActiveContractKey(null)
    }

    return (
      <Menu.Menu className ="ContractMenuMenu"
                 style = {isActive===true? {backgroundColor:"blue"}:
                          {} }>
          {contractDate && <Menu.Item
              style = {{ opacity:1.0,fontSize:"0.8em",color:"white",
                         marginTop:"0px", paddingTop:"0px",
                         marginBottom:"0px", paddingBottom:"0px" }}>
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

const mapStateToProps = state => ({
     activeOrderId: state.user.activeOrderId,
     activeOrderKey: state.user.activeOrderKey,
   }
);

export default connect(
  mapStateToProps,
  {setActiveContractId, setActiveContractKey}
)(Contract);
