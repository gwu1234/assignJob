import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import registerServiceWorker from "./registerServiceWorker";
import firebase from "./firebase";
import DialogModal from './components/SidePanel/DialogModal';
//import BasicModal from './components/SidePanel/BasicModal';

import "semantic-ui-css/semantic.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import { setUser, clearUser } from "./actions";

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
  state = {
    modal: true,
    registering: false
  };

  componentDidMount() {
    this.props.clearUser();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const creationDate = new Date (user.metadata.creationTime);
        const creationTime = creationDate.getTime()/1000;
        //console.log ("creationTime " + creationTime) ;

        const loginDate = new Date (user.metadata.lastSignInTime);
        //console.log ("loginDate = "  + loginDate);
        const loginTime = loginDate.getTime()/1000;
        //console.log ("loginTime " + loginTime) ;

        this.props.setUser(user);

        // just registered
        if ( loginTime === creationTime ){
           //this.props.history.push("/login");
           //this.props.clearUser();
           //console.log ("signout and open modal ") ;
           //this.props.history.push("/modal");
           this.setState({ registering: true});
           firebase.auth().signOut()
              //.then(() => this.props.history.push("/modal"));
             //.then(() => alert("Registration Success: Login in 3 Minutes"));
             .then(() => console.log("logout"));

        } else {
           //console.log("different time stamp");
           this.props.history.push("/");
        }
      } else {
        console.log ("no user object");
        if (this.state.registering) {
             this.props.history.push("/modal");
             this.setState({ registering: false});
        }
        else {
           this.props.history.push("/login");
        }
        this.props.clearUser();
      }
    });
  }

  render() {
    return this.props.isLoading ? (
      <Spinner/>
    ) : (
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/modal" component={DialogModal} />
      </Switch> );
  }
}

const mapStateFromProps = state => ({
  isLoading: state.user.isLoading,
  modal: state.user.modal
});

const RootWithAuth = withRouter(
  connect(
    mapStateFromProps,
    { setUser, clearUser }
  )(Root)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
