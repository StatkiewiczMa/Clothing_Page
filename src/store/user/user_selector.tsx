import { createSelector } from "reselect";
import { ReduxState } from "../store";
import { UsersState } from "./user-reducer";

export const selectUser = (state:ReduxState): UsersState => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
