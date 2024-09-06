// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADqhVlMei6dJ5rdUlJoidqsvu6soR2GfQ",
  authDomain: "uclapit.firebaseapp.com",
  projectId: "uclapit",
  storageBucket: "uclapit.appspot.com",
  messagingSenderId: "469784870126",
  appId: "1:469784870126:web:6c3c18e9b41ebb7ea507ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
};
