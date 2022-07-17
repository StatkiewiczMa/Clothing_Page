import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;
	const { removeItemFromCart, addItemToCart } = useContext(CartDropdownContext);

	const onArrowClickHandler = (event) => {
		// console.log(event.target.id);
		if (event.target.id === "leftArrow") {
			// console.log("Left Arrow klik brada");
			removeItemFromCart(cartItem);
		} else if (event.target.id === "rightArrow") {
			// console.log("Right Arrow klik brada");
			addItemToCart(cartItem);
		}
	};

	return (
		<div className='checkout-item-container'>
			<img className='image' src={imageUrl} alt={name} />
			<div className='name'>{name}</div>
			<div className='quantity'>
				<span
					onClick={(event) => onArrowClickHandler(event)}
					className='arrow'
					id='leftArrow'>
					&#10094;
				</span>
				<span className="value">
					{quantity}
					</span>
				<span
					onClick={(event) => onArrowClickHandler(event)}
					className='arrow'
					id='rightArrow'>
					&#10095;
				</span>
			</div>
			<div className='price'>{`$${quantity * price}`}</div>
			<div
				className='remove-button'
				onClick={() => removeItemFromCart(cartItem, "all")}>
				&#10005;
			</div>
		</div>
	);
};
export default CheckoutItem;
