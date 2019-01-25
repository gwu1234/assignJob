import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
//import UserPanel from "./UserPanel";
//import UserList from "./UserList";
import { Menu } from "semantic-ui-react";

class MapPanel extends React.Component {
   //state = {
    //    usersRef: firebase.database().ref("users")
   //};

  render() {
    //const { currentUser, admin} = this.props;

    return (
      <Menu
        size="large"
        inverted
        floated
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%", color: "white"}}
      >
        MapPanel
      </Menu>
    );
  }
}

//const mapStateToProps = state => ({
//     admin: state.user.admin,
     //usertag: state.user.usertag
//   }
//);

//export default connect(mapStateToProps)(SidePanel);
export default MapPanel;

//export default connect(
//  mapStateToProps,
//  {}
//)(SidePanel);
