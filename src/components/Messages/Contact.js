import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setCurrentUser, setUserTag } from "../../actions";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import "./Contact.css";

class Contact extends React.Component {
  state = {
    contactStyle: {
      visibility: 'hidden',
      height: "2px",
    },
    emailDisplay: false,
    phoneDisplay: false,
    cellDisplay: false,
  };

  toggleEmailDisplay = (emailDisplay) => {
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
    }

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
            visibility: this.state.visibility
        }}
      >
        {email}
      </Menu.Item>
    ));

    displayEmailHeader = (emailDisplay) =>(
        <Menu.Item
          name='emails'
          onClick={() => this.toggleEmailDisplay(emailDisplay)}
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
            onClick={() => this.togglePhoneDisplay(phoneDisplay)}
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
              onClick={() => this.toggleCellDisplay(cellDisplay)}
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

onButtonClick = () => {
  if (this.state.contactStyle.visibility == "visible" ){
     //this.setState (contactStyle: {visibility: 'hidden', height: '10px'});
      this.setState({
          contactStyle: {
              ...this.state.contactStyle,
              visibility: "hidden",
              height: "2px",
          }
      })
  } else {
      this.setState({
          contactStyle: {
            ...this.state.contactStyle,
            visibility: "visible",
            height: ''
        }
     })
   }
};


  render() {
    const {contact} = this.props;
    const {emailDisplay, phoneDisplay, cellDisplay} = this.state;

    //console.log (contact);
    let address = '';
    if (contact) {
        address = contact.street + ", " +contact.city + ", " + contact.postcode;
        //console.log(contact);
        //console.log(contact.phones);
        //console.log(contact.cells.length);
        //console.log(contact.cells);
    }


    return (
      <Menu.Menu className="ContactMenuMenu" >
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Icon name='eye' size ="big" onClick={this.onButtonClick} /> &nbsp; Company &nbsp; Info
            </Menu.Header>
          <Menu.Menu style = {this.state.contactStyle}>
          <Menu.Item style={{opacity: 1.0, fontSize: "0.8em",color: "white"}}>
               {contact && address}
          </Menu.Item>
            {contact && contact.emails.length>0 && this.displayEmailHeader (emailDisplay)}
            {emailDisplay && contact && contact.emails.length>0 && this.displayEmails (contact.emails)}
            {contact && contact.phones.length>0 && this.displayPhoneHeader (phoneDisplay)}
            {phoneDisplay && contact && contact.phones.length>0 && this.displayPhones (contact.phones)}
            {contact && contact.cells.length>0 && this.displayCellHeader (cellDisplay)}
            {cellDisplay && contact && contact.cells.length>0 && this.displayCells (contact.cells)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     contact: state.user.userContact,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Contact);
