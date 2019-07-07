import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


  var config = {
      apiKey: "AIzaSyC6mtYTtwmmpyD9TvDsGEUfLnuCuoI97uk",
      authDomain: "duty2go.firebaseapp.com",
      databaseURL: "https://duty2go.firebaseio.com",
      projectId: "duty2go",
      storageBucket: "",
      messagingSenderId: "926351987271",
      appId: "1:926351987271:web:37d33429c5fa5495"
  };
  firebase.initializeApp(config);
export default firebase;
