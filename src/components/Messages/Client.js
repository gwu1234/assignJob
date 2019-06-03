import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setClientTag} from "../../actions";
import { Menu, Icon} from "semantic-ui-react";
import "./Client.css";
import AddOrderModal from "../MetaPanel/AddOrderModal";

class Client extends React.Component {
  //state = {
  //  display: false,
  //};

  /*toggleDisplay = (display) => {
    const {client, key, clientKey} = this.props;
    //console.log("key = " + key);
    //console.log("clientKey = " + clientKey  );
    //console.log(e.target.key);
    this.setState({
        display: !display,
    })
    if (display) {
       this.props.setClientContact(null);
       this.props.setWorkOrder(null);
       this.props.setContracts(null);
       this.props.setPayments(null);
       this.props.setDeliverys(null);
    } else {
      this.onButtonClick(client);
    }
    this.props.setSelectedClientKey(clientKey);
  }*/

  onButtonClick = () => {
    const {client, clientKey, selectedClientKey} = this.props;

    // click the same item more than once
    if (clientKey === selectedClientKey) {
        return
    }

    this.props.setClientTag(client.tag);

    //console.log(client.tag);
    //console.log(this.props.usertag)
    /*const clientContact = "/repos/" + this.props.usertag
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
    }); */

    /*const workOrder = "/repos/" + this.props.usertag
           + "/clients/data/" + client.tag + "/workorders";
    const workOrderRef = firebase.database().ref(workOrder)

     workOrderRef.on('value', snapshot => {
          const orders = snapshot.val();
          //console.log("Client orders  = ");
          //console.log(orders)
          if (orders ) {
             this.props.setWorkOrder(orders);
             //this.props.setActiveOrderKey(client.activeOrderKey);
             //this.props.setActiveOrderId(client.activeOrderId);
         } else {
             this.props.setWorkOrder(null);
         }
    });*/

    /*const contracts = "/repos/" + this.props.usertag
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
    });*/

  /*const paymentPath = "/repos/" + this.props.usertag
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
  });*/

  /*const deliveryPath = "/repos/" + this.props.usertag
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
  });*/

  /*const invoicesPath = "/repos/" + this.props.usertag
         + "/clients/data/" + client.tag + "/invoices";
  const invoicesRef = firebase.database().ref(invoicesPath);

  invoicesRef.on('value', snapshot => {
        const invoices = snapshot.val();
        //console.log("Client orders  = ");
        //console.log(deliverys)
        if (invoices) {
           this.props.setInvoices(invoices);
       } else {
           this.props.setInvoices(null);
       }
  });*/

    //console.log(client);
    //console.log ("active order  id = " + client.activeOrderId);
    //console.log ("active order key = " + client.activeOrderKey);
    //console.log ("active order key = " + client["activeOrderKey"]);
    //this.props.setActiveOrderKey(client.activeOrderKey);
    //this.props.setActiveOrderId(client.activeOrderId);
    this.props.setSelectedClientKey(clientKey);
  }

  /*displayEmails = emails =>
    emails.length > 0 &&
    emails.map(email => (
      <Menu.Item
        key={email}
        style={{
            opacity: "1.0",
            fontSize: "0.7em",
            color: "white",
            marginLeft: "2.0em",
            visibility: "visible"
        }}
      >
        {email}
      </Menu.Item>
    ));

    displayPhones = phones =>
      phones.length > 0 &&
      phones.map(phone => (
        <Menu.Item
          key={phone}
          style={{
              opacity: "1.0",
              fontSize: "0.7em",
              color: "white",
              marginLeft: "2.0em"
          }}
        >
          {phone}
        </Menu.Item>
      ));

   displayCells = cells =>
      cells.length > 0 &&
      cells.map(cell => (
         <Menu.Item
                key={cell}
                style={{
                    opacity: "1.0",
                    fontSize: "0.7em",
                    color: "white",
                    marginLeft: "2.0em"
                }}
              >
                {cell}
         </Menu.Item>
     )) */


  render() {
    const {client, usertag, clientKey, french, selectedClientKey} = this.props;
    //const {display} = this.state;

    let name= '';
    let address ='';
    let city ="";

    if (client) {
        name = client.lastname + ", " + client.firstname;
        address = client.street;
        city = client.city;
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
      <Menu.Menu style={styles.container}>
         <Menu.Item style = {selectedClientKey===clientKey?
                 styles.selectedName : styles.notselectedName}
              onClick={() => this.onButtonClick()}>
              {client && name}
         </Menu.Item>
         <Menu.Item
              style = {selectedClientKey===clientKey?
                      styles.selectedCity : styles.notselectedCity}
                      onClick={() => this.onButtonClick()}>
              {client && city }
         </Menu.Item>
         </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    paddingTop: "2px",
    paddingBottom: "2px",
    position: "relative",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#e8eef7",
  },
  selectedName: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    backgroundColor:"rgba(0,255,0,0.1)",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px"
  },
  notselectedName: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px"
  },
  selectedCity: {
    opacity: 1.0,
    color: "black",
    fontSize: "0.8em",
    fontWeight: "bold",
    backgroundColor:"rgba(0,250,0,0.1)",
    paddingTop: "1px",
    paddingLeft: "15px"
  },
  notselectedCity: {
    opacity: 1.0,
    color: "black",
    fontSize: "0.8em",
    fontStyle: "normal",
    paddingTop: "1px",
    paddingLeft: "15px"
  },
};

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag,
     french: state.user.french,
     //clientContact: state.user.clientContact,
   }
);

export default connect(
  mapStateToProps, {setClientTag}
)(Client);
