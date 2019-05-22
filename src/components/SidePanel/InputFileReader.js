import React from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Menu, Confirm} from 'semantic-ui-react';

export default class InputFileReader extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
           data: null,
           modalOpen:false,
           open:false,
       };
       //this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleOpen = (open) => this.setState({ modalOpen: open })
    handleClose =() => {
      this.setState({
        modalOpen: false,
        date:null,
       });
    }

    closeConfirm =(jsonObject) => {
      //console.log(jsonObject);
      const {usertag} = this.props;

      const path = "repos/" + usertag ;
      //console.log(path);
      const dataRef = firebase.database().ref(path);
      dataRef.set(jsonObject);

      this.setState({
        modalOpen: false,
        date:null,
        open: false,
       });
    }

    onButtonClick = () =>{
      this.setState({
        open: true,
       });
    }

    handleCancel =() => {
      this.setState({
         modalOpen: false,
         data: null,
         open:false,
      });
    }

    handleSubmit = () => {
      const event = this.nativeEvent;
      if (event) {
         //console.log(event);
         event.preventDefault();
      }
      //event.preventDefault();
      if (this.isFormValid()) {
         //this.setState({ modalOpen: false })
         //const {repeathour} = this.state;
         //this.props.setRepeatHours(repeathour);
         this.handleClose();
      }
    };

    displayData = (content) => {
       this.setState({data: content});
    }

    handleFileSelect = (evt) => {
         let files = evt.target.files;
         if (!files.length) {
             alert('No file select');
             return;
         }
         let file = files[0];
         let that = this;
         let reader = new FileReader();
         reader.onload = function(e) {
             that.displayData(e.target.result);
         };
         reader.readAsText(file);
    }
    //<div>
    //    <span style ={{fontStyle: "bold", margin:"0em", color:"white", fontSize:"1em"}}> input json data </span>
    //    <input type="file" onChange={this.handleFileSelect} style={{position:"relative", float:"left"}}/>
    //</div>

render() {
    const data = this.state.data;
    const {french} = this.props;
    //console.log (data);

    var myObject = null;
    let parsed = false;
    if (data) {
        try {
           myObject = JSON.parse(data);
           parsed = true;
           //console.log (myObject);
        }
        catch (e) {
            //alert("json data error");
            myObject = null;
            parsed = true;
        }
   }

   //let myStr = null;
   //if (myObject) {
    //   const myStr = JSON.stringify(myObject, null, '   ');
   //}

   const conformMsg = "Do you really want to overwrite client database ?";

    return (
      <Modal
        trigger={<span onClick={() => this.handleOpen(true)} style = {styles.item}>
        {french? "importer cliente donnees":"import client data"}</span>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='setting' content={french? "Importer Cliente Donnees de Json Dossier": "Import Client Data from Json File"} style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>


        <Modal.Content>
          <input type="file" onChange={this.handleFileSelect} />
          {data && <Menu.Menu style={{width:"%100", height:"350px",color: "black",
                         border: "2px dotted brown", overflow:"scroll"}} >

              {data}
          </Menu.Menu>}
          {parsed && myObject && <Menu.Menu style={{width:"%100",color: "black",
                         border: "2px dotted brown", overflow:"scroll", fontSize:"1.3em", paddingTop:"0.3em"}} >
              <Icon name='check' size ="large" color="green" onClick={() => this.onButtonClick()} style ={{position: "relative", float: "right" }}/>
              <span style ={{position: "relative", left: "0px" }}> json data is valid. click CHECK to continue </span>
              <Confirm open={this.state.open} style={{color:"black", fontSize:"1.2em", fontStyle:"bold"}}
                     content={conformMsg } onCancel={()=>this.handleCancel()}
                     onConfirm={()=>this.closeConfirm(myObject)} />
          </Menu.Menu>}
          {parsed && !myObject && <Menu.Menu style={{width:"%100",color: "red", fontSize:"1.3em",
                         border: "2px dotted brown", paddingTop:"0.3em"}} >
              <span style ={{position: "relative", left: "0px" }}> json data is not correctly formatted</span>

          </Menu.Menu>}
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "red"}}
              >
              Cancel
        </Button>
         </Modal.Actions>
      </Modal>
  );
 }
}
const styles = {
  item: {
    padding: "1px",
    margin: "1px",
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
  },
}
