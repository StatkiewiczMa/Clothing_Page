import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import "./cart-icon.styles.js";
import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from "./cart-icon.styles.js";

const CartIcon = () => {
	const { cartDropdownIfActive, setCartDropdownIfActive, cartItems } =
		useContext(CartDropdownContext);
	const itemsQuantityCounter = () => {
		let counter = cartItems.reduce(
			(accumulator, { quantity }) => accumulator + quantity,
			0
		);
		return counter;
	};

	const cartDropdownHandler = () =>
		setCartDropdownIfActive(!cartDropdownIfActive);
	// console.log("cartDropdownHandler: HIT", e);
	// alert("HOOHOOHOO");
	return (
		<CartIconContainer
			onClick={(e) => {
				cartDropdownHandler(e);
			}}>
			<ShoppingIcon />
			<ItemCount>{itemsQuantityCounter()}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
