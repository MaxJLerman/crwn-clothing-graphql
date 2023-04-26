import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from "../button/button.types";
import { createAuthenticatedUserWithEmailAndPassword, createUserProfileDocument } from '../../utils/firebase/firebase.utils';
import { SignUpContainer } from './sign-up-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    };

    try {
      const { user } = await createAuthenticatedUserWithEmailAndPassword(email, password);
      await createUserProfileDocument(user, { displayName });      
      resetFormFields();
    }

    catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      }
      
      else { 
        console.error('user creation encountered an error', error);
      }
    };
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  
  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" name="displayName" type="text" onChange={handleChange} value={displayName} required />
        <FormInput label="Email" name="email" type="email" onChange={handleChange} value={email} required />
        <FormInput label="Password" name="password" type="password" onChange={handleChange} value={password} required />
        <FormInput label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} value={confirmPassword} required />
        <Button buttonType={BUTTON_TYPE_CLASSES.DEFAULT_BUTTON} type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
