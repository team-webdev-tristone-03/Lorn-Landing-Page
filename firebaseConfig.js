// Firebase configuration for web
const firebaseConfig = {
  apiKey: "AIzaSyBeJWxsDckJHZJBPbSpzTRRYgHtnm1h4d4",
  authDomain: "lornvingest-landing.firebaseapp.com",
  projectId: "lornvingest-landing",
  storageBucket: "lornvingest-landing.firebasestorage.app",
  messagingSenderId: "722526716540",
  appId: "1:722526716540:web:fdbae2832620e5a52cbff9",
  measurementId: "G-1LF83P57EC"
};

// Initialize Firebase only if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  if (firebase.analytics) {
    firebase.analytics();
  }
  console.log('Firebase initialized successfully');
} else {
  console.log('Firebase already initialized');
}