// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "zestio-b47ae.firebaseapp.com",
    projectId: "zestio-b47ae",
    storageBucket: "zestio-b47ae.firebasestorage.app",
    messagingSenderId: "684282398362",
    appId: "1:684282398362:web:76d251051373ab2b96c123"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };