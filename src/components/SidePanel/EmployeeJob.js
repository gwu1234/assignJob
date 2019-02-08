import React from "react";
import firebase from "../../firebase";


class EmployeeJob extends React.Component {

 render() {
    const {employee} = this.props;
    const title = "Jobs: " + employee.name;
    return (
       <span onClick={()=>this.props.displayAssigned(employee)}> {title} </span>
     )
   };
}

export default EmployeeJob;
