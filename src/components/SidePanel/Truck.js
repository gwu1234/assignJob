import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
import "./Truck.css";
import EditTruckModal from "./EditTruckModal";

class Truck extends React.Component {
  state = {
    display: false,
  };

  toggleDisplay = (display) => {
    this.setState({
        display: !display,
    })
  }


  render() {
    const {truck, usertag, truckKey} = this.props;
    const {display} = this.state;
    let name= '';

    if (truck) {
        name = truck.model + ", " + truck.year ;
    }

    return (
      <Menu.Menu style={styles.container}>
      <Menu.Item  style={styles.name} onClick={() => this.toggleDisplay(display)}>
           {truck && name} &nbsp; &nbsp; <EditTruckModal Modal open={false} truck = {truck} usertag = {usertag} truckKey = {truckKey}/>
      </Menu.Item>
         </Menu.Menu>
     );
   }
}
const styles = {
  container: {
    height: "100%",
    background: "#92c2e8",
    marginTop: "0px",
    marginBottom: "0px",
    paddingTop:"5px",
    paddingBottom:"5px",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
  name: {
    fontSize: "0.9em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
};

const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Truck);
