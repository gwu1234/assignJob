import React, { Component } from 'react';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

export default class RepeatModal extends Component {
  state = {
    modalOpen: false,
  }

  handleOpen = (open) => this.setState({ modalOpen: open });

  handleClose = () => this.handleOpen(false);

  /*handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       event.preventDefault();
    }
  };*/

  render() {
    const {clientname, workToRepeat} = this.props;
    const titleString = clientname + " :  " + "Repeat Work  ?";

    return (
      <Modal
        trigger={<Button icon size="mini" color="teal" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "left"}}> <Icon name='repeat' size ="large"/> Repeat </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='mini'
        style={{background: "#ccc"}}
      >
        <Header icon='repeat' content={titleString} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content style = {{color:"white", background: 'teal', fontStyle:"bold", fontSize:"1.1em"}}>
             <span >click green check to conform, &nbsp; &nbsp; or red cross to cancel</span>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="large"
              onClick={() => this.handleOpen(false)}
              >
              <Icon name='cancel' color ="brown" size ="large"/>
              Cancel
        </Button>

          <Button color='teal' size="large"
                onClick={() => {workToRepeat(); this.handleClose()}}
                >
                <Icon name='check' color ="brown" size ="large"/>
                Confirm
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
