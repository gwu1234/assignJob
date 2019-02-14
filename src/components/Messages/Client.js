import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys} from "../../actions";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import "./Client.css";
import AddOrderModal from "../MetaPanel/AddOrderModal";

class Client extends React.Component {
  state = {
    display: false,
  };

  toggleDisplay = (display) => {
    this.setState({
        display: !display,
    })
    if (display) {
       this.props.setClientContact(null);
       this.props.setWorkOrder(null);
       this.props.setContracts(null);
       this.props.setPayments(null);
       this.props.setDeliverys(null);
    }
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
          let contact = snapshot.val();
          //console.log("Client Contact  = ");
          //console.log(contact)
          if (contact ) {
              contact = {...contact, "clientTag": client.tag, "clientKey":this.props.clientKey};
              //console.log(contact);
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

    const contracts = "/repos/" + this.props.usertag
           + "/clients/data/" + client.tag + "/contracts";
    const contractsRef = firebase.database().ref(contracts)

    contractsRef.on('value', snapshot => {
          const contracts = snapshot.val();
          //console.log("Client orders  = ");
          //console.log(orders)
          if (contracts ) {
             this.props.setContracts(contracts);
         } else {
             this.props.setContracts(null);
         }
    });

  const paymentPath = "/repos/" + this.props.usertag
         + "/clients/data/" + client.tag + "/payments";
  const paymentRef = firebase.database().ref(paymentPath);

  paymentRef.on('value', snapshot => {
        const payments = snapshot.val();
        //console.log("Client orders  = ");
        //console.log(orders)
        if (payments ) {
           this.props.setPayments(payments);
       } else {
           this.props.setPayments(null);
       }
  });

  const deliveryPath = "/repos/" + this.props.usertag
         + "/clients/data/" + client.tag + "/deliverys";
  const deliveryRef = firebase.database().ref(deliveryPath);

  deliveryRef.on('value', snapshot => {
        const deliverys = snapshot.val();
        //console.log("Client orders  = ");
        //console.log(deliverys)
        if (deliverys ) {
           this.props.setDeliverys(deliverys);
       } else {
           this.props.setDeliverys(null);
       }
  });


  }


  render() {
    const {client, usertag, clientKey, french} = this.props;
    const {display} = this.state;

    let name= '';
    let address ='';

    if (client) {
        name = client.lastname + ", " + client.firstname;
        address = client.street+ ", " + client.city + ", " + client.postcode;
    }

    let viewTitle = "view client data";
    if (french) {
       viewTitle = "voir cliente donnee";
    }
    let jobTitle = "add work order";
    if (french) {
       jobTitle = "ajouter travail order";
    }

    return (
      <Menu.Menu className="ClientMenuMenu">
         <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal"}}
              onClick={() => this.toggleDisplay(display)}>
              {client && name}
         </Menu.Item>
         <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal"}}>
              {display && client && address }
         </Menu.Item>
          {display && <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal", border: "1px dotted white", height: '2.5em'}}>
              <Icon name='folder open' size ="big" onClick={() => this.onButtonClick(client)} style ={{position: "relative", float: "left" }}/>
              <span style ={{position: "relative", left: "16px" }}> {viewTitle} </span>
          </Menu.Item>}
          {display && <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal", border: "1px dotted white", height: '2.5em'}}>
              <AddOrderModal open={false} usertag={usertag} clienttag={client.tag} clientname={client.name} clientKey={clientKey} french={french}/> <span style ={{position: "relative", left: "16px" }}> {jobTitle} </span>
          </Menu.Item>}
         </Menu.Menu>
     );
   }
}

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  {setClientContact, setWorkOrder, setContracts, setPayments, setDeliverys}
)(Client);
