import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Grid, Radio, Dropdown, Message} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class AddOrderModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: '',
    orderId:'',
    repeatTimes: 2,
    isActive: false,
    isRepeat: false,
    //selectedDay:''
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
         const {date,work, orderId, isActive, isRepeat, repeatTimes} = this.state;
         const {usertag, contact} = this.props;

         //"repos/"+usertag+"/clients/data/"+ contact.clientTag
         let orderString = "repos/"+usertag+"/clients/data/"+contact.clientTag+"/workorders";
         const ordertag = orderString.replace(/[.,#$\[\]@ ]/g,'');
         const orderRef = firebase.database().ref(ordertag);
         const orderkey = orderRef.push().getKey();
         //console.log(ordertag);
         //console.log (orderkey);
         //console.log(orderRef);
         //"clientKey": String(contact.clientKey),
         //"clientTag": String(contact.clientTag)
         const newOrder = {
           "date": String(date),
           "work": String(work),
           "tag": String(orderkey),
           "orderKey": String(orderkey),
           "orderId": String(orderId),
           "clientKey": String(contact.clientKey),
           "clientTag": String(contact.clientTag),
           "isActive": String(isActive),
           "isRepeat": String(isRepeat),
           "repeatTimes": String(repeatTimes),
         }
         //console.log(newOrder);
         orderRef.child(orderkey).set(newOrder);
         this.setState ({
              date: '',
              work: '',
              orderId:'',
         });
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
    this.setState({ [event.target.name]: event.target.value });
  };


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
              //fieldChange: true,
          });
    } else {
      this.setState({
          isActive: true,
          //activeOrderChanged: true,
          //fieldChange: true,
        });
    }
  }


  handleRepeatChange = (e, { name, label, value, checked }) => {
      //console.log("radio name = " + name);
      //console.log("radio label = " + label);
      //console.log("radio value = " + value);
      //console.log("radio checked = " + checked);
      //console.log(e);

      let {isRepeat} = this.state;
      //database has a IsRepeat
      isRepeat = ( (isRepeat && isRepeat === "true") ||  // database has a isRepeat
                   (isRepeat && isRepeat === true) ) ? // isRepeat is true
                   true:false;

      //console.log("isRepeat = " + isRepeat);
      //console.log("repeatChanged = " + repeatChanged);

      if (isRepeat === true) {
            this.setState({
                isRepeat: false,
                //repeatChanged: true,
            });
      } else {
        this.setState({
            isRepeat: true,
            //repeatChanged: true,
          });
      }
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
    //const {clientname, french} = this.props;
    const {contact, french} = this.props;
    //const {order, contact, activeOrderId, activeOrderKey, orderKey} = this.props;
    //const {orderId, activeOrderChanged} = this.state;
    let {repeatTimes, isActive, isRepeat} = this.state;

    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );
    repeatTimes = repeatTimes? String(repeatTimes): "2";
    isActive = ( (isActive && isActive ==="true") ||
                 (isActive && isActive === true ) ) ?
                 true: false;

    isRepeat = ( (isRepeat && isRepeat ==="true") ||
                 (isRepeat && isRepeat=== true ) ) ?
                 true: false;

    let titleString = "Add New Order";
    if (contact) {
       titleString = contact.name + ":  " + "Add New Order";
    }

    let worklabel ="Work";
    if (french) {
       titleString = "ajouter nouveau order";
       if (contact) {
            titleString = contact.name + ":  " + "ajouter nouveau order";
       }
       worklabel = "Travail";
    }

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)}
                 style = {{position: "relative", float: "right", color:"white"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='folder outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>
        <DayPicker
             onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
             month={new Date()}
             selectedDays={[new Date(this.state.date)]}
        />
        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>

        <Form >
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label={worklabel}
                            placeholder='snow removal'
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Order ID'
                           placeholder = 'a0001187'
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
              onClick={() => {
                   this.handleOpen(false);
                   this.setState ({
                       date: '',
                       work: '',
                       orderId:'',
                   })}}
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
      clientContact = reposData["clients"]["data"][clienttag]?
             reposData["clients"]["data"][clienttag]["contact"]:{};
      //console.log(clientContact);
  }
  return {
     contact: clientContact,
     usertag: state.user.usertag,
     french: state.user.french,
   }
};

export default connect(
  mapStateToProps,
  {}
)(AddOrderModal);
