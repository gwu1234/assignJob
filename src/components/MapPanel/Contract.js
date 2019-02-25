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

    const isActive = (contract.linkedOrderId && contract.linkedOrderId  === activeOrderId) ||
                     (contract.linkedOrderKey && contract.linkedOrderKey === activeOrderKey) ;

    if (isActive) {
        this.props.setActiveContractId(contract.contractId);
        this.props.setActiveContractKey(contract.contractKey)
    }

    return (
      <Menu.Menu className ="ContractMenuMenu"
                 style = {isActive? {backgroundColor:"blue"}:
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
