// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeJWxsDckJHZJBPbSpzTRRYgHtnm1h4d4",
  authDomain: "lornvingest-landing.firebaseapp.com",
  projectId: "lornvingest-landing",
  storageBucket: "lornvingest-landing.firebasestorage.app",
  messagingSenderId: "722526716540",
  appId: "1:722526716540:web:fdbae2832620e5a52cbff9",
  measurementId: "G-1LF83P57EC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);