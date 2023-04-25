import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User, NextOrObserver } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from "firebase/firestore";

import { Category } from "../../store/categories/category.types";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

// initialize Firebase
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ 
  prompt: "select_account" // whenever someone interacts with the googleProvider, they are forced to select an account
});

export const authentication = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(authentication, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(authentication, googleProvider);

export const database = getFirestore();

// some random object (that I don't know yet) to add to the collection
export type ObjectToAdd = {
  title: string;
};

// function is asyncronous because data is being sent to an external source
// must pass in objectToAdd as a(n array of) generic type(s) because the type is not known yet
export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionReference = collection(database, collectionKey);
  const batch = writeBatch(database);

  objectsToAdd.forEach((object) => {
    const documentReference = doc(collectionReference, object.title.toLowerCase());
    batch.set(documentReference, object);
  });

  await batch.commit();
  console.log("categories added successfully");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionReference = collection(database, "categories");
  const generatedQuery = query(collectionReference);

  const querySnapshot = await getDocs(generatedQuery);
  return querySnapshot.docs.map(documentSnapshot => documentSnapshot.data() as Category); // interfacing with 3rd party API so casting is allowed
  // now returns the categories as an array
};

// want more additonal information? => add more to sign-up form
export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export const createUserProfileDocument = async (
  userAuthentication: User,
  additionalInformation = {} as AdditionalInformation
): Promise<QueryDocumentSnapshot<UserData> | void> => {
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
      console.log("error creating the user", error);
    }
  };
  
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthenticatedUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  };

  return await createUserWithEmailAndPassword(authentication, email, password);
};

export const signInAuthenticatedUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return;
  };

  return await signInWithEmailAndPassword(authentication, email, password);
};

export const signOutUser = async () => await signOut(authentication);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => onAuthStateChanged(authentication, callback);

export const getCurrentUser = (): Promise<User | null> => {
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
