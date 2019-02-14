import React, { Component } from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

export default class DeleteTruckModal extends Component {
  state = {
    modalOpen: false,
  }


  handleOpen = (open) => this.setState({ modalOpen: open })

  handleClose = () => {
    const event = this.nativeEvent;
    if (event) {
       event.preventDefault();
    }

   this.setState({ modalOpen: false });
   this.props.handleClose();
  }

  handleConfirmation = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }

   //this.handleOpen (false);
   this.props.deleteTruck();
   this.handleOpen (false);
  };

  render() {

    const titleString = "Deleting Truck Record for " + this.props.truckName + " ?";

    return (
      <Modal
        trigger={<Icon name='delete' size ="big" onClick={() => this.handleOpen(true)} style ={{float:"left", color: "red"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='user delete' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"red"}}/>
        <Modal.Content style= {{color:"red", fontStyle:"bold", fontSize:"1.1em"}}>
              Are you sure you want to delete this record ?
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={()=>this.handleClose()}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleConfirmation()}
                >
                Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
