import { CART_ACTION_TYPES } from "./cart_dropdown.type";

export const setCartItems = (categoriesArray) => ({
  type: CART_ACTION_TYPES.SET_CART_ITEMS,
  payload: categoriesArray,
});

export const setCartDropdownIfActive = () => ({
  type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN,
  payload: "",
});

export const addItemToCar = (cartItems, total, productToAdd) => {
  const { updatedCartItemsAdd, totalCost } = addCartItem(
    cartItems,
    productToAdd,
    total
  );
  const updatedItemsAndTotalCost = {
    cartItems: updatedCartItemsAdd,
    totalCost: totalCost,
  };
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: updatedItemsAndTotalCost,
  };
};

const addCartItem = (cartItems, productToAdd, howMuch) => {
  const tempCartItems = [...cartItems];
  const ifProductExist = tempCartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  if (ifProductExist) {
    return {
      updatedCartItemsAdd: tempCartItems.map((cartItem) =>
        cartItem.id === productToAdd.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ),
      totalCost: (howMuch += +productToAdd.price),
    };
  }

  return {
    updatedCartItemsAdd: [...tempCartItems, { ...productToAdd, quantity: 1 }],
    totalCost: (howMuch += +productToAdd.price),
  };
};

export const removeItemFromCart = (
  cartItems,
  total,
  productToRemove,
  ifAll = ""
) => {
  const { updatedCartItemsRemove, totalCost } = removeCartItem(
    productToRemove,
    cartItems,
    ifAll,
    total
  );
  const updatedItemsAndTotalCost = {
    cartItems: updatedCartItemsRemove,
    totalCost: totalCost,
  };
  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: updatedItemsAndTotalCost,
  };
};

const removeCartItem = (productToRemove, cartItems, ifAll, howMuch) => {
  const tempCartItems = [...cartItems];
  let productId = 0;

  if (ifAll !== "all" && productToRemove.quantity !== 1) {
    return {
      updatedCartItemsRemove: tempCartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ),
      totalCost: (howMuch -= +productToRemove.price),
    };
  } else if (ifAll === "all") {
    productId = tempCartItems.indexOf(productToRemove);
    howMuch -= productToRemove.price * productToRemove.quantity;
    tempCartItems.splice(productId, 1);

    return {
      updatedCartItemsRemove: [...tempCartItems],
      totalCost: +howMuch,
    };
  }
};
