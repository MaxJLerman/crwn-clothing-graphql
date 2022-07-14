import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { authentication, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuthentication } from '../../utils/firebase/firebase.utils';

const SignIn = () => 
{
    useEffect( () =>
    {
        async function fetchData()
        {
            const response = await getRedirectResult(authentication);
            console.log(response);
        }

        fetchData(); // needs to be called
    }, []);
    
    const logGoogleUser = async () =>
    {
        const { user } = await signInWithGooglePopup();
        const userDocumentReference = await createUserDocumentFromAuthentication(user);
    };
    
    return(
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>
                sign in with google popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                sign in with google redirect
            </button>
        </div>
    );
}

export default SignIn;