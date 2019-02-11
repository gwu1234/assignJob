import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Button, Header, Icon, Modal, Form, Menu} from 'semantic-ui-react';
import {setRepeatHours} from "../../actions";
// 10 seconds
const TIMER_INTERVAL = 3;


class RepeatModal extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         repeathour: 5,
         //timerID: null
     }
  }

  /*componentDidMount() {
    let {timerID} = this.state;
    if (!timerID) {
        timerID = setInterval(
           () => this.tick(),
           TIMER_INTERVAL * 1000
       );
       this.setState ({timerID: timerID});
    }
  }

  componentWillUnmount() {
     const {timerID} = this.state;

     if (timerID) {
       clearInterval(timerID);
     }
     this.setState ({timerID: null});
  }*/

  /*tick=()=> {
    const date = new Date();
    // timestamp in second
    const timestamp = Math.round(date.getTime()/1000 + 0.5);
    //console.log (timestamp);
    this.props.setTimeStamp(timestamp);
  }*/

  handleOpen = (open) => this.setState({ modalOpen: open })
  handleClose =() => {
    this.setState({ modalOpen: false });
  }

  handleCancel =() => {
    this.setState({
       modalOpen: false,
    });
  }

  handleDelete = () => this.setState({ modalOpen: false })


  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
       //this.setState({ modalOpen: false })
       const {repeathour} = this.state;
       this.props.setRepeatHours(repeathour);
       this.handleClose();
    }
  };

  isFormValid() {
    const {repeathour} = this.state;
    if (!repeathour ){
       window.alert("repeat hours are required");
       return false;
    } else if (repeathour < 0) {
       window.alert("repeat hours must be larger than 0");
       return false;
    } else if (isNaN(repeathour)) {
       window.alert("repeat hours must be numerical");
       return false;
    } else {
       this.setState({repeathour: repeathour})
    }
    return true;
  }

  handleChange = event => {
      //console.log([event.target.name]);
      //console.log(event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
      });
  };


  render() {

    return (
      <Modal
        trigger={<Button icon size="large" color="grey" onClick={() => this.handleOpen(true)} style = {{position: "relative", float: "left"}}> Set Repeat Timer</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='mini'
        style={{background: "#ccc", paddingTop: "0em", paddingLeft:"3em", paddingRight:"2em", paddingBottom:"1em"}}
      >
        <Header icon='setting' content="Set Repeat Hours" style = {{fontSize: "1.2em", fondStyle: "bold", color:"black"}}/>


        <Modal.Content>
            <Form >
                <Form.Group inline width='equal' >
                     <Form.Input size ="small"
                           label='Repeat Hours'
                           placeholder = "5"
                           defaultValue = {this.state.repeathour}
                           name="repeathour"
                           onChange={this.handleChange} />
               </Form.Group>
            </Form>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "red"}}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                style ={{position:"relative", float:"right", color: "green"}}
                >
                Submit
          </Button>
         </Modal.Actions>
      </Modal>
    )
  }
}

//const mapStateToProps = state => ({
//     clients: state.user.clientList,
//   }
//);

export default connect(
  null,
  {setRepeatHours}
)(RepeatModal);
