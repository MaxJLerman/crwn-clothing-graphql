// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpwKDV7ZxK2l3nr4F0v9Cs4HOqryhRwPw",
  authDomain: "crwn-clothing-db-8619c.firebaseapp.com",
  projectId: "crwn-clothing-db-8619c",
  storageBucket: "crwn-clothing-db-8619c.appspot.com",
  messagingSenderId: "1047434166991",
  appId: "1:1047434166991:web:a9a2aaa29d08854fc7adba"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters(
    {
        prompt: "select_account"
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const database = getFirestore();

export const createUserDocumentFromAuthentication = async (userAuthentication) => 
{
    const userDocumentReference = doc(database, 'users', userAuthentication.uid)

    console.log(userDocumentReference);

    const userSnapshot = await getDoc(userDocumentReference);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists())
    {
        const { displayName, email } = userAuthentication;
        const createdAt = new Date();

        try
        {
            await setDoc(userDocumentReference, { displayName, email, createdAt });
        }

        catch (error)
        {
            console.log("error creating the user", error.message);
        }
    }
};