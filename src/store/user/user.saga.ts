import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { FirebaseError } from 'firebase/app';
import { AuthError, AuthErrorCodes } from "firebase/auth";
import { User } from "firebase/auth";

import { USER_ACTON_TYPES } from "./user.types";
import { signInSuccess, signInFailed, signUpSuccess, signOutSuccess, signOutFailed, EmailSignInStart, SignUpStart, SignUpSuccess } from "./user.action";
import { getCurrentUser, createUserProfileDocument, signInWithGooglePopup, signInWithGoogleRedirect, signInAuthenticatedUserWithEmailAndPassword, createAuthenticatedUserWithEmailAndPassword, signOutUser, AdditionalInformation } from "../../utils/firebase/firebase.utils";
import { isPopupBlocked } from "../../utils/browser/browser.utils";

export function* getSnapshotFromUserAuthentication(userAuthentication: User, additionalInformation?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserProfileDocument, userAuthentication, additionalInformation);

    if (userSnapshot) {
      yield* put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
    }
  }

  catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* signInWithGoogle() {
  try {
    const bool = yield* call(isPopupBlocked);
    let userCredential;

    if (bool) {
      userCredential = yield* call(signInWithGoogleRedirect);
    }

    else {
      try {
        userCredential = yield* call(signInWithGooglePopup);
      }

      catch (error: unknown) {
        if ((error as AuthError).code === AuthErrorCodes.POPUP_CLOSED_BY_USER) {
            userCredential = yield* call(signInWithGoogleRedirect);
        };
      }
    }

    if (userCredential) {
      // const user = userCredential?.user; // potential solution for above issue: Property 'user' does not exist on type 'UserCredential | undefined'.
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuthentication, user);
    };
  }

  catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* signInWithEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(signInAuthenticatedUserWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuthentication, user);
    }
  }

  catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* isUserAuthenticated() {
  try {
    const userAuthentication = yield* call(getCurrentUser);
    if (!userAuthentication) return;
    yield* call(getSnapshotFromUserAuthentication, userAuthentication);
  }

  catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* signUp({payload: { email, password, displayName }}: SignUpStart) {
  try {
    const userCredential = yield* call(createAuthenticatedUserWithEmailAndPassword, email, password);

    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName }));
    }
  }

  catch (error) {
    yield* put(signInFailed(error as Error));
  }
};

export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  }

  catch (error) {
    yield* put(signOutFailed(error as Error));
  }
};

export function* signInAfterSignUp({payload: { user, additionalInformation }}: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuthentication, user, additionalInformation);
};

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTON_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTON_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTON_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTON_TYPES.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTON_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTON_TYPES.SIGN_OUT_START, signOut);
};

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
};
