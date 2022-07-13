import { signInWithGooglePopup, createUserDocumentFromAuthentication } from '../../utils/firebase/firebase.utils';

const SignIn = () => 
{
    const logGoogleUser = async () =>
    {
        const {user} = await signInWithGooglePopup();
        createUserDocumentFromAuthentication(user);
    }
    
    return(
        <div>
            <h1>Sign in</h1>
            <button onClick={logGoogleUser}>
                sign in with google popup
            </button>
        </div>
    );
}

export default SignIn;