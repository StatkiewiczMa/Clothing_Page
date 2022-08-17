import { all, call, put, takeLatest } from "redux-saga/effects";
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from "../../utils/firebase/firebase.utils";
import { signInFailed } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    console.log('getSnapshotFromUserAuth')
    const snapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put({ id: snapshot.id, ...snapshot.data() });
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onCheckUserSession)]);
}
