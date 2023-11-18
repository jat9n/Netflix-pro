// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7av7Eam7jxg4xKgv3VqijJsHXrzshPPM",
  authDomain: "netflix-pro-84f81.firebaseapp.com",
  projectId: "netflix-pro-84f81",
  storageBucket: "netflix-pro-84f81.appspot.com",
  messagingSenderId: "863623406821",
  appId: "1:863623406821:web:b7e30ad931a62aba58600c",
  measurementId: "G-9JSRD5QE5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();