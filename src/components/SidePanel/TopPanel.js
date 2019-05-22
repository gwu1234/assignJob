import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setMapView, setEmployeeView, setTextView,
         setSelectedEmployee, setUnassignedClient,
         setFrench, setCompanyInfoView, setClientView,
         setClientContactView, setLeadView } from "../../actions";
import { Grid, Menu, Icon, Dropdown } from "semantic-ui-react";
import EmployeeJob from "./EmployeeJob";
import RepeatModal from "./RepeatModal";
import InputFileReader from "./InputFileReader";

class TopPanel extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        user: this.props.currentUser,
        //mapview: false,
        usersRef: firebase.database().ref("users"),
        french: false,
        //companyInfoView: true,
     }
   }

   dropdownCompanyOptions =() => {
     const {french} = this.state;
     const userOptions = french?
     [
       {
          key: "companyinfo",
          text: <span style ={styles.item} onClick={this.setCompanyInfo}> compagnie info </span>
       },
     ]:
     [
       {
          key: "textview",
          text: <span style ={styles.item} onClick={this.setCompanyInfo}> company info </span>
       },
     ];
     return userOptions;
   }

   dropdownTextOptions = () => {
      const {french} = this.state;
      const userOptions = french?
      [
        {
           key: "clientcontactview",
           text: <span style ={styles.item} onClick={this.setClientContactView}> cliente contact</span>
        },
        {
           key: "clientview",
           text: <span style ={styles.item} onClick={this.setClientView}> cliente travail order </span>
        },
        {
           key: "leadview",
           text: <span style ={styles.item} onClick={this.setLeadView}> leads </span>
        }
      ]:
      [
        {
           key: "clientcontactview",
           text: <span style ={styles.item} onClick={this.setClientContactView}> client contact  </span>
        },
        {
           key: "clientview",
           text: <span style ={styles.item} onClick={this.setClientView}> client work order </span>
        },
        {
           key: "leadsview",
           text: <span style ={styles.item} onClick={this.setLeadView}> leads </span>
        },
      ];
      return userOptions;
   }

   dropdownSettingOptions = () => {
      const {french, user} = this.state;
      const optionArray= [];

      if (!user) {
         return [];
      }

      const datareader= {
        key: "datareader",
        text: <InputFileReader usertag={this.props.usertag} french={french}/>
      }
      //optionArray.push(repeattimer);
      optionArray.push(datareader);
      return optionArray;
   }

   dropdownOptions = () => {
      const {french, user} = this.state;

      let username = "";
      if (user) {
         username = user.displayName;
      }

      let loginMsg = "Not Signed in";
      if (!french && user && username.length>0) {
         loginMsg = "Signed in as " + username;
      } else if (french && !user && username.length===0) {
         loginMsg = " Pas Signe in"
      } else if (french && user && username.length > 0) {
         loginMsg ="Signe in comme " + username;
      }

      const titleArray = [{
           key: "user",
           text: (
               <span>
                  <strong>{loginMsg}</strong>
              </span>
           ),
           disabled: true
       }];


      const signin = {
        key: "signout",
        text: <span onClick={()=>this.handleSignout()}>Sign In</span>
       };
      const signout = {
        key: "signout",
        text: <span onClick={()=>this.handleSignout()}>Sign Out</span>
       };
      if (!this.state.user) {
        titleArray.push(signin);
      } else {
        titleArray.push(signout);
      }
      return titleArray;
   }

   dropdownMapOptions = () => {
      let username = "";
      const {french} = this.state;
      if (this.state.user) {
         username = this.state.user.displayName;
      }
      if (!username) {
         return [];
      }

      const titleArray = french?
      [
        {
           key: "mapview",
           text: <span style ={styles.item} onClick={this.setMapView}> tous les clientes </span>
        },
        {
           key: "employeeview",
           text: <span style ={styles.item} onClick={this.setEmployeeView}> tous les employees </span>
        },
        {
           key: "unassignedview",
           text: <span style ={styles.item} onClick={this.setUnassignedView}> non assigne </span>
        }
      ]:
      [
        {
           key: "mapview",
           text: <span style ={styles.item} onClick={this.setMapView}> all clients </span>
        },
        {
           key: "employeeview",
           text: <span style ={styles.item} onClick={this.setEmployeeView}> all employees </span>
        },
        {
           key: "unassignedview",
           text: <span style ={styles.item} onClick={this.setUnassignedView}> not assigned </span>
        }
      ];

      const {employees} = this.props;
      for (var key in employees) {
         const newEmployee = {
           key: key,
           text: <EmployeeJob
                 displayAssigned={(employeeKey)=>this.displayAssigned(employeeKey)}
                 employee={employees[key]}
                 french={french}
                 />
         }
         titleArray.push(newEmployee);
      };

      return titleArray;
   }

   handleSignout = () => {
     firebase
       .auth()
       .signOut()
       .then(() => console.log("signed out!"));
   };

   setCompanyInfo = () => {
      this.props.setCompanyInfoView(true);
   }

   setMapView  = () => {
      this.props.setMapView();
   };

   setTextView  = () => {
       this.props.setTextView();
   };

   setClientView  = () => {
       this.props.setClientView (true);
   };

   setEmployeeView  = () => {
      this.props.setEmployeeView();
   };

   setUnassignedView =() => {
      this.props.setUnassignedClient();
 };

 setLeadView =() => {
    this.props.setLeadView();
 };

 displayAssigned(employee) {
   this.props.setSelectedEmployee(employee);
   //this.props.setCompanyInfoView(false);
 }

 setClientContactView  = () => {
    this.props.setClientContactView(true);
 };

 toggleFrench = () => {
    //console.log("toggleFrench");
    const {french} = this.state;
    this.setState ({
        french: !french
    });
    this.props.setFrench(!french);
 }


  render() {
    const { currentUser, admin} = this.props;
    const {french} = this.state;
    //console.log(currentUser);

    return (
      <Grid.Row columns='equal' style={{width:"100%",height:"8vh",color:"white",backgroundColor:"blue"}}>
          <Grid.Column style={{color:"white", textAlign: "center", paddingTop:"1px", fontSize:"1.2em"}}>
              <Icon name="truck" size="large" color="orange"
                   style={{position:"relative", float:"left"}}/>
                   <span> AssignJobs </span>
                     <Dropdown
                       placeholder=""
                       options={this.dropdownOptions()}
                       style = {{color: "white"}}
                     />
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> {french? "Compagnie":"Company"} </span>
             <Dropdown
               placeholder=""
               options={this.dropdownCompanyOptions()}
               style = {{color: "white"}}
             />
          </Grid.Column >
          <Grid.Column style={{textAlign: "center"}}>
             <span> {french? "Texte Vue" : "TextView" }</span>
             <Dropdown
               placeholder=""
               options={this.dropdownTextOptions()}
             />
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
               <span> {french? "Carte Vue": "MapView"} </span>
                 <Dropdown
                   placeholder=""
                   options={this.dropdownMapOptions()}
                   style = {{color: "white"}}
                 />
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
             <span onClick={()=>this.toggleFrench()}> {this.state.french? "Anglais": "French"} </span>
          </Grid.Column>
          <Grid.Column style={{textAlign: "center"}}>
             <span> {french? "Cadre": "Setting"}</span>
             <Dropdown
               placeholder=""
               options={this.dropdownSettingOptions()}
               style = {{color: "white"}}
             />
          </Grid.Column>
      </Grid.Row>


    );
  }
}

const styles = {
  item: {
    paddingTop: "1px",
    paddingBottom: "1px",
    marginTop: "0px",
    marginBottom: "0px",
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
  },
};

const mapStateToProps = state => ({
  employees: state.user.employeeList,
  currentUser: state.user.currentUser,
  //french: state.user.french,
  usertag: state.user.usertag,
});

export default connect(
  mapStateToProps,
  {setMapView, setEmployeeView, setTextView, setSelectedEmployee,
   setUnassignedClient, setCompanyInfoView, setFrench,
   setClientView, setClientContactView, setLeadView
 }
)(TopPanel);
