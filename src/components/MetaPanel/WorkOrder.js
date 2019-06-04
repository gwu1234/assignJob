import React from "react";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { Menu, Image} from "semantic-ui-react";
//import Client from "./Client";
import "./WorkOrder.css";
import EditOrderModal from "./EditOrderModal";
import PhotoViewModal from "./PhotoViewModal";


class WorkOrder extends React.Component {

   state = {
     clientsStyle: {
       visibility: 'hidden',
       height: "2px",
     },
     orderId: null,
     work: null,
     isRepeat: null,
     repeatTimes: null,
     deliveryTimes: null,
     thumbPath: null,
     photoPath: null,
     thumbs: [],
     status: null,
   };

   componentDidMount() {
     const { usertag, order, deliverys} = this.props;
     const {clientTag, orderKey, photo} = order;
     let {thumbs} = this.state;
     //const {order} = this.props;
     //const {photo} = order;

     //console.log(photo);
     let deliveryTimes = 0 ;
     for (var key in deliverys) {
        if (orderKey === deliverys[key].linkedOrderKey) {
           deliveryTimes ++;
        }
     }

     const isRepeat = order.isRepeat?(order.isRepeat==="true"?true:false):false;
     //const previousDelivery = order.previousDelivery?parseInt (order.previousDelivery):0 ;
     //const presentDelivery = order.presentDelivery? parseInt (order.presentDelivery):0 ;
     //const deliverys = previousDelivery + presentDelivery;
     let repeatTimes = 0;
     if (order.repeatTimes !== "undefined") {
        repeatTimes = order.repeatTimes?parseInt(order.repeatTimes):0;
     }

     let status = "NEW";
     if (isRepeat){
       if (deliveryTimes >= repeatTimes) {
         status = "DONE";
       } else if (deliveryTimes > 0) {
         status = "PROGRESS";
       }
     } else if (deliveryTimes >=1) {
        status = "DONE";
     }

     this.setState ({
          ...this.state,
          orderId: order.orderId,
          work: order.work,
          isRepeat: isRepeat,
          repeatTimes: repeatTimes,
          deliveryTimes: deliveryTimes,
          status: status,
      });

       //const { usertag, order} = this.props;
       //const {clientTag, orderKey} = order;
       const thumbPath = usertag + "/" + clientTag + "/" + orderKey + "/thumb";
       const photoPath = usertag + "/" + clientTag + "/" + orderKey + "/photo";
       //this.setState ({thumbPath: thumbPath, photoPath: photoPath});
       //const {photoPath} = this.state;
       //console.log(photoPath);
       for (var photokey in photo) {
          //console.log("photokey = " + photokey);
          //console.log("photoTag =" + photo[photokey].photoTag);
          const photoName = photokey + ".jpg"

          const storage = firebase.storage();
          const thumbRef = storage.ref(thumbPath);
          //const sessionId = String(new Date().getTime());
          //const photoRef = storage.ref(photoPath).child("photo").child(sessionId).child("photo.jpg");
          //const thumbRef = storage.ref(photoPath).child("thumb").child(sessionId).child("thumb.jpg");
          thumbRef.child(photo[photokey].photoTag).child(photoName).getDownloadURL().then((url) =>{
          // `url` is the download URL for 'images/stars.jpg'
          //console.log("key = " + key);
          //console.log("photoTag =" + photo[key].photoTag);
          const jpg = url.lastIndexOf(".jpg", url.length);
          const p2f = url.lastIndexOf("%2F", url.length) + 3;
          const subUrl = url.slice(p2f, jpg);
          //console.log("suburl = " + subUrl);
          //console.log(url);

          thumbs.push ({photoTag: subUrl, url: url});
          //this.props.setThumbs(thumbs);
          //this.props.setClients(clients);
          //setThumbs
          //console.log(thumbs);
          this.setState({...this.state, thumbs: thumbs});
          // This can be downloaded directly:
          /*var xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = function(event) {
                 var blob = xhr.response;
          };
          xhr.open('GET', url);
          xhr.send();*/

          // Or inserted into an <img> element:
          //var img = document.getElementById('myimg');
          //img.src = url;
       }).catch(function(error) {
           console.log(error);
       });
     };

     /*this.setState ({
          ...this.state,
          orderId: order.orderId,
          work: order.work,
          isRepeat: isRepeat,
          repeatTimes: repeatTimes,
          deliverys: deliverys,
          status: status,
          //thumbs: thumbs,
      });*/
  }


  //{this.displayThumbs()}
  displayThumbs = thumbs => {
    const {usertag, order} = this.props;
    const {clientTag, orderKey} = order;
     //console.log("onImagePress");
     //console.log("clientTag = " + clientTag);
     //console.log("orderKey = " + orderKey);
     //console.log("photoTag = " + photoTag);
     //const photoName = photoTag + ".jpg";
     //const photoPath = usertag + "/" + clientTag + "/" + orderKey + "/photo/" + photoTag + "/" + photoName;
     //console.log("photoPath = ");
     //console.log(photoPath);
     if (thumbs.length > 0 ) {
       return (thumbs.map(thumb => {
          const photoName = thumb.photoTag + ".jpg";
          const photoPath = usertag + "/" + clientTag + "/" + orderKey + "/photo/" + thumb.photoTag + "/" + photoName;
          const thumbPath = usertag + "/" + clientTag + "/" + orderKey + "/thumb/" + thumb.photoTag + "/" + photoName;
          //console.log("photoPath = ");
          //console.log(photoPath);
          //console.log("photoName = ");
          //console.log(photoName);
          //console.log("thumbPath = ");
          //console.log(thumb.url);
          return (<PhotoViewModal
                    url={thumb.url}
                    key={thumb.photoTag}
                    photoPath = {photoPath}
                    photoName = {photoName}
                    thumbPath = {thumbPath}
                    french = {this.props.french}
                    usertag = {usertag}
                    clienttag = {clientTag}
                    ordertag = {orderKey}
                    phototag = {thumb.photoTag}
                  />);
     }));
   };
}


  render() {
    const {order, orderKey, french} = this.props;
    const {thumbs, status, isRepeat, repeatTimes, deliveryTimes} = this.state;
    //console.log("Clients List = ");
    //console.log ("orderId in order = " + order["orderId"]);
    //console.log ("orderKey in order = " + order["orderKey"]);
    //console.log("order isActive = " + order["isActive"]);
    //display && clients && this.displayClients(clients)}
    let orderDate = "";
    let orderWork = "";
    if (order) {
        orderDate = order.date;
        orderWork = order.work;
    }

    //const isActive = (order.orderId && order.orderId === activeOrderId) ||
    //                 (order.orderKey && order.orderKey === activeOrderKey) ;

    const isActive = order.isActive === true || order.isActive === "true";

    return (
      <Menu.Menu style = {isActive?
            thumbs.length> 0? {...styles.container, ...styles.active, ...styles.thumb}:
            {...styles.container, ...styles.active}
            :
            thumbs.length> 0? {...styles.container, ...styles.thumb}: {...styles.container}
      }>
          {orderDate && <Menu.Item style = {isActive? styles.activeItem:styles.item}>
              <span> Date: {orderDate} </span> <EditOrderModal order={order} orderKey={orderKey} />
          </Menu.Item>}
          {orderWork && <Menu.Item  style = {isActive? styles.activeItem:styles.item}>
              Work: {orderWork}
          </Menu.Item>}
          <Menu.Item  style = {isActive? styles.activeItem:styles.item}>
              Is Repeatable: {String(isRepeat)}
          </Menu.Item>
          <Menu.Item  style = {isActive? styles.activeItem:styles.item}>
              Repeat Time: {repeatTimes}
          </Menu.Item>
          <Menu.Item  style = {isActive? styles.activeItem:styles.item}>
              Delivery Time: {deliveryTimes}
          </Menu.Item>
          {status && <Menu.Item  style = {isActive? styles.activeItem:styles.item}>
              Status: {status}
          </Menu.Item>}
          {thumbs.length > 0 && <Menu.Item style = {isActive? styles.activeItem:styles.item }>
               photos: {thumbs.length}
          </Menu.Item>}
          {thumbs.length > 0 && <Menu style={styles.picMenu}>
               {this.displayThumbs(thumbs)}
        </Menu>}
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
    borderWidth:"3px",
    borderColor:"#b0caf4",
    height:"95px",
  },
  active: {
    backgroundColor: "rgba(0,255,0,0.1)",
  },
  thumb: {
    height:"180px",
  },
  item: {
    paddingTop: "1px",
    paddingBottom: "1px",
    fontSize: "0.8em",
    fontWeight: "normal",
    color: "black",
    opacity: 1.0,
  },
  activeItem: {
    paddingTop: "1px",
    paddingBottom: "1px",
    fontSize: "0.8em",
    fontWeight: "bold",
    color: "black",
    opacity: 1.0,
  },
  picMenu: {
    width:"90%",
    position: "relative",
    marginTop:"10px",
    marginLeft:"15px",
    marginRight:"20px",
    overflow: "scroll",
    backgroundColor: "rgba(0,255,0,0.1)",
  },
};

const mapStateToProps = state => {
   const reposData = state.user.reposData;
   const usertag = state.user.usertag;
   const clienttag = state.user.clienttag;
   let deliverys = null;
   //console.log(clienttag);
   if (clienttag) {
       //const clientContact = reposData["clients"]["data"][clienttag]["contact"];
       if (reposData["clients"]["data"][clienttag]) {
            deliverys = reposData["clients"]["data"][clienttag]?
            reposData["clients"]["data"][clienttag]["deliverys"]: {};
       }
   }
   return {
     deliverys: deliverys,
   }
};

export default connect(
  mapStateToProps,
  {}
)(WorkOrder);

//export default WorkOrder;
