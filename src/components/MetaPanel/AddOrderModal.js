import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

export default class AddOrderModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: ''
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
         const {date,work} = this.state;
         const {usertag, clienttag,clientKey} = this.props;

         let orderString = "repos/"+usertag+"/clients/data/"+clienttag+"/workorders";
         const ordertag = orderString.replace(/[.,#$\[\]@ ]/g,'');
         const orderRef = firebase.database().ref(ordertag);
         const orderkey = orderRef.push().getKey();
         //console.log(ordertag);
         //console.log (orderkey);
         //console.log(orderRef);

         const newOrder = {
           "date": String(date),
           "work": String(work),
           "tag": String(orderkey),
           "clientKey": String(clientKey)
         }
         //console.log(newOrder);
         orderRef.child(orderkey).set(newOrder);
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

  render() {
    const {clientname, french} = this.props;
    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );

    let titleString = clientname + ":  " + "Add New Order";
    let worklabel ="Work";
    if (french) {
       titleString = clientname + ":  " + "ajouter nouveau order";
       worklabel = "Travail";
    }

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "left"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='folder outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label='Date'
                           placeholder='December 11, 2018'
                           name="date"
                           onChange={this.handleChange} />
                <Form.Input size ="mini"
                            label={worklabel}
                            placeholder='snow removal'
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
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
