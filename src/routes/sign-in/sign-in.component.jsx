// commented out code in this file was used to highlight some of firebase's methods & authentication

//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import { /* authentication, */ signInWithGooglePopup, /* signInWithGoogleRedirect, */ createUserProfileDocument } from '../../utils/firebase/firebase.utils';

const SignIn = () => 
{
    /* #region useEffect */
    
    // useEffect( () =>
    // {
    //     async function fetchData()
    //     {
    //         const response = await getRedirectResult(authentication);
            
    //         if (response)
    //         {
    //             const userDocumentReference = await createUserDocumentFromAuthentication(response.user);
    //         }
    //     }

    //     fetchData(); // needs to be called
    // }, []);

    /* #endregion */
    
    const logGoogleUser = async () =>
    {
        try
        {        
            const response = await signInWithGooglePopup();

            const userDocumentReference = await createUserProfileDocument(response.user);
        }

        catch (error)
        { console.log("couldn't sign user in with google", error.message); }
    };
    
    return(
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>
                sign in with google popup
            </button>
            <SignUpForm />

            { 
                /* #region google redirect */
            // <button onClick={signInWithGoogleRedirect}>
            //     sign in with google redirect
            // </button>
            /* #endregion */
            }
        </div>
    );
}

export default SignIn;
