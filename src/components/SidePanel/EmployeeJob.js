import React from "react";
//import firebase from "../../firebase";


class EmployeeJob extends React.Component {

 render() {
    const {employee, french} = this.props;
    let title = "Jobs: " + employee.name;
    if (french) {
      title = "travails: " + employee.name;
    }

    return (
       <span onClick={()=>this.props.displayAssigned(employee)}> {title} </span>
     )
   };
}

export default EmployeeJob;
