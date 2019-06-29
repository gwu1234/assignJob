import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid, Message} from "semantic-ui-react";
//import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
//import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class OrderDeliverys extends React.Component {
  constructor(props) {
    super(props);
  }

  displayDeliverys = (deliverys) => {
     let jobs = [];
     for (var deliverykey in deliverys) {
        jobs.push (
          <Menu.Menu key={deliverykey} style={styles.container}>
              <Menu.Item style={styles.item}>
                   Date : {deliverys[deliverykey].date}
              </Menu.Item>
              <Menu.Item style={styles.item}>
                   Work : {deliverys[deliverykey].work}
              </Menu.Item>
              <Menu.Item style={styles.item}>
                   Employee : {deliverys[deliverykey].employee}
              </Menu.Item>
         </Menu.Menu>);
     }
     return jobs;
  };


  render() {
    const { deliverys, usertag, french } = this.props;
    //console.log(coworkers);

    return (
      <Menu.Menu>
          <Message style ={styles.name}>
               <p> Deliverys </p>
          </Message>
          {this.displayDeliverys(deliverys)}
      </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    paddingTop: "1px",
    paddingBottom: "4px",
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
    paddingTop:"1px",
    paddingBottom:"1px",
    paddingLeft: "15px",
  },
};

export default OrderDeliverys;
