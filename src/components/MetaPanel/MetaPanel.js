import React from "react";
import { Menu } from "semantic-ui-react";
import ClientContact from "./ClientContact";
import WorkOrders from "./WorkOrders";

class MetaPanel extends React.Component {
  render() {
    //const { currentUser, admin, usertag} = this.props;

    return (
      <Menu
        size="large"
        vertical
        floated
        style={{background:"#4c3c4c",color:"white",fontSize:"1.2rem",padding:"0.1em",width:"100%"}}
      >
        <ClientContact />
        <WorkOrders />
      </Menu>
    );
  }
}

export default MetaPanel;
