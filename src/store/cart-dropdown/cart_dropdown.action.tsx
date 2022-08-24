import { createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CartItem, CART_ACTION_TYPES } from "./cart_dropdown.type";
import { ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  const ifProductExist = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (ifProductExist)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[] = [],
  productToRemove: CartItem,
  ifAll: string
): CartItem[] => {
  const tempCartItems = [...cartItems];
  let updatedCartItemsRemove = [];
  let productId = 0;

  if (ifAll !== "all" && productToRemove && productToRemove.quantity !== 1)
    updatedCartItemsRemove = tempCartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  else if (ifAll === "all") {
    productId = tempCartItems.indexOf(productToRemove);
    tempCartItems.splice(productId, 1);
    updatedCartItemsRemove = [...tempCartItems];
  } else updatedCartItemsRemove = [...cartItems];

  return updatedCartItemsRemove;
};

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetCartDropdownIfActive = ActionWithPayload<
  CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
  boolean
>;
export const setCartItems = withMatcher(
  (categoriesArray: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, categoriesArray)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItem[] = [], productToAdd: CategoryItem) => {
    const updatedCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(updatedCartItems);
  }
);

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], productToRemove: CartItem, ifAll: string = "") => {
    const updatedCartItems = removeCartItem(cartItems, productToRemove, ifAll);

    return setCartItems(updatedCartItems);
  }
);

//                           ()               =>      {      }

export const setCartDropdownIfActive = withMatcher(
  (isOpen: boolean): SetCartDropdownIfActive =>
    createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, isOpen)
);
