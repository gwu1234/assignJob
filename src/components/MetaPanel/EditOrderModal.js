import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setActiveOrderId, setActiveOrderKey} from "../../actions";
import { Button, Header, Icon, Modal, Form, Radio, Grid, Dropdown, Select, Message} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

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

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
         const {work, orderId, isActive, fieldChange, isRepeat, repeatTimes} = this.state;
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
         } else {
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

       /*else if (!fieldChange && activeOrderChanged) {
             //console.log("fields not change, active id changed");
             //let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
             //const orderRef = firebase.database().ref(orderPath);
             //console.log(orderPath);
             let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/";
             const orderRef = firebase.database().ref(orderPath);
             const activeOrderActive  = isActive === "true" ? true:false;
             const newOrder = {

                "isActive": String(activeOrderActive),
             }
             //console.log(newOrder);
             orderRef.child(orderKey).update(newOrder);

             if (activeOrderActive && this.props.activeOrderId
                 && this.props.activeOrderKey) {
                   console.log(this.props.activeOrderKey);
                   console.log(this.props.activeOrderId);
                   orderRef.child(this.props.activeOrderKey).update({"isActive": "false"});
             }

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

             this.props.setActiveOrderId(activeOrderId);
             this.props.setActiveOrderKey(activeOrderKey);
             //this.handleOpen(false);
      }*/
      /*else if (fieldChange && activeOrderChanged) {
            //console.log("fields not change, active id changed");
            //let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/" +orderKey;
            //const orderRef = firebase.database().ref(orderPath);
            //console.log(orderPath);

            let orderPath = "repos/"+usertag+"/clients/data/"+ contact.tag +"/workorders/";
            const orderRef = firebase.database().ref(orderPath);
            //const activeOrderActive  = isActive === "true" ? true:false;

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
            orderRef.child(orderKey).update(newOrder);

            if (activeOrderActive && this.props.activeOrderId !== null
                && this.props.activeOrderKey !== null) {
                  console.log(this.props.activeOrderKey);
                  console.log(this.props.activeOrderId);
                  orderRef.child(this.props.activeOrderKey).update({"isActive": "false"});
            }


            /*const clientPath = "repos/"+usertag+"/clients/tags/"+ contact.clientKey;
            const clientRef = firebase.database().ref(clientPath);
            //console.log(clientPath);

            const activeOrderId  = isActive === "true" ? orderId:null;
            const activeOrderKey = isActive === "true" ? orderKey:null;

            const newOrderId = {
                "activeOrderId" : String(activeOrderId),
                "activeOrderKey": String(activeOrderKey),
            }

            this.props.setActiveOrderId(activeOrderId);
            this.props.setActiveOrderKey(activeOrderKey);
            clientRef.update(newOrderId);*/

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


  handleDropdownChange = (event: React.SyntheticEvent<HTMLDivElement>, data: any) => {
    const selectedValue = data.value
    //console.log( data.value);
    this.setState({
        repeatTimes: selectedValue,
        fieldChange: true,
    });
  }

  render() {
    const {order, contact, activeOrderId, activeOrderKey, orderKey} = this.props;
    const {orderId, activeOrderChanged} = this.state;
    let {repeatTimes, isActive, isRepeat} = this.state;
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

    /*const isRadioActive = activeOrderChanged? isActive==="true": isActive === "true" &&
         activeOrderId === orderId &&
         activeOrderKey === orderKey ;*/

   //const isRadioActive = isActive === "true";
    repeatTimes = repeatTimes? String(repeatTimes): "2";
    isActive = ( (isActive && isActive ==="true") ||
                 (isActive && isActive === true ) ) ?
                 true: false;

    isRepeat = ( (isRepeat && isRepeat ==="true") ||
                 (isRepeat && isRepeat=== true ) ) ?
                 true: false;

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
        <Header icon='clipboard outline' content={titleString} style = {{fontSize: "1.0em", fontStyle: "bold", color:"black"}}/>
        <Modal.Content>

        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

        <DayPicker
             onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
             month={new Date(order.date)}
             selectedDays={[new Date(this.state.date)]}
        />

        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>
        <Form >
           <Form.Group inline width='equal' >
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
                  Repeat Times (0 = infinite)
              </Message>

               <Dropdown
                  placeholder={repeatTimes}
                  fluid
                  selection
                  onChange={this.handleDropdownChange}
                  options={this.dropdownOptions()}
               />

         </Form.Field>
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
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      clientContact = reposData["clients"]["data"][clienttag]["contact"];
      //console.log(clientContact);
  }
  return {
     contact: clientContact,
     usertag: state.user.usertag,
     activeOrderId:  state.user.activeOrderId,
     activeOrderKey: state.user.activeOrderKey,
   }
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
