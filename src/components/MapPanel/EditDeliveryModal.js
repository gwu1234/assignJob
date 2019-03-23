import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Select, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class EditOrderModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,

         date: this.props.delivery.date,
         work: this.props.delivery.work,
         employee: this.props.delivery.employee,
         deliveryId: this.props.delivery.deliveryId,
         linkedOrderId: this.props.delivery.linkedOrderId,
         linkedOrderKey: this.props.delivery.linkedOrderKey,
         linkedOrderSubkey: this.props.delivery.linkedOrderSubkey,
         selectedOrderId: null,
         selectedOrderKey: null,
         selectOrderChange: false,
         fieldChange: false,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const { date,work, employee, deliveryId, linkedOrderId, linkedOrderKey,
            linkedOrderSubkey, selectedOrderId, selectedOrderKey,
            selectOrderChange, fieldChange } = this.state;
    const {deliveryKey, contact, usertag} = this.props;
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {

         if (!selectOrderChange && fieldChange) {


             let deliveryPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/deliverys/" +deliveryKey;
             const deliveryRef = firebase.database().ref(deliveryPath);
             //console.log(deliveryPath);

             const newDelivery = {
                "date": String(date),
                "work": String(work),
                "employee": String (employee),
                "deliveryId": String (deliveryId),
                "deliveryKey": String(deliveryKey),
                "clientKey": String(contact.clientKey),
                "clientTag": String(contact.clientTag)
             }
            console.log(newDelivery);
            deliveryRef.update(newDelivery);
            this.handleOpen(false);
       }

       else if (selectOrderChange) {

         let deliverySubkey = "";
           // a non-null order selected
         if (selectedOrderKey) {
               const newDelivery = {
                  "linkedDeliveryKey": deliveryKey,
                  "linkedDeliveryId": deliveryId,
                }
               const orderPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag
                                    + "/workorders/" + selectedOrderKey +"/linkedDeliverys";
               const orderRef = firebase.database().ref(orderPath);
               deliverySubkey = orderRef.push().getKey();
               orderRef.child(deliverySubkey).update(newDelivery);
         }

           // was linked to workorder before
         if (linkedOrderKey) {
               const nullDelivery = {
                   "linkedDeliveryKey": null,
                   "linkedDeliveryId": null,
               }
               const orderPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag
                                   + "/workorders/" + linkedOrderKey +"/linkedDeliverys/" +linkedOrderSubkey;
               const orderRef = firebase.database().ref(orderPath);
               orderRef.update(nullDelivery);
         }

           let deliveryPath = "repos/"+usertag+"/clients/data/"+ contact.clientTag +"/deliverys/" +deliveryKey;
           const deliveryRef = firebase.database().ref(deliveryPath);

           const newDelivery = {
               "date": String(date),
               "work": String(work),
               "employee": String (employee),
               "deliveryId": String (deliveryId),
               "deliveryKey": String(deliveryKey),
               "clientKey": String(contact.clientKey),
               "clientTag": String(contact.clientTag),
               "linkedOrderId": selectedOrderId,
               "linkedOrderKey": selectedOrderKey,
               "linkedOrderSubkey": deliverySubkey,
           }
             //console.log(newContract);
           deliveryRef.update(newDelivery);

           this.setState ({
                 linkedOrderId:  selectedOrderId,
                 linkedOrderKey: selectedOrderKey,
                 linkedOrderSubkey: deliverySubkey,
                 selectOrderChange: false,
                 fieldChange: false,
                 selectedOrderId:  null,
                 selectedOrderKey: null,
           })

           this.handleOpen(false);
       }

    }
  };

  isFormValid() {
     const {date, work, employee, deliveryId} = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
        return false;
     }
     if ( !employee) {
        window.alert ("employee is required");
        return false;
     }

     if ( !deliveryId) {
        window.alert ("delivery id is required");
        return false;
     }
     return true;
  }

handleSelectChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
      let selectedId = null;
      let selectedKey = null;
      //console.log(data.value);
      //console.log("textContent = " + event.target.textContent);

      if (data !== undefined) {
        selectedKey = data.value;
      }

      if (event.target !== undefined) {
        selectedId = event.target.textContent;
      }

      if (selectedKey ==="no order" || selectedId ==="no order"){
          selectedId = null;
          selectedKey = null;
      }

      this.setState({
          selectedOrderId:  selectedId,
          selectedOrderKey: selectedKey,
          selectOrderChange: true,
       });
  }


  handleChange = event => {
     this.setState({
        [event.target.name]: event.target.value,
        fieldChange: true,
     });
  };

  selectOptions = () => {
     const {orders} = this.props;
     //const {linkedOrderId, linkedOrderKey} = this.props.contract;
     const {linkedOrderKey} = this.props.delivery;

     const Options = [
       {
          key: 1111,
          text: <span>no order</span>,
          value: "no order",
       }
     ];

     for (var key in orders) {
        if ( key !== linkedOrderKey) {
            const option = {
               key: key,
               text: <span> {orders[key].orderId} </span>,
               value: orders[key].orderKey,
            }
            Options.push(option);
        }
     };
     return Options;
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

  render() {
    const {delivery, contact} = this.props;

    let titleString = "Edit Delivery";
    if (contact) {
        titleString = contact.name + " :  " + "Edit Delivery";
    }
    //console.log (titleString);

    return (
      <Modal
        trigger={<Icon name='edit outline' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "right"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='clipboard outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>

        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

        <DayPicker
             onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
             month={new Date(this.state.date)}
             selectedDays={[new Date(this.state.date)]}
         />

         </Grid.Column>
         <Grid.Column style={{height: "100%", width:"50%"}}>

        <Form >
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {delivery.work}
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Employee'
                           defaultValue = {delivery.employee}
                           name="employee"
                           onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Delivery Id'
                           defaultValue = {delivery.deliveryId}
                           name="deliveryId"
                           onChange={this.handleChange} />

           </Form.Group>
        </Form>

        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>linked to work order: {this.state.linkedOrderId}</h4>}
        {this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select work order to change</h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"2em", marginBottom:"0.0em"}}>not linked to work order </h4>}
        {!this.state.linkedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0em", marginBottom:"0.5em"}}>select work order to link</h4>}
        <Select placeholder='Select Order Id'
                name="orders"
                text={this.state.selectedValue}
                style={{color:"black", fontStyle:"bold", margin:"0px", padding:"0px"}}
                onChange={this.handleSelectChange}
                options={this.selectOptions()}
        />
        {this.state.selectedOrderId && <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>{this.state.selectedOrderId} &nbsp; selected. Click Submit to confirm</h4>}
        {this.state.selectOrderChange && this.state.linkedOrderId && !this.state.selectedOrderId &&
          <h4 style={{color:"black", margin:"0px", padding:"0px", marginTop:"0.5em"}}>Deleting link to work order. Click Submit to confirm</h4>}

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
const mapStateToProps = state => ({
     contact: state.user.clientContact,
     usertag: state.user.usertag,
     orders: state.user.workOrder
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditOrderModal);
