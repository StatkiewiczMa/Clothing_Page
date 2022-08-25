import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignUpContainer } from "./sign-up-form.style";
import { signUpStart } from "../../store/user/user.action";
import { useDispatch } from "react-redux";
import { AuthError, AuthErrorCodes } from "firebase/auth";

enum defaultFormData {
  displayName = "",
  email = "",
  password = "",
  confirmPassword = "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormData);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();
  // console.log(formFields);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(...formFields);
    setFormFields({ ...formFields, [name]: value });
  };
  const resetFormFields = () => {
    setFormFields(defaultFormData);
  };
  const submitHandler = async (submit: FormEvent<HTMLFormElement>) => {
    submit.preventDefault();
    // const {submit.target}
    // createAuthUserWithEmailAndPassword(auth, email, password)
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else
      try {
        dispatch(signUpStart(email, password, { displayName }));
        resetFormFields();
        // console.log(user);
      } catch (error) {
        console.log("");
        if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
          alert("This email is already in use, try different email");
        }
        // console.log("user creation encountered an error", error);
      }
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <p>Sign up with email and password</p>
      <form
        onSubmit={(submit) => {
          submitHandler(submit);
        }}
      >
        <FormInput
          label="Name"
          onChange={changeHandler}
          name="displayName"
          value={displayName}
          type="text"
          required
        />

        <FormInput
          label="Email"
          onChange={changeHandler}
          name="email"
          value={email}
          type="email"
          required
        />

        <FormInput
          label="Password"
          onChange={changeHandler}
          name="password"
          value={password}
          type="password"
          required
        />

        <FormInput
          label="Confirm Password"
          onChange={changeHandler}
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          required
        />
        <Button buttonType={BUTTON_TYPE_CLASSES.base}>sign up</Button>
      </form>
    </SignUpContainer>
  );
};
export default SignUpForm;
