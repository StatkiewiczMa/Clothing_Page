import { User } from "firebase/auth";
import { all, call, put, takeLatest } from "typed-redux-saga/macro";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInByEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";
import {
  EmailSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
  signUpFailed,
  SignUpStart,
  SignUpSuccess,
  signUpSuccess,
} from "./user.action";
import {
  AdditionalInformation,
  USER_ACTION_TYPES,
} from "./user.types";

export function* getSnapshotFromUserAuth(
  userAuth: User,
  additionalDetails?: AdditionalInformation
) {
  try {
    const snapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    if (snapshot) {
      yield* put(
        signInSuccess({
          id: snapshot.id,
          ...snapshot.data(),
        })
      );
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signUpWithEmail({
  payload: { email, password, additionalDetails },
}: SignUpStart) {
  try {
    const createdUser = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (createdUser) {
      yield* put(signUpSuccess(createdUser.user, additionalDetails));
      yield* call(getSnapshotFromUserAuth, createdUser.user, additionalDetails);
    }
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}
export function* signWithEmail({
  payload: { email, password },
}: EmailSignInStart) {
  try {
    const userCredential = yield* call(
      signInByEmailAndPassword,
      email,
      password
    );
    if (userCredential)
      yield* call(getSnapshotFromUserAuth, userCredential.user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signInAfterSignUp({
  payload: { user, additionalDetails },
}: SignUpSuccess) {
  try {
    yield* call(getSnapshotFromUserAuth, user, additionalDetails);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}
export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess);
  } catch (error) {
    yield* put(signOutFailed(error as Error));
  }
}

//SAGA SIGN OUT WITH EMAIL
export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}
//SAGA SIGN UP WITH EMAIL
export function* onEmailSignUpSuccess() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}
//SAGA SIGN IN WITH EMAIL
export function* onEmailSignUpStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUpWithEmail);
}
//SAGA SIGN IN WITH EMAIL
export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signWithEmail);
}
//SAGA SIGN IN WITH GOOGLE
export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signWithGoogle);
}
//SAGA CHECK USER
export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}
export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onEmailSignUpSuccess),
    call(onSignOutStart),
  ]);
}
