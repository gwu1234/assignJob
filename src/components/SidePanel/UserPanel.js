import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Grid, Header, Icon, Dropdown, Image, Menu } from "semantic-ui-react";
import "./UserPanel.css";
import { setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient, setFrench} from "../../actions";
import EmployeeJob from "./EmployeeJob";
import RepeatModal from "./RepeatModal";
import InputFileReader from "./InputFileReader";

class UserPanel extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        user: this.props.currentUser,
        mapview: false,
     }
  }

  handleFrench=()=>{
      const {french} = this.props;
      /*console.log("at handleFrench") ;
      console.log(this.state.mapview);
      this.setState ({
           isFrench: !isFrench
      })*/

      this.props.setFrench(!french);
  }


  displayAssigned(employee) {
    this.setState ({
        mapview: true
    });
    //console.log("displayAssigned")
    this.props.setSelectedEmployee(employee);
  }

  dropdownOptions = (employees, isFrench) => {
      let optionArray = [];

      let username = "";
      if (this.state.user) {
          username = this.state.user.displayName;
      }

      const titleArray = isFrench ?
       [
        {
           key: "user",
           text: (
               <span>
                  Signed in comme <strong>{username}</strong>
              </span>
           ),
           disabled: true
       }
      ]:
      [
         {
            key: "user",
            text: (
                 <span>
                    Signed in as <strong>{username}</strong>
                 </span>
            ),
            disabled: true
         }
      ];

    const userOptions = isFrench?
    [
      {
         key: "textview",
         text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setTextView}> texte view </span>
      },
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
         key: "textview",
         text: <span style ={{fontStyle: "bold", margin:"0em"}} onClick={this.setTextView}> text view </span>
      },
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


   if (this.state.user) {
     optionArray= titleArray.concat(userOptions);
   }

  for (var key in employees) {
     const newEmployee = {
       key: key,
       text: <EmployeeJob
             displayAssigned={(employeeKey)=>this.displayAssigned(employeeKey)}
             employee={employees[key]}
             french={isFrench}
             />
     }
     optionArray.push(newEmployee);
  };

  const signin = {
    key: "signout",
    text: <span onClick={this.handleSignout}>Sign In</span>
  };

  const signout = {
    key: "signout",
    text: <span onClick={this.handleSignout}>Sign Out</span>
  };

  const repeattimer= {
    key: "repeathour",
    text: <RepeatModal />
  }

  const french = isFrench ? {
    key: "french",
    text: <span onClick={this.handleFrench}> Anglais </span>
  } : {
    key: "french",
    text: <span onClick={this.handleFrench}> French </span>
  };

  const datareader= {
    key: "datareader",
    text: <InputFileReader usertag={this.props.usertag}/>
  }



  if (!this.state.user) {
    optionArray.push(signin);
    optionArray.push(french);
  } else {
    optionArray.push(signout);
    optionArray.push(french);
    optionArray.push(repeattimer);
    optionArray.push(datareader);
  }

  //optionArray.push(signout);

  return optionArray;
}



  handleSignout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));
  };

  // display all clients
  setMapView  = () => {
     this.setState ({
         mapview: true
     });
     this.props.setMapView();
     //console.log("setMapView")
  };

  // display all employees
  setEmployeeView  = () => {
    //console.log("setEmployeeView")
     this.setState ({
         mapview: true
     });
     this.props.setEmployeeView();
  };

  setTextView  = () => {
    //console.log("setTextView")
      this.setState ({
            mapview: false
      });
      this.props.setTextView();
  };

  setUnassignedView =() => {
    //console.log("setUnassignedView")
      this.setState ({
         mapview: true
      });
     this.props.setUnassignedClient();
};


  render() {
    const { user} = this.state;
    const {employees, french} = this.props;
    //console.log ("userPanel User displayName = ", user.displayName);

    let placeHolder = 'Dropdown Control Menu';
    if (french) {
       placeHolder = "controlle menu"
    }

    return (
      <Menu.Menu className="UserPanelMenuMenu">
            <Menu.Header as="h1" className="UserPanelMenuHeader">
              <Icon name="truck" /> AssignJobs
            </Menu.Header>
              <Dropdown
                placeholder={placeHolder}
                selection
                options={this.dropdownOptions(employees, french)}
                style = {{color: "white", left: "10px", fontSize:"0.9em"}}
              />

      </Menu.Menu>
    );
  }
}

const mapStateToProps = state => ({
   employees: state.user.employeeList,
   currentUser: state.user.currentUser,
   french: state.user.french,
   usertag: state.user.usertag,
});

export default connect(
  mapStateToProps, {setMapView, setEmployeeView, setTextView, setSelectedEmployee, setUnassignedClient, setFrench}
)(UserPanel);
