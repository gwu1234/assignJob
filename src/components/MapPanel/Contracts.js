import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import Contract from "./Contract";
import AddContractModal from "./AddContractModal";
import "./Contracts.css";

class Contracts extends React.Component {

   /*state = {
     contractsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   onButtonClick = (display) => {
       if (display){
           this.setState({
               contractsStyle: {
                   ...this.state.contractsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               ordersStyle: {
                 ...this.state.contractsStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "390px",
             },
             display: true,
          })
        }
   };*/


   displayContracts = (contracts) =>
      contracts.length > 0 &&
      contracts.map(contract => (
          <Contract key={contract.contractKey} contractKey={contract.contractKey} contract={contract.contract}/>
     ));



  render() {
    const {contracts, french} = this.props;
    //const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}
    let titleString = "Contract";
    if (french) {
       titleString ="contrat";
    }

    const contractArray =[];
    //const keyArray = [];
    for (var key in contracts) {
       //console.log(clients[key]);
       //console.log(key);
       const newContract = {
         contractKey: key,
         contract: contracts[key]
       }
       //keyArray.push(key);
       contractArray.push(newContract);
    }
    // sort list by the timestamp
    contractArray.sort((a, b) =>  (new Date (b.contract.date)).getTime() - (new Date (a.contract.date)).getTime() );


    return (
      <Menu.Menu style={styles.container}>
            <Menu.Header style={styles.menuHeader}>
                 {titleString}
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu} >
              {contracts && this.displayContracts(contractArray)}
              <Menu.Item style={{margin:"3px"}}>
                  <span style={{color:"black", fontWeight:"bold"}}> add new contract</span> <AddContractModal />
              </Menu.Item>
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "49.6%",
    background: "#92c2e8",
    marginTop:"3px",
  },
  menuHeader: {
    paddingTop:"8px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "15%",
  },
  menuMenu: {
    position: "relative",
    overflow: "scroll",
    height: "85%",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let contracts = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      contracts = reposData["clients"]["data"][clienttag]?
                  reposData["clients"]["data"][clienttag]["contracts"] :
                  null;
      //console.log(clientContact);
  }
  return {
     contracts: contracts,
     french: state.user.french,
   }
};

export default connect(
  mapStateToProps,
  {}
)(Contracts);
