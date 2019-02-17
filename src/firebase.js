import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// slack clone
    /*
    var config = {
    apiKey: "AIzaSyAmfYXa40yo05ww4LYZubzha3UUBrw1M5E",
    authDomain: "react-slack-clone-a6e42.firebaseapp.com",
    databaseURL: "https://react-slack-clone-a6e42.firebaseio.com",
    projectId: "react-slack-clone-a6e42",
    storageBucket: "react-slack-clone-a6e42.appspot.com",
    messagingSenderId: "688291659780"
  };
  firebase.initializeApp(config);

  */

  // slack

  var config = {
    apiKey: "AIzaSyAUdrYEIfQWtrvkFluxpX2dNWc79tnyes0",
    authDomain: "jobassign2.firebaseapp.com",
    databaseURL: "https://jobassign2.firebaseio.com",
    projectId: "jobassign2",
    storageBucket: "jobassign2.appspot.com",
    messagingSenderId: "224391770489"
  };
  firebase.initializeApp(config);


export default firebase;
