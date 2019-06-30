import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setMapView, setEmployeeView, setTextView,
         setSelectedEmployee, setUnassignedClient,
         setFrench, setCompanyInfoView, setClientView,
         setClientContactView, setLeadView, setLeadMapView,
         setAssignedEmployeeView } from "../../actions";
import { Grid, Menu, Icon, Dropdown } from "semantic-ui-react";
import EmployeeJob from "./EmployeeJob";
import RepeatModal from "./RepeatModal";
import InputFileReader from "./InputFileReader";
import UserGuide from "./UserGuide";

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
     const userOptions =
     [
       {
          key: "companyinfo",
          text: <span style ={styles.item} onClick={this.setCompanyInfo}> {french? "compagnie info":"company info" }</span>
       },
       {
          key: "assignedinfo",
          text: <span style ={styles.item} onClick={this.setAssignedEmployeeView}> {french? "employe travail order":"employee work order" }</span>
       },
     ];
     return userOptions;
   }

   dropdownTextOptions2 = () => {
      const {french} = this.state;
      const userOptions =
      [
        {
           key: "clientcontactview",
           text: <span style ={styles.item} onClick={this.setClientContactView}> {french? "cliente contact":"client contact"}</span>
        },
        {
           key: "clientview",
           text: <span style ={styles.item} onClick={this.setClientView}> {french? "cliente travail order":"client work order"}</span>
        },
        {
           key: "leadview",
           text: <span style ={styles.item} onClick={this.setLeadView}> {french? "leads":"leads"}</span>
        }
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
      };
      optionArray.push(datareader);

      const userguide= {
        key: "userguide",
        text: <UserGuide usertag={this.props.usertag} french={french}/>
      };
      optionArray.push(userguide);

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

  dropdownMapOptions2 = () => {
    const {french} = this.state;
    return (
      <Dropdown text={french? "Carte Vue":"MapView"}>
         <Dropdown.Menu style ={styles.DropdownDisplay}>
           <Dropdown.Item style ={styles.item} text={french?"tous les clientes":'all clients'} onClick={this.setMapView}/>
           <Dropdown.Item style ={styles.item} text={french?"tous les employees":'all employees'} onClick={this.setEmployeeView}/>
           <Dropdown.Item style ={styles.item} text={french?"non assigne":'not assigned'} onClick={this.setUnassignedView}/>
           <Dropdown.Item style ={styles.item} text={french?"tous les leads":'all leads'} onClick={this.setLeadMapView}/>

          <Dropdown.Divider />
          {this.assignedEmployees()}
          </Dropdown.Menu>
     </Dropdown>
   )
 }

assignedEmployees = () => {
    const {employees} = this.props;
    const {french} = this.state;
    let titleArray = [];

    for (var key in employees) {
        const newEmployee =
           <Dropdown.Item key={key}>
               <EmployeeJob
                   displayAssigned={(employeeKey)=>this.displayAssigned(employeeKey)}
                   employee={employees[key]}
                   french={french} />
           </Dropdown.Item>

        titleArray.push(newEmployee);
    }
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

   setAssignedEmployeeView = () => {
      this.props.setAssignedEmployeeView(true);
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

 setLeadMapView =() => {
    this.props.setLeadMapView();
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
      <Grid.Row columns='equal' style={styles.container}>
          <Grid.Column style={styles.columns}>
              <Icon name="truck" size="large" color="orange"
                   style={{position:"relative", float:"left"}}/>
                   <span> AssignJobs </span>
                     <Dropdown
                       placeholder=""
                       options={this.dropdownOptions()}
                       style = {{color: "black"}}
                     />
          </Grid.Column >
          <Grid.Column style={styles.columns}>
             <span> {french? "Compagnie":"Company"} </span>
             <Dropdown
               placeholder=""
               options={this.dropdownCompanyOptions()}
               style = {{color: "black"}}
             />
          </Grid.Column >
          <Grid.Column style={styles.columns}>
             <span> {french? "Clients" : "Clients" }</span>
             <Dropdown
               placeholder=""
               options={this.dropdownTextOptions2()}
             />
          </Grid.Column>
          <Grid.Column style={styles.columns}>
               {this.dropdownMapOptions2()}

          </Grid.Column>
          <Grid.Column style={styles.columns}>
             <span onClick={()=>this.toggleFrench()}> {this.state.french? "Anglais": "French"} </span>
          </Grid.Column>
          <Grid.Column style={styles.columns}>
             <span> {french? "Cadre": "Setting"}</span>
             <Dropdown
               placeholder=""
               options={this.dropdownSettingOptions()}
               style = {{color: "black"}}
             />
          </Grid.Column>
      </Grid.Row>


    );
  }
}

const styles = {
  container: {
    width:"100%",
    height:"8vh",
    color:"black",
    fontWeight:"bold",
    fontSize:"1.1em",
    backgroundColor:"#e1e7f2"
  },
  columns: {
    textAlign: "center",
    paddingTop: "8px",
    color:"black",
    fontSize:"1.1em"
  },
  item: {
    paddingTop: "0px",
    paddingBottom: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
  },
  DropdownDisplay: {
    paddingTop: "2px",
    paddingBottom: "2px",
    marginTop: "2px",
    marginBottom: "2px",
    position: "relative",
    height: "350px",
    overflow:  "scroll",
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
   setClientView, setClientContactView, setLeadView, setLeadMapView,
   setAssignedEmployeeView
 }
)(TopPanel);
