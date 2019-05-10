import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header } from "semantic-ui-react";

//import EditClientContactModal from "./EditClientContactModal";

class LeadContact extends React.Component {
  state = {
    emailDisplay: true,
    phoneDisplay: true,
    cellDisplay: true,
    editDisplay: true,
  };

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


  render() {
    const {contact, usertag, french} = this.props;
    const {emailDisplay, phoneDisplay, cellDisplay, editDisplay} = this.state;
    //const {street, city, province, country, postcode} = contact;

    let titleString = "Lead Contact";
    if (french) {
        titleString = "Lead contact";
    }

    return (
      <Menu.Menu style={styles.container} >
            <Menu.Header style={styles.menuHeader}>
                {titleString}
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu}>
          <Menu.Item style={styles.address}>
               {contact && contact.street}
          </Menu.Item>
          <Menu.Item style={styles.address}>
               {contact && contact.city}
          </Menu.Item>
          <Menu.Item style={styles.address}>
               {contact && contact.province}
          </Menu.Item>
          <Menu.Item style={styles.address}>
               {contact && contact.country}
          </Menu.Item>
          <Menu.Menu style={styles.emailMenu}>
            {contact && contact.emails && contact.emails.length>0 && this.displayEmailHeader (emailDisplay)}
            {emailDisplay && contact && contact.emails && contact.emails.length>0 && this.displayEmails (contact.emails)}
          </Menu.Menu>
          <Menu.Menu style={styles.emailMenu}>
            {contact && contact.phones && contact.phones.length>0 && this.displayPhoneHeader (phoneDisplay)}
            {phoneDisplay && contact && contact.phones && contact.phones.length>0 && this.displayPhones (contact.phones)}
          </Menu.Menu>
          <Menu.Menu style={styles.emailMenu}>
            {contact && contact.cells && contact.cells.length>0 && this.displayCellHeader (cellDisplay)}
            {cellDisplay && contact && contact.cells && contact.cells.length>0 && this.displayCells (contact.cells)}
          </Menu.Menu>
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
  emailMenu: {
    paddingTop: "20px",
    paddingBottom: "10px",
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
  },
};

const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const leadTag = state.user.leadTag;
   let leadContact = null;

   if (leadTag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["leads"][leadTag]) {
            leadContact = reposData["leads"][leadTag]["contact"];
            leadContact = {...leadContact, leadTag: leadTag}
       } else {
          leadContact = {};
       }
   }

   console.log(leadTag);
   console.log(leadContact);

   return {
     contact: leadContact,
     usertag: state.user.usertag,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(LeadContact);
