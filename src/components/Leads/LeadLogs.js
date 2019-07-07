import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon } from "semantic-ui-react";
import LeadLog from "./LeadLog";
import AddLogModal from "./AddLogModal";


class LeadLogs extends React.Component {

   state = {
     ordersStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   onButtonClick = (display) => {
       if (display){
           this.setState({
               ordersStyle: {
                   ...this.state.clientsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               ordersStyle: {
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
        }
   };


   displayLogs = logs =>
      logs.length > 0 &&
      logs.map(log => (
          <LeadLog logKey={log.logKey} key={log.logKey}
                   log={log.log} usertag={this.props.usertag}
                   leadTag = {this.props.leadTag}
                   />
     ));



  render() {
    const {logs, french, leadTag, usertag, userName} = this.props;
    const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}
    let titleString = "Activity Logs";
    if (french) {
       titleString = "Activité Logs";
    }

    const logArray =[];
    for (var key in logs) {
       const newLog = {
         logKey: key,
         log: logs[key]
       }
       logArray.push(newLog);
    }

    logArray.sort((a, b) => {
      if (a.log && b.log) {
          return (b.log.timestamp - a.log.timestamp);
      }
    });

    return (
      <Menu.Menu style={styles.container}>
            <Menu.Header style={styles.menuHeader}>
             {titleString}
            <AddLogModal open={false} userName={userName} usertag = {usertag} leadTag={leadTag} french = {french}/>
            </Menu.Header>
            <Menu.Menu style={styles.menuMenu} >
              {logs && this.displayLogs(logArray)}
            </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "64.5%",
    background: "#f2f4f7",
    marginBottom:"2px",
    marginTop:"4px",
  },
  menuHeader: {
    paddingTop:"10px",
    paddingBottom: "10px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "10%",
  },
  menuMenu: {
    paddingTop:"2px",
    paddingBottom: "2px",
    position: "relative",
    overflow: "scroll",
    height: "90%",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const leadTag = state.user.leadTag;
  let logs = {};
  //console.log(clienttag);
  if (leadTag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      logs = reposData["leads"][leadTag]?
             (reposData["leads"][leadTag]["leadlogs"]?reposData["leads"][leadTag]["leadlogs"]:{})
             : {};
      //console.log(clientContact);
  }
  return {
     logs: logs,
     french: state.user.french,
     usertag:state.user.usertag,
     leadTag: leadTag,
     userName: state.user.currentUser.displayName,
   }
};

export default connect(
  mapStateToProps,
  {}
)(LeadLogs);
