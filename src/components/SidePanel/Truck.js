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
      <Menu.Menu className="TruckMenuMenu">
      <Menu.Item  style={{opacity: 1.0, fontSize: "0.8em",color: "white", fontStyle: "bold"}} onClick={() => this.toggleDisplay(display)}>
           {truck && name} &nbsp; &nbsp; <EditTruckModal Modal open={false} truck = {truck} usertag = {usertag} truckKey = {truckKey}/>
      </Menu.Item>
         </Menu.Menu>
     );
   }
}


const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Truck);
