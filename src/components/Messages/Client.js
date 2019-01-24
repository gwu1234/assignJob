import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setClientContact, setWorkOrder} from "../../actions";
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

  onButtonClick = (client) => {
    //console.log(client.tag);
    //console.log(this.props.usertag)
    const clientContact = "/repos/" + this.props.usertag
           + "/clients/data/" + client.tag + "/contact";
    //console.log(clientContact);

    //const clientsTag = "repos/" + tag +"/clients/tags";
    //console.log("clientsTag = " + clientsTag);
    const clientContactRef = firebase.database().ref(clientContact)

     clientContactRef.on('value', snapshot => {
          const contact = snapshot.val();
          //console.log("Client Contact  = ");
          //console.log(contact)
          if (contact ) {
              this.props.setClientContact(contact);
         } else {
             this.props.setClientContact(null);
         }
    });

    const workOrder = "/repos/" + this.props.usertag
           + "/clients/data/" + client.tag + "/workorders";
    const workOrderRef = firebase.database().ref(workOrder)

     workOrderRef.on('value', snapshot => {
          const orders = snapshot.val();
          //console.log("Client orders  = ");
          //console.log(orders)
          if (orders ) {
              this.props.setWorkOrder(orders);
         } else {
             this.props.setWorkOrder(null);
         }
    });
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
                  onClick={() => this.onButtonClick(client)}>
                  <Icon name='folder open' size ="large"/>
              </Button> view client data
          </Menu.Item>}
         </Menu.Menu>
     );
   }
}

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {setClientContact, setWorkOrder}
)(Client);
