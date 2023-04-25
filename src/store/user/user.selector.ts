import { createSelector } from "reselect";

import { RootState } from "../store";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: RootState): UserState => {
  return state.user;
};

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (userSlice) => userSlice.currentUser
);
// the selector function above extracts off the desired values from the entire redux store
// whenever state object changes, i.e. log in/out updates the reducer value currentUser, new state object is returned with new value
// when this happens, useSelector re-runs, currentUser updates and React will re-render the component below
