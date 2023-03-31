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

    case t.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload
      };

    default:
      return state;
  };
};
