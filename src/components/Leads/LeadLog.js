import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Image} from "semantic-ui-react";
//import Client from "./Client";
//import "./WorkOrder.css";
//import EditOrderModal from "./EditOrderModal";
//import PhotoViewModal from "./PhotoViewModal";


class LeadLog extends React.Component {

   state = {
   };

  render() {
    const {log, leadTag} = this.props;
    const {date, timestamp, employeeName, leadName, logTag, logMsg} = log;
    const isActive = true;

    return (
      <Menu.Menu style = {styles.container}>
          <Menu.Item style = {styles.item}>
              Date: {date}
          </Menu.Item>
          <Menu.Item  style = {styles.item}>
              Employee Name: {employeeName}
          </Menu.Item>
          <Menu.Item  style = {styles.item}>
              Lead Name: {leadName}
          </Menu.Item>
          <Menu.Item  style = {styles.item}>
              Log Msg: {logMsg}
          </Menu.Item>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    paddingTop: "4px",
    paddingBottom: "4px",
    position: "relative",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
  item: {
    paddingTop: "3px",
    paddingBottom: "3px",
    fontSize: "1.0em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
};

const mapStateToProps = state => {
   /*const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const leadTag = state.user.leadTag;
   let  = null;

   if (clienttag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["clients"]["data"][clienttag]) {
            deliverys = reposData["clients"]["data"][clienttag]?
            reposData["clients"]["data"][clienttag]["deliverys"]: {};
       }
   }
   return {
     deliverys: deliverys,
   }*/
};

export default connect(
  mapStateToProps,
  {}
)(LeadLog);

//export default WorkOrder;
