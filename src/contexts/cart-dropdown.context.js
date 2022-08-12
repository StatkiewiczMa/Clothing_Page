import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd, howMuch) => {
  const tempCartItems = [...cartItems];
  const ifProductExist = tempCartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // console.log(productToAdd);
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
const removeCartItem = (productToRemove, cartItems, ifAll, howMuch) => {
  const tempCartItems = [...cartItems];
  let productId = 0;
  // console.log(...cartItems, tempCartItems, productToRemove, ifAll);
  if (ifAll !== "all" && productToRemove.quantity !== 1) {
    // console.log("Majnas Ainz");
    return {
      updatedCartItemsRemove: tempCartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ),
      totalCost: (howMuch -= +productToRemove.price),
    };
  } else if (ifAll === "all") {
    // console.log("Diliszyn");
    productId = tempCartItems.indexOf(productToRemove);
    // console.log("PRZED" + printArray(tempCartItems));
    howMuch -= productToRemove.price * productToRemove.quantity;
    tempCartItems.splice(productId, 1);

    // tempCartItems.filter((cartItem)=>cartItem===productId)

    return {
      updatedCartItemsRemove: [...tempCartItems],
      totalCost: +howMuch,
    };
  }
};

// actual value of logged in User

const cartReducer = (state, action) => {
  const { type, payload } = action;
  // console.log(state.cartItems, action.payload)

  switch (type) {
    case ACTION.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case ACTION.SET_TOTAL_COST:
      return {
        ...state,
        totalCost: payload,
      };
    case ACTION.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        cartDropdownIfActive: !state.cartDropdownIfActive,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  cartDropdownIfActive: false,
  cartItems: [],
  totalCost: 0,
};

const ACTION = {
  SET_CART_ITEMS: "setCartItems",
  ADD_TO_CART: "addToCart",
  SET_TOTAL_COST: "setTotalCost",
  TOGGLE_CART_DROPDOWN: "cartDropdownIfActive",
};

export const CartDropdownContext = createContext({
  cartDropdownIfActive: false,
  setCartDropdownIfActive: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  totalCost: 0,
});
export const CartDropdownProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartDropdownIfActive, totalCost, cartItems } = state;

  const setCartDropdownIfActive = () => {
    dispatch({ type: ACTION.TOGGLE_CART_DROPDOWN });
  };

  const addItemToCart = (productToAdd) => {
    const { updatedCartItemsAdd, totalCost } = addCartItem(
      state.cartItems,
      productToAdd,
      state.totalCost
    );
    const updatedItemsAndTotalCost = {
      cartItems: updatedCartItemsAdd,
      totalCost: totalCost,
    };
    dispatch({
      type: ACTION.SET_CART_ITEMS,
      payload: updatedItemsAndTotalCost,
    });
  };

  const removeItemFromCart = (productToRemove, ifAll = "") => {
    // dispatch({type: , payload:})
    const { updatedCartItemsRemove, totalCost } = removeCartItem(
      productToRemove,
      state.cartItems,
      ifAll,
      state.totalCost
    );
    const updatedItemsAndTotalCost = {
      cartItems: updatedCartItemsRemove,
      totalCost: totalCost,
    };
    dispatch({
      type: ACTION.SET_CART_ITEMS,
      payload: updatedItemsAndTotalCost,
    });
  };

  const value = {
    cartDropdownIfActive,
    setCartDropdownIfActive,
    addItemToCart,
    removeItemFromCart,
    cartItems,
    totalCost,
  };

  return (
    <CartDropdownContext.Provider value={value}>
      {children}
    </CartDropdownContext.Provider>
  );
};
