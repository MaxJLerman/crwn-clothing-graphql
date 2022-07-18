// commented out code in this file was used to highlight some of firebase's methods & authentication

//import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import { /* authentication, */ signInWithGooglePopup, /* signInWithGoogleRedirect, */ createUserProfileDocument } from '../../utils/firebase/firebase.utils';
import './authentication.styles.scss'

const Authentication = () => 
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
    
    
    
    return(
        <div className="authentication-container">
            <SignInForm />
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

export default Authentication;
