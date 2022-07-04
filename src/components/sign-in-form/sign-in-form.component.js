import { useState } from "react";
import {
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
	signInByEmailAndPassword,
	signOutUser,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormData);
	const { email, password } = formFields;

	signOutUser();
	const logGoogleUser = async () => {
		await signInWithGooglePopup();
		// console.log(user);
	};

	const resetFormFields = () => {
		setFormFields(defaultFormData);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		try {
			const { user } = await signInByEmailAndPassword(email, password);

			console.log(user);
			resetFormFields();
		} catch (error) {
			console.log(error);
			switch (error.code) {
				case "auth/wrong-password":
					alert("Incorrect password for this email");
					break;
				case "auth/user-not-found":
					alert("No user found");
					break;
				case "auth/invalid-email":
					alert("Wrong format of email");
					break;
				default:
					console.log(error);
			}
		}
	};

	const changeHandler = (event) => {
		// console.log("Event target:",event.target);
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<p>Sign in with your email and password</p>
			<form>
				{/* // onSubmit={(submit) => { */}
				{/* // submitHandler(submit); */}
				{/* // }}> */}

				<FormInput
					label='Email'
					onChange={changeHandler}
					name='email'
					value={email}
					type='email'
					required
				/>

				<FormInput
					label='Password'
					onChange={changeHandler}
					name='password'
					value={password}
					type='password'
					required
				/>

				<div className='buttons-container'>
					<Button buttonType='' text='SIGN IN' onClick={submitHandler}></Button>
					<Button
						type='button'
						buttonType='google-sign-in'
						text='Google Sign In'
						onClick={logGoogleUser}></Button>
				</div>
			</form>
		</div>
	);
};
export default SignInForm;
