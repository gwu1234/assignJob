import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
//import UserPanel from "./UserPanel";
//import UserList from "./UserList";
import { Menu } from "semantic-ui-react";
//import { setAdmin } from "../../actions";
import Contact from "./Contact";

class Messages extends React.Component {
   state = {
        //contactPath: '',
        //contactRef: firebase.database().ref("/repos/" + this.props.usertag + "/contact")
   };

  render() {
    const { currentUser, admin, usertag} = this.props;
    //console.log(currentUser.displayName);
    //console.log(currentUser.email);
    //console.log("message admin = " + admin);
    //console.log ("Message usertag = " + usertag);
    //console.log("currentUser : ");
    //console.log (currentUser);
    //logtag = "currentUser = ";
    //console.log (logtag);
    //console.log(currentUser);
    //logtag = "admin = " + admin;
    //console.log(this.state.contactRef);
    //this.setState ( {
        //contactPath: "/repos/" + usertag + "/contact" ,
    //    contactRef: firebase.database().ref("/repos/" + usertag + "/contact"),
    //})

    return (
      <Menu
        size="large"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        message 
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
     admin: state.user.admin,
     usertag: state.user.usertag,
     currentUser: state.user.currentUser
   }
);

//export default connect(mapStateToProps)(SidePanel);
//export default SidePanel;

export default connect(
  mapStateToProps,
  {}
)(Messages);
