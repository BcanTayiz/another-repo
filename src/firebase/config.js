import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAgxZCAZd0TurCEPFL6GRyloDjvZoEVJxc",
  authDomain: "react-payments-case.firebaseapp.com",
  projectId: "react-payments-case",
  storageBucket: "react-payments-case.appspot.com",
  messagingSenderId: "806770980165",
  appId: "1:806770980165:web:37f0b4f57fa67eae38fa2c"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

const auth = getAuth()


export {db,auth}