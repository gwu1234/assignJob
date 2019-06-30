import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid, Message} from "semantic-ui-react";
//import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
//import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class OrderOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orderKey, order, usertag, french } = this.props;
        let {orderId, date, work, isRepeat, repeatTimes, clientName, clientAddress} = order;

        if ( isRepeat === undefined || isRepeat === null ||
             isRepeat === "undefined" || isRepeat === false) {
                isRepeat = false;
        }

    return (
       <Menu.Menu style={styles.container}>
           <Message style ={styles.name}>
              <p> Order Brief</p>
           </Message>
           <Menu.Item style={styles.item}>
              Order id : {orderId}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Client Name : {clientName}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Client Address : {clientAddress}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Order Date : {date}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Order Work : {work}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Is Repeat : {String (isRepeat)}
           </Menu.Item>
          { isRepeat && <Menu.Item style={styles.item}>
              Repeat Times : {repeatTimes}
           </Menu.Item> }
       </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    paddingTop: "2px",
    paddingBottom: "2px",
    width: "100%",
  },
  name: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    paddingTop:"3px",
    paddingBottom:"3px",
    paddingLeft: "15px",
  },
  item: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
    paddingTop:"3px",
    paddingBottom:"3px",
    paddingLeft: "15px",
  },
};

export default OrderOrder;
