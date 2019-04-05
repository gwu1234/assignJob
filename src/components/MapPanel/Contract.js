import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setActiveContractId, setActiveContractKe} from "../../actions";
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
     //isActive: false,
   };

  /*componentDidMount(){
     const {orders, contract} = this.props;
     let isActive = false;
     const linkedOrderId = contract["linkedOrderId"];
     const  linkedOrderKey = contract["linkedOrderKey"];
     console.log("linkedOrderId = " + linkedOrderId);
     console.log("linkedOrderKey = " + linkedOrderKey);

     for (var key in orders) {
        //console.log(key);
        //console.log(orders[key]);
        //console.log(orders[key]["isActive"]);
        const isOrderActive = orders[key]["isActive"];
        console.log("order key = " + key);
        console.log("isActive in order = " +  isOrderActive );

        //const orderId = orders[key]["orderId"];
        //if (key === linkedOrderKey && linkedOrderId === orderId) {
        if (key === linkedOrderKey && isOrderActive === "true") {
           console.log("active order found key =" + key);
           isActive = true;
           break;
        }
     }
     this.setState ({isActive: isActive});
  }

  componentWillReceiveProps(nextProps) {
      const {orders, contract} = nextProps;
      if (orders) {
        const {orders, contract} = this.props;
        let isActive = false;
        const linkedOrderId = contract["linkedOrderId"];
        const  linkedOrderKey = contract["linkedOrderKey"];
        console.log("linkedOrderId = " + linkedOrderId);
        console.log("linkedOrderKey = " + linkedOrderKey);

        for (var key in orders) {
           const isOrderActive = orders[key]["isActive"];
           console.log ("order key = " + key) ;
           console.log("order isActive = " + isOrderActive );

           if (key === linkedOrderKey && isOrderActive === "true") {
              isActive = true;
              console.log("active order found key =" + key);
              break;
           }
        }
        this.setState ({isActive: isActive});
      }
   }*/


  render() {
    const {contract, contractKey, orders} = this.props;
    //const {isActive} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    //const {orders, contract} = this.props;
    let isActive = false;
    const linkedOrderId = contract["linkedOrderId"];
    const  linkedOrderKey = contract["linkedOrderKey"];
    //console.log("linkedOrderId = " + linkedOrderId);
    //console.log("linkedOrderKey = " + linkedOrderKey);

    for (var key in orders) {
       //console.log(key);
       //console.log(orders[key]);
       //console.log(orders[key]["isActive"]);
       const isOrderActive = orders[key]["isActive"];
       //console.log("order key = " + key);
       //console.log("isActive in order = " +  isOrderActive );

       //const orderId = orders[key]["orderId"];
       //if (key === linkedOrderKey && linkedOrderId === orderId) {
       if (key === linkedOrderKey && isOrderActive === "true") {
          //console.log("active order found key =" + key);
          isActive = true;
          break;
       }
    }
    //this.setState ({isActive: isActive});

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
    //let isActive = (contract.linkedOrderId && contract.linkedOrderId  === activeOrderId) ||
    //                 (contract.linkedOrderKey && contract.linkedOrderKey === activeOrderKey) ;

    // it is an active work order
    /*if (isActive === true) {
        //console.log(contract);
        console.log("active order id = " + contract.linkedOrderId);
        console.log("active order key = " + contract.linkedOrderKey);
        console.log("active id = " + activeOrderId);
        console.log("active key = " + activeOrderKey);
        //console.log(isActive);
        this.props.setActiveContractId(contract.contractId);
        this.props.setActiveContractKey(contract.contractKey)
    }*/
    // active work order changed
    //else if  ( (contract.linkedOrderId && null === activeOrderId) ||
    //             (contract.linkedOrderKey && null === activeOrderKey) ){
    //    isActive = false;
        //console.log(contract.linkedOrderId);
        //console.log(contract.linkedOrderKey);
        //console.log(activeOrderId);
        //console.log(activeOrderKey);
        //console.log(isActive);
        //this.props.setActiveContractId(null);
        //this.props.setActiveContractKey(null)
    //}

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

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let workOrders = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      workOrders = reposData["clients"]["data"][clienttag]?
      reposData["clients"]["data"][clienttag]["workorders"] : null;
      //console.log(clientContact);
  }
  return {
     orders: workOrders,
     french: state.user.french
   }
  //return {
     //activeOrderId: state.user.activeOrderId,
     //activeOrderKey: state.user.activeOrderKey,
  // }
};

export default connect(
  mapStateToProps,
  {}
)(Contract);
