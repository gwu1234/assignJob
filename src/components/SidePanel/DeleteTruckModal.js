import React, { Component } from 'react';
//import firebase from "../../firebase";
import { Button, Header, Icon, Modal} from 'semantic-ui-react';

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
    const {truckName, french, assignedEmployee} = this.props;
    let employeeName = null;

    if (assignedEmployee) {
       employeeName = assignedEmployee.name;
    }

    const titleString = french? "Effacer Camion Record pour " + truckName + " ?":
                        "Deleting Truck Record for " + truckName + " ?";
    const deleteString = french? "Vous etes sure de efface ce camion record ?":
                        "Are you sure you want to delete this record ?";

    const assignedString = french? ("camion attribué à " + employeeName + ", effacer l'attribution d'abord"):
                           ("truck assigned to " + employeeName + ", remove assignment first");

    let assigned = false;

    if (assignedEmployee) {
        assigned = true;
    }


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
        {!assigned && <Modal.Content style= {{color:"black", fontStyle:"bold", fontSize:"1.1em"}}>
              {deleteString}
        </Modal.Content>}
        {assigned && <Modal.Content style= {{color:"black", fontStyle:"bold", fontSize:"1.1em"}}>
              {assignedString}
        </Modal.Content>}
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={()=>this.handleClose()}
              >
              Cancel
        </Button>

        {!assigned && <Button color='green' size="small" inverted
                onClick={() =>this.handleConfirmation()}
                >
                Submit
          </Button>}
        </Modal.Actions>
      </Modal>
    )
  }
}
