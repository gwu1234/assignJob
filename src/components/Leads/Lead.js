import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { setLeadTag} from "../../actions";
import { Menu, Icon} from "semantic-ui-react";

const LEAD_POSITIVE = 1;  // green
const LEAD_RESPONSIVE = 2; // blue
const LEAD_NEW = 3;  // red
const LEAD_NOT_RESPONSIVE = 4; // orange
const LEAD_DECLINE = 5; // yellow

class Lead extends React.Component {

  onButtonClick = () => {
    const {lead, leadKey, selectedLeadKey} = this.props;

    // click the same item more than once
    if (leadKey === selectedLeadKey) {
        return
    }

    //console.log(lead.leadTag);
    //console.log(leadKey);
    //console.log(selectedLeadKey);
    this.props.setLeadTag(lead.leadTag);
    this.props.setSelectedLeadKey(lead.leadTag);
  }

  render() {
    const {lead, usertag, leadKey, french, selectedLeadKey} = this.props;
    const {emails, phones, cells} = lead;

    let name= '';
    let street ='';
    let city ="";
    //let status = LEAD_NEW;

    if (lead) {
        name = (lead.lastname && lead.firstname)? (lead.lastname+", "+lead.firstname): "";
        street = lead.street;
        city = lead.city;
        //status = lead.status? lead.status: LEAD_NEW;
    }

    //console.log(lead);
    //console.log(address);
    //console.log(city);

    let viewTitle = "view lead data";
    if (french) {
       viewTitle = "voir lead donnee";
    }

    //console.log("leadKey =  " + leadKey);

    let email ="";
    if (emails && emails.length > 0) {
       //console.log(emails) ;
       email = emails[0];
    }
    let  phone ="";
    if (phones && phones.length > 0) {
       //console.log(phones) ;
       phone = phones[0];
    }
    let cell ="";
    if (cells && cells.length > 0) {
       //console.log(cells) ;
       cell = cells[0];
    }

    //console.log(phone);
    //console.log(email);
    //console.log(cell);

    return (
      <Menu.Menu style={styles.container}>
         {lead && name && <Menu.Item style = {selectedLeadKey===leadKey?
                 styles.selectedName : styles.notselectedName}
              onClick={() => this.onButtonClick()}>
              {lead && name}
         </Menu.Item>}
         {lead && street && <Menu.Item
              style = {selectedLeadKey===leadKey?
                      styles.selectedCity : styles.notselectedCity}
                      onClick={() => this.onButtonClick()}>
              {lead && street}
         </Menu.Item>}
         {lead && city && <Menu.Item
              style = {selectedLeadKey===leadKey?
                      styles.selectedCity : styles.notselectedCity}
                      onClick={() => this.onButtonClick()}>
              {lead && city}
         </Menu.Item>}
         {lead && !name && !street && email && <Menu.Item
              style = {selectedLeadKey===leadKey?
                      styles.selectedCity : styles.notselectedCity}
                      onClick={() => this.onButtonClick()}>
              {lead && email}
        </Menu.Item>}
        {lead && !name && !street && !email && phone && <Menu.Item
             style = {selectedLeadKey===leadKey?
                     styles.selectedCity : styles.notselectedCity}
                     onClick={() => this.onButtonClick()}>
             {lead && phone}
        </Menu.Item>}
        {lead && !name && !street && !email && !phone && cell && <Menu.Item
             style = {selectedLeadKey===leadKey?
                     styles.selectedCity : styles.notselectedCity}
                     onClick={() => this.onButtonClick()}>
             {lead && cell}
        </Menu.Item>}
         </Menu.Menu>
     );
   }
}

const styles = {
  container: {
    paddingTop: "2px",
    paddingBottom: "2px",
    position: "relative",
    borderStyle:"solid",
    borderWidth:"2px",
    borderColor:"#b0caf4",
  },
  selectedName: {
    opacity: 1.0,
    color: "white",
    fontSize: "1.0em",
    fontWeight: "bold",
    backgroundColor:"rgba(0,0,255,0.5)",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px"
  },
  notselectedName: {
    opacity: 1.0,
    color: "black",
    fontSize: "1.0em",
    fontWeight: "bold",
    paddingTop:"2px",
    paddingBottom:"2px",
    paddingLeft: "15px"
  },
  selectedCity: {
    opacity: 1.0,
    color: "white",
    fontSize: "0.8em",
    fontWeight: "normal",
    backgroundColor:"rgba(0,0,255,0.5)",
    paddingTop: "1px",
    paddingLeft: "15px"
  },
  notselectedCity: {
    opacity: 1.0,
    color: "black",
    fontSize: "0.8em",
    fontStyle: "normal",
    paddingTop: "1px",
    paddingLeft: "15px"
  },
};

const mapStateToProps = state => ({
     usertag: state.user.usertag,
     french: state.user.french,
   }
);

//export default connect(mapStateToProps)(Lead);

export default connect(
  mapStateToProps, {setLeadTag}
)(Lead);
