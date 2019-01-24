import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Header, Button} from "semantic-ui-react";
import WorkOrder from "./WorkOrder";
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
                 height: '',
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
          <WorkOrder key={order.date} order={order} />
     ));



  render() {
    const {orders} = this.props;
    const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}

    return (
      <Menu.Menu className ="OrdersMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Button icon size="mini" onClick={() => this.onButtonClick(display)}> <Icon name='eye' size ="large"/> </Button> &nbsp; Work Order
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && orders && this.displayOrders(orders)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     orders: state.user.workOrder,
   }
);

export default connect(
  mapStateToProps,
  {}
)(WorkOrders);
