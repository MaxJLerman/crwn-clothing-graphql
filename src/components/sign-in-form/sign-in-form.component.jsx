import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";
import { signInAuthenticatedUserWithEmailAndPassword, signInWithGooglePopup } from '../../utils/firebase/firebase.utils';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: ''
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthenticatedUserWithEmailAndPassword(email, password);
      resetFormFields();
    }

    catch (error) {
      console.log("user sign in failed", error);
    };
  };
    
  const handleChange = (event) => {
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
