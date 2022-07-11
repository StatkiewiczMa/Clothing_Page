import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item.scss/checkout-item.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";

import "./checkout.styles.scss";

const Checkout = () => {
	const { cartItems } = useContext(CartDropdownContext);
	// console.log(cartItems);

	return (
		<div className='checkout-container'>
			<header className='checkout-header-container'>
				<div>Product</div>
				<div>Description</div>
				{/* <div className="checkout-header-block"></div> */}
				<div>Quantity</div>
				<div>Price</div>
				<div>Remove</div>
			</header>
			<div className='checkout-items-container'>
				{cartItems.map((currentItem) => (
					<CheckoutItem
						key={currentItem.id}
						cartItem={currentItem}></CheckoutItem>
				))}
			</div>
		</div>
	);
};

export default Checkout;
