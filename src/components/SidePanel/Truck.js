import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { } from "../../actions";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import "./Truck.css";
//import AddTruckModal from "./AddTruckModal";

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
    let address ='';

    if (truck) {
        name = truck.model + ", " + truck.year + ", " + truck.color;
    }

    return (
      <Menu.Menu className="TruckMenuMenu">
         <Menu.Item style={{opacity: 1.0, color: "white", fontSize: "0.8em", fontStyle: "normal"}}
              onClick={() => this.toggleDisplay(display)}>
              {truck && name}
         </Menu.Item>
         </Menu.Menu>
     );
   }
}

//export default Client;
const mapStateToProps = state => ({
     usertag: state.user.usertag
   }
);

export default connect(
  mapStateToProps,
  {}
)(Truck);
