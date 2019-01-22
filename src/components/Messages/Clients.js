import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import Client from "./Client";
import "./Clients.css";

class Clients extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   onButtonClick = (display) => {
       if (display){
           this.setState({
               clientsStyle: {
                   ...this.state.clientsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               clientsStyle: {
                 ...this.state.clientsStyle,
                 visibility: "visible",
                 height: '',
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

   displayClients = clients =>
      clients.length > 0 &&
      clients.map(client => (
          <Client key={client.tag} client={client} />
     ));



  render() {
    const {clients} = this.props;
    const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}

    return (
      <Menu.Menu className ="ClientsMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Button icon size="mini" onClick={() => this.onButtonClick(display)}> <Icon name='eye' size ="small"/> </Button> &nbsp; Client &nbsp; List
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && clients && this.displayClients(clients)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     clients: state.user.clientList,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Clients);
