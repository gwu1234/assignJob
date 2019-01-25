import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import Contact from "./Contact";
import Employees from "./Employees";
import Clients from "./Clients";

class Messages extends React.Component {

  render() {
    //const { currentUser, admin, usertag} = this.props;

    return (
      <Menu
        size="large"
        vertical
        floated
        style={{background:"#4c3c4c",color:"white",fontSize:"1.2rem",padding:"0.1em",width:"100%"}}
      >
        <Contact />
        <Employees/>
        <Clients/>
      </Menu>
    );
  }
}

export default Messages;
