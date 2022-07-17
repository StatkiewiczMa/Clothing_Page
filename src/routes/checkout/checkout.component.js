import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item.scss/checkout-item.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import "./checkout.styles.scss";

const Checkout = () => {
	const { cartItems, totalCost } = useContext(CartDropdownContext);
	// console.log(cartItems);

	return (
		<div className='checkout-container'>
			<header className='checkout-header'>
				<div className='header-block'>
					<span>Product</span>
				</div>
				<div className='header-block'>
					<span>Description</span>
				</div>

				<div className='header-block'>
					<span>Quantity</span>
				</div>
				<div className='header-block'>
					<span>Price</span>
				</div>
				<div className='header-block'>
					<span>Remove</span>
				</div>
			</header>

			{cartItems.map((currentItem) => (
				<CheckoutItem
					key={currentItem.id}
					cartItem={currentItem}></CheckoutItem>
			))}

			<footer className='total'>{`Total: $${totalCost}`}</footer>
		</div>
	);
};

export default Checkout;
