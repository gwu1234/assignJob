import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import Truck from "./Truck";
import AddTruckModal from "./AddTruckModal";
//import { setGeoEncoding } from "../../actions";
import "./Trucks.css";
//const GEOCODING_DONE = 1;
//const GEOCODING_RENEWED = 2;
//const GEOCODING_PUSHED= 3;

class Trucks extends React.Component {
  //state = {
  //  display: true,
  //};

  /*onButtonClick = (display) => {
     this.setState({
         display: !display
     })
  };*/

   displayTrucks = trucks =>
      trucks.length > 0 &&
      trucks.map(truck => (
          <Truck key={truck.truckKey} truckKey={truck.truckKey} truck ={truck.truck} />
     ));

  /*updateClients = clients => {
      const {usertag} = this.props;
      const clientsTag = "repos/" + usertag +"/clients/tags";
      //console.log("clientsTag = " + clientsTag);
      const clientsRef = firebase.database().ref(clientsTag)
      //console.log("clientTag = " + clientsTag);
      clientsRef.set(clients);;
  }*/

  render() {
    const {french, trucks, usertag} = this.props;
    //const {display} = this.state;

    let titleString = "Truck List";
    if (french) {
        titleString = "camion liste";
    }

    const truckArray =[];
    for (var key in trucks) {
       //console.log(trucks[key]);
       //console.log(key);
       const newTruck = {
         truckKey: key,
         truck: trucks[key]
       }

       truckArray.push(newTruck);
    }

    return (
      <Menu.Menu className="TrucksMenuMenu" >
      <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
          {titleString}
          <AddTruckModal usertag = {usertag}/>
        </Menu.Header>
        <Menu.Menu style={{opacity: 1.0, fontSize: "1.0em",color: "white", fontStyle: "bold", marginTop:"0.4em", marginBottom:"0.4em"}}>
          {trucks && this.displayTrucks(truckArray)}
        </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  //const usertag = state.user.usertag;
  //console.log(reposData);
  const trucks = reposData["trucks"];
  //console.log(employees);
  return {
     french: state.user.french,
     trucks: trucks,
     admin: state.user.admin,
     usertag: state.user.usertag,
   }
};

export default connect(
  mapStateToProps,
  {}
)(Trucks);
