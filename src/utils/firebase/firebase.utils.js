import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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

export const database = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInfos = {}
) => {
	const userDocRef = doc(database, "users", userAuth.uid); //database, collection, unique ID
	const userSnapshot = await getDoc(userDocRef); // variable that is pointing at this specific doc

	if (!userSnapshot.exists()) {
		const { name, email } = userAuth;
		const createdAt = new Date(); // when users are signing in
		console.log("hej");
		try {
			await setDoc(userDocRef, {
				name,
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
