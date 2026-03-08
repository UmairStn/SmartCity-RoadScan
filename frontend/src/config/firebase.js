// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVQNcn8xvtFPfR8xroQmsXEpy4WE3GRYs",
  authDomain: "roadmapping-51ed4.firebaseapp.com",
  databaseURL: "https://roadmapping-51ed4-default-rtdb.firebaseio.com/",
  projectId: "roadmapping-51ed4",
  storageBucket: "roadmapping-51ed4.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export it
export const database = getDatabase(app);