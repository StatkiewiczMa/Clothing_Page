import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
	const tempCartItems = [...cartItems];
	const ifProductExist = tempCartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	if (ifProductExist) {
		return tempCartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	return [...tempCartItems, { ...productToAdd, quantity: 1 }];
};
const removeCartItem = (cartItems, productToRemove, ifAll) => {
	const tempCartItems = [...cartItems];
	let productId = 0;
	console.log(...cartItems, tempCartItems, productToRemove, ifAll);
	if (ifAll !== "all" && productToRemove.quantity !== 1) {
		// console.log('hiytttttyr')
		return tempCartItems.map((cartItem) =>
			cartItem.id === productToRemove.id
				? { ...cartItem, quantity: cartItem.quantity - 1 }
				: cartItem
		);
	} else {
		productId = tempCartItems.indexOf(productToRemove);
		// console.log(tempCartItems, cartItems)
		return [...tempCartItems.splice(productId, 1)];
	}
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
	const removeItemFromCart = (productToRemove, ifAll = "") => {
		setCartItems(removeCartItem(cartItems, productToRemove, ifAll));
	};

	const value = {
		cartDropdownIfActive,
		setCartDropdownIfActive,
		addItemToCart,
		removeItemFromCart,
		cartItems,
	};

	return (
		<CartDropdownContext.Provider value={value}>
			{children}
		</CartDropdownContext.Provider>
	);
};
