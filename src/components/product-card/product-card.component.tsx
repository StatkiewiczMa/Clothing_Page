import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  Footer,
  Name,
  Price,
  ProductCardContainer,
} from "./product-card.styles";
import { selectCartItems } from "../../store/cart-dropdown/cart_dropdown.selector";
import { addItemToCart } from "../../store/cart-dropdown/cart_dropdown.action";
import { useDispatch, useSelector } from "react-redux/es/exports";

type ProductCardProps = {
  name: string;
  price: number;
  imageUrl: string;
};

type Product = {
  product: ProductCardProps;
};

const ProductCard = ({ product }: Product) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const addProductHandler = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price} </Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductHandler}
      >
        Add to cart
      </Button>
    </ProductCardContainer>
  );
};
export default ProductCard;
