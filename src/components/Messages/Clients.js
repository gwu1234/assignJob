import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import Client from "./Client";
import AddClientModal from "./AddClientModal";
import { setGeoEncoding } from "../../actions";
import "./Clients.css";
const GEOCODING_DONE = 1;
const GEOCODING_RENEWED = 2;
const GEOCODING_PUSHED= 3;

class Clients extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
            clientsStyle: {
                visibility: 'hidden',
                height: "2px",
            },
           display: true,
           selectedClientKey:null,
           currentGeoEncoding: GEOCODING_DONE
       }
    }

   /*state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };*/

   componentDidMount() {
     const {clients, geoEncoding} = this.props;

     if (geoEncoding === GEOCODING_RENEWED) {
        this.updateClients(clients);
        this.props.setGeoEncoding(GEOCODING_DONE);
        this.setState ({
          currentGeoEncoding: GEOCODING_PUSHED
        })
     }
   }

   setSelectedClientKey = (key) =>{
     //console.log("selcted key = " + key);
     this.setState ({selectedClientKey: key}) ;
   }

   onButtonClick = (display) => {
       const {admin} = this.props;
       //let height = "";

       //if (admin) {
        //  height = "390px"
       //} else {
        //  height = "100vh";
       //}

       if (display){
           this.setState({
               clientsStyle: {
                   ...this.state.clientsStyle,
                   visibility: "hidden",
                   height: "2px",
               },
               display: false,
           })
       } else if (admin) {
           this.setState({
               clientsStyle: {
                 ...this.state.clientsStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "100vh",
             },
             display: true,
          })
        } else {
          this.setState({
              clientsStyle: {
                ...this.state.clientsStyle,
                visibility: "visible",
                paddingTop: "0.0em",
                position: "relative",
                color: "white",
                size: "tiny",
                border: "2px dotted black",
                overflow: "scroll",
                height: "100vh",
            },
            display: true,
         })
        }
   };

   displayClients = clients =>
      clients.length > 0 &&
      clients.map(client => (
          <Client key={client.clientKey} clientKey={client.clientKey}
          client={client.client} setSelectedClientKey={(key)=>this.setSelectedClientKey(key)}
          selectedClientKey={this.state.selectedClientKey}/>
     ));

  updateClients = clients => {
      const {usertag} = this.props;
      const clientsTag = "repos/" + usertag +"/clients/tags";
      //console.log("clientsTag = " + clientsTag);
      const clientsRef = firebase.database().ref(clientsTag)
      //console.log("clientTag = " + clientsTag);
      clientsRef.set(clients);;
  }

  render() {
    const {clients, currentUser, usertag, geoEncoding, french} = this.props;
    const {display, currentGeoEncoding} = this.state;
    //console.log("clients current User name = " );
    //console.log(currentUser.name);
    //console.log(currentUser);
    //console.log("clients usertag = " );
    //console.log(usertag);
    //display && clients && this.displayClients(clients)}

    let titleString = "Client List";
    if (french) {
        titleString = "client liste";
    }

    //converting nested objects to object array
    const clientArray =[];
    //const keyArray = [];
    for (var key in clients) {
       //console.log(clients[key]);
       //console.log(key);
       const newClient = {
         clientKey: key,
         client: clients[key]
       }
       //keyArray.push(key);
       clientArray.push(newClient);
    }

    //console.log(clientArray);
    /*for (var [key, value] of clients) {
          //console.log(key + ' === ' + value);
          //console.log(value);
          //console.log(key);
          //console.log(value);
          const newClient = {
            clientKey: key,
            client: value
          }
          //keyArray.push(key);
          clientArray.push(newClient);
    }*/

    // sort list by the lastname
    clientArray.sort((a, b) => {
      if (a.client && b.client) {
          return a.client.lastname.localeCompare(b.client.lastname);
      }
    });

    //if (geoEncoding == GEOCODING_RENEWED) {
    //   this.updateClients(clients);
       //const clientsTag = "repos/" + usertag +"/clients/tags";
       //console.log("clientsTag = " + clientsTag);
       //const clientsRef = firebase.database().ref(clientsTag)
     //console.log("geoEncofing  = " + geoEncoding);
     //console.log("currentGeoEncoding  = " + currentGeoEncoding);

     // need to be forced
     if ( geoEncoding === GEOCODING_RENEWED &&
          currentGeoEncoding !== GEOCODING_PUSHED ) {
          this.updateClients(clients);
          this.props.setGeoEncoding(GEOCODING_DONE);
          this.setState ({
              currentGeoEncoding: GEOCODING_DONE
        }) ;
     }

       //clientsRef.set(clients);
    //   this.props.setGeoEncoding(GEOCODING_DONE);
    //}

    //console.log(keyArray.length);
    let userName = "";
    if (currentUser) {
         userName = currentUser.name;
         if (!userName) {
           userName = currentUser.displayName;
         }
    }
    //if (!userName) {
    //  userName = currentUser.displayName;
    //}

    return (
      <Menu.Menu style={styles.container}>
            <Menu.Header style={styles.menuHeader}>
                {titleString}
                <AddClientModal open={false} userName={userName} usertag = {usertag}/>
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu} >
              {display && clientArray.length>0 && this.displayClients(clientArray)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "100%",
    background: "#92c2e8",
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

const mapStateToProps = state => {
  /*const reposData = state.user.reposData;
  //const usertag = state.user.usertag;
  let dataList = null;
  let contactList = {};

  if (reposData) {
      dataList = reposData["clients"]["data"];
      for (var key in dataList) {
         let contact = dataList[key]["contact"];
         contact = {...contact, tag: key, clientTag: dataList[key]["contact"]};
         console.log (contact) ;
         contactList = {...contactList, [key]: contact}
      }
  }*/
  return {
     clients: state.user.clientList,
     currentUser: state.user.currentUser,
     usertag: state.user.usertag,
     admin: state.user.admin,
     geoEncoding: state.user.geoEncoding,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {setGeoEncoding}
)(Clients);
