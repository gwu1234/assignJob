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

  printDocument = () =>{
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
  }

  sendDocument = () =>{
     let { companyName, clientName, street, city, postcode,
           province, country, phone, cell, email, price,
           taxes, total, work} = this.state;

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
      /*var sendQuote = firebase.functions().httpsCallable('sendQuote');
      sendQuote({quote:quote}).then(function(result) {
          // Read result of the Cloud Function.
          var returnText = result.emailresult || "";
          console.log(result);
      });*/
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { companyName, clientName, street, city, postcode, province,
            country, phone, cell, email, price, taxes, total, work } = this.state ;

    return (
      <div style ={styles.container}>
          <div style ={styles.menuHeader}>
             <p> Fill the following form to prepare a quote </p>
          </div>
          <div id="divToPrint" style ={styles.menuMenu}>
          <Form >
                 <Form.Input size ="small"
                      label='Company Name'
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
                             label='Name'
                             value = {clientName}
                             name="clientName"
                             onChange={this.handleChange}
                             />
                 <Form.Input size ="small"
                             label='Street'
                             value = {street}
                             name="street"
                             onChange={this.handleChange}
                             />
                  <Form.Input size ="small"
                              label='City'
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
                              label='Country'
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
                             label='Price'
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
                  label='Job Description'
                  value = {work}
                  name="work"
                  onChange={this.handleChange}
                  />
             </div>
          </Form>
           </div>
           <div style ={styles.menuFooter}>
              <Button onClick={this.sendDocument}>Email Quote</Button>
              {this.state.pdfing && <Dimmer active> <Loader content='Creating PDF'/></Dimmer>}
              {!this.state.pdfing && <Button onClick={this.printDocument}>Save as PDF</Button>}
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
