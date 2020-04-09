import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBJXyVkjWwIXLMscuHn4pk2kHPURXfB1Yk",
  authDomain: "project-game-show.firebaseapp.com",
  databaseURL: "https://project-game-show.firebaseio.com",
  projectId: "project-game-show",
  storageBucket: "project-game-show.appspot.com",
  messagingSenderId: "629530023684"
};

firebase.initializeApp(config);

export const firestore = firebase.firestore();

window.firebase = firebase;

export default firebase;
