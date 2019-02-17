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


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCo3dLTdNpPB22I91PgmYVEVf3WXy92A2g",
    authDomain: "assignjobs-f0801.firebaseapp.com",
    databaseURL: "https://assignjobs-f0801.firebaseio.com",
    projectId: "assignjobs-f0801",
    storageBucket: "assignjobs-f0801.appspot.com",
    messagingSenderId: "536060544639"
  };
  firebase.initializeApp(config);



export default firebase;
