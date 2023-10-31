// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
export const auth = getAuth(app);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2rKRz2SmRncCsdOwnRYz_cor2eqWhWIY",
  authDomain: "attendance-a071e.firebaseapp.com",
  projectId: "attendance-a071e",
  storageBucket: "attendance-a071e.appspot.com",
  messagingSenderId: "359512544727",
  appId: "1:359512544727:web:ceb443310fab3d1e52e792",
  measurementId: "G-4R0DW783V7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;