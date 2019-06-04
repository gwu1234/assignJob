import React, { Component } from 'react';
import firebase from "../../firebase";
//import Geocode from "react-geocode";
import { connect } from "react-redux";
import { Grid, Button, Header, Icon, Modal, Form, Menu} from 'semantic-ui-react';
import DeleteTruckModal from "./DeleteTruckModal"
import EmployeeTruck from "./EmployeeTruck"
import EmployeeNoTruck from "./EmployeeNoTruck"

class EditTruckModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         contentChanged: false,
         newAssigned: false,
         newUnassigned: false,
         model: this.props.truck.model,
         year: this.props.truck.year,
         color: this.props.truck.color,
         truckId: this.props.truck.truckId,
     }
}


  handleOpen = (open) => this.setState({ modalOpen: open })
  handleClose =() => {
    this.setState({ modalOpen: false });
  }

  handleCancel =() => {
    //console.log("handleClose")
    this.setState({
       modalOpen: false,
    });
  }


  handleDelete = () => this.setState({ modalOpen: false })

  deleteTruck = () => {
      //console.log("deleteEmployee")
      const event = this.nativeEvent;
      if (event) {
          event.preventDefault();
      }

      const {usertag, truckKey } = this.props;
      const truckPath = "repos/" + usertag + "/trucks/" + truckKey;
      //console.log (truckPath);
      const truckRef = firebase.database().ref(truckPath);
      truckRef.set(null);
      this.handleOpen(false);
  }

  removeAssigned = (assigned) => {
    const {usertag} = this.props;
    const employeePath = "repos/" + usertag + "/employees/" + assigned.employeeKey;
    const employeeRef = firebase.database().ref(employeePath);
    const truck = {
         "truckAssigned": false,
         "truckColor": null,
         "truckKey": null,
         "truckModel": null,
         "truckYear": null,
         "truckId": null,
     }
     //console.log(truck);
     //console.log(employeePath);
     employeeRef.update(truck);

     const truckPath = "repos/" + usertag + "/trucks/" + assigned.truckKey;
     const truckRef = firebase.database().ref(truckPath);

     const employee = {
          "assigned": false,
          "employeeKey": null,
          "employeeName": null,
      }
      //console.log(employee);
      //console.log(truckPath);
      truckRef.update(employee);
  }

  addAssigned = assigned => {
    //console.log (assigned);

    const {usertag} = this.props;
    const employeePath = "repos/" + usertag + "/employees/" + assigned.employeeKey;
    const employeeRef = firebase.database().ref(employeePath);
    const truck = {
         "truckAssigned": true,
         "truckColor": assigned.truckColor,
         "truckKey": assigned.truckKey,
         "truckModel": assigned.truckModel,
         "truckYear": String(assigned.truckYear),
         "truckId": String(assigned.truckId),
     }
     //console.log(truck);
     //console.log(employeePath);
     employeeRef.update(truck);

     const truckPath = "repos/" + usertag + "/trucks/" + assigned.truckKey;
     const truckRef = firebase.database().ref(truckPath);

     const employee = {
          "assigned": true,
          "employeeKey": assigned.employeeKey,
          "employeeName": assigned.employeeName,
      }
      //console.log(employee);
      //console.log(truckPath);
      truckRef.update(employee);
  }

  displayEmployees = employees =>
     employees.length > 0 &&
     employees.map(employee => (
         <EmployeeTruck
             key={employee.employeeKey}
             employeeKey={employee.employeeKey}
             employee={employee.employee}
             truck={this.props.truck}
             truckKey={this.props.truckKey}
             addAssigned={(assigned)=>this.addAssigned(assigned)}
             handleClose={()=>this.handleClose()}
         />
    ));


  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid(this.state)) {
         const { contentChanged, model, year, color, truckId} = this.state;
         const {usertag, truckKey} = this.props;
         //const name = model + " " + year + " " + color;
         console.log(truckId);

         if (contentChanged) {

            const newTruck = {
                "model":  String(model),
                "year": String (year),
                "color": String(color),
                "truckKey": String (truckKey),
                "truckId": String (truckId),
             }

             const truckPath = "repos/" + usertag + "/trucks/" + truckKey;
             const truckRef = firebase.database().ref(truckPath);
             //console.log(truckPath);
             truckRef.update(newTruck);
         }

         this.handleCancel();
    }
  };

  isFormValid() {
    const {model, year, color, truckId} = this.state;
           if (!model ){
              window.alert("model is required");
              return false;
           } else if (model.length < 2) {
              window.alert("full model name please");
              return false;
           }

           if (!year){
              window.alert("year is required");
              return false;
           } else if (year.length < 3) {
             window.alert("please full year format, e.g., 2018");
             return false;
           }

           if (!truckId){
              window.alert("truck id is required");
              return false;
           } else if (truckId.length < 4) {
             window.alert("id too short, eg, GM-001");
             return false;
           }

           if (!color){
              window.alert("color is required");
              return false;
           } else if (color.length < 3) {
             window.alert("full color name please, e.g. blue");
             return false;
           }

    return true;
  }

  handleChange = event => {
      //console.log([event.target.name]);
      //console.log(event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
        contentChanged: true,
      });
  };


  render() {
    const {truck, employees, french} = this.props;
    //const {year, color} = this.state;

    const titleString = french? "Modifier Camion: " + truck.model: "Edit Truck: " + truck.model;
    const truckName = truck.model + " " + truck.year;
    const model = french? "Modèle": "Model";
    const truckString = french? "Camion Id": "Truck Id";
    const year = french? "Année": "Year";
    const color = french? "Couleur": "Color";
    const deleteString = french? "Cliquez sur MINUS icône pour effacer camion de " :
                         "click MINUS icon to remove this truck from ";
    const assignString = french? "Cliquez sur PLUS icône pour attrubuer ce camion à un employé":
                         "click PLUS icon to assign this truck to an employee";

    const availableEmployees =[];
    for (var key in employees) {
       if (!employees[key].truckAssigned) {
          const newEmployee = {
             employeeKey: key,
             employee: employees[key]
          }
          availableEmployees.push(newEmployee);
        }
    }
    let assignedEmployee = null;
    for (var key in employees) {
       if (key === truck.employeeKey) {
          assignedEmployee = employees[key];
          break;
        }
    }

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='tiny'
        style={{background: "#ccc", paddingTop: "0em", paddingLeft:"3em", paddingRight:"2em", paddingBottom:"1em"}}
      >
        <Header icon='truck' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black", paddingBottom:"2em"}}/>
        <Grid>
        <Grid.Row style={{paddingTop: "0em", paddingBottom:"0em", marginBotton:"0px", border: "1px dotted white"}}>

        <Modal.Content>
        <Form >
           <Form.Group inline width='equal'>
               <Form.Input size ="small"
                           label={model}
                           placeholder = {truck.model}
                           defaultValue = {truck.model}
                           name="model"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label={truckString}
                            placeholder= {truck.truckId}
                            defaultValue = {truck.truckId}
                            name="truckId"
                            onChange={this.handleChange} />
          </Form.Group>
          <Form.Group inline width='equal'>
                <Form.Input size ="small"
                      label={year}
                      placeholder= {truck.year}
                      defaultValue = {truck.year}
                      name="year"
                      onChange={this.handleChange} />
                <Form.Input size ="small"
                            label={color}
                            defaultValue = {truck.color}
                            name="color"
                            onChange={this.handleChange} />
          </Form.Group>
        </Form>
        </Modal.Content>
        </Grid.Row>

        <Grid.Row columns='equal' style={{width: "100%"}}>
        <Grid.Column >
           {truck && !truck.assigned && <Menu.Item style={{ paddingTop: "1em", paddingBottom:"1em"}}>
             <span style={{ color: "green", fontStyle:"bold", fontSize: "1.1em"}}>
                   {assignString}
             </span>
           </Menu.Item>}
           <Menu.Menu style={{border: "1px dotted white"}}>
                 {truck && !truck.assigned && this.displayEmployees(availableEmployees)}
           </Menu.Menu>
           {truck && truck.assigned && assignedEmployee && <Menu.Item style={{ paddingTop: "1em", paddingBottom:"1em"}}>
             <span style={{ color: "blue", fontStyle:"bold", fontSize: "1.1em"}}>
                   {deleteString} {assignedEmployee.name}
             </span>
           </Menu.Item>}
           <Menu.Menu style={{border: "1px dotted white"}}>
                 {truck && truck.assigned && assignedEmployee
                        && <EmployeeNoTruck key={assignedEmployee.tag}
                        employeeKey={assignedEmployee.tag}
                        employee={assignedEmployee}
                        truck={this.props.truck}
                        truckKey={this.props.truckKey}
                        removeAssigned={(assigned)=>this.removeAssigned(assigned)}
                        handleClose={()=>this.handleClose()}/>}
           </Menu.Menu>
        </Grid.Column >
        </Grid.Row>
      </Grid>

        <Modal.Actions>

        <DeleteTruckModal
            truckName ={truckName}
            french = {french}
            assignedEmployee = {assignedEmployee}
            handleClose={()=>this.handleClose()}
            deleteTruck ={()=>this.deleteTruck()}
        />

        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "red"}}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                style ={{position:"relative", float:"right", color: "green"}}
                >
                Submit
          </Button>

         </Modal.Actions>

      </Modal>
    )
  }
}

const mapStateToProps = state => ({
     employees: state.user.employeeList,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  null
)(EditTruckModal);
