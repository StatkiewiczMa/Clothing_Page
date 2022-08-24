import { AnyAction } from "redux";
import { setCartDropdownIfActive, setCartItems } from "./cart_dropdown.action";
import { CartItem } from "./cart_dropdown.type";

export type CartReducerState = {
  readonly cartDropdownIfActive: boolean;
  readonly cartItems: CartItem[];
};

const INITIAL_STATE: CartReducerState = {
  cartDropdownIfActive: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): CartReducerState => {
  if (setCartItems.match(action))
    return {
      ...state,
      cartItems: action.payload,
    };

  if (setCartDropdownIfActive.match(action))
    return {
      ...state,
      cartDropdownIfActive: action.payload,
    };
  return state;
};
