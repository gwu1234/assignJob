import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import Delivery from "./Delivery";
import AddDeliveryModal from "./AddDeliveryModal";
import "./Deliverys.css";

class Deliverys extends React.Component {

   state = {
     ordersStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   onButtonClick = (display) => {
       if (display){
           this.setState({
               ordersStyle: {
                   ...this.state.clientsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               ordersStyle: {
                 ...this.state.clientsStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "390px",
             },
             display: true,
          })
        }
   };


   displayDeliverys = deliverys =>
      deliverys.length > 0 &&
      deliverys.map(delivery => (
          <Delivery deliveryKey={delivery.deliveryKey} key={delivery.clientKey + delivery.deliveryKey} delivery={delivery.delivery} />
     ));



  render() {
    const {deliverys, french} = this.props;
    const {display} = this.state;

    //console.log(deliverys);
    let titleString = "Deliveries";
    let modalString = "add new delivery";
    if (french) {
       modalString = "ajouter nouveau livraison";
       titleString = "livraison";
    }

    const deliveryArray =[];
    //const keyArray = [];
    for (var key in deliverys) {
       //console.log(clients[key]);
       //console.log(key);
       const newDelivery= {
         deliveryKey: key,
         delivery: deliverys[key]
       }
       //keyArray.push(key);
       deliveryArray.push(newDelivery);
    }

    // sort the delivery by the time
    deliveryArray.sort((a, b) => {
            const dataA = new Date(a.delivery.date);
            const timeA = dataA.getTime();
            //console.log(timeA);
            const dataB = new Date(b.delivery.date);
            const timeB = dataB.getTime();
            //console.log(timeB);
            return (parseInt(timeA)>parseInt(timeB)? -1: 1);
            //return (aSize < bSize) ? -1 : (aSize > bSize) ? 1 : 0;;
          }
       );
    //console.log(deliveryArray);

    return (
      <Menu.Menu style= {styles.container}>
            <Menu.Header style= {styles.menuHeader}>
                {titleString}
            </Menu.Header>
          <Menu.Menu style= {styles.menuMenu} >
              {deliverys && this.displayDeliverys(deliveryArray)}
              <Menu.Item style={{margin:"3px"}}>
                   <span style={{color:"black", fontWeight:"bold"}}> {modalString}</span> <AddDeliveryModal />
              </Menu.Item>
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    background: "#f2f4f7",
  },
  menuHeader: {
    paddingTop:"8px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "7%",
  },
  menuMenu: {
    position: "relative",
    overflow: "scroll",
    height: "93%",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let deliverys = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      deliverys = reposData["clients"]["data"][clienttag]?
                  reposData["clients"]["data"][clienttag]["deliverys"]:
                  null;
      //console.log(clientContact);
  }
  return {
     deliverys: deliverys,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(Deliverys);
