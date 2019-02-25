import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu} from "semantic-ui-react";
//import Client from "./Client";
import "./WorkOrder.css";
import EditOrderModal from "./EditOrderModal";

class WorkOrder extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     //display: false,
   };

  render() {
    const {order, orderKey, activeOrderId, activeOrderKey} = this.props;
    //const {display} = this.state;
    //console.log("Clients List = ");
    //console.log(clients);
    //display && clients && this.displayClients(clients)}
    let orderDate = "";
    let orderWork = "";
    if (order) {
        orderDate = order.date;
        orderWork = order.work;
    }

    const isActive = (order.orderId && order.orderId === activeOrderId) ||
                     (order.orderKey && order.orderKey === activeOrderKey) ;

    return (
      <Menu.Menu className ="OrderMenuMenu"
                 style = {isActive? {backgroundColor:"blue"}:
                          {} }>
          {orderDate && <Menu.Item
               style = {{opacity:1.0,fontSize:"0.8em",color:"white",
               marginTop:"0px", paddingTop:"0px",
               marginBottom:"0px", paddingBottom:"0px"}}>
              <span> {orderDate} </span> <EditOrderModal order={order} orderKey={orderKey} />
          </Menu.Item>}
          {orderWork && <Menu.Item style = {{opacity:1.0,fontSize:"0.8em",color:"white",
               marginTop:"0px", paddingTop:"0px",
               marginBottom:"0px", paddingBottom:"0px"}} >
              {orderWork}
          </Menu.Item>}
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     activeOrderId: state.user.activeOrderId,
     activeOrderKey: state.user.activeOrderKey,
   }
);

export default connect(
  mapStateToProps,
  {}
)(WorkOrder);

//export default WorkOrder;
