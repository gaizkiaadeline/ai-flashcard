// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getFirebase} from 'firebase-firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAupisSuApd6ThL3TsbybY5_kgZijSFuM4",
  authDomain: "flashcardsaas-9b53f.firebaseapp.com",
  projectId: "flashcardsaas-9b53f",
  storageBucket: "flashcardsaas-9b53f.appspot.com",
  messagingSenderId: "723060252358",
  appId: "1:723060252358:web:8f70556fd95f8647db01c7",
  measurementId: "G-DTPXCVNPKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirebase(app)

export {db}