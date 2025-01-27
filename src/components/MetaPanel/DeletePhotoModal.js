import React, { Component } from 'react';
//import firebase from "../../firebase";
import { Button, Header, Icon, Modal} from 'semantic-ui-react';

export default class DeletePhotoModal extends Component {
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
   this.props.deletePhoto();
   this.handleOpen (false);
  };

  render() {
    const {photoName, french} = this.props;

    const titleString = french? "Effacer Photo de " + photoName + " ?":
                        "Deleting  Photo of " + photoName + " ?";
    const deleteString = french? "Vous etes sure de efface ce photo ?":
                        "Are you sure you want to delete this photo ?";

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
        <Modal.Content style= {{color:"black", fontStyle:"bold", fontSize:"1.1em"}}>
              {deleteString}
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
