
export type AdditionalInformation = {
  displayName?: string;
};

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

export enum USER_ACTION_TYPES {
  CHECK_USER_SESSION = "CHECK_USER_SESSION:",

  GOOGLE_SIGN_IN_START = "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START = "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
  SIGN_IN_FAILED = "SIGN_IN_FAILED",

  SIGN_UP_START = "SIGN_UP_START",
  SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS",
  SIGN_UP_FAILED = "SIGN_UP_FAILED",

  SIGN_OUT_START = "SIGN_OUT_START",
  SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED = "SIGN_OUT_FAILED",
}
