import { useContext } from "react";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./cart-dropdown.styles.js";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
	CartDropdownContainer,
	CartItems,
	EmptyMessage,
} from "./cart-dropdown.styles.js";

const CartDropdown = () => {
	const { cartItems } = useContext(CartDropdownContext);
	const navigate = useNavigate();
	// console.log("CartItems:", cartItems);
	const goToCheckout = () => {
		navigate("/checkout");
	};
	return (
		<CartDropdownContainer className={`cart-dropdown-container`}>
			<CartItems className='cart-items'>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>Your Cart is Empty</EmptyMessage>
				)}

				<Button
					buttonType={BUTTON_TYPE_CLASSES.base}
					text='go to checkout'
					onClick={goToCheckout}></Button>
			</CartItems>
		</CartDropdownContainer>
	);
};

export default CartDropdown;
