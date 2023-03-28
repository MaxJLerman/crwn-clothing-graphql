import { createContext, useEffect, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';
import { createUserProfileDocument, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';
import { SET_CURRENT_USER } from '../constants/userActionTypes';

// the value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
    
const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state, action) => {
  const { type, payload } = action;
  
  switch(type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }

      default:
        throw new Error(`Unhandled type ${type} in userReducer`);
  };
};

// the actual component itself 
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch(
      createAction(SET_CURRENT_USER, user)
    );
  };

  const value = { currentUser, setCurrentUser };

  //signOutUser(); // call this to manually sign out a user

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      console.log(user);

      (user && createUserProfileDocument(user)); // if a user comes through, create their profile
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};
