import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FirebaseError } from 'firebase/app';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => { setFormFields(defaultFormFields); };

  const signInWithGoogle = async () => {
    try {
      dispatch(googleSignInStart());
    }

    catch (error) { 
      console.log("couldn't sign user in with google", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    }

    catch (error: unknown) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/wrong-password":
            alert("Incorrect password");
            break;

          case "auth/user-not-found":
            alert("User with entered email doesn't exist");
            break;

          default:
            console.log(error);
        };
      }

      else {
        console.log("couldn't handle error", error);
      }
    };
  };
    
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
    
  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Email" name="email" type="email" onChange={handleChange} value={email} required />
        <FormInput label="Password" name="password" type="password" onChange={handleChange} value={password} required />
        <ButtonsContainer>
          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.DEFAULT_BUTTON} >Sign In</Button>
          {/* Google button is not of type="submit" otherwise it tries to submit the form data used for signing in a user with email and password too */}
          <Button type="button" buttonType={BUTTON_TYPE_CLASSES.GOOGLE_BUTTON} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
