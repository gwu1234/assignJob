import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Button} from "semantic-ui-react";
import Truck from "./Truck";
//import AddClientModal from "./AddClientModal";
//import { setGeoEncoding } from "../../actions";
import "./Trucks.css";
//const GEOCODING_DONE = 1;
//const GEOCODING_RENEWED = 2;
//const GEOCODING_PUSHED= 3;

class Trucks extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
            clientsStyle: {
                visibility: 'hidden',
                height: "2px",
            },
           display: false,
       }
    }

   onButtonClick = (display) => {
       const {admin, trucks} = this.props;

       if (display){
           this.setState({
               trucksStyle: {
                   ...this.state.trucksStyle,
                   visibility: "hidden",
                   height: "2px",
               },
               display: false,
           })
       } else if (admin && trucks) {
           this.setState({
               trucksStyle: {
                 ...this.state.trucksStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "150px",
             },
             display: true,
          })
        } else if (!admin && trucks){
          this.setState({
              trucksStyle: {
                ...this.state.trucksStyle,
                visibility: "visible",
                paddingTop: "0.0em",
                position: "relative",
                color: "white",
                size: "tiny",
                border: "2px dotted black",
                overflow: "scroll",
                height: "200px",
            },
            display: true,
         })
        }
        else {
              this.setState({
                 trucksStyle: {
                      ...this.state.trucksStyle,
                      visibility: "hidden",
                      height: "2px",
                  },
                  display: false,
              })
        };
      }

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
    const {french, trucks} = this.props;
    const {display} = this.state;

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
      <Menu.Menu className ="TrucksMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Icon name='eye' size ="big" onClick={() => this.onButtonClick(display)}/> {titleString}
            </Menu.Header>
          <Menu.Menu style={this.state.trucksStyle} >
              {display && truckArray.length>0 && this.displayTrucks(truckArray)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     french: state.user.french,
     trucks: state.user.trucks
   }
);

export default connect(
  mapStateToProps,
  {}
)(Trucks);
