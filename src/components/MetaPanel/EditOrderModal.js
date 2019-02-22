import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Radio} from 'semantic-ui-react';

class EditOrderModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         fieldChange: false,
         activeOrderChanged: false,
         //activeOrderId:  "",
         //activeOrderKey: "",

         date: this.props.order.date,
         work: this.props.order.work,
         orderId: this.props.order.orderId,
         isActive: this.props.order.isActive,
     }
}



  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
         const {date,work, orderId, isActive, fieldChange,
                activeOrderChanged} = this.state;
         const {orderKey, contact, usertag} = this.props;
         //console.log (orderKey);
         //console.log (contact.tag);
         //console.log (contact.name);
         //console.log (contact.clientKey);
         if ( !fieldChange && !activeOrderChanged ) {
              //console.log("no change, just return");
              //this.handleOpen(false);
              //return;
         } else if (fieldChange && !activeOrderChanged) {
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
              }
             //console.log(newOrder);
             orderRef.update(newOrder);
             //this.handleOpen(false);
       } else if (!fieldChange && activeOrderChanged) {
             //console.log("fields not change, active id changed");
             let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
             const orderRef = firebase.database().ref(orderPath);
             //console.log(orderPath);

             const activeOrderActive  = isActive === "true" ? true:false;
             const newOrder = {

                "isActive": String(activeOrderActive),
             }
             //console.log(newOrder);
             orderRef.update(newOrder);

             const clientPath = "repos/"+usertag+"/clients/tags/"+ contact.clientKey;
             const clientRef = firebase.database().ref(clientPath);
             //console.log(clientPath);

             const  activeOrderId  = isActive === "true" ? orderId:null;
             const activeOrderKey = isActive === "true" ? orderKey:null;
             const newOrderId = {
                 "activeOrderId" : String(activeOrderId),
                 "activeOrderKey": String(activeOrderKey),
             }

             clientRef.update(newOrderId);

             //this.handleOpen(false);
      }
      else if (fieldChange && activeOrderChanged) {
            //console.log("fields not change, active id changed");
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
               "isActive": String(isActive),
            }
            //console.log(newOrder);
            orderRef.update(newOrder);

            const clientPath = "repos/"+usertag+"/clients/tags/"+ contact.clientKey;
            const clientRef = firebase.database().ref(clientPath);
            //console.log(clientPath);

            const activeOrderId  = isActive === "true" ? orderId:null;
            const activeOrderKey = isActive === "true" ? orderKey:null;

            const newOrderId = {
                "activeOrderId" : String(activeOrderId),
                "activeOrderKey": String(activeOrderKey),
            }

            clientRef.update(newOrderId);

            //this.handleOpen(false);
      }
      this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, work } = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !work) {
        window.alert ("work is required");
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
    const {orderId} = this.state;
    const {activeOrderId, orderKey} = this.props;


    this.setState({
          isActive: this.state.isActive==="true"? "false":"true",
          activeOrderChanged: true,
    });

    /*if (checked) {
       console.log("this is active work order");
       if (orderId === activeOrderId){
           console.log("same order id, mutiple clicks: ignore");
           this.setState ({
                activeOrderChanged: false,
                activeOrderId: orderId,
                activeOrderKey: orderKey,
                isActive: true
            })
       }
       else {
           console.log("new order id, need to set");

           this.setState ({
                activeOrderChanged: true,
                activeOrderId: orderId,
                activeOrderKey: orderKey,
                isActive: true
            })
       }
    } else {
       console.log("this is not active work order");
       console.log("activeOrderId = " + activeOrderId);
       console.log("orderId = " + orderId);
       if (orderId === activeOrderId){
           console.log("not active any more, set to null");
           console.log("activeOrderId = " + activeOrderId);
           console.log("orderId = " + orderId);
           this.setState ({
                activeOrderChanged: true,
                activeOrderId: null,
                activeOrderKey: null,
                isActive: false,
            })
       }
       else {
           console.log("never was active, do nothing");
           this.setState ({
                activeOrderChanged: false,
                activeOrderId: null,
                activeOrderKey: null,
                isActive: false,
            })
       }
    } */
  }

  render() {
    const {order, contact} = this.props;
    //console.log ("EditOrderModal order = " );
    //console.log (order);
    //console.log (orderKey);
    //console.log (contact.tag);
    //console.log (contact.name);
    //console.log (contact.clientKey);

    const titleString = contact.name + " :  " + "Edit Order";
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
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Date'
                            defaultValue = {order.date}
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label='Work'
                             defaultValue = {order.work}
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Order ID'
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
                   checked={this.state.isActive === "true"}
                   onChange={this.handleRadioChange}
               />
   </Form.Field>
        </Form>



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
     activeOrderId:  state.user.activeOrderId,
     activeOrderKey: state.user.activeOrderKey,
   }
);

export default connect(
  mapStateToProps,
  {}
)(EditOrderModal);
