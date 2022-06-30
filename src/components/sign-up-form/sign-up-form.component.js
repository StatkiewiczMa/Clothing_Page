import { useState } from "react";
import {
	createAuthUserWithEmailAndPassword,
	createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
const defaultFormData = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormData);
	const { name, email, password, confirmPassword } = formFields;

	console.log(formFields);

	const changeHandler = (event) => {
		const { name, value } = event.target;
		// console.log(...formFields);
		setFormFields({ ...formFields, [name]: value });
	};
	const resetFormFields = () => {
		setFormFields(defaultFormData);
	};
	const submitHandler = async (submit) => {
		submit.preventDefault();
		// const {submit.target}
		// createAuthUserWithEmailAndPassword(auth, email, password)
		if (password !== confirmPassword) {
			alert("Passwords do not match!");
			return;
		}
		try {
			const { user } = await createAuthUserWithEmailAndPassword(
				email,
				password
			);
			await createUserDocumentFromAuth(user, { name });
			resetFormFields();
			console.log(user);
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				alert("This email is already in use, try different email");
			}
			console.log("user creation encountered an error", error);
		}
	};

	return (
		<div>
			<h1>Sign up with email and password</h1>
			<form
				onSubmit={(submit) => {
					submitHandler(submit);
				}}>
				<FormInput
					label='Name'
					onChange={changeHandler}
					name='name'
					value={name}
					type='text'
					required
				/>

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

				<FormInput
					label='Confirm Password'
					onChange={changeHandler}
					name='confirmPassword'
					value={confirmPassword}
					type='password'
					required
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
export default SignUpForm;
