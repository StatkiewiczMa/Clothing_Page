import { useContext } from "react";

import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";
import { CartIfActiveContext } from "../../contexts/cart-dropdown.context";

const CartDropdown = () => {
	const { cartIfActive } = useContext(CartIfActiveContext);
	// console.log(cartIfActive);

	const dropdownHandler = () => {
		const temp = cartIfActive ? "Active" : "notActive";
		console.log(temp);
		return temp;
	};

	return (
		<div className={`cart-dropdown-container ${dropdownHandler()}`}>
			<div className='cart-items'>
				<Button text='go to checkout'></Button>
			</div>
		</div>
	);
};

export default CartDropdown;
