import { createAction } from "../../utils/reducer/reducer.utils";
import * as t from "./user.types";

export const setCurrentUser = (user) => createAction(t.SET_CURRENT_USER, user);
export const checkUserSession = () => createAction(t.CHECK_USER_SESSION);
export const googleSignInStart = () => createAction(t.GOOGLE_SIGN_IN_START);
export const emailSignInStart = (email, password) => createAction(t.EMAIL_SIGN_IN_START, {email, password});
export const signInSuccess = (user) => createAction(t.SIGN_IN_SUCCESS, user);
export const signInFailed = (error) => createAction(t.SIGN_IN_FAILED, error);
export const signUpStart = (email, password, displayName) => createAction(t.SIGN_UP_START, { email, password, displayName });
export const signUpSuccess = (user, additionalInformation) => createAction(t.SIGN_UP_SUCCESS, { user, additionalInformation });
export const signUpFailed = (error) => createAction(t.SIGN_UP_FAILED, error);
export const signOutStart = () => createAction(t.SIGN_OUT_START);
export const signOutSuccess = () => createAction(t.SIGN_OUT_SUCCESS);
export const signOutFailed = (error) => createAction(t.SIGN_OUT_FAILED, error);
