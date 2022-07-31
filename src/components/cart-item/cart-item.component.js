import "./cart-item.styles.js";
import {
	CartItemContainer,
	Image,
	ItemDetails,
	Name,
	Price,
} from "./cart-item.styles.js";

const CartItem = ({ cartItem }) => {
	const { name, quantity, price, imageUrl } = cartItem;

	return (
		<CartItemContainer>
			<Image src={imageUrl} alt={name} />
			<ItemDetails>
				<Name>{name}</Name>
				<Price className='price'>{`${quantity} x ${price} = $${
					quantity * price
				}`}</Price>
			</ItemDetails>
		</CartItemContainer>
	);
};

export default CartItem;
