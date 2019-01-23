import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class BasicModal extends Component {
  state = {
    modalOpen: false
  }

  handleOpen = (open) => this.setState({ modalOpen: open })

  render() {
    return (
      <Modal
        trigger={<Button icon size="mini" onClick={() => this.handleOpen(true)}> <Icon name='plus circle' size ="small"/> </Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='mini'
      >
        <Header icon='add user' content='add new client' />
        <Modal.Content>
          <h4>new client for company</h4>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' size="mini" onClick={() => this.handleOpen(false)} inverted> OK
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
