import { useContext } from "react";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import {
	Footer,
	Name,
	Price,
	ProductCardContainer,
} from "./product-card.styles";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartDropdownContext);

	const addProductHandler = () => addItemToCart(product);

	return (
		<ProductCardContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price} </Price>
			</Footer>
			<Button
				text='Add to cart'
				buttonType={BUTTON_TYPE_CLASSES.inverted}
				onClick={addProductHandler}></Button>
		</ProductCardContainer>
	);
};
export default ProductCard;