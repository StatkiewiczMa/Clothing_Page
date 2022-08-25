import { AuthError } from "firebase/auth";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";

enum defaultFormData {
  name = "",
  email = "",
  password = "",
  confirmPassword = "",
}

const SignInForm: FC = () => {
  const [formFields, setFormFields] = useState(defaultFormData);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  signOutUser();

  const logGoogleUser = async () => {
    dispatch(googleSignInStart());
  };

  const resetFormFields = () => {
    setFormFields(defaultFormData);
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));

      resetFormFields();
    } catch (error) {
      const { code } = error as AuthError;
      console.log(error);

      switch (code) {
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

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <p>Sign in with your email and password</p>
      <form>
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

        <ButtonsContainer>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.base}
            onClick={() => submitHandler}
          >
            SIGN IN
          </Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={logGoogleUser}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};
export default SignInForm;
