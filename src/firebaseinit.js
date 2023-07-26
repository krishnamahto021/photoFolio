// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZurYrfeZjw2Y0tWeL-iDPM19FRhUQFN0",
  authDomain: "photofolio-75614.firebaseapp.com",
  projectId: "photofolio-75614",
  storageBucket: "photofolio-75614.appspot.com",
  messagingSenderId: "127446660288",
  appId: "1:127446660288:web:6d9e1623daabc39bb2a925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);