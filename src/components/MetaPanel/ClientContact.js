import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header } from "semantic-ui-react";
import "./ClientContact.css";
import EditClientContactModal from "./EditClientContactModal";

class ClientContact extends React.Component {
  state = {
    //contactStyle: {
    //  visibility: 'hidden',
    //  height: "2px",
    //},
    emailDisplay: true,
    phoneDisplay: true,
    cellDisplay: true,
    editDisplay: true,
  };

  /*toggleEmailDisplay = (emailDisplay) => {
      this.setState({
          emailDisplay: !emailDisplay,
      })
    }

  togglePhoneDisplay = (phoneDisplay) => {
      this.setState({
          phoneDisplay: !phoneDisplay,
      })
    }

  toggleCellDisplay = (cellDisplay) => {
      this.setState({
          cellDisplay: !cellDisplay,
      })
    }*/

  displayEmails = emails =>
    emails.length > 0 &&
    emails.map(email => (
      <Menu.Item
        key={email}
        style={styles.email}
      >
        {email}
      </Menu.Item>
    ));

    displayEmailHeader = (emailDisplay) =>(
        <Menu.Item
          name='emails'

        >
          <Header
              style={styles.email}
          >
              emails:
          </Header>
        </Menu.Item>
      );

    displayPhoneHeader = (phoneDisplay) =>(
          <Menu.Item
            name="phones"

          >
            <Header
                style={styles.email}
            >
                phones
            </Header>
          </Menu.Item>
        );

    displayPhones = phones =>
      phones.length > 0 &&
      phones.map(phone => (
        <Menu.Item
          key={phone}
          style={styles.email}
        >
          {phone}
        </Menu.Item>
      ));

  displayCellHeader = (cellDisplay) =>(
            <Menu.Item
              name="cells"

            >
              <Header
                  style={styles.email}
              >
                  cells:
              </Header>
            </Menu.Item>
          );

  displayCells = cells =>
        cells.length > 0 &&
        cells.map(cell => (
          <Menu.Item
            key={cell}
            style={styles.email}
          >
            {cell}
          </Menu.Item>
        ))

/*onButtonClick = () => {
  if (this.state.contactStyle.visibility == "visible" ){
     //this.setState (contactStyle: {visibility: 'hidden', height: '10px'});
      this.setState({
          contactStyle: {
              ...this.state.contactStyle,
              visibility: "hidden",
              height: "2px",
          },
          editDisplay: false,
      })
  } else {
      this.setState({
          contactStyle: {
            ...this.state.contactStyle,
            visibility: "visible",
            height: ''
        },
        editDisplay: true,
     })
   }
};*/


  render() {
    const {contact, usertag, french} = this.props;
    const {emailDisplay, phoneDisplay, cellDisplay, editDisplay} = this.state;

    //console.log (contact);
    let address = '';
    if (contact) {
        address = contact.street + ", " +contact.city + ", " + contact.postcode;
    }

    let titleString = "Client Contact";
    if (french) {
        titleString = "client contact";
    }

    return (
      <Menu.Menu style={styles.container} >
            <Menu.Header style={styles.menuHeader}>
                {titleString}
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu}>
          <Menu.Item style={styles.address}>
               {contact && address}
          </Menu.Item>
            {contact && contact.emails && contact.emails.length>0 && this.displayEmailHeader (emailDisplay)}
            {emailDisplay && contact && contact.emails && contact.emails.length>0 && this.displayEmails (contact.emails)}
            {contact && contact.phones && contact.phones.length>0 && this.displayPhoneHeader (phoneDisplay)}
            {phoneDisplay && contact && contact.phones && contact.phones.length>0 && this.displayPhones (contact.phones)}
            {contact && contact.cells && contact.cells.length>0 && this.displayCellHeader (cellDisplay)}
            {cellDisplay && contact && contact.cells && contact.cells.length>0 && this.displayCells (contact.cells)}
            {contact && editDisplay && <Menu.Item style={styles.editItem}>
                 <EditClientContactModal open={false} contact={contact} usertag={usertag}/> <span style ={{position: "relative", left: "16px" }}> edit client contact </span>
            </Menu.Item>}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    background: "#92c2e8",
  },
  menuHeader: {
    paddingTop:"8px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "7%",
  },
  menuMenu: {
    position: "relative",
    overflow: "scroll",
    height: "93%",
  },
  address: {
    paddingTop: "15px",
    paddingBottom: "5px",
    fontSize: "1.0em",
    fontWeight: "bold",
    color: "black",
    opacity: 1.0,
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
  email: {
    paddingTop: "5px",
    paddingBottom: "2px",
    fontSize: "1.0em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  editItem: {
    paddingTop: "20px",
    paddingBottom: "2px",
    fontSize: "1.0em",
    fontWeight: "bold",
    color: "black",
    opacity: 1.0,
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
};

const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const clienttag = state.user.clienttag;
   let clientContact = null;
   console.log(clienttag);
   if (clienttag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["clients"]["data"][clienttag]) {
            clientContact = reposData["clients"]["data"][clienttag]["contact"];
            clientContact = {...clientContact, clientTag: clienttag}
       } else {
          clientContact = {};
       }
       //console.log(clientContact);
   }
   //const clientContact = reposData["clients"];
   //console.log(clientContact);
   return {
     contact: clientContact,
     usertag: state.user.usertag,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(ClientContact);
