import { CART_ACTION_TYPES } from "./cart_dropdown.type";

const INITIAL_STATE = {
  cartDropdownIfActive: false,
  cartItems: [],
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        cartDropdownIfActive: payload,
      };
    default:
      return state;
  }
};
