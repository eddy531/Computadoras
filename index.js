// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
const db = getFirestore(app)

const productform = document.getElementById("formulario");
productform.addEventListener("submit", async(e)=>{
  e.preventDefault();
  await addDoc(collection(db, "productos"),{
    codigo: productform.codigo.value,
    marca: productform.marca.value,
    modelo: productform.modelo.value,
    precio: productform.modelo.value,
    tipo: productform.tipo.value,
    material: productform.material.value,
    color: productform.color.value,
    fechaLanza: productform.fechaLanza.value,
    garantia: productform.garantia.value,
    cantidad: productform.cantidad.value
  });
  productform.reset();
});