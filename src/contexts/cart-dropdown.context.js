import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const tempCartItems = [...cartItems];
	// Searching through cartItems for productToAdd annd increasing quantity if there is matching product
	const ifProductExist = tempCartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	// if items contains productToAdd
	if (ifProductExist) {
		return tempCartItems.map((cartItem) =>
		cartItem.id === productToAdd.id
		? { ...cartItem, quantity: cartItem.quantity + 1 }
		: cartItem
		);
	}
	// No=>create one
	console.log("Oh my, new product!")
	// return new arrey with modified cartitems
	return [...tempCartItems, { ...productToAdd, quantity: 1 }];
};

// actual value of logged in User
export const CartDropdownContext = createContext({
	cartDropdownIfActive: false,
	setCartDropdownIfActive: () => {},
	cartItems: [],
	addItemToCart: () => {},
});

export const CartDropdownProvider = ({ children }) => {
	const [cartDropdownIfActive, setCartDropdownIfActive] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const addItemToCart = (productToAdd) => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const value = {
		cartDropdownIfActive,
		setCartDropdownIfActive,
		addItemToCart,
		cartItems,
	};

	return (
		<CartDropdownContext.Provider value={value}>
			{children}
		</CartDropdownContext.Provider>
	);
};
