import { useContext } from "react";

import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import CartItem from "../cart-item/cart-item.component";
import { Link } from "react-router-dom";

const CartDropdown = () => {
	const { cartDropdownIfActive, cartItems } = useContext(CartDropdownContext);
	// console.log("CartItems:", cartItems);

	const dropdownHandler = () => {
		const temp = cartDropdownIfActive ? "Active" : "notActive";
		// console.log(temp);
		return temp;
	};

	return (
		<div className={`cart-dropdown-container ${dropdownHandler()}`}>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
				<Link to='/checkout'>
				<Button text='go to checkout'></Button>

				</Link>
			</div>
		</div>
	);
};

export default CartDropdown;
