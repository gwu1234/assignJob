import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import WorkOrder from "./WorkOrder";
import AddOrderModal from "./AddOrderModal";
import "./WorkOrders.css";

class WorkOrders extends React.Component {

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


   displayOrders = orders =>
      orders.length > 0 &&
      orders.map(order => (
          <WorkOrder orderKey={order.orderKey} key={order.orderKey} order={order.order} usertag={this.props.usertag} />
     ));



  render() {
    const {orders, french} = this.props;
    const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}
    let titleString = "Work Order";
    if (french) {
       titleString = "travail order";
    }

    const orderArray =[];
    //const keyArray = [];
    for (var key in orders) {
       //console.log(clients[key]);
       //console.log(key);
       const newOrder = {
         orderKey: key,
         order: orders[key]
       }
       //keyArray.push(key);
       orderArray.push(newOrder);
    }

    // sort list by the timestamp
   orderArray.sort((a, b) =>  (new Date (b.order.date)).getTime() - (new Date (a.order.date)).getTime() );



    return (
      <Menu.Menu className ="OrdersMenuMenu" style={{marginBottom:"0.4em"}}>
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
            {titleString}
            </Menu.Header>
          <Menu.Menu style={{visibility: "visible",paddingTop: "0.0em",position: "relative",
                     color: "white", size: "tiny", overflow: "scroll",
                     height: "37vh"}} >
              {orders && this.displayOrders(orderArray)}
              <Menu.Item style={{margin:"1em"}}>
                  <span style={{color:"white", fontStyle:"bold"}}> add new order</span> <AddOrderModal />
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
  let workOrders = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      workOrders = reposData["clients"]["data"][clienttag]?
      reposData["clients"]["data"][clienttag]["workorders"] : null;
      //console.log(clientContact);
  }
  return {
     orders: workOrders,
     french: state.user.french,
     usertag:state.user.usertag,
   }
};

export default connect(
  mapStateToProps,
  {}
)(WorkOrders);
