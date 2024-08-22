// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAffbO7aLS_QLp_bQ54Co-xRmyuA2RLlOI",
  authDomain: "clone-velog.firebaseapp.com",
  projectId: "clone-velog",
  storageBucket: "clone-velog.appspot.com",
  messagingSenderId: "235406224978",
  appId: "1:235406224978:web:cf9f098c8a77cf31caf98b",
  measurementId: "G-4SVZ367NJM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const auth = getAuth(app);

export { database };
export { auth };
