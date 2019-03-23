import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class AddOrderModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: '',
    orderId:'',
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
         const {date,work, orderId} = this.state;
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

  render() {
    //const {clientname, french} = this.props;
    const {contact, french} = this.props;
    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );

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
const mapStateToProps = state => ({
     contact: state.user.clientContact,
     usertag: state.user.usertag,
     french: state.user.french,
   }
);

export default connect(
  mapStateToProps,
  {}
)(AddOrderModal);
