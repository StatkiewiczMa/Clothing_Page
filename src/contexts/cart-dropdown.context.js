import { createContext, useState } from "react";

// actual value of logged in User
export const CartIfActiveContext = createContext({
	cartIfActive: false,
	setCartIfActive: () => {},
});

export const CartIfActiveProvider = ({ children }) => {
	const [cartIfActive, setCartIfActive] = useState(false);
	const value = { cartIfActive, setCartIfActive };
	return (
		<CartIfActiveContext.Provider value={value}>
			{children}
		</CartIfActiveContext.Provider>
	);
};
