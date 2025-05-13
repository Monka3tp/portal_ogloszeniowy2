// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Yi6nteOZXiOabPORR0CseIlzD_P47ng",
  authDomain: "portal-426b1.firebaseapp.com",
  projectId: "portal-426b1",
  storageBucket: "portal-426b1.appspot.com",
  messagingSenderId: "1004536790908",
  appId: "1:1004536790908:web:a3b726a951fae3f6722ef9",
  measurementId: "G-CM9JCLPLTW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);