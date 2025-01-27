import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setCurrentUser, setUserTag, setReposData}
       from "../../actions";
import { Menu, Icon } from "semantic-ui-react";
import "./UserList.css";

class UserList extends React.Component {
  state = {
    user: this.props.currentUser,
    activeUser: "", // it is a user tag only
    users: [],      // user object
    userName: "",
    userDetails: "",
    usersRef: firebase.database().ref("users"),
    modal: false,
    firstLoad: true,
    userContact: null,
  };

  componentDidMount() {
    this.addListeners();
  }

  componentWillUnmount() {
    this.removeListeners();
  }

  addListeners = () => {
    let loadedUsers = [];
    this.state.usersRef.on("child_added", snap => {
      loadedUsers.push(snap.val());
      this.setState({ users: loadedUsers }, () => this.setFirstUser());
    });
  };

  removeListeners = () => {
    this.state.usersRef.off();
  };

  setFirstUser = () => {
    const firstUser = this.state.users[0];
    if (this.state.firstLoad && this.state.users.length > 0) {
      this.props.setCurrentUser(firstUser);
      this.setActiveUser(firstUser);
    }
    this.setState({ firstLoad: false });
  };

  changeUser = user => {
    //console.log(user);
    this.setActiveUser(user);
    this.props.setCurrentUser(user);
    this.props.setUserTag(user.tag);
    this.findUserContact(user.tag);
  };

  findUserContact = (tag) => {
     const {userContact} = this.state;

     const reposTag = "repos/" + tag;
     console.log(reposTag);
     const reposRef = firebase.database().ref(reposTag)

     reposRef.on('value', snapshot => {
           const reposData = snapshot.val();
           //console.log("clients Data arrived ");

           if (reposData["clients"] && reposData["contact"]) {
             //const firstname = clientsData["jamiebulger+25rueviney+h9j2t2"]["contact"]["firstname"];
             //console.log(firstname);
             //const total = clientsData["jamiebulger+25rueviney+h9j2t2"]["contracts"]["0"]["total"];
             //console.log(total);
             this.props.setReposData(reposData);
           }
     });

     //console.log("usertag =" + tag);
     /*const contactRef = firebase.database().ref
          ("repos/" + tag +"/contact");
     //console.log("userContact = ");
     //console.log(userContact);
     //contactRef.on('value', snapshot => {
     contactRef.on('value', snapshot => {
        //.then((snapshot) => {
           const contact = snapshot.val();
           //console.log(contact);

           if (contact) {
              if ( userContact && userContact.postcode != contact.postcode &&
                         userContact.street   != contact.street)
              {
                 this.props.setUserContact(contact);
                 this.setState (
                   {userContact: contact}
                 );
              }
              else if ( !userContact )
              {
                 this.props.setUserContact(contact);
                 this.setState (
                   {userContact: contact}
                 );
              }
          } else if (userContact != null) {
              this.props.setUserContact(null);
              this.setState (
                {userContact: null}
              );
          }
      }) */

      /*const employeeTag = "repos/" + tag +"/employees";
      //console.log(employeeTag);
      const employeeRef = firebase.database().ref(employeeTag)

       employeeRef.on('value', snapshot => {
            const employees = snapshot.val();
            //console.log(employees)
            if (employees) {
                this.props.setEmployeeList(employees);
           } else {
               this.props.setEmployeeList(null);
           }
      });*/

      /*const clientsTag = "repos/" + tag +"/clients/tags";
      //console.log("clientsTag = " + clientsTag);
      const clientsRef = firebase.database().ref(clientsTag)

       clientsRef.on('value', snapshot => {
            const clients= snapshot.val();
            //console.log("user list Clients = ");
            //console.log(clients)
            if (clients) {
                this.props.setClientList(clients);
           } else {
               this.props.setClientList(null);
           }
      });*/

      //const trucksTag = "repos/" + tag +"/trucks";
      //console.log("clientsTag = " + clientsTag);
      //const trucksRef = firebase.database().ref(trucksTag)

       /*trucksRef.on('value', snapshot => {
            const trucks= snapshot.val();
            //console.log("user list Clients = ");
            //console.log(clients)
            if (trucks) {
                this.props.setTrucks(trucks);
           } else {
               this.props.setTrucks(null);
           }
      });*/
  };

  setActiveUser = user => {
    this.setState({ activeUser: user.tag });
  };

  displayUsers = users =>
    users.length > 0 &&
    users.map(user => (
      <Menu.Item
        key={user.tag}
        onClick={() => this.changeUser(user)}
        name = {user.name}
        style={user.tag===this.state.activeUser ? {
            opacity: "1.0",
            fontSize: "0.9em",
            color: "black",
            fontWeight: "bold",
            backgroundColor: "rgba(0,250,0,0.1)",
        } :
        {
            opacity: "1.0",
            fontSize: "0.9em",
            color: "black",
            fontWeight: "normal",
        }
      }
      >
        {user.name}
      </Menu.Item>
    ));

  render() {
    const { users} = this.state;
    const {french} = this.props;
    //this.findUserContact();

    let titleString = "Company List";
    if (french) {
       titleString = "compagne liste";
    }
    return (
        <Menu.Menu style={styles.container} >
           <Menu.Header style={styles.menuHeader}>
              <span> {titleString} </span>
           </Menu.Header>
           <Menu.Menu style={styles.menuMenu}>
           {this.displayUsers(users)}
           </Menu.Menu>
        </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    background: "#f2f4f7",
  },
  menuHeader: {
    paddingTop:"8px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "7%",
  },
  menuMenu: {
    position: "relative",
    overflow: "scroll",
    height: "93%",
  },
};

const mapStateToProps = state => ({
   french: state.user.french,
});

export default connect(
  mapStateToProps,
  { setCurrentUser, setUserTag, setReposData}
)(UserList);
