// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth , GoogleAuthProvider} from "firebase/auth"

// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAbV7ky_p7_jNoPXDBDFDzJGRfJYyKVnU",
  authDomain: "todolist-19236.firebaseapp.com",
  projectId: "todolist-19236",
  storageBucket: "todolist-19236.appspot.com",
  messagingSenderId: "73385957592",
  appId: "1:73385957592:web:aa28a3393c714a3d9b1fad",
  measurementId: "G-B2Z8MLBV81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); 
export const googleProvider = new GoogleAuthProvider();
 