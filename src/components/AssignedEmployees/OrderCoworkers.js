import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid, Message} from "semantic-ui-react";
//import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
//import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class OrderCoworkers extends React.Component {
  constructor(props) {
    super(props);
  }

  displayCoworkers = (coworkers) => {
     let workers = [];
     for (var workerkey in coworkers) {
        workers.push (
          <Menu.Item key={workerkey} style={styles.item}>
              {coworkers[workerkey].employeeName}
         </Menu.Item>);
     }
     return workers;
  };


  render() {
    const { coworkers, usertag, french } = this.props;
    console.log(coworkers);

    return (
      <Menu.Menu>
          <Message style ={styles.name}>
               <p> Coworkers</p>
          </Message>
          {this.displayCoworkers(coworkers)}
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

export default OrderCoworkers;
