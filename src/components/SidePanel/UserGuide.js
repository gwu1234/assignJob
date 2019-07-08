import React from 'react';
import firebase from "../../firebase";
import { Button, Header, Icon, Modal, Menu, Confirm} from 'semantic-ui-react';

const usercases = [
{
title: <h4> Case 1:  toggle French and English</h4>,
content:  <p> Steps:
          (1) click French or Anglais to toggle French and English </p>
},
{
title : <h4> Case 2:  View Company Contact Info </h4>,
content:  <p> Steps:
          (1) click Company, then Company Info;
          (2) the left column display Company Contact Info </p>
},
{
title : <h4> Case 3:  View and Close User Guide </h4>,
content:  <p> Steps:
          (1) click Setting, then User Guide;
          (2) click Close on the bottom to close </p>
},
{
title: <h4> Case 4:  Edit  Company Contact Info </h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the left column display Company Contact Info;
          (3) click the button next to Edit Company Info;
          (4) a Popup window should show up;
          (5) edit the info;
          (6) click Submit to update, and Cancel to cancel </p>
},
{
title: <h4>Case 5:  View Employee List </h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the middle column display employee List </p>
},
{
title: <h4>Case 6:  View Employee Contact Info</h4>,
content:  <p>   Steps:
          (1) click Company, then Company Info;
          (2) the middle column display employee List;
          (3) click the name of employee;
          (4) the section will be expanded to display contact info of that employee </p>
},
{
title: <h4>Case 7:  Edit Employee Info </h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the middle column display employee List;
          (3) click the button to the right of employee name;
          (4) a Popup window will show up;
          (5) update employee info </p>
},
{
title: <h4>Case 8:  Delete Employee Record </h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the middle column display employee List;
          (3) click the button to the right of employee name;
          (4) the edit popup window will show up;
          (5) click the red button on the left side of the bottom to delete;
          (6) you need to remove all the truck and clients assigned to this employee before deleting </p>
},
{
title: <h4> Case 9:  View Truck List</h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          </p>
},
{
title: <h4> Case 10:  Edit Truck Record </h4>,
content: <p>     Steps:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) edit info to update </p>
},
{
title: <h4>Case 11:  Assign a truck to un employee </h4>,
content: <p>      Steps:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click + sign to the right of employee name to assign </p>
},
{
title: <h4> Case 12:  Remove assignment of  a truck from an  employee </h4>,
content: <p>      Steps:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click - sign to the right of employee name to remove assignment </p>
},
{title:<h4>
Case 13:  delete a truck record </h4>,
content: <p>      Steps:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click red X sign on the left side of bottom to delete record;
          (6) follow the prompts of confirmation dialog window
</p>},
{title:<h4>
Case 14: find where a truck is </h4>,
content: <p>      Steps:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) trucks in colours are active: their GPS location updated within last 5 minutes;
          (4) black trucks are “not active”: their GPS location not updated for the last 5 minutes
</p>},
{title:<h4>
Case 15: find who is driving a truck </h4>,
content: <p>      Steps:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) click on a truck icon;
          (4) a popup window will show up, displaying details such as employee name etc
</p>},
{title:<h4>
Case 16: find the last time a truck updates its GPS location </h4>,
content: <p>       Steps:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) click on a truck icon;
          (4) a popup window will show up, displaying a time string when GPS was last updated
</p>},
{title:<h4>
Case 17:  Display Client Contact Info </h4>,
content: <p>      Steps:
          (1) Clients;
          (2) select Client Contact;
          (3) select a client on the Left Column;
          (4) the right Column should display client contact information
</p>},
{title:<h4>
Case 18:  Edit Client Contact Info </h4>,
content: <p>      Steps:
          (1) Clients;
          (2) select Client Contact;
          (3) select a client on the Left Column;
          (4) the right Column should display client contact information;
          (5) click a  button to the right of Edit Client Contact at the bottom of the right column;
          (6) a Popup window shows up;
          (7) edit the fields;
          (8) Click Submit to update, Cancel to cancel the changes;
</p>},
{title:<h4>
Case 19:  Display Client history </h4>,
content: <p>      Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (4) all work orders, contracts, invoices, payments and deliveries show up;
          (5) highlighted backgrounds indicate active worker orders and associated contracts, etc.
</p>},
{title:<h4>
 Case 20: Work Order Characters </h4>,
content: <p> (1) Status: JOB_NEW, JOB_PROGRESS, JOB_DONE;
             (2) Repeat Orders or not, isRepeatable: true or false;
		         (3) repeatTimes, repeat times if it is a repeat order,
                meaningless if it is not a repeat order;
             (4) Delivery Times: Deliveries made for this work order
</p>},
{title:<h4>
Case 21: View Client’s Work Order List </h4>,
content: <p>  Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) vertically scroll in the window of Work Orders
</p>},
{title:<h4>
Case 22: View photos associated with work orders </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) horizontally scroll thumbnails of photos;
          (6) click one of of thumbnail, a large image will show up
</p>},
{title:<h4>
Case 23: edit work orders </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the button in the top right in the work order window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Case 24: assign work order to employee </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right;
          (6) a popup window will show up to edit;
          (7) select an employee name to assign
</p>},
{title:<h4>
Case 25: remove assignment of a work order from employee </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of work order window;
          (6) a popup window will show up to edit;
          (7) select REMOVE ASSIGNMENT
</p>},
{title:<h4>
Case 26: view photo attached to a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click on a thumbnail in work order window;
          (6) a popup window will show up to display a large image
</p>},
{title:<h4>
Case 27: delete a photo from a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click on a thumbnail in work order window;
          (6) a popup window will show up to display a large image;
          (7) click on red button on the left side of the bottom;
          (8) a read warming dialog will popup, click submit
</p>},
{title:<h4>
Case 28: edit contract </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Case 29: link contract to a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Case 30: remove link of contract from a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of contract with work order
</p>},
{title:<h4>
Case 31: edit invoice </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Case 32: link invoice to a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Case 33: remove link of invoice  from a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice  window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of invoice with work order
</p>},
{title:<h4>
Case 34: edit payment </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Case 35: link payment to a work order </h4>,
content: <p>Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Case 36: remove link of payment from a work order </h4>,
content: <p>Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of payment with work order
</p>},
{title:<h4>
Case 37: edit delivery </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
</p>},
{title:<h4>
Case 38: link delivery to a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Case 39: remove link of delivery  from a work order </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of invoice with work order
</p>},
{title:<h4>
Case 40: view lead list </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) lead of  LEAD_POSITIVE  on top;
          (5) lead of  LEAD_DECLINE on bottom
</p>},
{title:<h4>
Case 41: lead status </h4>,
content: <p>          (1) LEAD_POSITIVE,
          (2) LEAD_RESPONSIVE,
          (3) LEAD_NEW,
          (4) LEAD_NOT_RESPONSIVE,
          (5) LEAD_DECLINE
</p>},
{title:<h4>
Case 42: edit lead </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) click on a button on top right of Lead Contact Window;
          (6) a popup window show up;
          (7) edit lead contact, status, and assignment
</p>},
{title:<h4>
Case 43: lead activity log </h4>,
content: <p> Steps:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) Lead Activity window is a list of activity logs;
          (6) the top is the latest, the bottom is the oldest
</p>},
{title:<h4>
Case 44: create a pdf quote for a lead </h4>,
content: <p>Steps:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) fill the fields in the left column;
          (6) click Save as PDF;
          (7) a pdf file saved at directory Download;
          (8) filename is companyName- followed by year, month, day and time
</p>},
{title:<h4>
Case 45: display work orders  on map </h4>,
content: <p>Steps:
          (1) MapView;
          (2) select All Clients;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ,
</p>},
{title:<h4>
Case 46: view details of  work orders on map </h4>,
content: <p> Steps:
          (1) mouse over a dot  for brief information such as name and address;
          (2) click on a dot for more details
</p>},
{title:<h4>
Case 47: display all  employees on map </h4>,
content: <p> Steps:
          (1) MapView;
          (2) select All Employees;
          (3) a marker represent address of an employee;
          (4) mouse over a marker will bring up a popup window displaying employee name
</p>},
{title:<h4>
Case 48: display work orders  not assigned to any employee </h4>,
content: <p>Steps:
          (1) MapView;
          (2) select Not Assigned;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ;
         (4) mouse over a dot  for brief information such as name and address;
         (5) click on a dot for more details
</p>},
{title:<h4>
Case 49: display work orders  assigned to any employee </h4>,
content: <p> Steps:
          (1) MapView;
          (2) select Job: Employee Name;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ,
         (4) mouse over a dot  for brief information such as name and address;
         (5) click on a dot for more details
</p>},
{title:<h4>
Case 50: display leads on map </h4>,
content: <p>Steps:
          (1) MapView;
          (2) select All Leads;
          (3) symbols:
                 LEAD_POSITIVE: Green Dot ,
                 LEAD_RESPONSIVE : Blue Dot ,
                 LEAD_NEW:  Red Dot ,
                 LEAD_NOT_RESPONSIVE: Orange Dot ,
                 LEAD_DECLINE: Yellow Dot ,
         (4) mouse over a dot  for brief information;
         (5) click on a dot for more details
</p>},
{title:<h4>
Case 51:  generating leads on map </h4>,
content: <p>     Steps:
          (1) MapView;
          (2) select any of All Client, All Leads, Employees etc;
          (3) enlarge map until you can see a house very clear;
          (4) click on a house, you will see a PopUp Window with address;
          (5) click on the Button (Create Lead) to create a lead;
          (6) click on the Button (Close) to cancel the operation;
          (7) you should see the new Lead at TextView/Leads, or MapView/Lead
</p>},
{title:<h4>
Case 52:  workorders assigned to an employee </h4>,
content: <p>     Steps:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
</p>},
{title:<h4>
Case 53:  brief of assigned work order </h4>,
content: <p>     Steps:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the left column is brief introduction of assigned work order
</p>},
{title:<h4>
Case 54:  coworkers of assigned work order </h4>,
content: <p>     Steps:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the middle column is list of coworkers for assigned work order
</p>},
{title:<h4>
Case 55:  deliveries of assigned work order </h4>,
content: <p>     Steps:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the righ column is list of deliveries for assigned work order
</p>}
];

const frenchusercases = [
{
title: <h4> Cas 1:  basculer le français et l'anglais</h4>,
content:  <p> étapes:
          (1) cliquez sur Français ou Anglais pour basculer entre le français et l'anglais </p>
},
{
title : <h4> Cas 2:  Voir les informations de contact de la compagnie </h4>,
content:  <p> étapes:
          (1) cliquez sur compagnie, puis sur Informations sur la compagnie;
          (2) la colonne de gauche affiche les informations de la compagnie </p>
},
{
title : <h4> Cas 3:  Afficher et fermer le guide de l'utilisateur </h4>,
content:  <p> étapes:
          (1) cliquez sur Cadre, then User Guide;
          (2) cliquez sur Fermer en bas pour fermer </p>
},
{
title: <h4> Cas 4:  Modifier les coordonnées de la compagnie </h4>,
content: <p>  étapes:
          (1) cliquez sur Compagnie, puis sur Informations sur la compagnie;
          (2) la colonne de gauche affiche les coordonnées de la compagnie;
          (3) cliquez sur le bouton en regard de Modifier les informations sur la compagnie;
          (4) une fenêtre pop-up devrait apparaître;
          (5) éditer l'info;
          (6) cliquez sur Soumettre pour mettre à jour et sur Annuler pour annuler </p>
},
{
title: <h4>Cas 5:  Voir la liste des employés </h4>,
content: <p>     étapes:
          (1) cliquez sur Compagnie, puis sur Informations sur la compagnie;
          (2) la colonne du milieu affiche la liste des employés </p>
},
{
title: <h4>Cas 6:  Afficher les coordonnées des employés</h4>,
content:  <p>  étapes:
          (1) cliquez sur compagnie, puis sur Informations sur la compagnie;
          (2) la colonne du milieu affiche la liste des employés;
          (3) cliquez sur le nom de l'employé;
          (4) la section sera développée pour afficher les coordonnées de cet employé </p>
},
{
title: <h4>Cas 7:  Modifier les informations sur les employés </h4>,
content: <p>     étapes:
          (1) cliquez sur Compagnie, puis sur Informations sur la compagnie;
          (2) la colonne du milieu affiche la liste des employés;
          (3) cliquez sur le bouton situé à droite du nom de l’employé;
          (4) une fenêtre contextuelle apparaîtra;
          (5) mettez à jour les informations sur les employés
          </p>
},
{
title: <h4>Cas 8:  Supprimer la fiche de l'employé </h4>,
content: <p>  étapes:
           (1) cliquez sur Compagnie, puis sur Informations sur la compagnie;
           (2) la colonne du milieu affiche la liste des employés;
           (3) cliquez sur le bouton à droite du nom de l'employé;
           (4) la fenêtre contextuelle d'édition apparaîtra;
           (5) cliquez sur le bouton rouge sur le côté gauche du bas pour supprimer;
           (6) vous devez supprimer tout le camion et les clients affectés à cet employé avant de supprimer
          </p>
},
{
title: <h4> Cas 9:  Voir la liste des camions</h4>,
content: <p>   étapes:
           (1) cliquez sur Compagnie, puis sur Informations sur la compagnie;
           (2) la liste des camions d'affichage de la colonne de droite;
           </p>
},
{
title: <h4> Cas 10:  Modifier un enregistrement de camion </h4>,
content: <p>    étapes:
           (1) cliquez sur Société, puis sur Informations sur la société;
           (2) la liste des camions d'affichage de la colonne de droite;
           (3) cliquez sur le bouton à droite du nom du camion;
           (4) la fenêtre contextuelle d'édition apparaîtra;
           (5) modifier les informations à mettre à jour
           </p>
},
{
title: <h4>Cas 11:  Assign a truck to un employee </h4>,
content: <p>      étapes:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click + sign to the right of employee name to assign </p>
},
{
title: <h4> Cas 12:  Remove assignment of  a truck from an  employee </h4>,
content: <p>      étapes:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click - sign to the right of employee name to remove assignment </p>
},
{title:<h4>
Cas 13:  delete a truck record </h4>,
content: <p>      étapes:
          (1) click Company, then Company Info;
          (2) the right column display truck List;
          (3) click the button to the right of truck name;
          (4) the edit popup window will show up;
          (5) click red X sign on the left side of bottom to delete record;
          (6) follow the prompts of confirmation dialog window
</p>},
{title:<h4>
Cas 14: find where a truck is </h4>,
content: <p>      étapes:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) trucks in colours are active: their GPS location updated within last 5 minutes;
          (4) black trucks are “not active”: their GPS location not updated for the last 5 minutes
</p>},
{title:<h4>
Cas 15: find who is driving a truck </h4>,
content: <p>      étapes:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) click on a truck icon;
          (4) a popup window will show up, displaying details such as employee name etc
</p>},
{title:<h4>
Cas 16: find the last time a truck updates its GPS location </h4>,
content: <p>       étapes:
          (1) click MapView, then All Clients;
          (2) truck icon mark the truck locations;
          (3) click on a truck icon;
          (4) a popup window will show up, displaying a time string when GPS was last updated
</p>},
{title:<h4>
Cas 17:  Display Client Contact Info </h4>,
content: <p>      étapes:
          (1) Clients;
          (2) select Client Contact;
          (3) select a client on the Left Column;
          (4) the right Column should display client contact information
</p>},
{title:<h4>
Cas 18:  Edit Client Contact Info </h4>,
content: <p>      étapes:
          (1) Clients;
          (2) select Client Contact;
          (3) select a client on the Left Column;
          (4) the right Column should display client contact information;
          (5) click a  button to the right of Edit Client Contact at the bottom of the right column;
          (6) a Popup window shows up;
          (7) edit the fields;
          (8) Click Submit to update, Cancel to cancel the changes;
</p>},
{title:<h4>
Cas 19:  Display Client history </h4>,
content: <p>      étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (4) all work orders, contracts, invoices, payments and deliveries show up;
          (5) highlighted backgrounds indicate active worker orders and associated contracts, etc.
</p>},
{title:<h4>
 Cas 20: Work Order Characters </h4>,
content: <p> (1) Status: JOB_NEW, JOB_PROGRESS, JOB_DONE;
             (2) Repeat Orders or not, isRepeatable: true or false;
		         (3) repeatTimes, repeat times if it is a repeat order,
                meaningless if it is not a repeat order;
             (4) Delivery Times: Deliveries made for this work order
</p>},
{title:<h4>
Cas 21: View Client’s Work Order List </h4>,
content: <p>  étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) vertically scroll in the window of Work Orders
</p>},
{title:<h4>
Cas 22: View photos associated with work orders </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) horizontally scroll thumbnails of photos;
          (6) click one of of thumbnail, a large image will show up
</p>},
{title:<h4>
Cas 23: edit work orders </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the button in the top right in the work order window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Cas 24: assign work order to employee </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right;
          (6) a popup window will show up to edit;
          (7) select an employee name to assign
</p>},
{title:<h4>
Cas 25: remove assignment of a work order from employee </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of work order window;
          (6) a popup window will show up to edit;
          (7) select REMOVE ASSIGNMENT
</p>},
{title:<h4>
Cas 26: view photo attached to a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click on a thumbnail in work order window;
          (6) a popup window will show up to display a large image
</p>},
{title:<h4>
Cas 27: delete a photo from a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click on a thumbnail in work order window;
          (6) a popup window will show up to display a large image;
          (7) click on red button on the left side of the bottom;
          (8) a read warming dialog will popup, click submit
</p>},
{title:<h4>
Cas 28: edit contract </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Cas 29: link contract to a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Cas 30: remove link of contract from a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of contract window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of contract with work order
</p>},
{title:<h4>
Cas 31: edit invoice </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Cas 32: link invoice to a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Cas 33: remove link of invoice  from a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of invoice  window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of invoice with work order
</p>},
{title:<h4>
Cas 34: edit payment </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit
</p>},
{title:<h4>
Cas 35: link payment to a work order </h4>,
content: <p>étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Cas 36: remove link of payment from a work order </h4>,
content: <p>étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of payment window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of payment with work order
</p>},
{title:<h4>
Cas 37: edit delivery </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
</p>},
{title:<h4>
Cas 38: link delivery to a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
          (7) select an work order to link
</p>},
{title:<h4>
Cas 39: remove link of delivery  from a work order </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select Client Work Order;
          (3) Left Column is list of clients;
          (4) click on a client name;
          (5) click the edit button in the top right of delivery window;
          (6) a popup window will show up to edit;
          (7) select “no order” to remove the link of invoice with work order
</p>},
{title:<h4>
Cas 40: view lead list </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) lead of  LEAD_POSITIVE  on top;
          (5) lead of  LEAD_DECLINE on bottom
</p>},
{title:<h4>
Cas 41: lead status </h4>,
content: <p>          (1) LEAD_POSITIVE,
          (2) LEAD_RESPONSIVE,
          (3) LEAD_NEW,
          (4) LEAD_NOT_RESPONSIVE,
          (5) LEAD_DECLINE
</p>},
{title:<h4>
Cas 42: edit lead </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) click on a button on top right of Lead Contact Window;
          (6) a popup window show up;
          (7) edit lead contact, status, and assignment
</p>},
{title:<h4>
Cas 43: lead activity log </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) Lead Activity window is a list of activity logs;
          (6) the top is the latest, the bottom is the oldest
</p>},
{title:<h4>
Cas 44: create a pdf quote for a lead </h4>,
content: <p> étapes:
          (1) Clients;
          (2) select leads;
          (3) Left Column is list of leads;
          (4) click on a lead;
          (5) fill the fields in the left column;
          (6) click Save as PDF;
          (7) a pdf file saved at directory Download;
          (8) filename is companyName- followed by year, month, day and time
</p>},
{title:<h4>
Cas 45: display work orders  on map </h4>,
content: <p> étapes:
          (1) MapView;
          (2) select All Clients;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ,
</p>},
{title:<h4>
Cas 46: view details of  work orders on map </h4>,
content: <p> étapes:
          (1) mouse over a dot  for brief information such as name and address;
          (2) click on a dot for more details
</p>},
{title:<h4>
Cas 47: display all  employees on map </h4>,
content: <p> étapes:
          (1) MapView;
          (2) select All Employees;
          (3) a marker represent address of an employee;
          (4) mouse over a marker will bring up a popup window displaying employee name
</p>},
{title:<h4>
Cas 48: display work orders  not assigned to any employee </h4>,
content: <p> étapes:
          (1) MapView;
          (2) select Not Assigned;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ;
         (4) mouse over a dot  for brief information such as name and address;
         (5) click on a dot for more details
</p>},
{title:<h4>
Cas 49: display work orders  assigned to any employee </h4>,
content: <p> étapes:
          (1) MapView;
          (2) select Job: Employee Name;
          (3) symbols:
                JOB_NEW:   Red Dot ,
                JOB_PROGRESS: Blue Dot ,
                JOB_DONE: Green Dot ,
                JOB_NOT_ACTIVE: Yellow Dot ,
         (4) mouse over a dot  for brief information such as name and address;
         (5) click on a dot for more details
</p>},
{title:<h4>
Cas 50: display leads on map </h4>,
content: <p> étapes:
          (1) MapView;
          (2) select All Leads;
          (3) symbols:
                 LEAD_POSITIVE: Green Dot ,
                 LEAD_RESPONSIVE : Blue Dot ,
                 LEAD_NEW:  Red Dot ,
                 LEAD_NOT_RESPONSIVE: Orange Dot ,
                 LEAD_DECLINE: Yellow Dot ,
         (4) mouse over a dot  for brief information;
         (5) click on a dot for more details
</p>},
{title:<h4>
Cas 51:  generating leads on map </h4>,
content: <p>    étapes:
          (1) MapView;
          (2) select any of All Client, All Leads, Employees etc;
          (3) enlarge map until you can see a house very clear;
          (4) click on a house, you will see a PopUp Window with address;
          (5) click on the Button (Create Lead) to create a lead;
          (6) click on the Button (Close) to cancel the operation;
          (7) you should see the new Lead at TextView/Leads, or MapView/Lead
</p>},
{title:<h4>
Cas 52:  workorders assigned to an employee </h4>,
content: <p>     étapes:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
</p>},
{title:<h4>
Cas 53:  brief of assigned work order </h4>,
content: <p>     étapes:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the left column is brief introduction of assigned work order
</p>},
{title:<h4>
Cas 54:  coworkers of assigned work order </h4>,
content: <p>     étapes:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the middle column is list of coworkers for assigned work order
</p>},
{title:<h4>
Cas 55:  deliveries of assigned work order </h4>,
content: <p>     étapes:
          (1) Company;
          (2) select employee work order;
          (3) all employees are listed and scrollable;
          (4) section for each employee is a nested scrollable list of work orders assigned to this employee;
          (5) the righ column is list of deliveries for assigned work order
</p>}
];




export default class UserGuide extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
           data: null,
           modalOpen:false,
           open:false,
       };
    }

    handleOpen = (open) => this.setState({ modalOpen: open })
    handleClose =() => {
      this.setState({
        modalOpen: false,
        date:null,
       });
    }

    onButtonClick = () =>{
      this.setState({
        open: true,
       });
    }

    handleCancel =() => {
      this.setState({
         modalOpen: false,
         data: null,
         open:false,
      });
    }

    handleSubmit = () => {
      const event = this.nativeEvent;
      if (event) {
         //console.log(event);
         event.preventDefault();
      }
      //event.preventDefault();
      if (this.isFormValid()) {
         //this.setState({ modalOpen: false })
         //const {repeathour} = this.state;
         //this.props.setRepeatHours(repeathour);
         this.handleClose();
      }
    };




render() {
    const {french} = this.props;


   const conformMsg = "Do you really want to overwrite client database ?";

    return (
      <Modal
        trigger={<span onClick={() => this.handleOpen(true)} style = {styles.item}>
        {french? "User Guide":"User Guide"}</span>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='large'
        style={{background: "#ccc"}}
      >
        <Header content={french? "User Guide": "User Guide"} style = {{fontSize: "1.1em", fontWeight: "bold", color:"black"}}/>

        <Modal.Content style = {styles.menu}>
           {french ? (frenchusercases.map((frenchusercase, i) => (
                 <Menu.Item key = {i} style = {{...styles.item, marginTop:"1.0em"}}>
                      {frenchusercase.title}
                      {frenchusercase.content}
                 </Menu.Item>
                 ))):
                 (usercases.map((usercase, i) => (
                     <Menu.Item key = {i} style = {{...styles.item, marginTop:"1.0em"}}>
                        {usercase.title}
                        {usercase.content}
                     </Menu.Item>
                )))
         }
        </Modal.Content>
        <Modal.Actions>
        <Button color="red" size="small" inverted
              onClick={() => this.handleCancel()}
              style ={{color: "black"}}
              >
              close
        </Button>
         </Modal.Actions>
      </Modal>
  );
 }
}
const styles = {
  item: {
    padding: "1px",
    margin: "1px",
    color: "black",
    fontSize: "1.0em",
    fontWeight: "normal",
  },
  menu: {
    overflow: "scroll",
  }
}
