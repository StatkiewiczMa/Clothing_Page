import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANpl4dOMnW8rtw_t5t8JG-0bU2MS9SK3Q",
  authDomain: "clothing-shop-cad90.firebaseapp.com",
  projectId: "clothing-shop-cad90",
  storageBucket: "clothing-shop-cad90.appspot.com",
  messagingSenderId: "890446104624",
  appId: "1:890446104624:web:dd7d1369f24f02570545f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// EXPORTS
export const auth = getAuth(); // It is something like authentication key that lets you alter the current version your database, helps us to keep track on authentications, thanks to this we know can get results from signInRedirect

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const signInByEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const database = getFirestore();

export const addCollectionAndDocuments = async (
  collectionName,
  objectsToAdd
) => {
  // creating a reference to the collection just to make one later
  const collectionRef = collection(database, collectionName);
  // grupa elementów do tranzakcji
  const batch = writeBatch(database);
  // adding these items(shop-data.js) to my database by creating a
  objectsToAdd.forEach((object) => {
    // Creating a ref to a document that is in this collection mentioned earlier
    const docRef = doc(collectionRef, object.title.toLowerCase());
    // setting setting some datas in this document
    batch.set(docRef, object);
  });
  //  posting on a database
  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(database, "categories");
  // console.log("collectionRef:", collectionRef);

  // gives back an object that we can make a snapshot from
  const q = query(collectionRef);
  // console.log("q-query:", q);

  // getting these documents snapshots that we want
  const querySnapshot = await getDocs(q);
  // console.log("querySnapshot:", querySnapshot);

  // reducing through these documents to get the object
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    // console.log(acc,docSnapshot)
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfos = {}
) => {
  const userDocRef = doc(database, "users", userAuth.uid); //database, collection, unique ID
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfos,
      });
    } catch (error) {
      console.log(
        "I just caught some error while creating users!!",
        error.message
      );
    }
  }
  // if user data exists
  else if (userSnapshot.exists()) {
  }

  return userDocRef;
};
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (
  callback //permamently set listener
) => onAuthStateChanged(auth, callback);
