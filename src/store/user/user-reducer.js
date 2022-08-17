import { USER_ACTION_TYPES } from "./user.types.js";

const USER_INITIAL_STATE = {
  currentUser: {},
  isLoading: false,
  error: null,
};

export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        isLoading: false,
      };

    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
      
    case USER_ACTION_TYPES.CHECK_USER_SESSION:
      return {
        ...state,
      };

    case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      };

    case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
      return {
        ...state,
        currentUser: payload,
      };

    default:
      return state;
  }
};
