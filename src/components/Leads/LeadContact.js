import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header } from "semantic-ui-react";
import EditLeadContactModal from "./EditLeadContactModal";


const LEAD_POSITIVE = 1;  // green
const LEAD_RESPONSIVE = 2; // blue
const LEAD_NEW = 3;  // red
const LEAD_NOT_RESPONSIVE = 4; // orange
const LEAD_DECLINE = 5; // yellow

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

    let status = "";
    if (contact.status && contact.status === LEAD_POSITIVE) {
       status = "LEAD_POSITIVE";
    } else if (contact.status && contact.status === LEAD_RESPONSIVE) {
       status = "LEAD_RESPONSIVE";
    } else if (contact.status && contact.status === LEAD_NEW) {
       status = "LEAD_NEW";
    } else if (contact.status && contact.status === LEAD_NOT_RESPONSIVE) {
       status = "LEAD_NOT_RESPONSIVE";
    } else if (contact.status && contact.status === LEAD_DECLINE) {
       status = "LEAD_DECLINE";
    } else {
      status = "LEAD_NEW";
    }

    let isEmployeeAssigned = contact.isEmployeeAssigned ?
              (contact.isEmployeeAssigned === "true"? true: false) :false;
    let employeeName = "";
    if (isEmployeeAssigned) {
        employeeName = contact.employeeFirstname + " " + contact.employeeLastName;
    }

    return (
      <Menu.Menu style={styles.container} >
            <Menu.Header style={styles.menuHeader}>
                {titleString}
                <EditLeadContactModal open={false} contact={contact} usertag={usertag} french={french}/>
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu}>
          {contact && contact.name && <Menu.Item style={styles.address}>
               {contact && contact.name}
          </Menu.Item>}
          {contact && contact.street && <Menu.Item style={styles.address}>
               {contact && contact.street}
          </Menu.Item>}
          {contact && contact.city && <Menu.Item style={styles.address}>
               {contact && contact.city}
          </Menu.Item>}
          {contact && contact.province && <Menu.Item style={styles.address}>
               {contact && (contact.province + ", " + contact.country)}
          </Menu.Item>}
          {contact && contact.postcode && <Menu.Item style={styles.address}>
               {contact && contact.postcode}
          </Menu.Item>}
          {contact && status && <Menu.Item style={styles.address}>
               {"lead status: " + status}
          </Menu.Item>}
          {contact && isEmployeeAssigned && <Menu.Item style={styles.address}>
               {"assigned to : " + employeeName}
          </Menu.Item>}
          {contact && contact.emails && <Menu.Menu style={styles.emailMenu}>
            {contact && contact.emails && contact.emails.length>0 && this.displayEmailHeader (emailDisplay)}
            {emailDisplay && contact && contact.emails && contact.emails.length>0 && this.displayEmails (contact.emails)}
          </Menu.Menu>}
          {contact && contact.phones && <Menu.Menu style={styles.emailMenu}>
            {contact && contact.phones && contact.phones.length>0 && this.displayPhoneHeader (phoneDisplay)}
            {phoneDisplay && contact && contact.phones && contact.phones.length>0 && this.displayPhones (contact.phones)}
          </Menu.Menu>}
          {contact && contact.cells && <Menu.Menu style={styles.emailMenu}>
            {contact && contact.cells && contact.cells.length>0 && this.displayCellHeader (cellDisplay)}
            {cellDisplay && contact && contact.cells && contact.cells.length>0 && this.displayCells (contact.cells)}
          </Menu.Menu>}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "35%",
    background: "#f2f4f7",
  },
  menuHeader: {
    paddingTop:"15px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "9%",
  },
  menuMenu: {
    paddingTop:"10px",
    marginTop: "15px",
    paddingBottom: "5px",
    marginBottom:"5px",
    position: "relative",
    overflow: "scroll",
    height: "81%",
  },
  address: {
    paddingTop: "2px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  emailMenu: {
    paddingTop: "2px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
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
   //let leadContact = null;
   let leadContact = { lastname: "", firstname: "", street: "", city: "", postcode: "",
                       province:"", country: "", phones: [], cells: [], emails: []};

   if (leadTag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["leads"][leadTag]) {
            leadContact = reposData["leads"][leadTag]["contact"];
            leadContact = {...leadContact, leadTag: leadTag}
       }
   }

   //console.log(leadTag);
   //console.log(leadContact);

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
