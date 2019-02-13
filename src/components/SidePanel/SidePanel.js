import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import UserPanel from "./UserPanel";
import UserList from "./UserList";
import { Menu } from "semantic-ui-react";
import Contact from "../Messages/Contact";
import Employees from "../Messages/Employees";
import Trucks from "./Trucks";

class SidePanel extends React.Component {
   state = {
        usersRef: firebase.database().ref("users")
   };

  render() {
    const { currentUser, admin} = this.props;

    return (
      <Menu
        size="large"
        inverted
        floated
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" , padding: "0.1em", width:"100%"}}
      >
        <UserPanel currentUser={currentUser} />
        {admin && <UserList currentUser={currentUser} />}
        {!admin && <Employees/>}
        {!admin && <Trucks/>}
        {!admin && <Contact />}

      </Menu>
    );
  }
}

const mapStateToProps = state => ({
     admin: state.user.admin,
     //usertag: state.user.usertag
   }
);

//export default connect(mapStateToProps)(SidePanel);
//export default SidePanel;

export default connect(
  mapStateToProps,
  {}
)(SidePanel);
