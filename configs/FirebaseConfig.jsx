import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyAsnjiP_0ni0T8JQ7sss9OHC2QMES8H74A",
  authDomain: "projects-744a7.firebaseapp.com",
  projectId: "projects-744a7",
  storageBucket: "projects-744a7.firebasestorage.app",
  messagingSenderId: "516097255730",
  appId: "1:516097255730:web:266d42d0856c2517684f2b",
  measurementId: "G-CJQC6PQ4N1"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);