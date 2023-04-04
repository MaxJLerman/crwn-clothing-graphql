import { takeLatest, put, all, call } from "redux-saga/effects";

import * as t from "./user.types";
import { signInSuccess, signInFailed } from "./user.action";
import { getCurrentUser, createUserProfileDocument, signInWithGooglePopup, signInAuthenticatedUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuthentication(userAuthentication, additionalInformation) {
  try {
    const userSnapshot = yield call(createUserProfileDocument, userAuthentication, additionalInformation);
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  }

  catch (error) {
    yield put(signInFailed(error));
  }
};

export function* signInWithGoogle() {
  try {
    const {user} = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuthentication, user);
  }

  catch (error) {
    yield put(signInFailed(error));
  }
};

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const {user} = yield call(signInAuthenticatedUserWithEmailAndPassword,email, password);
    yield call(getSnapshotFromUserAuthentication, user);
  }

  catch (error) {
    yield put(signInFailed(error));
  }
};

export function* isUserAuthenticated() {
  try {
    const userAuthentication = yield call(getCurrentUser);
    if (!userAuthentication) return;
    yield call(getSnapshotFromUserAuthentication, userAuthentication);
  }

  catch (error) {
    yield put(signInFailed(error));
  }
};

export function* onGoogleSignInStart() {
  yield takeLatest(t.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onCheckUserSession() {
  yield takeLatest(t.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onEmailSignInStart() {
  yield takeLatest(t.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
};