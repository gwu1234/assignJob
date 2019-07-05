import React, { Component } from 'react';
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Button, Header, Icon, Modal, Form, Grid} from 'semantic-ui-react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';


class AddInvoiceModal extends Component {
  state = {
    modalOpen: false,
    date: '',
    work: '',
    amount: "",
    tax:"",
    total:"",
    invoiceId:""
  }


  handleOpen = (open) => this.setState({ modalOpen: open })

  handleSubmit = () => {
    const event = this.nativeEvent;
    if (event) {
       //console.log(event);
       event.preventDefault();
    }
    //event.preventDefault();
    if (this.isFormValid()) {
         const {date,work, amount, tax, total, invoiceId} = this.state;
         const {usertag, contact} = this.props;

         //"repos/"+usertag+"/clients/data/"+ contact.clientTag
         let invoiceString = "repos/"+usertag+"/clients/data/"+contact.clientKey+"/invoices";
         const invoicetag = invoiceString.replace(/[.,#$\[\]@ ]/g,'');
         const invoiceRef = firebase.database().ref(invoicetag);
         const invoicekey = invoiceRef.push().getKey();
         //console.log(ordertag);
         //console.log (orderkey);
         //console.log(orderRef);
         //"clientKey": String(contact.clientKey),
         //"clientTag": String(contact.clientTag)
         const newInvoice = {
           "date": String(date),
           "total": String(total),
           "work": String(work),
           "tax": String(tax),
           "amount": String(amount),
           "tag": String(invoicekey),
           "invoiceId": String(invoiceId),
           "invoiceKey": String(invoicekey),
           "clientKey": String(contact.clientKey),
         }
         //console.log(newOrder);
         invoiceRef.child(invoicekey).set(newInvoice);
         this.handleOpen(false);
    }
  };

  isFormValid() {
     const {date, total, amount } = this.state;
     if ( !date) {
        window.alert ("date is required");
        return false;
     }
     if ( !total) {
        window.alert ("total is required");
        return false;
     }
     if ( !amount) {
        window.alert ("amount is required");
        return false;
     }
     return true;
  }

  handleChange = event => {
    //console.log([event.target.name]);
    //console.log(event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDayClick(day, modifiers = {}) {
    if (modifiers.disabled) {
      return;
    }

    //console.log(day);
    //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    //console.log(day.toLocaleDateString("en-US", options));
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = day.toLocaleDateString("en-US", options);

    this.setState({
       date: date,
       fieldChange: true,
    })
  }


  render() {
    //const {clientname, french} = this.props;
    const {contact, french} = this.props;
    //console.log ("AddOrderModal clientname = " + clientname );
    //console.log ("AddOrderModal usertag =" + usertag );
    //console.log ("AddOrderModal clienttag =" + clienttag );

    let titleString = "Add New Invoice";
    let workString ="Work";
    let totalString="Total";
    let taxString ="Tax";
    let amountString = "Amount";

    if (contact) {
       titleString = contact.name + ":  " + "Add New Invoice";
    }

    //let totallabel ="Total";
    if (french) {
       titleString = "ajouter nouveau facture";
       if (contact) {
            titleString = contact.name + ":  " + "ajouter nouveau facture";
       }
       workString = "Travail";
       taxString ="Impot";
       amountString="Somme";
    }

    return (
      <Modal
        trigger={<Icon name='plus' size ="large" onClick={() => this.handleOpen(true)}
        style = {{position: "relative", float: "right", color:"white"}}/>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
        style={{background: "#ccc"}}
      >
        <Header icon='folder outline' content={titleString} style = {{fontSize: "1.0em", fondStyle: "bold", color:"black"}}/>
        <Modal.Content>
        <Grid style={{height: "100%", width:"100%"}}>
        <Grid.Column style={{height: "100%", width:"50%", fontSize: "1.0em", fontStyle: "bold", color:"black"}}>

        <DayPicker
             onDayClick={(day, modifiers)=>this.handleDayClick(day, modifiers)}
             month={new Date()}
             selectedDays={[new Date()]}
        />

        </Grid.Column>
        <Grid.Column style={{height: "100%", width:"50%"}}>

        <Form >
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label={workString}
                            placeholder='snow removal'
                            name="work"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
               <Form.Input size ="mini"
                           label={amountString}
                           placeholder='500.00'
                           name="amount"
                           onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label={taxString}
                            placeholder='45.00'
                            name="tax"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label="Total"
                            placeholder='545.00'
                            name="total"
                            onChange={this.handleChange} />
           </Form.Group>
           <Form.Group inline width='equal' >
                <Form.Input size ="mini"
                            label='Invoice Id'
                            placeholder='i-2018-001188'
                            name="invoiceId"
                            onChange={this.handleChange} />
          </Form.Group>
        </Form>
        </Grid.Column>
        </Grid>
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => {this.handleOpen(false);
                this.setState ({
                   date: '',
                   work: '',
                   amount: "",
                   tax: "",
                   total: "",
                   invoiceId: "",
                })}}
              >
              Cancel
        </Button>

          <Button color='green' size="small" inverted
                onClick={() =>this.handleSubmit()}
                >
                Submit
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let clientContact = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      clientContact = reposData["clients"]["data"][clienttag]?
             reposData["clients"]["data"][clienttag]["contact"]:{};
      //console.log(clientContact);
  }
  return {
     contact: clientContact,
     usertag: state.user.usertag,
     french: state.user.french,
   }
};

export default connect(
  mapStateToProps,
  {}
)(AddInvoiceModal);
