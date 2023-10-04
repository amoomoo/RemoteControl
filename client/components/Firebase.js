// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import getAuth
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPzlGSdatGuoIQLstthPWXvaLYuL-I8gI",
  authDomain: "vibe-16746.firebaseapp.com",
  projectId: "vibe-16746",
  storageBucket: "vibe-16746.appspot.com",
  messagingSenderId: "805021331487",
  appId: "1:805021331487:web:6476432a937d2a89f4252a",
  measurementId: "G-5PYHRQM196"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const googleSignIn = () => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            // added console log to see if oAuth works
            console.log('Complete Result:', result);
            if (result && result.user) {
                const name = result.user.displayName;
                const email = result.user.email;
                const profileP = result.user.photoURL;

                // added console log to see if oAuth works
                console.log('name :>> ', name);
                console.log('email :>> ', email);
                
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                localStorage.setItem("profileP",profileP)

                // returns name and email for later use
                return { name, email };
            } else {
                throw new Error('Unexpected result format from Firebase');
            }
        })
        .catch((error) => {
            // changed the error message below
            console.log("Google sign-in error", error.message);
            throw error;
        });
};


