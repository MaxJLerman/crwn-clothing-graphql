import * as t from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  const { type, payload } = action;
    
  switch (type) {
    case t.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload
      };

    case t.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null
      };

    // multiple case statements for the same outcome
    case t.SIGN_UP_FAILED:
    case t.SIGN_IN_FAILED:
    case t.SIGN_OUT_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  };
};
