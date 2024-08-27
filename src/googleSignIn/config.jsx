// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzUzS-YqtJTvxIltj0POmAUUzYZHXahHI",
  authDomain: "alter-company.firebaseapp.com",
  projectId: "alter-company",
  storageBucket: "alter-company.appspot.com",
  messagingSenderId: "1007238424595",
  appId: "1:1007238424595:web:af0adce1cc05d6887f77e6",
  measurementId: "G-L1WEQH2BML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const imageDb = getStorage(app);
export {auth, provider, imageDb};