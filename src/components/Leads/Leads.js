import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setLeadTag} from "../../actions";
import { Menu, Icon} from "semantic-ui-react";
import Lead from "./Lead";
import AddLeadModal from "./AddLeadModal";

class Leads extends React.Component {
   constructor(props) {
       super(props);

       this.state = {
         selectedLeadKey: null,
         display: true,
       }
    }

   setSelectedLeadKey = (key) =>{
     //console.log("setSelectedLeadKey key =  " + key);
     this.setState ({selectedLeadKey: key}) ;
   }

   onButtonClick = (display) => {
       const {admin} = this.props;


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

   displayLeads = leads => (
      (leads.length>0) && leads.map(lead => (
              <Lead key={lead.Key} leadKey={lead.Key}
              lead={lead.lead} setSelectedLeadKey={(key)=>this.setSelectedLeadKey(key)}
              selectedLeadKey={this.state.selectedLeadKey}/>
      ))
  )


  render() {
    const {leads, currentUser, usertag, french} = this.props;
    const {display} = this.state;

    let titleString = "Lead List";
    if (french) {
        titleString = "Lead liste";
    }

    //converting nested objects to object array
    const leadArray =[];
    for (var key in leads) {
       //console.log(leads[key]);
       //console.log(key);
       const newLead = {
         Key: key,
         lead: leads[key]["contact"]
       }
       //console.log(newLead);
       leadArray.push(newLead);
    }


    let userName = "";
    if (currentUser) {
         userName = currentUser.name;
         if (!userName) {
           userName = currentUser.displayName;
         }
    }

    return (
      <Menu.Menu style={styles.container}>
            <Menu.Header style={styles.menuHeader}>
                {titleString}
                <AddLeadModal open={false} userName={userName} usertag = {usertag}/>
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu} >
              {display && leadArray.length>0 && this.displayLeads(leadArray)}
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
  return {
     leads: state.user.leads,
     currentUser: state.user.currentUser,
     usertag: state.user.usertag,
     admin: state.user.admin,
     geoEncoding: state.user.geoEncoding,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps, {setLeadTag}
)(Leads);
