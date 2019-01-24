import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button, Modal, Image} from "semantic-ui-react";
import Client from "./Client";
import AddClientModal from "./AddClientModal";
import "./Clients.css";

class Clients extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   /*onPlusClick = (open) =>
   (<BasicModal open={open} />);*/


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
          <Client key={client.clientKey} client={client.client} />
     ));



  render() {
    const {clients, currentUser, usertag} = this.props;
    const {display} = this.state;
    //console.log("clients current User name = " );
    //console.log(currentUser.name);
    //console.log(currentUser);
    //console.log("clients usertag = " );
    //console.log(usertag);
    //display && clients && this.displayClients(clients)}

    //converting nested objects to object array
    const clientArray =[];
    //const keyArray = [];
    for (var key in clients) {
       //console.log(clients[key]);
       //console.log(key);
       const newClient = {
         clientKey: key,
         client: clients[key]
       }
       //keyArray.push(key);
       clientArray.push(newClient);
    }

    //console.log(keyArray.length);

    return (
      <Menu.Menu className ="ClientsMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Button icon size="mini" onClick={() => this.onButtonClick(display)}> <Icon name='eye' size ="small"/> </Button> &nbsp; Client &nbsp; List &nbsp; &nbsp;
                <AddClientModal open={false} userName={currentUser.name} usertag = {usertag}/>
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && clientArray.length>0 && this.displayClients(clientArray)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     clients: state.user.clientList,
     currentUser: state.user.currentUser,
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Clients);
