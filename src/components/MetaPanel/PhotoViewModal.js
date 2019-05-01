import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setActiveOrderId, setActiveOrderKey} from "../../actions";
import { Button, Icon, Modal, Image} from 'semantic-ui-react';


class PhotoViewModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen: false
     }
}

componentDidMount() {
  //photoPath = {photoPath} photoName = {photoName}
  const {photoPath} = this.props;
const storage = firebase.storage();
const photoRef = storage.ref(photoPath);

photoRef.getDownloadURL().then((url) =>{
     const jpg = url.lastIndexOf(".jpg", url.length);
     const p2f = url.lastIndexOf("%2F", url.length) + 3;
     const subUrl = url.slice(p2f, jpg);

     this.setState({photoTag: subUrl, photoUrl: url, photoPath: photoPath});

  }).catch(function(error) {
      console.log(error);
 });
}

componentWillUnMount() {
}

  handleOpen = (open) => this.setState({ modalOpen: open })



  render() {
    const {photoUrl, photoTag} = this.state;


    return (
      <Modal
        trigger={<Image src={photoUrl}  key={photoTag} style={{height:"40px", width:"40px"}} onClick={() => this.handleOpen(true)}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc", height:"600px", width:"500px"}}
      >
        <Modal.Content>
            <Image src={photoUrl} size='huge' style ={{height:"500px", width:"500px"}}/>
        </Modal.Content>
        <Modal.Actions>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleOpen(false)}
                >
                Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default PhotoViewModal;
