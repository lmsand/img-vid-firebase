// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYKNjLp3QCXjG7ENKJRN5Le7vOsaMwCv0",
  authDomain: "img-vid-firebase.firebaseapp.com",
  projectId: "img-vid-firebase",
  storageBucket: "img-vid-firebase.appspot.com",
  messagingSenderId: "335867518890",
  appId: "1:335867518890:web:617be90bd69190da0515d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)
