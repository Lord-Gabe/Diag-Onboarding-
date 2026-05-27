import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyCVxwc1JJ61LJYItQOZKBgWKYEMV478uUk",
  authDomain: "diag-site-7901f.firebaseapp.com",
  projectId: "diag-site-7901f",
  storageBucket: "diag-site-7901f.firebasestorage.app",
  messagingSenderId: "210445536026",
  appId: "1:210445536026:web:97928f5fb8f842da127aa3",
  measurementId: "G-99MQGXFD9F"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();
