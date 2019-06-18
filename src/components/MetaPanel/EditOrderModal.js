import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setActiveOrderId, setActiveOrderKey} from "../../actions";
import { Button, Header, Icon, Modal, Form, Radio, Grid, Dropdown, Select, Message, Menu} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import EmployeeOrder from "./EmployeeOrder";
import EmployeeNoOrder from "./EmployeeNoOrder";

class EditOrderModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         fieldChange: false,
         //activeOrderChanged: false,
         date: this.props.order.date,
         work: this.props.order.work,
         orderId: this.props.order.orderId,
         isActive: this.props.order.isActive,
         isRepeat: this.props.order.isRepeat,
         repeatTimes: this.props.order.repeatTimes,
         datetime: null,
         isEmployeeAssigned : false,
         employeeAssigned : null,
         isEmployeeUnassigned : false,
         employeeUnassignedKey : null,
     }
}

componentDidMount() {
  const {order} = this.props;
  //console.log(order.isActive);

  this.setState({
     isActive: order.isActive
  });
}

componentWillUnMount() {
  const {order} = this.props;
  console.log(order.isActive);
  this.setState({
     isActive: order.isActive
  });
}

  handleOpen = (open) => this.setState({ modalOpen: open })
  handleClose =() => {
    this.setState({ modalOpen: false });
  }

  findPreviousDelivery = (orderKey) => {
     const {deliverys} = this.props;
     let previousDeliverys = 0;

     for (var deliveryKey in deliverys) {
        let {linkedOrderKey} = deliverys[deliveryKey];

        if (linkedOrderKey === orderKey) {
            previousDeliverys ++;
        }
     }
     return previousDeliverys;
  }

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
         const {work, orderId, isActive, fieldChange, isRepeat, repeatTimes,
                isEmployeeAssigned, employeeAssigned,
                isEmployeeUnassigned, employeeUnassignedKey} = this.state;

         let {date} = this.state;
         const {orderKey, contact, usertag} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);
         var options = { year: 'numeric', month: 'long', day: 'numeric' };
         date = (new Date(date)).toLocaleDateString("en-US", options);
         //console.log("fieldChange  = " + fieldChange);

         if ( !fieldChange ) {
              //console.log("no change, just return");
              //this.handleOpen(false);
              //return;
         }
         /*else if (isEmployeeAssigned) {
              //console.log("fields change, active id not changed");
              let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
              const orderRef = firebase.database().ref(orderPath);
              const {tag,firstname,lastname} = employeeAssigned;

              const previousDelivery = this.findPreviousDelivery(orderKey);
              //console.log(previousDelivery);
              const previousTimeStamp = (new Date()).getTime();
              //console.log(previousTimeStamp);

              const updateOrder = {
                 "date": String(date),
                 "work": String(work),
                 "orderKey": String(orderKey),
                 "orderId" : String(orderId),
                 "clientKey": String(contact.clientKey),
                 "tag": String(contact.tag),
                 "clientTag": String(contact.tag),
                 "isActive": String(isActive),
                 "isRepeat": String(isRepeat),
                 "repeatTimes": String(repeatTimes),
                 "employeeKey": tag,
                 "employeeTag": tag,
                 "employeeFirstname": firstname,
                 "employeeLastName" : lastname,
                 "isEmployeeAssigned" : "true",
              }
             //console.log(updateOrder);
             //console.log("order path = " + orderPath);
             orderRef.update(updateOrder);
             //this.handleOpen(false);

             const employeePath = "repos/" + usertag + "/employees/" + tag
                   + "/assigned/" + contact.tag;
             //console.log("employee path = " + employeePath);
             const employeeRef = firebase.database().ref(employeePath);

             const newAssigned = {
               "clientCity":  String(contact.city),
               "clientLastname": String (contact.lastname),
               "clientFirstname": String(contact.firstname),
               "clientStreet": String(contact.street),
               "clientName": String(contact.name),
               "clientPostcode": String(contact.postcode),
               "clientLat": String(contact.lat),
               "clientLng": String(contact.lng),
                /*"workorders": {
                     [orderKey]: {
                         "date": String(date),
                         "work": String(work),
                         "orderKey": String(orderKey),
                         "orderId" : String(orderId),
                         "clientKey": String(contact.clientKey),
                         "tag": String(contact.tag),
                         "clientTag": String(contact.tag),
                         "isActive": String(isActive),
                         "isRepeat": String(isRepeat),
                         "repeatTimes": String(repeatTimes),
                         "previousDelivery" : String(previousDelivery),
                         "previousTimeStamp" : String(previousTimeStamp),
                     }
                }*/
          /*   }
            console.log(newAssigned);

            employeeRef.update(newAssigned);
            employeeRef.child("workorders").child(orderKey).update ({
              "date": String(date),
              "work": String(work),
              "orderKey": String(orderKey),
              "orderId" : String(orderId),
              "clientKey": String(contact.clientKey),
              "tag": String(contact.tag),
              "clientTag": String(contact.tag),
              "isActive": String(isActive),
              "isRepeat": String(isRepeat),
              "repeatTimes": String(repeatTimes),
              "previousDelivery" : String(previousDelivery),
              "previousTimeStamp" : String(previousTimeStamp),
            })
         }*/
         /*else if (isEmployeeUnassigned) {
              //console.log("fields change, active id not changed");
              let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
              const orderRef = firebase.database().ref(orderPath);
              //const {tag,firstname,lastname} = employeeAssigned;

              const updateOrder = {
                 "date": String(date),
                 "work": String(work),
                 "orderKey": String(orderKey),
                 "orderId" : String(orderId),
                 "clientKey": String(contact.clientKey),
                 "tag": String(contact.tag),
                 "clientTag": String(contact.tag),
                 "isActive": String(isActive),
                 "isRepeat": String(isRepeat),
                 "repeatTimes": String(repeatTimes),
                 "employeeKey": null,
                 "employeeTag": null,
                 "employeeFirstname": null,
                 "employeeLastName" : null,
                 "isEmployeeAssigned" : "false",
              }
             //console.log(updateOrder);
             //console.log("order path = " + orderPath);
             orderRef.update(updateOrder);
             //this.handleOpen(false);

             /*const employeePath = "repos/" + usertag + "/employees/" + employeeUnassignedKey
                   + "/assigned/" + contact.tag + "/workorders/" + orderKey;
             //console.log("employee path = " + employeePath);
             const employeeRef = firebase.database().ref(employeePath);
             employeeRef.set(null);*/

             /*const assignedClientPath = "repos/" + usertag + "/employees/" + employeeUnassignedKey
                   + "/assigned/" + contact.tag ;
             const assignedClientRef = firebase.database().ref(assignedClientPath);

             assignedClientRef.once('value')
               .then((snapshot) => {
                 let assignedClient = snapshot.val();
                 let {workorders} = assignedClient;
                 let orders = 0;

                 for (var key in workorders) {
                     orders++;
                 }

                 if (orders  === 1) {
                      assignedClientRef.set(null);
                 } else {
                      assignedClientRef.child("workorders").child(orderKey).set(null);
                 }
             })
              .catch(err => {
                  console.log("reading assigned workorder = ");
                  console.error(err);
              });



         }*/
         else {
              //console.log("fields change, active id not changed");
              let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
              const orderRef = firebase.database().ref(orderPath);
              //console.log(orderPath);

              const newOrder = {
                 "date": String(date),
                 "work": String(work),
                 "orderKey": String(orderKey),
                 "orderId" : String(orderId),
                 "clientKey": String(contact.clientKey),
                 "tag": String(contact.tag),
                 "clientTag": String(contact.tag),
                 "isActive": String(isActive),
                 "isRepeat": String(isRepeat),
                 "repeatTimes": String(repeatTimes),
              }
             //console.log(newOrder);
             orderRef.update(newOrder);
             //this.handleOpen(false);
       }
            //this.handleOpen(false);
      }
       this.setState({
          fieldChanged: false,
       });
       this.handleOpen(false);
  };

  isFormValid() {
     const {date, work, orderId} = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
        return false;
     }
     if ( !orderId) {
        window.alert ("order Id is required");
        return false;
     }
     return true;
  }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({
       [event.target.name]: event.target.value,
       fieldChange: true,
     });
    //fieldChange: false,
    //activeIdChanged: false,
  };

  handleRadioChange = (e, { name, label, value, checked }) => {
    //this.setState({ value });
    //console.log("radio name = " + name);
    //console.log("radio label = " + label);
    //console.log("radio value = " + value);
    //console.log("radio checked = " + checked);
    //console.log(e);
    let {isActive} = this.state;
    //const {activeOrderId, orderKey} = this.props;

    isActive = ( (isActive && isActive === "true") ||  // database has a isRepeat
                 (isActive && isActive === true) ) ? // isActive is true
                 true:false;


    if (isActive === true) {
          this.setState({
              isActive: false,
              //activeOrderChanged: true,
              fieldChange: true,
          });
    } else {
      this.setState({
          isActive: true,
          //activeOrderChanged: true,
          fieldChange: true,
        });
    }
  }

  handleRepeatChange = (e, { name, label, value, checked }) => {
      //console.log("radio name = " + name);
      //console.log("radio label = " + label);
      //console.log("radio value = " + value);
      //console.log("radio checked = " + checked);
      //console.log(e);

      let {isRepeat, repeatChanged} = this.state;
      //database has a IsRepeat
      isRepeat = ( (isRepeat && isRepeat === "true") ||  // database has a isRepeat
                   (isRepeat && isRepeat === true) ) ? // isRepeat is true
                   true:false;

      //console.log("isRepeat = " + isRepeat);
      //console.log("repeatChanged = " + repeatChanged);

      if (isRepeat === true) {
            this.setState({
                isRepeat: false,
                repeatChanged: true,
            });
      } else {
        this.setState({
            isRepeat: true,
            repeatChanged: true,
          });
      }
  }


  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }

    //console.log(day);
    //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //console.log(day.toLocaleDateString("en-US", options));
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = day.toLocaleDateString("en-US", options);

    this.setState({
       date: date,
       fieldChange: true,
    })
  }

  dropdownOptions = () => {
      let optionArray = [];

      optionArray.push({
          key: '0',
          text: <span style ={{fontStyle: "bold",fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}} > {0} </span>,
          value: 0,
      });

      for (var i = 2; i <30; i++ ){
        //var a = String(i);
        optionArray.push({
           key: i,
           text: <span style ={{fontStyle: "bold", fontSize:"1.0em", margin:"0em", paddingTop:"0em", paddingBottom:"0em"}}> {i} </span>,
           value: i,
        });
      }

      return optionArray;
  }

  /*employeeOptions = () => {
      const {employees, order} = this.props;
      let assignedEmployees = [];
      for (var key in order.assignedEmployee) {
           assignedEmployees.push(key);
      }

      let employeeOptions = [];
      for (var key in employees) {
          if (!assignedEmployees.includes(key)) {
             employeeOptions.push({
                   key: key,
                   text: <p style ={styles.DropdownMenu}> {employees[key].name} </p>,
                   value: key,
              });
          }
      }

      return employeeOptions;
  }*/

  displayEmployees = (employees) =>
     employees.length > 0 &&
     employees.map(employee => (
         <EmployeeOrder
             key={employee.tag}
             employee={employee}
             order={this.props.order}
             addAssigned={(assigned)=>this.addAssigned(assigned)}
             handleClose={()=>this.handleClose()}
         />
    ));

  addAssigned = assigned => {
      const assignedPath = "repos/" + assigned.usertag + "/clients/data/"
                           + assigned.clientKey + "/workorders/" + assigned.orderKey
                           + "/assignedEmployees/" + assigned.employeeKey;
      //console.log(assigned);
      //console.log(assignedPath);
      const assignedRef = firebase.database().ref(assignedPath);
      assignedRef.update(assigned);

      const employeePath = "repos/" + assigned.usertag + "/employees/"
                           + assigned.employeeKey + "/assignedOrders/" + assigned.orderKey;
      //console.log(assigned);
      console.log(employeePath);
      const employeeRef = firebase.database().ref(employeePath);
      employeeRef.update(assigned);
    }

  /*assignedEmployeeOptions = () => {
      const {employees, order} = this.props;
      let assignedEmployeeOptions = [];

      const assignedEmployees = order.assignedEmployees;
      //console.log(assignedEmployees);
      //console.log(order);

      for (var key in assignedEmployees) {
             //console.log(assignedEmployees[key]);
             assignedEmployeeOptions.push({
                   key: key,
                   text: <p style ={styles.DropdownMenu}> {assignedEmployees[key].employeeName} </p>,
                   value: key,
              });
      }
      return assignedEmployeeOptions;
  }*/

  displayAssignedEmployees = (employees) =>
     employees.length > 0 &&
     employees.map(employee => (
         <EmployeeNoOrder
             key={employee.tag}
             assignedEmployee={employee}
             order={this.props.order}
             removeAssigned={(assigned)=>this.removeAssigned(assigned)}
             handleClose={()=>this.handleClose()}
         />
    ));

  removeAssigned = (assigned) => {
    const {orderKey, clientKey,employeeKey, usertag} = assigned;
    const assignedPath = "repos/" + usertag + "/clients/data/" + clientKey
                         + "/workorders/" + orderKey + "/assignedEmployees/" + employeeKey;
    //console.log(assignedPath);
    const assignedRef = firebase.database().ref(assignedPath);
    assignedRef.set(null);

    const employeePath = "repos/" + assigned.usertag + "/employees/"
                         + assigned.employeeKey + "/assignedOrders/" + assigned.orderKey;
    //console.log(assigned);
    console.log(employeePath);
    const employeeRef = firebase.database().ref(employeePath);
    employeeRef.set(null);
  }



  /*employeeOptions2 = () => {
      const {employees, order} = this.props;
      let employeeNames = [];

      const isEmployeeAssigned = order.isEmployeeAssigned? (order.isEmployeeAssigned==="true"? true: false): false;

      if (isEmployeeAssigned === false) {
          for (var key in employees) {
             employeeNames.push(employees[key].name);
          }
      }
      else  {
          employeeNames.push("Remove Assignment");
      }

      const nameList = employeeNames.map(name => (
          <Dropdown.Item text={name} />
       ));

      console.log(nameList);
      return (
        <Dropdown text='File'>
          <Dropdown.Menu>
           {nameList}
          </Dropdown.Menu>
        </Dropdown>
      );
  } */

  handleDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      const selectedValue = data.value
      //console.log( data.value);
      this.setState({
         repeatTimes: selectedValue,
         fieldChange: true,
      });
  }


/*  selectEmployee = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      const {employees, clienttag, order} = this.props;
      const employeeKey = data.value;

      //console.log(order);
      if (employeeKey !== "none") {
           //console.log("employee tag = " + employees[employeeKey].tag);
           //console.log("employee name = " + employees[employeeKey].name);
           //console.log("client tag = " + clienttag);
           this.setState({
             isEmployeeAssigned : true,
             employeeAssigned : employees[employeeKey],
             isEmployeeUnassigned: false,
             fieldChange: true,
           });
      } else {
          const employeeAssignedKey = order["employeeKey"];
          console.log(employeeAssignedKey);

          if (employeeAssignedKey) {
               this.setState({
                   isEmployeeAssigned : false,
                   employeeUnassignedKey : employeeAssignedKey,
                   isEmployeeUnassigned: true,
                   fieldChange: true,
               });
          }
      }
  }*/

  render() {
    const {order, employees, contact, activeOrderId, activeOrderKey, orderKey, french} = this.props;
    const {orderId, activeOrderChanged} = this.state;
    let {repeatTimes, isActive, isRepeat} = this.state;
    let {isEmployeeAssigned, employeeFirstname, employeeLastName} = order;
    const employeeName = employeeFirstname + ", " + employeeLastName;
    //isEmployeeAssigned = isEmployeeAssigned?(isEmployeeAssigned==="true"? true:false): false;



    //let {repeatTimes, isRepeat} = this.state;
    //let {isActive} = order;


    //console.log ("EditOrderModal order = " );
    //console.log ("orderId in order = " + order["orderId"]);
    //console.log ("orderKey in order = " + order["orderKey"]);
    //console.log ("isActive in state = " + isActive);
    //console.log ("isActive in order = " + order["isActive"]);
    //console.log (activeOrderId);
    //console.log (activeOrderKey);
    //console.log (orderKey);
    //console.log(orderId);

   //const isRadioActive = isActive === "true";
    repeatTimes = repeatTimes? String(repeatTimes): "2";
    isActive = ( (isActive && isActive ==="true") ||
                 (isActive && isActive === true ) ) ?
                 true: false;

    isRepeat = ( (isRepeat && isRepeat ==="true") ||
                 (isRepeat && isRepeat=== true ) ) ?
                 true: false;

    const titleString = french? (contact.name + " :  " + "Modifier Ordre"):
                                (contact.name + " :  " + "Edit Order");

    const workString = french? "Travail": "Work";
    const orderString = french? "Ordre ID": "Order ID";
    const assignString = french? "attribuer cet ordre à un employé":
                                 "Assign this order to an employee";
    const repeatString = french? "répéte fois (0 = infini)": "repeat times (0 = infinity)";
    const assignNotice = french? "cet ordre attribue à employé ":
                                  "this order is assigned to employee ";
    const removeNotice = french? "sélectionner Remove Assignment pour retirer attribution":
                                 "select Remove Assignment to unassign";

    let assignedEmployees = [];
    let assignedKeys = [];
    for (var key in order.assignedEmployees) {
          assignedEmployees.push(order.assignedEmployees[key]);
          assignedKeys.push(key);
    }

    let employeeOptions = [];
    for (var key in employees) {
          if (!assignedKeys.includes(key)) {
               employeeOptions.push(employees[key]);
          }
    }

    //console.log(employeeOptions);

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc"}}
      >
        <Header icon='clipboard outline' content={titleString} style = {{fontSize: "1.0em", fontStyle: "bold", color:"black"}}/>
        <Modal.Content>

        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

        <DayPicker
             onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
             month={new Date(order.date)}
             selectedDays={[new Date(this.state.date)]}
        />

        <Form.Field style = {{paddingBottom:"0.0em", marginTop:"0.9em", marginBottom:"0.0em"}}>
             <Message style = {{color: "black", background: "#ccc", fontSize:"1.1em", padding:"0.2em", margin:"0em"}}>
                 Remove This Work Order from Employees :
             </Message>
        </Form.Field>
        <Menu vertical style={styles.DropdownMenu}>
             {this.displayAssignedEmployees(assignedEmployees)}
        </Menu>

        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>
        <Form >
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label={workString}
                            defaultValue = {order.work}
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={orderString}
                           defaultValue = {order.orderId}
                           name="orderId"
                           onChange={this.handleChange} />
           </Form.Group>
           <Form.Field>
               <Radio
                   toggle
                   label='make this order active'
                   name='activeRadio'
                   value={this.state.orderId}
                   checked={isActive}
                   onChange={this.handleRadioChange}
               />
          </Form.Field>
          <Form.Field>
              <Radio
                  toggle
                  label='make this order repetitive'
                  name='repeatRadio'
                  value={this.state.orderId}
                  checked={isRepeat}
                  onChange={this.handleRepeatChange}
              />
         </Form.Field>
         <Form.Field>
              <Message style = {{color: "black", background: "#ccc", fontSize:"1.0em", padding:"0.2em", marginTop:"0.4em", marginBottom:"0.2em"}}>
                  {repeatString}
              </Message>

               <Dropdown
                  placeholder={repeatTimes}
                  fluid
                  selection
                  onChange={this.handleDropdownChange}
                  options={this.dropdownOptions()}
               />

         </Form.Field>
         <Form.Field style = {{paddingBottom:"0.0em", marginTop:"0.9em", marginBottom:"0.0em"}}>
              <Message style = {{color: "black", background: "#ccc", fontSize:"1.1em", padding:"0.2em", margin:"0em"}}>
                  Assign This Work Order to New Employees :
              </Message>
         </Form.Field>
         <Menu vertical style={styles.DropdownMenu}>
              {this.displayEmployees(employeeOptions)}
         </Menu>
        </Form>
</Grid.Column>
</Grid>


        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleOpen(false)}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                >
                Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let clientContact = null;
  let deliverys = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      clientContact = reposData["clients"]["data"][clienttag]["contact"];
      deliverys = reposData["clients"]["data"][clienttag]["deliverys"];
  }
  return {
     contact: clientContact,
     usertag: state.user.usertag,
     employees: state.user.employeeList,
     clienttag: state.user.clienttag,
     deliverys: deliverys,
     french: state.user.french,
   }
};

const styles = {
  DropdownMenu: {
    padding: "3px",
    margin: "0px",
    width: "100%",
    height: "120px",
    position: "relative",
    backgroundColor: "white",
    color: "black",
    fontWeight: "normal",
    fontSize: "1.0em",
    overflow: "scroll"
  },
  DropdownDisplay: {
    padding: "6px",
    margin: "0px",
    width: "100%",
    position: "relative",
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    fontSize: "1.1em",
  },
};

export default connect(
  mapStateToProps,
  {}
)(EditOrderModal);

/*
<Select placeholder={repeatTimes}
    name="work orders"
    text={"0"}
    style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
    onChange={this.handleDropdownChange}
    options={this.dropdownOptions()}
/>
*/

/*employeeOptions = () => {
    const {employees, order} = this.props;
    let employeeOptions = [];

    //console.log (order);
    const isEmployeeAssigned = order.isEmployeeAssigned? (order.isEmployeeAssigned==="true"? true: false): false;
    //console.log(employeeAssigned);

    if (isEmployeeAssigned === false) {
        for (var key in employees) {
           employeeOptions.push({
                 key: key,
                 text: <p style ={styles.DropdownMenu}> {employees[key].name} </p>,
                 value: key,
            });
        }
    }
    else  {
        employeeOptions.push({
           key: '1234',
           text: <p style ={styles.DropdownMenu} > {"Remove Assignment"} </p>,
           value: "none",
        });
    }
    return employeeOptions;
}*/
