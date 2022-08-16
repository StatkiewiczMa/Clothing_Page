import { CART_ACTION_TYPES } from "./cart_dropdown.type";

export const setCartItems = (categoriesArray) => ({
  type: CART_ACTION_TYPES.SET_CART_ITEMS,
  payload: categoriesArray,
});

export const setCartDropdownIfActive = (isOpen) => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
  payload: isOpen,
});

export const addItemToCart = (cartItems, productToAdd) => {
  const updatedCartItemsAdd = addCartItem(cartItems, productToAdd);
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: updatedCartItemsAdd,
  };
};

const addCartItem = (cartItems, productToAdd) => {
  const ifProductExist = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  let updatedCartItemsAdd = [];
  if (ifProductExist) {
    updatedCartItemsAdd = cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    return updatedCartItemsAdd;
  }
  updatedCartItemsAdd = [...cartItems, { ...productToAdd, quantity: 1 }];
  return updatedCartItemsAdd;
};

export const removeItemFromCart = (cartItems, productToRemove, ifAll = "") => {
  const updatedItems = removeCartItem(cartItems, productToRemove, ifAll);

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: updatedItems,
  };
};

const removeCartItem = (cartItems, productToRemove, ifAll) => {
  const tempCartItems = [...cartItems];
  let updatedCartItemsRemove = [];
  let productId = 0;

  if (ifAll !== "all" && productToRemove.quantity !== 1)
    updatedCartItemsRemove = tempCartItems.map((cartItem) =>
      cartItem.id === productToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  else if (ifAll === "all") {
    productId = tempCartItems.indexOf(productToRemove);
    console.log(productId);
    console.log(tempCartItems);
    tempCartItems.splice(productId, 1);
    console.log(tempCartItems);
    updatedCartItemsRemove = [...tempCartItems];
  } else updatedCartItemsRemove = [...cartItems];

  return updatedCartItemsRemove;
};
