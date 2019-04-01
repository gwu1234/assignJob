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
          <Delivery deliveryKey={delivery.deliveryKey} key={delivery.deliveryKey} delivery={delivery.delivery} />
     ));



  render() {
    const {deliverys, french} = this.props;
    const {display} = this.state;

    //console.log(deliverys);
    let titleString = "Delivery";
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
      <Menu.Menu className ="DeliverysMenuMenu" style={{height:"92vh"}}>
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                {titleString}
            </Menu.Header>
          <Menu.Menu style={{visibility: "visible", paddingTop: "0.0em", position: "relative",
                             color: "white", size: "tiny", overflow: "scroll", height: "84vh"}} >
              {deliverys && this.displayDeliverys(deliveryArray)}
              <Menu.Item style={{margin:"1em"}}>
                   <span style={{color:"white", fontStyle:"bold"}}> {modalString}</span> <AddDeliveryModal />
              </Menu.Item>
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let deliverys = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      deliverys = reposData["clients"]["data"][clienttag]["deliverys"];
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
