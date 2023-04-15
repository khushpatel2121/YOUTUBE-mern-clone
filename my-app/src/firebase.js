// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChDDBpEog135eWWpdT_lG0DygqX3l4FiA",
  authDomain: "video-a475f.firebaseapp.com",
  projectId: "video-a475f",
  storageBucket: "video-a475f.appspot.com",
  messagingSenderId: "451950860545",
  appId: "1:451950860545:web:a97b01fa5a7f695b8fe300"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const Provider = new GoogleAuthProvider();

export default app