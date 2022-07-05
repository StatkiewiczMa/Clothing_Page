import { useContext } from "react";
import Button from "../button/button.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemToCart } = useContext(CartDropdownContext);

	const addProductHandler = () => addItemToCart(product);

	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
				<Button
					text='Add to card'
					buttonType='inverted'
					onClick={addProductHandler}></Button>
			</div>
		</div>
	);
};
export default ProductCard;
