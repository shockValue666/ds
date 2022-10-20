// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//"AIzaSyDdG8VhRSpvZmA1u7cmR46c8sTVmwU8MI8"
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "karotsakisupermarket.firebaseapp.com",
    projectId: "karotsakisupermarket",
    storageBucket: "karotsakisupermarket.appspot.com",
    messagingSenderId: "97705320775",
    appId: "1:97705320775:web:9527d55a731f57ff446c62",
    measurementId: "G-EDNLBWZHFS",
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()