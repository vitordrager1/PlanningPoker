// Import the functions you need from the SDKs you need
// import { initializeApp, FirebaseApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from "firebase/firestore";

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "poker-plan-br.firebaseapp.com",
  projectId: "poker-plan-br",
  storageBucket: "poker-plan-br.firebasestorage.app",
  messagingSenderId: "180496378322",
  appId: "1:180496378322:web:d604f5e2075a73adcbc00b",
  measurementId: "G-SQHV0BLETP"
};
console.log("Firebase API Key:", process.env.FIREBASE_API_KEY);
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// //const analytics = getAnalytics(app);

// const db = getFirestore(app);

// export {db}

// Inicializa o Firebase (evita inicialização múltipla)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Exporta as instâncias para uso no app
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;