import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

export default class AddTruckModal extends Component {
  state = {
    modalOpen: false,
    model: '',
    year: '',
    color: '',
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
         const { model, year, color } = this.state;
         const {usertag} = this.props;

         if (!usertag) {
             window.alert("log in first");
             this.handleOpen(false);
         }
         const truckPath = "repos/" + usertag + "/trucks";
         const truckRef = firebase.database().ref(truckPath);
         const truckKey = truckRef.push().getKey();

         console.log(truckPath);

         const newTruck = {
           "model":  String(model),
           "year": String (year),
           "color": String(color),
           "truckKey": String(truckKey),
         }

         console.log(newTruck);
         truckRef.child(truckKey).set(newTruck);
         this.handleOpen(false);
    }
  };

  isFormValid() {
    const {model, year, color} = this.state;
    if (!model || model.length < 3 ){
       window.alert("model is required");
       return false;
    }

    if (!year || year.length < 3 ){
       window.alert("year required");
       return false;
    }

    if (!color || color.length < 3){
       window.alert("color is required");
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


    const titleString = "Add Truck";
    //console.log (titleString);
    //const { value } = this.state

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='truck' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Form >
           <Form.Group inline width='equal' >
               <Form.Input size ="small"
                           label='Model'
                           placeholder="Ford F150"
                           name="model"
                           onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Year'
                            placeholder='2017'
                            name="year"
                            onChange={this.handleChange} />
                <Form.Input size ="small"
                            label='Color'
                            placeholder='red'
                            name="color"
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
