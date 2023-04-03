import { takeLatest, put, all, call } from "redux-saga/effects";

import * as t from "./user.types";
import { signInSuccess, signInFailed } from "./user.action";
import { getCurrentUser } from "../../utils/firebase/firebase.utils";

export function* isUserAuthenticated() {
  try {
    const userAuthentication = yield call(getCurrentUser);
  }

  catch (error) {

  }
};

export function* onCheckUserSession() {
  yield takeLatest(t.CHECK_USER_SESSION)
};

export function* userSagas() {
  yield all([]);
};
