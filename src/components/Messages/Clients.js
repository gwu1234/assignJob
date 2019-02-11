import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon, Button} from "semantic-ui-react";
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
           display: false,
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

     if (geoEncoding == GEOCODING_RENEWED) {
        this.updateClients(clients);
        this.props.setGeoEncoding(GEOCODING_DONE);
        this.setState ({
          currentGeoEncoding: GEOCODING_PUSHED
        })
     }
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
                 height: "390px",
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
          <Client key={client.clientKey} clientKey={client.clientKey} client={client.client} />
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
    const {clients, currentUser, usertag, geoEncoding} = this.props;
    const {display, currentGeoEncoding} = this.state;
    //console.log("clients current User name = " );
    //console.log(currentUser.name);
    //console.log(currentUser);
    //console.log("clients usertag = " );
    //console.log(usertag);
    //display && clients && this.displayClients(clients)}

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

    //if (geoEncoding == GEOCODING_RENEWED) {
    //   this.updateClients(clients);
       //const clientsTag = "repos/" + usertag +"/clients/tags";
       //console.log("clientsTag = " + clientsTag);
       //const clientsRef = firebase.database().ref(clientsTag)
     //console.log("geoEncofing  = " + geoEncoding);
     //console.log("currentGeoEncoding  = " + currentGeoEncoding);

     // need to be forced
     if ( geoEncoding == GEOCODING_RENEWED &&
          currentGeoEncoding != GEOCODING_PUSHED ) {
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
      <Menu.Menu className ="ClientsMenuMenu">
            <Menu.Header as="h5" style={{textAlign:"center", top:"0em", paddingTop:'0em'}}>
                <Icon name='eye' size ="big" onClick={() => this.onButtonClick(display)}/> &nbsp; Client &nbsp; List &nbsp; &nbsp;
                <AddClientModal open={false} userName={userName} usertag = {usertag}/>
            </Menu.Header>
          <Menu.Menu style={this.state.clientsStyle} >
              {display && clientArray.length>0 && this.displayClients(clientArray)}
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
     clients: state.user.clientList,
     currentUser: state.user.currentUser,
     usertag: state.user.usertag,
     admin: state.user.admin,
     geoEncoding: state.user.geoEncoding
   }
);

export default connect(
  mapStateToProps,
  {setGeoEncoding}
)(Clients);
