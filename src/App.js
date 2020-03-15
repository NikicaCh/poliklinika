import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import SignIn from './components/sign-in';
import SignUp from './components/sign-up';
import Home from './components/Home';
import Test from './components/Test';
import firebase from 'firebase'



const App = () => {
  const app = firebase.initializeApp({
    apiKey: "AIzaSyCMlCav2dPViZ8sFxly3rEWDPKUewK6LIM",
    authDomain: "poliklinika-76246.firebaseapp.com",
    databaseURL: "https://poliklinika-76246.firebaseio.com",
    projectId: "poliklinika-76246",
    storageBucket: "poliklinika-76246.appspot.com",
    messagingSenderId: "475443803919",
    appId: "1:475443803919:web:947e3c975ca0466abd707a"
  });
  const db = firebase.firestore(app);
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SignIn}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/home" component={() => {return <Home db={db} />}} />
          <Route exact path="/test" component={Test}/>
        </Switch>
      </BrowserRouter>

      {/* <h1>Poliklinika</h1> */}
      {/* {data} */}
    </div>
  );
}

export default App;
