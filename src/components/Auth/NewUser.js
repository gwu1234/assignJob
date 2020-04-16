import React, { Component } from 'react';
//import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Message} from 'semantic-ui-react';

export default class NewUser extends Component {
  constructor(props) {
      super(props);
      this.state = {
         modalOpen: false,
         french: false,
     }
  }

  handleOpen = (open) => this.setState({ modalOpen: open })

  handleFrench = () => {
      const {french} = this.state;
      this.setState({
         french: !french
      });
  };


  render() {
    const {french} = this.state;
    const title = french? "Duty2Go Bref :" : "Duty2Go Brief :";

    const content = french?
("Cette application est basée sur la base de données Google Cloud et sur la carte GPS. " +
"Il gère les clients, les prospects, les commandes, les contrats, les factures, " +
"les paiements, les livraisons, les camions. " +
"Il se compose de trois parties: port de gestion pour le bureau (Google Chrome est suggéré), " +
"application Apple et application Android pour les employés.Il prend en charge l'anglais et le français. " +
"Nous offrons un mois gratuit pour le procès.Vous pouvez commencer par enregistrer et configurer " +
"votre propre base de données,ou vous pouvez nous contacter. "+
"Nous allons configurer un compte de test et une base de données pour vous.")
    :
    "This application is based on Google cloud database and gps map.It manages clients, \
    leads, workorders, contracts, invoices, payments, deliveies, trucks.\
    It comes in three parts: management port for office desktop (Chrome is suggested), \
    Apple app (Jobs2Go at Apple Store) and Android app (Duty2Go at Google Play) for employees.It supports both English and French. \
    We offer a free month for trial.You can start with registering and setting \
    up your own database,or you can contact us. We will set up a testing account and database for you.";

const content2 = french?
    ("Cette application fonctionne mieux pour les entreprises basées \
     sur des maisons résidentielles, telles que l'aménagement paysager,\
       déneigement, réparation de clôture, tonte de gazon, peinture de maison, \
     nettoyage de maison, etc.")
    :
    ("This application works best for business based on residential houses, such as landscaping, \
      snow removing, fence repairing, grass mowing, house painting, house cleaning etc.");

const content3 = french?
    ("Guide de l'utilisateur sur Cadre/UserGuide une fois connecté")
          :
     ("User Guide at Setting/UserGuide once logged in");

    return (
      <Modal
          trigger={<Icon name='info circle' size ="large" onClick={() => this.handleOpen(true)} style={{position: 'relative', color:"black"}} />}
          open={this.state.modalOpen}
          basic
          size='small'
          style={{background: "#ccc"}}
      >
        <Header icon='info circle' content={title} style = {{fontSize: "1.2em", fontWeight: "bold", color:"black"}}/>
        <Modal.Content style = {{fontSize: "1.1em", fontWeight: "normal", color:"black", marginBottom:"4px", marginTop:"4px", paddingTop:"4px", paddingBottom: "4px"}}>
           {content}
        </Modal.Content>
        <Message style={{color:"green", fontSize:"1.1em", fontWeight:"normal", marginTop:"4px", paddingTop:"4px", marginBottom:"4px", paddingButtom:"4px"}}>
            duty2go@gmail.com, Duty2Go at Google Play, Jobs2Go at Apple Store
        </Message>
        <Modal.Content style={{color:"black", fontSize:"1.1em", fontWeight:"normal", marginTop:"4px", paddingTop:"4px", marginBottom:"0px", paddingButtom:"0px"}}>
           {content2}
        </Modal.Content>
        <Modal.Content style={{color:"black", fontSize:"1.1em", fontWeight:"normal", marginTop:"0px", paddingTop:"0px", marginBottom:"4px", paddingButtom:"4px"}}>
           {content3}
        </Modal.Content>
        <Modal.Actions>
        <Button color='black' size="small"
              onClick={() =>this.handleFrench()}
              >
              {french? "Anglais": "French"}
        </Button>
        <Button color="black" size="small"
              onClick={() => this.handleOpen(false)}
              >
              {french? "Fermer":"Close"}
        </Button>

        </Modal.Actions>
      </Modal>
    )
  }
}

/*
"Cette application est basée sur la base de données Google Cloud et sur la carte GPS.
  Il gère les clients, les prospects, les commandes, les contrats, les factures, les paiements, les livraisons, les camions.
  Il se compose de trois parties: port de gestion pour le bureau (Google Chrome est suggéré), application Apple et application Android pour les employés.
  Il prend en charge l'anglais et le français. Nous offrons un mois gratuit pour le procès.
  Vous pouvez commencer par enregistrer et configurer votre propre base de données,
  ou vous pouvez nous contacter (duty2go@gmail.com).
  Nous allons configurer un compte de test et une base de données pour vous."
:
"This application is based on Google cloud database and gps map.
 It manages clients, leads, workorders, contracts, invoices, payments, deliveies, trucks.
 It comes in three parts: management port for office desktop (Chrome is suggested), Apple app and Android app for employees.
 It supports both English and French. We offer a free month for trial.
 You can start with registering and setting up your own database,
 or you can contact us (duty2go@gmail.com).
 We will set up a testing account and database for you.
 ";
 */
