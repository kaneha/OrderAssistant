import * as firebase from "firebase";

var config = {
  apiKey: "AIzaSyCU31_tEy0I-ILQo9KQknjxrsPjB9vvjPs",
  authDomain: "orderassistant-cf2a5.firebaseapp.com",
  databaseURL: "https://orderassistant-cf2a5.firebaseio.com",
  projectId: "orderassistant-cf2a5",
  storageBucket: "orderassistant-cf2a5.appspot.com",
  messagingSenderId: "861638089110"
};

export const firebaseApp = firebase.initializeApp(config);
