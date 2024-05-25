
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

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
const auth = getAuth();
auth.languageCode = 'es';

const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn"); 
googleLogin.addEventListener("click", function(){
    signInWithPopup(auth, provider)
    .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;

    console.log(user);
    window.location.href = "https://eddy531.github.io/Computadoras/";

    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    });

})