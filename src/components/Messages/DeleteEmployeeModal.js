import React, { Component } from 'react';
//import firebase from "../../firebase";
import { Button, Header, Icon, Modal} from 'semantic-ui-react';

export default class DeleteEmployeeModal extends Component {
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
   this.props.deleteEmployee();
   this.handleOpen (false);
  };

  render() {
    const {truckAssigned, french} = this.props;
    const titleString = french? ("Effacer employé Record de  " + this.props.name + "?") :
                                ("Deleting Employee Record of  " + this.props.name + "?");

    let contentString = "Are you sure you want to delete this record ? ";
    if (truckAssigned) {
        contentString = "a truck is assigned. remove the assignment first ";
    }

    if (french) {
         contentString = "You Etes Sure de Effacer cette employé Record? ";
         if (truckAssigned) {
            contentString = "un camion est attribué.  effacer l'attribution d'abord";
         }
    }

    return (
      <Modal
        trigger={<Icon name='user delete' size ="big" onClick={() => this.handleOpen(true)} style ={{float:"left", color: "red"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='user delete' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"red"}}/>
        <Modal.Content style= {{color:"black", fontStyle:"bold", fontSize:"1.1em"}}>
             {contentString}
        </Modal.Content>
        <Modal.Actions>
        <Button color="green" size="small" inverted
              onClick={()=>this.handleClose()}
              >
              Cancel
        </Button>

        {!truckAssigned && <Button color='red' size="small" inverted
                onClick={() =>this.handleConfirmation()}
                >
                Submit
          </Button>}
        </Modal.Actions>
      </Modal>
    )
  }
}
