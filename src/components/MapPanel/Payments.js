import React from "react";
//import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Icon} from "semantic-ui-react";
import Payment from "./Payment";
import AddPaymentModal from "./AddPaymentModal";
import "./Payments.css";

class Payments extends React.Component {

   state = {
     contractsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     display: false,
   };

   onButtonClick = (display) => {
       if (display){
           this.setState({
               contractsStyle: {
                   ...this.state.contractsStyle,
                   visibility: "hidden",
                   height: "1px",
               },
               display: false,
           })
       } else {
           this.setState({
               ordersStyle: {
                 ...this.state.contractsStyle,
                 visibility: "visible",
                 paddingTop: "0.0em",
                 position: "relative",
                 color: "white",
                 size: "tiny",
                 border: "2px dotted black",
                 overflow: "scroll",
                 height: "390px",
             },
             display: true,
          })
        }
   };


   displayPayments = (payments) =>
      payments.length > 0 &&
      payments.map(payment => (
          <Payment key={payment.paymentKey} paymentKey={payment.paymentKey} payment={payment.payment}/>
     ));



  render() {
    const {payments, french} = this.props;
    const {display} = this.state;
    //console.log("orders  List = ");
    //console.log(orders);
    //display && clients && this.displayClients(clients)}
    let titleString = "Payment";
    let modalString = "add new payment";
    if (french) {
         titleString ="paiement";
         modalString = "ajouter nouveau paiement";
    }

    const paymentArray =[];
    //const keyArray = [];
    for (var key in payments) {
       //console.log(clients[key]);
       //console.log(key);
       const newPayment = {
         paymentKey: key,
         payment: payments[key]
       }
       //keyArray.push(key);
       paymentArray.push(newPayment);
    }
    // sort list by the timestamp
    paymentArray.sort((a, b) =>  (new Date (b.payment.date)).getTime() - (new Date (a.payment.date)).getTime() );


    return (
      <Menu.Menu style={styles.container}>
            <Menu.Header style={styles.menuHeader}>
               {titleString}
            </Menu.Header>
          <Menu.Menu style={styles.menuMenu} >
              {payments && this.displayPayments(paymentArray)}
              <Menu.Item style={{margin:"3px"}}>
                  <span style={{color:"black", fontWeight:"bold"}}> {modalString} </span> <AddPaymentModal />
              </Menu.Item>
          </Menu.Menu>
      </Menu.Menu>
    );
  }
}

const styles = {
  container: {
    height: "49.6%",
    background: "#f2f4f7",
    marginTop:"3px",
  },
  menuHeader: {
    paddingTop:"8px",
    paddingBottom: "8px",
    textAlign: "center",
    color: "black",
    fontSize:"1.2em",
    fontWeight:"bold",
    height: "15%",
  },
  menuMenu: {
    position: "relative",
    overflow: "scroll",
    height: "85%",
  },
};

const mapStateToProps = state => {
  const reposData = state.user.reposData;
  const usertag = state.user.usertag;
  const clienttag = state.user.clienttag;
  let payments = null;
  //console.log(clienttag);
  if (clienttag) {
      //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
      payments = reposData["clients"]["data"][clienttag] ?
                 reposData["clients"]["data"][clienttag]["payments"] :
                 null ;
      //console.log(clientContact);
  }
  return {
     payments: payments,
     french: state.user.french
   }
};

export default connect(
  mapStateToProps,
  {}
)(Payments);
