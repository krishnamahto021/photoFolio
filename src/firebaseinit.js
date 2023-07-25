import { initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnX3WsiOfWEREyyFIYR3cEx3eZ87Os6Ho",
  authDomain: "photofolio-951d6.firebaseapp.com",
  projectId: "photofolio-951d6",
  storageBucket: "photofolio-951d6.appspot.com",
  messagingSenderId: "336289704478",
  appId: "1:336289704478:web:196be4027a44b5b9f5dc0f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);