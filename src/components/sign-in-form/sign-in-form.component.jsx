import { useState } from 'react';

import { createAuthenticatedUserWithEmailAndPassword, createUserProfileDocument } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss';

const defaultFormFields = 
{
    email: '',
    password: ''
};

const SignInForm = () =>
{
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    console.log(formFields);

    const resetFormFields = () =>
    { setFormFields(defaultFormFields); };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        try
        { resetFormFields(); }

        catch (error) { }
    }
    
    const handleChange = (event) =>
    {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }
    
    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" name="displayName" type="text" placeholder="Display Name" onChange={handleChange} value={displayName} required />

                <FormInput label="Email" name="email" type="email" placeholder="Email" onChange={handleChange} value={email} required />

                <FormInput label="Password" name="password" type="password" placeholder="Password" onChange={handleChange} value={password} required />

                <FormInput label="Confirm Password" name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} value={confirmPassword} required />

                <Button buttonType="" type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignInForm;
