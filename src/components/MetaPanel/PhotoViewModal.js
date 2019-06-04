import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
//import { setActiveOrderId, setActiveOrderKey} from "../../actions";
import { Button, Icon, Modal, Image} from 'semantic-ui-react';
import DeletePhotoModal from "./DeletePhotoModal"

class PhotoViewModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
        modalOpen: false
     }
}

componentDidMount() {
  //photoPath = {photoPath} photoName = {photoName}
  const {photoPath, thumbPath} = this.props;
  const storage = firebase.storage();
  const photoRef = storage.ref(photoPath);

photoRef.getDownloadURL().then((url) =>{
     const jpg = url.lastIndexOf(".jpg", url.length);
     const p2f = url.lastIndexOf("%2F", url.length) + 3;
     const subUrl = url.slice(p2f, jpg);

     //console.log(photoPath);
     //console.log(thumbPath);

     this.setState({photoTag: subUrl, photoUrl: url, photoPath: photoPath});

  }).catch(function(error) {
      console.log(error);
 });
}

componentWillUnMount() {
}

  handleOpen = (open) => this.setState({ modalOpen: open })

  handleClose =() => {
    this.setState({ modalOpen: false });
  }


  deletePhoto = () => {
      const { photoName, photoPath, thumbPath, usertag, clienttag,
              ordertag,  phototag } = this.props;

      //console.log("DeletePhoto")
      const event = this.nativeEvent;
      if (event) {
          event.preventDefault();
      }
      //console.log("at PhotoViewModal deletePhoto");
      //console.log(photoName);
      //console.log(photoPath);
      //console.log(thumbPath);
      const photoDataPath = "repos/" + usertag + "/clients/data/" + clienttag + "/workorders/" + ordertag + "/photo/" + phototag;
      //console.log(photoDataPath);
      // need to delete database as well
      const storage = firebase.storage();
      const photoStoreRef = storage.ref(photoPath);
      const thumbStoreRef = storage.ref(thumbPath);
      photoStoreRef.delete();
      thumbStoreRef.delete();

      const photoDataRef = firebase.database().ref(photoDataPath);
      photoDataRef.set(null);

      this.handleOpen(false);
  }

  render() {
    const {photoUrl, photoTag} = this.state;
    const {photoName, french} = this.props;

    return (
      <Modal
        trigger={<Image src={photoUrl}  key={photoTag} style={{height:"40px", width:"40px", margin:"5px"}} onClick={() => this.handleOpen(true)}/>}
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

           <DeletePhotoModal
              photoName ={photoName}
              french = {french}
              handleClose={()=>this.handleClose()}
              deletePhoto ={()=>this.deletePhoto()}
          />

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
