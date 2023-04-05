import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import * as t from "../button/button.types";

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
      console.log("couldn't sign user in with google", error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    }

    catch (error) {
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
          <Button type="submit" buttonType={t.DEFAULT_BUTTON} >Sign In</Button>
          <Button type="button" buttonType={t.GOOGLE_BUTTON} onClick={signInWithGoogle}>Google Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
