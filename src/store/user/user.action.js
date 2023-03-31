import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./user.types";

export const setCurrentUser = (user) => createAction(t.SET_CURRENT_USER, user);

export const checkUserSession = () => createAction(t.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(t.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(t.EMAIL_SIGN_IN_START, {email, password});

export const signInSuccess = (user) => createAction(t.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(t.SIGN_IN_FAILED, error);
