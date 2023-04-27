// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtH2bgfVHa3IjuvBiiZoT5RXwJ4-7JvtM",
  authDomain: "ui-auth-fd914.firebaseapp.com",
  projectId: "ui-auth-fd914",
  storageBucket: "ui-auth-fd914.appspot.com",
  messagingSenderId: "398419276498",
  appId: "1:398419276498:web:b71fd0d9cc7784ca86330b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };