import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setMapView, setEmployeeView, setTextView,
         setSelectedEmployee, setUnassignedClient,
         setFrench, setCompanyInfoView, setClientView} from "../../actions";
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
          text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setCompanyInfo}> compagnie info </span>
       },
     ]:
     [
       {
          key: "textview",
          text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setCompanyInfo}> company info </span>
       },
     ];
     return userOptions;
   }

   dropdownTextOptions = () => {
      const {french} = this.state;
      const userOptions = french?
      [
        {
           key: "clientview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setClientView}> cliente travail order </span>
        },
      ]:
      [
        {
           key: "textview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setClientView}> client work order </span>
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

      const repeattimer= {
        key: "repeathour",
        text: <RepeatModal french={french}/>
      }
      const datareader= {
        key: "datareader",
        text: <InputFileReader usertag={this.props.usertag} french={french}/>
      }
      optionArray.push(repeattimer);
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
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setMapView}> tous les clientes </span>
        },
        {
           key: "employeeview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setEmployeeView}> tous les employees </span>
        },
        {
           key: "unassignedview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setUnassignedView}> non assigne </span>
        }
      ]:
      [
        {
           key: "mapview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setMapView}> all clients </span>
        },
        {
           key: "employeeview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setEmployeeView}> all employees </span>
        },
        {
           key: "unassignedview",
           text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setUnassignedView}> not assigned </span>
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
      //this.setState ({
      //    companyInfoView: true
      //});
      this.props.setTextView();
      this.props.setCompanyInfoView(true);
   }

   // display all clients
   setMapView  = () => {
    //  this.setState ({
    //      mapview: true,
    //      companyInfoView: false,
    //  });
      this.props.setMapView();
      this.props.setCompanyInfoView(false);
      //console.log("setMapView")
   };

   setTextView  = () => {
     //console.log("setTextView")
    //   this.setState ({
    //         mapview: false
    //   });
       this.props.setTextView();
       this.props.setCompanyInfoView(false);
   };

   setClientView  = () => {
     //console.log("setTextView")
    //   this.setState ({
    //         mapview: false
    //   });
       //this.props.setTextView();
       //this.props.setCompanyInfoView(false);
       this.props.setClientView (true);
   };

   // display all employees
   setEmployeeView  = () => {
     //console.log("setEmployeeView")
    //  this.setState ({
    //      mapview: true,
    //      companyInfoView: false,
    //  });
      this.props.setEmployeeView();
      this.props.setCompanyInfoView(false);
   };

   setUnassignedView =() => {
     //console.log("setUnassignedView")
    //   this.setState ({
      //    mapview: true,
      //    companyInfoView: false,
      // });
      this.props.setUnassignedClient();
      this.props.setCompanyInfoView(false);
 };

 displayAssigned(employee) {
   //this.setState ({
    //   mapview: true,
    //   companyInfoView: false,
   //});
   //console.log("displayAssigned")
   this.props.setSelectedEmployee(employee);
   this.props.setCompanyInfoView(false);
 }

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
               style = {{color: "white"}}
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
   setClientView
 }
)(TopPanel);
