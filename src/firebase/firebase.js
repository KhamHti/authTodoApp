import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuptqVS__t2_DWhul2aWdXCVSkheE4GVE",
  authDomain: "authtodoapp-e7526.firebaseapp.com",
  projectId: "authtodoapp-e7526",
  storageBucket: "authtodoapp-e7526.appspot.com",
  messagingSenderId: "311968077333",
  appId: "1:311968077333:web:a0b7fd0d8d4c9c793e601c",
  measurementId: "G-C0YGXEP23N",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { auth, db };
