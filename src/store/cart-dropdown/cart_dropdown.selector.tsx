import { createSelector } from "reselect";
import { ReduxState } from "../store";
import { CartReducerState } from "./cart_dropdown.reducer";
import { CartItem } from "./cart_dropdown.type";

const selectCartReducer = (state: ReduxState): CartReducerState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartToggleCartDropdown = createSelector(
  [selectCartReducer],
  (cart) => cart.cartDropdownIfActive
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
);
export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems: CartItem[]) =>
    cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
