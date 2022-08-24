import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Category } from "../../store/categories/category.types";
import { AdditionalInformation, UserData } from "../../store/user/user.types";
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
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// EXPORTS
export const auth = getAuth(); // It is something like authentication key that lets you alter the current version your database, helps us to keep track on authentications, thanks to this we know can get results from signInRedirect

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInByEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const database = getFirestore();

export type ObjectToAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionName: string,
  objectsToAdd: T[]
): Promise<void> => {
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

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(database, "categories");
  // gives back an object that we can make a snapshot from
  const q = query(collectionRef);
  // getting these documents snapshots that we want
  const querySnapshot = await getDocs(q);
  // console.log(q, querySnapshot.docs);
  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data() as Category
  );

  // return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInfos = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
  if (!userAuth) return;

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
      console.log("I just caught some error while creating users!!", error);
    }
  }
  // if user data exists
  else if (userSnapshot.exists()) {
  }

  return userSnapshot as QueryDocumentSnapshot<UserData>;
};
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangeListener = (
  callback: NextOrObserver<User> //permamently set listener
) => onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
