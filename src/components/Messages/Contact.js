import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header } from "semantic-ui-react";
import "./Contact.css";
import EditContactModal from "./EditContactModal";

class Contact extends React.Component {
  //state = {
    //contactStyle: {
    //  visibility: 'hidden',
    //  height: "2px",
    //},
    //emailDisplay: true,
    //phoneDisplay: true,
    //cellDisplay: true,
    //editDisplay: true,
  //};

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
        style = {styles.email}
      >
        {email}
      </Menu.Item>
    ));

    displayEmailHeader = (emailDisplay) =>(
        <Menu.Item
          name='emails'
        >
          <Header
            style = {styles.email}
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
                style = {styles.email}
            >
                phones:
            </Header>
          </Menu.Item>
        );

    displayPhones = phones =>
      phones.length > 0 &&
      phones.map(phone => (
        <Menu.Item
          key={phone}
          style = {styles.email}
        >
          {phone}
        </Menu.Item>
      ));

  displayCellHeader = (cellDisplay) =>(
            <Menu.Item
              name="cells"
            >
              <Header
                  style = {styles.email}
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
            style = {styles.email}
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
            height: '',
        },
        editDisplay: true,
     })
   }
};*/


  render() {
    const {contact, usertag, french, currentUser} = this.props;
    let {displayName} = currentUser;

    //console.log (contact);
    let address = '';
    if (contact) {
        address = contact.street + ", " +contact.city + ", " + contact.postcode;
        //console.log(contact);
        //console.log(contact.phones);
        //console.log(contact.cells.length);
        //console.log(contact.cells);
    }

    if (!displayName || displayName === "undefined") {
        displayName  = "";displayName
    }

    let titleString = french? displayName + " compagne info " : displayName + " Company Info ";
    let modalTitle = french? "modifier compagne info" : "Edit Company Info";

    return (
      <Menu.Menu style={styles.container} >
            <Menu.Header style={styles.menuHeader}>
                {titleString}
            </Menu.Header>
          <Menu.Menu style = {styles.menuMenu}>
          <Menu.Item style={styles.address}>
               {contact && address}
          </Menu.Item>
          <Menu.Menu style = {styles.emailMenu}>
            {contact && contact.emails && contact.emails.length>0 && this.displayEmailHeader (true)}
            {contact && contact.emails && contact.emails.length>0 && this.displayEmails (contact.emails)}
          </Menu.Menu>
          <Menu.Menu style = {styles.emailMenu}>
            {contact && contact.phones && contact.phones.length>0 && this.displayPhoneHeader (true)}
            {contact && contact.phones && contact.phones.length>0 && this.displayPhones (contact.phones)}
          </Menu.Menu>
            {contact && contact.cells && contact.cells.length>0 && this.displayCellHeader (true)}
            {contact && contact.cells && contact.cells.length>0 && this.displayCells (contact.cells)}
          <Menu.Menu style = {styles.emailMenu}>
            {contact && <Menu.Item style = {{fontSize: "1.0em", fontWeight: "bold", color:"black", paddingLeft: "2em"}}>
                       <span> {modalTitle} </span>
                       <EditContactModal contact = {contact} usertag = {usertag} french={french} name = {currentUser.displayName}/>
                       </Menu.Item> }
           </Menu.Menu>
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    background: "#f2f4f7",
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
    paddingTop: "20px",
    paddingBottom: "10px",
    fontSize: "1.0em",
    fontWeight: "normal",
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
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
  email: {
    paddingTop: "5px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  editItem: {
    paddingTop: "20px",
    paddingBottom: "2px",
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  //const usertag = state.user.usertag;
  //console.log(reposData);
  const contact = reposData["contact"];
  //console.log(employees);
  return {
     contact: contact,
     usertag: state.user.usertag,
     french: state.user.french,
     currentUser: state.user.currentUser,
   }
};

export default connect(
  mapStateToProps,
  {}
)(Contact);
