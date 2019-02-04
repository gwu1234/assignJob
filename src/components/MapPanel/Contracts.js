import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Button} from "semantic-ui-react";
import Contract from "./Contract";
import "./Contracts.css";

class Contracts extends React.Component {

   state = {
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
   };


   displayContracts = (contracts) =>
      contracts.length > 0 &&
      contracts.map(contract => (
          <Contract key={contract.contractKey} contractKey={contract.contractKey} contract={contract.contract}/>
     ));



  render() {
    const {contracts} = this.props;
    const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}

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


    return (
      <Menu.Menu className ="ContractsMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Icon name='eye' size ="big" onClick={() => this.onButtonClick(display)}/> &nbsp; Contracts
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && contracts && this.displayContracts(contractArray)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     contracts: state.user.contracts,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Contracts);
