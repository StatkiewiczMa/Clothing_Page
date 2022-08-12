import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = (state) =>
  createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartToggleCartDropdown = createSelector(
  [selectCartReducer],
  (cart) => cart.cartDropdownIfActive
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);
