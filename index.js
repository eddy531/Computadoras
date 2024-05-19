// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDRxFwJiPhTufws1Q8s8GqZDq_GySgWxo",
  authDomain: "computadoras-481b7.firebaseapp.com",
  projectId: "computadoras-481b7",
  storageBucket: "computadoras-481b7.appspot.com",
  messagingSenderId: "744576997492",
  appId: "1:744576997492:web:cf6a1acc350e2291b55921"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const productform = document.getElementById("")