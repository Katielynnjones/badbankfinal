import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';



const firebaseConfig = {
    apiKey: "AIzaSyB1sI99H7G3iiiLFeKFauhof_GLlu3bRyU",
    authDomain: "katie-jonesbankingapp.firebaseapp.com",
    databaseURL: "https://katie-jonesbankingapp-default-rtdb.firebaseio.com",
    projectId: "katie-jonesbankingapp",
    storageBucket: "katie-jonesbankingapp.appspot.com",
    messagingSenderId: "105684370793",
    appId: "1:105684370793:web:6d7170464ae1468af1e9f8",
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };
