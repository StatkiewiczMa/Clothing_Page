import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { CartIfActiveContext } from "../../contexts/cart-dropdown.context";

import "./cart-icon.styles.scss";

const CartIcon = () => {
	const { cartIfActive, setCartIfActive } = useContext(CartIfActiveContext);
    
	const cartDropdownHandler = (e) => {
		if (!cartIfActive) setCartIfActive(true);
		else if (cartIfActive) setCartIfActive(false);
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
