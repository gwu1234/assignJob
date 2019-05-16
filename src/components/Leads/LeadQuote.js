import React, {Component, PropTypes} from 'react';
import { connect } from "react-redux";
import {html2canvas} from 'html2canvas';
import {jsPDF} from 'jspdf';
import Background from '../terra.jpg';
import { Button, Header, Icon, Modal, Form} from 'semantic-ui-react';

class LeadQuote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: "",
      clientName:"",
      street: "",
      city: "",
      postcode: "",
      province:"",
      country: "",
      phone: '',
      cell: '',
      email:'',
      price: '',
      taxes: '',
      total:'',
      work: "",
     }
  }

  isFormValid() {
    let { companyName, clientName, street, city, postcode,
            province, country, phone, cell, email, price,
            taxes, total, work} = this.state;
    const {contact, currentUser} = this.props;

    if (!companyName && currentUser) {
        companyName = currentUser.displayName;
    }

    if (!clientName && contact) {
        clientName = contact.name;
    }

    if (!street && contact.street) {
        street = contact.street;
    }

    if (!city && contact.city) {
        city = contact.city;
    }

    if (!postcode && contact.postcode) {
        postcode = contact.postcode;
    }

    if (!province && contact.province) {
        province = contact.province;
    }

    if (!country && contact.country) {
        country = contact.country;
    }

    if (!phone && contact.phones && contact.phones.length>0) {
        phone = contact.phones[0];
    }

    if (!cell && contact.cells && contact.cells.length>0) {
        cell = contact.cells[0];
    }

    if (!email && contact.emails && contact.emails.length>0) {
        email = contact.emails[0];
    }

    let  requred = true;
    if ( !companyName || !clientName || !street || !city || !postcode ||
         !province || !country || !phone || !cell || !email || !price ||
         !taxes || !total || !work) {
        requred = false;
        window.alert("please fill all the fields");
    }
    return requred;
  }

  clearState () {
      this.setState ( {
         companyName: "",
         clientName:"",
         street: "",
         city: "",
         postcode: "",
         province:"",
         country: "",
         phone: '',
         cell: '',
         email:'',
         price: '',
         taxes: '',
         total:'',
         work: "",
    });
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {contact, currentUser} = this.props;

    return (
      <div style ={styles.container}>
          <div style ={styles.menuHeader}>
             <p> Fill the following form to prepare a quote </p>
          </div>
          <div id="divToPrint" style ={styles.menuMenu}>
          <Form >
                 <Form.Input size ="small"
                      label='Company Name'
                      placeholder='Company Name'
                      defaultValue ={(currentUser&&currentUser.displayName)?currentUser.displayName:""}
                      name="companyName"
                      onChange={this.handleChange}
                      />
                 <div style ={{paddingTop: "15px", color: "black", fontSize:"1.1em", fontWeight:"bold",}}>
                     <p> Client Info:  </p>
                 </div>
                 <div style ={{paddingTop: "8px"}}>
                 <Form.Group inline width="3" >
                 <Form.Input size ="small"
                             label='Name'
                             defaultValue = {(contact&&contact.name)?contact.name:""}
                             name="clientName"
                             onChange={this.handleChange}
                             />
                 <Form.Input size ="small"
                             label='Street'
                             defaultValue = {(contact&&contact.street)?contact.street:""}
                             name="street"
                             onChange={this.handleChange}
                             />
                  <Form.Input size ="small"
                              label='City'
                              defaultValue = {(contact&&contact.city)?contact.city:""}
                              name="city"
                              onChange={this.handleChange}
                              />
             </Form.Group>

             <Form.Group inline width="3" >
                 <Form.Input size ="small"
                             label='Post'
                             placeholder='H1A 1B1'
                             defaultValue = {(contact&&contact.postcode)?contact.postcode:""}
                             name="postcode"
                             onChange={this.handleChange}
                             />
                 <Form.Input size ="small"
                             label='Province'
                             defaultValue = {(contact&&contact.province)?contact.province:""}
                             name="province"
                             onChange={this.handleChange} />
                  <Form.Input size ="small"
                              label='Country'
                              defaultValue = {(contact&&contact.country)?contact.country:""}
                              name="country"
                              onChange={this.handleChange} />
             </Form.Group>
             <Form.Group inline width="3">
                 <Form.Input size ="small"
                             label='Phone'
                             defaultValue = {(contact&&contact.phones&&contact.phones.length>0)?contact.phones[0]:""}
                             name="phone"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Cell'
                             defaultValue = {(contact&&contact.cells&&contact.cells.length>0)?contact.cells[0]:""}
                             name="cell"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Email'
                             defaultValue = {(contact&&contact.emails&&contact.emails.length>0)?contact.emails[0]:""}
                             name="email"
                             onChange={this.handleChange} />
             </Form.Group>
             </div>
              <div style ={{paddingTop: "12px"}}>
             <Form.Group inline width="3">
                 <Form.Input size ="small"
                             label='Price'
                             defaultValue = "price"
                             name="price"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Taxes'
                             defaultValue = "taxes"
                             name="taxes"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Total'
                             defaultValue = "total"
                             name="total"
                             onChange={this.handleChange} />
             </Form.Group>
             </div>
             <div style ={{paddingTop: "12px"}}>
             <Form.Input size ="small"
                  label='Job Description'
                  defaultValue = "enter job description"
                  name="work"
                  onChange={this.handleChange}
                  />
             </div>
          </Form>
           </div>
           <div style ={styles.menuFooter}>
              <Button onClick={this.printDocument}>Save as PDF</Button>
           </div>
         </div>);
  }
}

const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const leadTag = state.user.leadTag;
   //let leadContact = null;
   let leadContact = { lastname: "", firstname: "", street: "", city: "", postcode: "",
                       province:"", country: "", phones: [], cells: [], emails: []};

   if (leadTag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["leads"][leadTag]) {
            leadContact = reposData["leads"][leadTag]["contact"];
            leadContact = {...leadContact, leadTag: leadTag}
       }
   }

   //this.clearState();
   //console.log(leadTag);
   //console.log(leadContact);

   return {
     contact: leadContact,
     usertag: state.user.usertag,
     french: state.user.french,
     currentUser: state.user.currentUser
   }
};

export default connect(
  mapStateToProps,
  {}
)(LeadQuote);


const styles = {
  container: {
    height: "100%",
    backgroundImage: `url(${Background})`,
    padding: "5px"
  },
  menuHeader: {
    paddingTop:"5px",
    paddingBottom: "5px",
    textAlign: "center",
    color: "black",
    fontSize:"1.1em",
    fontWeight:"bold",
    height: "5%",
    background: "#92c2e8",
  },
  menuMenu: {
    marginTop: "6px",
    marginBottom:"6px",
    paddingTop:"15px",
    position: "relative",
    overflow: "scroll",
    height: "88%",
    background: "#92c2e8",
  },
  menuFooter: {
    paddingTop:"5px",
    paddingBottom: "5px",
    textAlign: "center",
    color: "black",
    fontSize:"1.1em",
    fontWeight:"normal",
    height: "5%",
    background: "#92c2e8",
  },
};
