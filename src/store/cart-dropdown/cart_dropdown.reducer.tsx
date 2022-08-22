import { AnyAction } from "redux";
import { CartsItem, CART_ACTION_TYPES } from "./cart_dropdown.type";

export type CartReducerState = {
  readonly cartDropdownIfActive: boolean;
  readonly cartItems: CartsItem[];
};

const INITIAL_STATE: CartReducerState = {
  cartDropdownIfActive: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartReducerState => {
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
