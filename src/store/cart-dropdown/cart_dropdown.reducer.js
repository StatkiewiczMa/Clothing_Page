import { CART_ACTION_TYPES } from "./cart_dropdown.type";

const INITIAL_STATE = {
  cartDropdownIfActive: false,
  cartItems: [],
  totalCost: 0,
};

export const cartReducer = (state = INITIAL_STATE, action = {}) => {
  const { type, payload } = action;
  // console.log(state.cartItems, action.payload)

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        cartDropdownIfActive: !state.cartDropdownIfActive,
      };
    default:
      return state;
  }
};
