import React from "react";
//import firebase from "../../firebase";
//import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";
import AssignedEmployeeHeader from "./AssignedEmployeeHeader";
import AssignedEmployeeOrder from "./AssignedEmployeeOrder";

class AssignedEmployeeOrders extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       EmployeeAssignedData: null,
    }
  }

   getEmployeeAssignedData () {
      const {AssignedEmployee, usertag, employeeKey, french, clientList} = this.props;
      const {assignedOrders} = AssignedEmployee;
      //console.log(assignedOrders);

      let assignedData = {};
      for (var orderkey in assignedOrders) {
           //let isActive = assignedOrders[orderkey].isActive;
           //isActive = isActive?(isActive===true? true: (isActive==="true"? true: false)): false;

           //if (!isActive) {
            //  continue;
           //}

           const {clientKey, orderId, orderKey} = assignedOrders[orderkey];

           const contact = clientList[clientKey]["contact"];
           const {name, street, city } = contact;
           const address = street + " , " + city;

           const order = { ...clientList[clientKey]["workorders"][orderKey],
                           "assignedEmployees": null,
                           "clientName": name,
                           "clientAddress": address,
                         };
          //const order = clientList[clientKey]["workorders"][orderKey];

           let isActive = order.isActive;
           isActive = isActive?(isActive===true? true: (isActive==="true"? true: false)): false;

           if (!isActive) {
               continue;
           }

           assignedData[orderkey] = {};
           assignedData[orderkey]["order"] = order;
           //console.log(assignedData);
           const coworkers = clientList[clientKey]["workorders"][orderKey]["assignedEmployees"];
           assignedData[orderkey]["coworkers"] = coworkers;
           //console.log(assignedData);

           let assignedDeliverys = {};
           const deliverys = clientList[clientKey]["deliverys"];
           //console.log(deliverys);
           for (var deliverykey in deliverys) {
               if ( deliverys[deliverykey].linkedOrderKey === orderKey &&
                    deliverys[deliverykey].linkedOrderId  === orderId ) {
                    //assignedDeliverys[deliverykey] = {};
                    assignedDeliverys[deliverykey] = deliverys[deliverykey];
                    //console.log(deliverys[deliverykey]);
               }
           }
           assignedData[orderkey]["deliverys"] = assignedDeliverys;

      }
      return  assignedData;
  }

  displayAssignedEmployeeOrders = (EmployeeAssignedData) => {
     //const {EmployeeAssignedData} = this.state;
     let assignedOrders = [];
     for (var orderkey in EmployeeAssignedData) {
        assignedOrders.push (
          <AssignedEmployeeOrder
            key={orderkey}
            order = {EmployeeAssignedData[orderkey]}
            usertag={this.props.usertag}
            french = {this.props.french}
        />);
     }
     return assignedOrders;
  };

  render() {
    //const {AssignedEmployee, usertag, employeeKey, french} = this.props;
    const EmployeeAssignedData = this.getEmployeeAssignedData();
    //console.log(EmployeeAssignedData);

    return (
       <Menu.Menu style={styles.container}>
          {this.displayAssignedEmployeeOrders(EmployeeAssignedData)}
       </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    paddingTop: "1px",
    paddingBottom: "1px",
    width: "100%",
    height: "100%",

  },
  name: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px",
    width: "45%",
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

export default AssignedEmployeeOrders;
