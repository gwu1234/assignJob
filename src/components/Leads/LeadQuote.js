import React, {Component, PropTypes} from 'react';
import firebase from "../../firebase";
import 'firebase/functions';
import { connect } from "react-redux";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Background from '../terra.jpg';
import { Button, Header, Icon, Modal, Form, Dimmer, Loader} from 'semantic-ui-react';

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
      pdfing: false,
     }
  }

  /*static getDerivedStateFromProps(props, state){
     console.log(props.contact);
     console.log(state);
     return {};
  }*/

  componentDidUpdate(prevProps) {
     console.log("componentDidUpdate()");
     if (this.props.contact !== prevProps.contact) {
          const {contact, currentUser} = this.props;
          const {phones, cells, emails} = contact;

          //console.log(contact);
          const newState = {
              companyName: currentUser.displayName,
              clientName: (contact&&contact.name)?contact.name:"",
              street: (contact&&contact.street)?contact.street:"",
              city: (contact&&contact.city)?contact.city:"",
              postcode: (contact&&contact.postcode)?contact.postcode:"",
              province: (contact&&contact.province)?contact.province:"",
              country:  (contact&&contact.country)?contact.country:"",
              phone: (phones&&phones.length>0)?phones[0]:"",
              cell: (cells&&cells.length>0)?cells[0]:"",
              email: (emails&&emails.length>0)?emails[0]:"",
              price: '',
              taxes: '',
              total:'',
              work: "",
          };
          console.log(newState);
          this.setState (newState);
     }
  }

  isFormValid() {
    let {price,  taxes, total, work} = this.state;

    let  requred = true;
    if (!price || !taxes || !total || !work) {
        requred = false;
        window.alert("fields price taxes, total work  are required");
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

  /*printDocument = () =>{
    let {price,  taxes, total, work} = this.state;
    //const {contact} = this.props;

    this.setState({pdfing: true});
    //console.log(price);
    const date = new Date();
      // timestamp in second
    const timestamp = Math.round(date.getTime()/1000 + 0.5);
    const filename = "quote-" + String(timestamp) + ".pdf"
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        //const pdf = new jsPDF();
        const pdf = new jsPDF('p', 'pt', 'letter');
        pdf.canvas.height = 72 * 11;
        pdf.canvas.width = 72 * 8.5;
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save(filename);
        this.setState({pdfing: false});
      });
  }*/

  printDocument = () =>{

    this.setState({pdfing: true});

    const { companyName, clientName, street, city, postcode, province,
            country, phone, cell, email, price, taxes, total, work } = this.state;
    const { companyInfo } = this.props;

    const { emails, phones, cells } = companyInfo;
    let companyEmail = null;
    let companyPhone = null;
    if (emails && emails.length > 0) {
        companyEmail = emails[0];
    }
    if (phones && phones.length > 0) {
        companyPhone = phones[0];
    }

    const date = new Date();
      // timestamp in second
    const timestamp = Math.round(date.getTime()/1000 + 0.5);
    const localtime = date.toLocaleString();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds ();
    const filename = companyName + "-" + year + month + day + "-" + hours + minutes + seconds;
    //const filename = companyName + "-" + localtime + ".pdf"
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(20, 20, 'This is a quotation from ' + companyName);
    doc.setFontSize(13)
    doc.text(20, 27, 'dated on ' + localtime)

    doc.setFontSize(14);
    doc.text(20, 37, 'Company Contact');
    doc.setFontSize(12)
    doc.text(20, 43, 'address: ' + companyInfo.street);
    doc.text(20, 49, 'city: ' + companyInfo.city);
    doc.text(20, 55, 'postcode: ' + companyInfo.postcode);
    doc.text(20, 61, 'province: ' + companyInfo.province);
    if (companyPhone) {
      doc.text(20, 67, 'phone: ' + companyPhone);
    }
    if (companyEmail) {
      doc.text(20, 73, 'email: ' + companyEmail);
    }

    doc.setFontSize(14);
    doc.text(20, 83, 'Client Contact');
    doc.setFontSize(12)
    doc.text(20, 89, 'name: ' + clientName);
    doc.text(20, 95, 'address: ' + street);
    doc.text(20, 101, 'city: ' + city);
    doc.text(20, 106, 'postcode: ' + postcode);
    doc.text(20, 112, 'province: ' + province);
    if (phone) {
      doc.text(20, 118, 'phone: ' + phone);
    }
    if (email) {
      doc.text(20, 124, 'email: ' + email);
    }

    doc.setFontSize(14);
    doc.text(20, 134, 'Job and Quote');
    doc.setFontSize(12)
    doc.text(20, 140, 'price: ' + price);
    doc.text(20, 146, 'taxes: ' + taxes);
    doc.text(20, 152, 'total: ' + total);
    doc.text(20, 158, 'job description:');
    doc.text(20, 164,  work);

    doc.save(filename);
    this.setState({pdfing: false});
  }

  /*sendDocument = () =>{
     let { companyName, clientName, street, city, postcode,
           province, country, phone, cell, email, price,
           taxes, total, work} = this.state

     let { compnayInfo } = this.props;

      //let {price,  taxes, total, work} = this.state;
      const quote = {
          companyName: companyName,
          clientName: clientName,
          street: street,
          city: city,
          postcode: postcode,
          province: province,
          country: country,
          phone: phone,
          cell:  cell,
          email: email,
          price: price,
          taxes: taxes,
          total: total,
          work: work,
      }
      var sendQuote = firebase.functions().httpsCallable('sendQuote');
      sendQuote({quote:quote}).then(function(result) {
          // Read result of the Cloud Function.
          var returnText = result.emailresult || "";
          console.log(result);
      });
  }*/

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { companyName, clientName, street, city, postcode, province,
            country, phone, cell, email, price, taxes, total, work } = this.state ;
    const {french} = this.props;

    return (
      <div style ={styles.container}>
          <div style ={styles.menuHeader}>
             <p>
                 {french ? "Remplir ce forme pour prépair citation":
                     "Fill the following form to prepare a quote"}
             </p>
          </div>
          <div id="divToPrint" style ={styles.menuMenu}>
          <Form >
                 <Form.Input size ="small"
                      label={french? 'Compagnie Nom' : 'Company Name'}
                      value ={companyName}
                      name="companyName"
                      onChange={this.handleChange}
                      />
                 <div style ={{paddingTop: "15px", color: "black", fontSize:"1.1em", fontWeight:"bold",}}>
                     <p> Client Info:  </p>
                 </div>
                 <div style ={{paddingTop: "8px"}}>
                 <Form.Group inline width="3" >
                 <Form.Input size ="small"
                             label={french? 'Nom' : 'Name'}
                             value = {clientName}
                             name="clientName"
                             onChange={this.handleChange}
                             />
                 <Form.Input size ="small"
                             label={french? 'Rue' : 'Street'}
                             value = {street}
                             name="street"
                             onChange={this.handleChange}
                             />
                  <Form.Input size ="small"
                              label={french? 'Ville' : 'City'}
                              value = {city}
                              name="city"
                              onChange={this.handleChange}
                              />
             </Form.Group>

             <Form.Group inline width="3" >
                 <Form.Input size ="small"
                             label='Post'
                             value = {postcode}
                             name="postcode"
                             onChange={this.handleChange}
                             />
                 <Form.Input size ="small"
                             label='Province'
                             value = {province}
                             name="province"
                             onChange={this.handleChange} />
                  <Form.Input size ="small"
                              label={french? 'Pays' : 'Country'}
                              value = {country}
                              name="country"
                              onChange={this.handleChange} />
             </Form.Group>
             <Form.Group inline width="3">
                 <Form.Input size ="small"
                             label='Phone'
                             value = {phone}
                             name="phone"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Cell'
                             value = {cell}
                             name="cell"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Email'
                             value = {email}
                             name="email"
                             onChange={this.handleChange} />
             </Form.Group>
             </div>
              <div style ={{paddingTop: "12px"}}>
             <Form.Group inline width="3">
                 <Form.Input size ="small"
                             label={french? 'Prix' : 'Price'}
                             value = {price}
                             name="price"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Taxes'
                             value = {taxes}
                             name="taxes"
                             onChange={this.handleChange} />

                 <Form.Input size ="small"
                             label='Total'
                             value = {total}
                             name="total"
                             onChange={this.handleChange} />
             </Form.Group>
             </div>
             <div style ={{paddingTop: "12px"}}>
             <Form.Input size ="small"
                  label={french? 'Travail Description' : 'Job Description'}
                  value = {work}
                  name="work"
                  onChange={this.handleChange}
                  />
             </div>
          </Form>
           </div>
           <div style ={styles.menuFooter}>
              {!this.state.pdfing && <Button onClick={this.printDocument}>{french? "Enregistrer comme PDF" : "Save as PDF"} </Button>}
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


   const companyInfo = reposData["contact"];

   return {
     contact: leadContact,
     usertag: state.user.usertag,
     french: state.user.french,
     currentUser: state.user.currentUser,
     companyInfo: companyInfo,
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
    height: "8%",
    background: "#f2f4f7",
  },
  menuMenu: {
    marginTop: "6px",
    marginBottom:"6px",
    paddingTop:"15px",
    position: "relative",
    overflow: "scroll",
    height: "81%",
    background: "#f2f4f7",
  },
  menuFooter: {
    paddingTop:"5px",
    paddingBottom: "5px",
    textAlign: "center",
    color: "black",
    fontSize:"1.1em",
    fontWeight:"normal",
    height: "10%",
    background: "#f2f4f7",
  },
};
