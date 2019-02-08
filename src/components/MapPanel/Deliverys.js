import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Button} from "semantic-ui-react";
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
    const {deliverys} = this.props;
    const {display} = this.state;

    //console.log(deliverys);

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


    return (
      <Menu.Menu className ="DeliverysMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Icon name='eye' size ="big" onClick={() => this.onButtonClick(display)}/> &nbsp; Delivery
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && deliverys && this.displayDeliverys(deliveryArray)}
              {display && deliverys && <Menu.Item style={{margin:"1em"}}>
                   <span style={{color:"white", fontStyle:"bold"}}> add new delivery</span> <AddDeliveryModal />
              </Menu.Item>}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     deliverys: state.user.deliverys,
   }
);

export default connect(
  mapStateToProps,
  {}
)(Deliverys);