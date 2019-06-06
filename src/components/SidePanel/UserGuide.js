import React from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Menu, Confirm} from 'semantic-ui-react';

const usercases = [
{
title: <h4> Case 1:  toggle French and English</h4>,
content:  <p> Steps:
          1) click French or Anglais to toggle French and English </p>
},
{
title : <h4> Case 2:  View Company Contact Info </h4>,
content:  <p> Steps:
          1) click Company, then Company Info
          2) the left column display Company Contact Info </p>
},
{
title: <h4> Case 4:  Edit  Company Contact Info </h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the left column display Company Contact Info
          3) click the button next to Edit Company Info
          4) a Popup window should show up
          5) edit the info
          6 click Submit to update, and Cancel to cancel </p>
},
{
title: <h4>Case 5:  View Employee List </h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the middle column display employee List </p>
},
{
title: <h4>Case 6:  View Employee Contact Info</h4>,
content:  <p>   Steps:
          1) click Company, then Company Info
          2) the middle column display employee List
          3) click the name of employee
          4) the section will be expanded to display contact info of that employee </p>
},
{
title: <h4>Case 7:  Edit Employee Info </h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the middle column display employee List
          3) click the button to the right of employee name
          4) a Popup window will show up
          5) update employee info </p>
},
{
title: <h4>Case 8:  Delete Employee Record </h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the middle column display employee List
          3) click the button to the right of employee name
          4) the edit popup window will show up
          5) click the red button on the left side of the bottom to delete
          6) you need to remove all the truck and clients assigned to this employee before deleting </p>
},
{
title: <h4> Case 9:  Edit Truck Record</h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the right column display truck List
          3) click the button to the right of truck name
          4) the edit popup window will show up
          5) edit info to update </p>
},
{
title: <h4> Case 10:  Edit Truck Record </h4>,
content: <p>     Steps:
          1) click Company, then Company Info
          2) the right column display truck List
          3) click the button to the right of truck name
          4) the edit popup window will show up
          5) edit info to update </p>
},
{
title: <h4>Case 11:  Assign a truck to un employee </h4>,
content: <p>      Steps:
          1) click Company, then Company Info
          2) the right column display truck List
          3) click the button to the right of truck name
          4) the edit popup window will show up
          5) click + sign to the right of employee name to assign </p>
},
{
title: <h4> Case 12:  Remove assignment of  a truck from an  employee </h4>,
content: <p>      Steps:
          1) click Company, then Company Info
          2) the right column display truck List
          3) click the button to the right of truck name
          4) the edit popup window will show up
          5) click - sign to the right of employee name to remove assignment </p>
},
{title:<h4>
Case 13:  delete a truck record </h4>,
content: <p>      Steps:
          1) click Company, then Company Info
          2) the right column display truck List
          3) click the button to the right of truck name
          4) the edit popup window will show up
          5) click red X sign on the left side of bottom to delete record
          6) follow the prompts of confirmation dialog window
</p>},
{title:<h4>
Case 14: find where a truck is </h4>,
content: <p>      Steps:
          1) click MapView, then All Clients
          2) truck icon mark the truck locations
          3) trucks in colours are active: their GPS location updated within last 5 minutes
          4) black trucks are “not active”: their GPS location not updated for the last 5 minutes
</p>},
{title:<h4>
Case 15: find who is driving a truck </h4>,
content: <p>      Steps:
          1) click MapView, then All Clients
          2) truck icon mark the truck locations
          3) click on a truck icon
          4) a popup window will show up, displaying details such as employee name etc
</p>},
{title:<h4>
Case 16: find the last time a truck updates its GPS location </h4>,
content: <p>       Steps:
          1) click MapView, then All Clients
          2) truck icon mark the truck locations
          3) click on a truck icon
          4) a popup window will show up, displaying a time string when GPS was last updated
</p>},
{title:<h4>
Case 17:  Display Client Contact Info </h4>,
content: <p>      Steps:
          1) TextView
          2) select Client Contact
          3) select a client on the Left Column
          4) the right Column should display client contact information
</p>},
{title:<h4>
Case 18:  Edit Client Contact Info </h4>,
content: <p>      Steps:
          1) TextView
          2) select Client Contact
          3) select a client on the Left Column
          4) the right Column should display client contact information
          5) click a  button to the right of Edit Client Contact at the bottom of the right column
          6) a Popup window shows up
          7) edit the fields
          8) Click Submit to update, Cancel to cancel the changes
</p>},
{title:<h4>
Case 19:  Display Client history </h4>,
content: <p>      Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          4) all work orders, contracts, invoices, payments and deliveries show up
          5) highlighted backgrounds indicate active worker orders and associated contracts, etc.
</p>},
{title:<h4>
 Case 20: Work Order Characters </h4>,
content: <p> 	Status:
		JOB_NEW
		JOB_PROGRESS
		JOB_DONE

            Repeat Orders or not:
	            isRepeatable: true or false
		repeatTimes:
                        repeat times if it is a repeat order
		meaningless if it is not a repeat order

            Delivery Times:
                        Deliveries made for this work order
</p>},
{title:<h4>
Case 21: View Client’s Work Order List </h4>,
content: <p>  Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          4) vertically scroll in the window of Work Orders
</p>},
{title:<h4>
Case 22: View photos associated with work orders </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) horizontally scroll thumbnails of photos
          6) click one of of thumbnail, a large image will show up
</p>},
{title:<h4>
Case 23: edit work orders </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) click the button in the top right in the work order window
          6) a popup window will show up to edit
</p>},
{title:<h4>
Case 24: assign work order to employee </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) click the edit button in the top right
          6) a popup window will show up to edit
          7) select an employee name to assign
</p>},
{title:<h4>
Case 25: remove assignment of a work order from employee </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) click the edit button in the top right of work order window
          6) a popup window will show up to edit
          7) select REMOVE ASSIGNMENT
</p>},
{title:<h4>
Case 26: view photo attached to a work order </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) click on a thumbnail in work order window
          6) a popup window will show up to display a large image
</p>},
{title:<h4>
Case 27: delete a photo from a work order </h4>,
content: <p> Steps:
          1) TextView
          2) select Client Work Order
          3) Left Column is list of clients
          4) click on a client name
          5) click on a thumbnail in work order window
          6) a popup window will show up to display a large image
          7) click on red button on the left side of the bottom
          8) a read warming dialog will popup, click submit
</p>}
];


export default class UserGuide extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
           data: null,
           modalOpen:false,
           open:false,
       };
    }

    handleOpen = (open) => this.setState({ modalOpen: open })
    handleClose =() => {
      this.setState({
        modalOpen: false,
        date:null,
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




render() {
    const {french} = this.props;


   const conformMsg = "Do you really want to overwrite client database ?";

    return (
      <Modal
        trigger={<span onClick={() => this.handleOpen(true)} style = {styles.item}>
        {french? "User Guide":"User Guide"}</span>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc"}}
      >
        <Header content={french? "User Guide": "User Guide"} style = {{fontSize: "1.1em", fontWeight: "bold", color:"black"}}/>

        <Modal.Content style = {styles.menu}>
           {usercases.map(usercase => (
              <Menu.Item style = {{...styles.item, marginTop:"1.0em"}}>
                 {usercase.title}
                 {usercase.content}
              </Menu.Item>
           ))}
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "black"}}
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
  menu: {
    overflow: "scroll",
  }
}
