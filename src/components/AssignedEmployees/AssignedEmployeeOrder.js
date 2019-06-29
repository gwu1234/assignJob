import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Grid} from "semantic-ui-react";
import OrderOrder from "./OrderOrder";
//import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class AssignedEmployeeOrder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { order, usertag, french } = this.props;
        //console.log(order);
    return (
      <Grid columns={3} style = {styles.container}>
         <Grid.Row >
             <Grid.Column style={{width:"33%"}}>

                     <OrderOrder order={order.order} orderKey ={order.order.orderKey}/>

              </Grid.Column>
              <Grid.Column style={{width:"33%"}}>

                      <OrderOrder order={order.order} orderKey ={order.order.orderKey}/>

              </Grid.Column>
              <Grid.Column style={{width:"33%"}}>
                      <OrderOrder order={order.order} orderKey ={order.order.orderKey}/>
              </Grid.Column>
         </Grid.Row> </Grid>
     );
   }
}

const styles = {
  container: {
    paddingTop: "3px",
    paddingBottom: "3px",
    width: "100%",
    borderStyle:"dotted",
    borderBottomWidth: "1px",
    borderTopWidth: "1px",
    borderRightWidth: "0px",
    borderColor:"#C3C5C2",
  },
  name: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px",
  },
  truckName: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    paddingTop:"2px",
    paddingBottom:"2px",
    width: "45%",
  },
};

export default AssignedEmployeeOrder;
