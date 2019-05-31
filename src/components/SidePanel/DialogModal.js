import React from "react";
import { Icon, Modal, Button } from "semantic-ui-react";

class DialogModal extends React.Component {
  state = {
    modal: true
  };

  closeModal = () => {
      this.setState({ modal: false });
      this.props.history.push("/login");
  }

  render() {
    const { modal } = this.state;
    //console.log ("modal = " + modal);

    return (
      <Modal size="tiny"  open={modal} onClose={this.closeModal}>
          <Modal.Header>Succesful Registration</Modal.Header>
          <Modal.Content>
             you can login into the system in 3 minutes
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.closeModal}>
              <Icon name="checkmark" /> Continue
            </Button>
          </Modal.Actions>
        </Modal>
    );
  }
}

export default DialogModal;
