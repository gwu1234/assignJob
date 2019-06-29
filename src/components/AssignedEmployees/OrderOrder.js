import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid} from "semantic-ui-react";
import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
//import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class OrderOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orderKey, order, usertag, french } = this.props;
        //console.log(order);
    return (
       <Menu.Menu style={styles.container}>
           <Menu.Item style={styles.name}>
              Order id : {order.orderId}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Order Key : {order.orderkey}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Order Date : {order.date}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Order Work : {order.work}
           </Menu.Item>
           <Menu.Item style={styles.item}>
              Is Repeat : {order.isRepeat}
           </Menu.Item>
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
