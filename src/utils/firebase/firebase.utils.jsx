// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, /*signInWithRedirect, */ signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch } from "firebase/firestore";

import { SELECT_ACCOUNT, USERS } from "../../constants/constants";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from "../../constants/firebaseConfig";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig =
{
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
    prompt: SELECT_ACCOUNT, 
});

export const authentication = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(authentication, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(authentication, googleProvider);

export const database = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) =>
{
    const collectionReference = collection(database, collectionKey);
    const batch = writeBatch(database);

    objectsToAdd.forEach((object) =>
    {
        const documentReference = doc(collectionReference, object[field].toLowerCase());
        batch.set(documentReference, object);
    });

    await batch.commit();
    console.log("done");
}

export const createUserProfileDocument = async (userAuthentication, additionalInformation = {}) => 
{
    if (!userAuthentication)
    {
        alert("fail");
        return;
    } // force quits if user cannot be authenticated

    const userDocumentReference = doc(database, USERS, userAuthentication.uid)
    const userSnapshot = await getDoc(userDocumentReference);
    
    if (!userSnapshot.exists())
    {
        const { displayName, email } = userAuthentication;
        const createdAt = new Date();
        
        try
        { await setDoc(userDocumentReference, { displayName, email, createdAt, ...additionalInformation }); }
        
        catch (error)
        { console.log("error creating the user", error.message); }
    }
    
    return userDocumentReference;
};

export const createAuthenticatedUserWithEmailAndPassword = async (email, password) =>
{
    if (!email || !password)
    { return; }

    return await createUserWithEmailAndPassword(authentication, email, password);
};

export const signInAuthenticatedUserWithEmailAndPassword = async (email, password) =>
{
    if (!email || !password)
    { return; }

    return await signInWithEmailAndPassword(authentication, email, password);
};

export const signOutUser = async () => await signOut(authentication);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(authentication, callback);