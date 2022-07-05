import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
	const { cartDropdownIfActive, setCartDropdownIfActive } =
		useContext(CartDropdownContext);

	const cartDropdownHandler = (e) => {
		if (!cartDropdownIfActive) setCartDropdownIfActive(true);
		else if (cartDropdownIfActive) setCartDropdownIfActive(false);
		console.log("cartDropdownHandler: HIT", e);
		// alert("HOOHOOHOO");
	};

	return (
		<div
			className='cart-icon-container'
			onClick={(e) => {
				cartDropdownHandler(e);
			}}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>0</span>
		</div>
	);
};

export default CartIcon;
