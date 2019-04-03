import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header } from "semantic-ui-react";
import "./ClientContact.css";
import EditClientContactModal from "./EditClientContactModal";

class ClientContact extends React.Component {
  state = {
    contactStyle: {
      visibility: 'hidden',
      height: "2px",
    },
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

    displayEmailHeader = (emailDisplay) =>(
        <Menu.Item
          name='emails'

        >
          <Header
              as='h4'
              style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
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
                as='h4'
                style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
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

  displayCellHeader = (cellDisplay) =>(
            <Menu.Item
              name="cells"

            >
              <Header
                  as='h4'
                  style={{opacity: 1.0, fontSize: "0.8em",fontStyle: "bold", color: "white"}}
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
            style={{
                opacity: "1.0",
                fontSize: "0.7em",
                color: "white",
                marginLeft: "2.0em"
            }}
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
      <Menu.Menu className="ClientContactMenuMenu" >
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                {titleString}
            </Menu.Header>
          <Menu.Menu >
          <Menu.Item style={{opacity: 1.0, fontSize: "0.8em",color: "white"}}>
               {contact && address}
          </Menu.Item>
            {contact && contact.emails && contact.emails.length>0 && this.displayEmailHeader (emailDisplay)}
            {emailDisplay && contact && contact.emails && contact.emails.length>0 && this.displayEmails (contact.emails)}
            {contact && contact.phones && contact.phones.length>0 && this.displayPhoneHeader (phoneDisplay)}
            {phoneDisplay && contact && contact.phones && contact.phones.length>0 && this.displayPhones (contact.phones)}
            {contact && contact.cells && contact.cells.length>0 && this.displayCellHeader (cellDisplay)}
            {cellDisplay && contact && contact.cells && contact.cells.length>0 && this.displayCells (contact.cells)}
            {contact && editDisplay && <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal", border: "1px dotted white", height: '2.5em'}}>
                 <EditClientContactModal open={false} contact={contact} usertag={usertag}/> <span style ={{position: "relative", left: "16px" }}> edit client contact </span>
            </Menu.Item>}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const clienttag = state.user.clienttag;
   let clientContact = null;
   //console.log(clienttag);
   if (clienttag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       clientContact = reposData["clients"]["data"][clienttag]["contact"];
       clientContact = {...clientContact, clientTag: clienttag}
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
