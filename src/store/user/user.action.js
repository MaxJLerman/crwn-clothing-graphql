import { createAction } from "../../utils/reducer/reducer.utils";
import { SET_CURRENT_USER } from "../../constants/userActionTypes";

export const setCurrentUser = (user) => createAction(SET_CURRENT_USER, user);
