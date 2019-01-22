import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import "./Client.css";

class Client extends React.Component {
  state = {
    display: false,
  };

  toggleDisplay = (display) => {
    this.setState({
        display: !display,
    })
  }

  onButtonClick = () => {
    console.log("open folder");
  }

  render() {
    const {client} = this.props;
    const {display} = this.state;

    let name= '';
    let address ='';

    if (client) {
        name = client.lastname + ", " + client.firstname;
        address = client.street+ ", " + client.city + ", " + client.postcode;
    }

    return (
      <Menu.Menu className="ClientMenuMenu">
         <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.7em", fontStyle: "normal"}}
              onClick={() => this.toggleDisplay(display)}>
              {client && name}
         </Menu.Item>
         <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.7em", fontStyle: "normal"}}>
              {display && client && address }
         </Menu.Item>
          {display && <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.7em", fontStyle: "normal"}}>
              <Button icon size="mini"
                  onClick={() => this.onButtonClick()}>
                  <Icon name='folder open' size ="small"/>
              </Button> Click button to open data folder
          </Menu.Item>}
         </Menu.Menu>
     );
   }
}

export default Client;
