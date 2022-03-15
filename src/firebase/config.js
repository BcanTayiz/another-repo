import {initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyAMc4yImchYasLtcHN4T4r3tOS5M_meUVA",
  authDomain: "reading-list-ninja.firebaseapp.com",
  projectId: "reading-list-ninja",
  storageBucket: "reading-list-ninja.appspot.com",
  messagingSenderId: "559871725441",
  appId: "1:559871725441:web:b66e2b1145157915e7a280"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

export {db}