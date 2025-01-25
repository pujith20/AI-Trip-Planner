// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1GkWTLtcO849D9JMSR9orD-g7KnZUr48",
  authDomain: "trip-planner-42b3d.firebaseapp.com",
  projectId: "trip-planner-42b3d",
  storageBucket: "trip-planner-42b3d.firebasestorage.app",
  messagingSenderId: "289935466886",
  appId: "1:289935466886:web:e46f6283c2b8b09aad4c07",
  measurementId: "G-JM68XDVYJ2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);