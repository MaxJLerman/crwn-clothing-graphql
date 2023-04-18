// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
  prompt: "select_account" // whenever someone interacts with the googleProvider, they are forced to select an account
});

export const authentication = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(authentication, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(authentication, googleProvider);

export const database = getFirestore();

// function is asyncronous because data is being sent to an external source
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
  const collectionReference = collection(database, collectionKey);
  const batch = writeBatch(database);

  objectsToAdd.forEach((object) => {
    const documentReference = doc(collectionReference, object[field].toLowerCase());
    batch.set(documentReference, object);
  });

  await batch.commit();
  console.log("categories added successfully");
};

export const getCategoriesAndDocuments = async () => {
  const collectionReference = collection(database, "categories");
  const q = query(collectionReference);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data());
  // now returns the categories as an array
};

export const createUserProfileDocument = async (userAuthentication, additionalInformation = {}) => {
  if (!userAuthentication) {
    alert("fail");
    return;
  } // force quits if user cannot be authenticated

  const userDocumentReference = doc(database, "users", userAuthentication.uid)
  const userSnapshot = await getDoc(userDocumentReference);
  
  // if the user doesn't exist, create a new one
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuthentication;
    const createdAt = new Date();
    
    try { 
      await setDoc(userDocumentReference, { displayName, email, createdAt, ...additionalInformation });
    }
    
    catch (error) { 
      console.log("error creating the user", error.message); 
    }
  };
  
  return userSnapshot;
};

export const createAuthenticatedUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  };

  return await createUserWithEmailAndPassword(authentication, email, password);
};

export const signInAuthenticatedUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) {
    return;
  };

  return await signInWithEmailAndPassword(authentication, email, password);
};

export const signOutUser = async () => await signOut(authentication);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(authentication, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => { // resolve == positive handle case, reject == negative handle case
    const unsubscribe = onAuthStateChanged(
      authentication,
      (userAuthentication) => {
        unsubscribe(); // must immediately unsubscribe or risk a memory leak
        resolve(userAuthentication);
      },
      reject
    );
  });
};
