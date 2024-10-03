import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAkNFU5K89HQfXnvwZn3W2yj4QXbzsTgqc",
    authDomain: "ombb-876c7.firebaseapp.com",
    projectId: "ombb-876c7",
    storageBucket: "ombb-876c7.appspot.com",
    messagingSenderId: "405870893237",
    appId: "1:405870893237:web:fea482851b0e1c3f64c6fc",
    measurementId: "G-J8BHRYNQ97",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const store = getFirestore(app);
export const storage = getStorage(app);