import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


  var config = {
    apiKey: "AIzaSyDuKonQxaHIwr3Luxfl0HEmAIYA0vKwDHg",
    authDomain: "jobassign4.firebaseapp.com",
    databaseURL: "https://jobassign4.firebaseio.com",
    projectId: "jobassign4",
    storageBucket: "jobassign4.appspot.com",
    messagingSenderId: "63214700687",
    appId: "1:63214700687:web:63f29bd2ab3e96d3"
  };
  firebase.initializeApp(config);


export default firebase;
