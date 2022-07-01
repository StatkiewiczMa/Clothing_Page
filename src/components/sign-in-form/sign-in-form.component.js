import { useState } from "react";
import {
	signInWithGooglePopup,
	// signInWithGoogleRedirect,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

const defaultFormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignInForm = () => {
	const [formFields, setFormFields] = useState(defaultFormData);
	const { email, password } = formFields;

	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		// console.log(user);
		const userDocRef = await createUserDocumentFromAuth(user);
	};

	const changeHandler = (event) => {
		const { name, value } = event.target;
		// console.log(...formFields);
		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className='sign-in-container'>
			<h2>Already have an account?</h2>
			<p>Sign in with email and password</p>
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

				<div className='Buttons-sign-in-form'>
					<Button buttonType='' text='SIGN IN' onClick={logGoogleUser}></Button>
					<Button
						buttonType='google-sign-in'
						text='SIGN IN WITH GOOGLE'
						onClick={logGoogleUser}></Button>
				</div>
			</form>
		</div>
	);
};
export default SignInForm;
