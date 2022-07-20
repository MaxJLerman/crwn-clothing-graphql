import { createContext, useEffect, useState } from 'react';

import { createUserProfileDocument, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// the value you want to access
export const UserContext = createContext(
    {
        currentUser: null,
        setCurrentUser: () => null,
    });

// the actual component itself
export const UserProvider = ({ children }) =>
{
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //signOutUser(); // call this to manually sign out a user

    useEffect(() =>
    {
        const unsubscribe = onAuthStateChangedListener((user) =>
        {
            console.log(user);

            if (user) { createUserProfileDocument(user); } // if a user comes through, create their profile
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}