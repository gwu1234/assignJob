import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import UserPanel from "./UserPanel";
import UserList from "./UserList";
import { Menu } from "semantic-ui-react";
//import { setAdmin } from "../../actions";

class SidePanel extends React.Component {
   state = {
        usersRef: firebase.database().ref("users")
   };


  /*componentWillMount() {
      let adminChild = null;
    if (this.props.currentUser.email && this.props.currentUser.displayName) {
      const emailString = this.props.currentUser.email.replace(/[.,#$\[\]@]/g,'');
      const nameString = this.props.currentUser.displayName.replace(/[.,#$\[\]@]/g,'');
      adminChild = nameString + '+' + emailString + "/admin";
    } else {
        //const emailString = this.props.currentUser.email.replace(/[.,#$\[\]@]/g,'');
        //const nameString = this.props.currentUser.displayName.replace(/[.,#$\[\]@]/g,'');
        adminChild = this.props.userTag + "/admin";
      }
        //const adminChild = this.props.userTag + "/admin";
        //console.log(adminChild);
        let adminRef = this.state.usersRef.child(adminChild);
        adminRef.once('value')
            .then((snapshot) => {
               const admin = snapshot.val();
               if (admin === true) {
                  this.props.setAdmin(admin);
               }
           });
    // }
  }*/

  /*componentDidMount() {
    this.setState ({
       admin: this.props.admin
    }) ;
  }*/

  render() {
    const { currentUser, admin, usertag} = this.props;
    //console.log(currentUser.displayName);
    //console.log(currentUser.email);
    //console.log(admin);
    //let logtag = "SidePanel usertag = " + this.props.usertag;
    //console.log(logtag);
    //logtag = "currentUser = ";
    //console.log (logtag);
    //console.log(currentUser);
    //logtag = "admin = " + admin;
    //console.log(logtag);

    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel currentUser={currentUser} />
        {admin && <UserList currentUser={currentUser} />}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
     admin: state.user.admin,
     usertag: state.user.usertag
   }
);

//export default connect(mapStateToProps)(SidePanel);
//export default SidePanel;

export default connect(
  mapStateToProps,
  {}
)(SidePanel);
