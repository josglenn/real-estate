// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-6bd27.firebaseapp.com",
  projectId: "real-estate-6bd27",
  storageBucket: "real-estate-6bd27.appspot.com",
  messagingSenderId: "662628109413",
  appId: "1:662628109413:web:4c344b73fa53f2cd460a8c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
