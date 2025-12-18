import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAgjc2Mc7ZO5LxKNG8hN9ylrlLp1C3xbxk",
    authDomain: "nirvana-iot.firebaseapp.com",
    projectId: "nirvana-iot",
    storageBucket: "nirvana-iot.firebasestorage.app",
    messagingSenderId: "280629526536",
    appId: "1:280629526536:web:d32cb153cbbbdacf82d1bd",
    measurementId: "G-DHQL0H8KKF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
