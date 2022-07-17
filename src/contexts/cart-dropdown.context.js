import { createContext, useState } from "react";
// Additional function, just to print to check output
const printArray = (array) => {
	array.forEach((element) => {
		console.log(element);
	});
};

const addCartItem = (cartItems, productToAdd, totalCost) => {
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
			howMuch: (totalCost += +productToAdd.price),
		};
	}

	return {
		updatedCartItemsAdd: [...tempCartItems, { ...productToAdd, quantity: 1 }],
		howMuch: (totalCost += +productToAdd.price),
	};
};
const removeCartItem = (productToRemove, cartItems, ifAll, totalCost) => {
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
			howMuch: (totalCost -= +productToRemove.price),
		};
	} else if (ifAll === "all") {
		// console.log("Diliszyn");
		productId = tempCartItems.indexOf(productToRemove);
		// console.log("PRZED" + printArray(tempCartItems));
		totalCost -= productToRemove.price * productToRemove.quantity;
		tempCartItems.splice(productId, 1);

		// tempCartItems.filter((cartItem)=>cartItem===productId)

		return {
			updatedCartItemsRemove: [...tempCartItems],
			howMuch: +totalCost,
		};
	}
};

// actual value of logged in User
export const CartDropdownContext = createContext({
	cartDropdownIfActive: false,
	setCartDropdownIfActive: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	totalCost: 0,
});

export const CartDropdownProvider = ({ children }) => {
	const [cartDropdownIfActive, setCartDropdownIfActive] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalCost, setTotalCost] = useState(0);

	const addItemToCart = (productToAdd) => {
		const { updatedCartItemsAdd, howMuch } = addCartItem(
			cartItems,
			productToAdd,
			totalCost
		);
		// console.log(totalCost + "<--TotalCost AfterAddingNewItem-->" + howMuch);
		setCartItems(updatedCartItemsAdd);
		setTotalCost(howMuch);
	};

	const removeItemFromCart = (productToRemove, ifAll = "") => {
		const { updatedCartItemsRemove, howMuch } = removeCartItem(
			productToRemove,
			cartItems,
			ifAll,
			totalCost
		);

		setCartItems(updatedCartItemsRemove);
		setTotalCost(howMuch);
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
