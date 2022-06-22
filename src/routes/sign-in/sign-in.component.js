import {
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user);
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	return (
		<div>
			<h1>This is Sign In page!</h1>
			<button onClick={logGoogleUser}>
				<p style={{ textTransform: "capitalize" }}>Sign in with google popup</p>
			</button>
			<SignUpForm />
		</div>
	);
};

export default SignIn;
