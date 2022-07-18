import { useState } from 'react';

import { signInWithGooglePopup, createUserProfileDocument, signInAuthenticatedUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
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

    //console.log(formFields);

    const resetFormFields = () =>
    { setFormFields(defaultFormFields); };

    const signInWithGoogle = async () =>
    {
        try
        {        
            const response = await signInWithGooglePopup();

            await createUserProfileDocument(response.user);
        }

        catch (error)
        { console.log("couldn't sign user in with google", error.message); }
    };

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        try
        {
            const response = await signInAuthenticatedUserWithEmailAndPassword(email, password);

            console.log(response);
            
            resetFormFields();
        }

        catch (error)
        {
            switch(error.code)
            {
                case "auth/wrong-password":
                    alert("Incorrect password");
                    break;

                case "auth/user-not-found":
                    alert("User with entered email doesn't exist");
                    break;

                default:
                    console.log(error);
            }
        }
    }
    
    const handleChange = (event) =>
    {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    }
    
    return(
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email" name="email" type="email" placeholder="Email" onChange={handleChange} value={email} required />
                <FormInput label="Password" name="password" type="password" placeholder="Password" onChange={handleChange} value={password} required />

                <div className="buttons-container">
                    <Button type="submit" buttonType="">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
