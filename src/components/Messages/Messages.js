import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
//import UserPanel from "./UserPanel";
//import UserList from "./UserList";
import { Menu } from "semantic-ui-react";
//import { setAdmin } from "../../actions";
import Contact from "./Contact";

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
      </Menu>
    );
  }
}

/*const mapStateToProps = state => ({
     admin: state.user.admin,
     usertag: state.user.usertag,
     currentUser: state.user.currentUser
   }
);*/

//export default connect(mapStateToProps)(SidePanel);
export default Messages;

/*export default connect(
  mapStateToProps,
  {}
)(Messages);*/
