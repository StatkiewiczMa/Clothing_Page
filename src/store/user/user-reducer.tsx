import { AnyAction } from "redux";
import {
  checkUserSession,
  emailSignInStart,
  googleSignInStart,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutStart,
  signOutSuccess,
  signUpFailed,
  signUpStart,
  signUpSuccess,
} from "./user.action";
import { UserData } from "./user.types";

export type UsersState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const USER_INITIAL_STATE: UsersState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
  if (checkUserSession.match(action))
    return {
      ...state,
    };

  if (signInSuccess.match(action))
    return {
      ...state,
      currentUser: action.payload,
      isLoading: false,
    };
  if (signOutSuccess.match(action))
    return {
      ...state,
      currentUser: null,
      isLoading: false,
    };

  if (signInFailed.match(action))
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  if (googleSignInStart.match(action))
    return {
      ...state,
      isLoading: true,
    };

  if (emailSignInStart.match(action))
    return {
      ...state,
      currentUser: action.payload,
    };

  if (signUpStart.match(action))
    return {
      ...state,
      isLoading: true,
    };
  if (signUpSuccess.match(action))
    return {
      ...state,
      isLoading: false,
    };
  if (signUpFailed.match(action))
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  if (signOutStart.match(action))
    return {
      ...state,
      isLoading: true,
    };

  if (signOutFailed.match(action))
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };

  return state;
};
