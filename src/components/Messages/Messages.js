import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import Contact from "./Contact";
import Employees from "./Employees";
import Trucks from "../SidePanel/Trucks";
import Clients from "./Clients";

class Messages extends React.Component {

  render() {
    const { admin} = this.props;

    return (
      <Menu
        size="large"
        vertical
        floated
        style={{background:"#4c3c4c",color:"white",fontSize:"1.2rem",padding:"0.1em",width:"100%"}}
      >
        {admin && <Contact />}
        {admin && <Employees/>}
        {admin && <Trucks/>}
        <Clients/>
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
)(Messages );
