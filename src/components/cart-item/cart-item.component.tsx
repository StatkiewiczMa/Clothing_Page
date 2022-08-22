import { CartsItem } from "../../store/cart-dropdown/cart_dropdown.type.js";
import "./cart-item.styles.js";
import {
  CartItemContainer,
  Image,
  ItemDetails,
  Name,
  Price,
} from "./cart-item.styles.js";

export type CartItemProps = {
  cartItem: CartsItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <Price className="price">{`${quantity} x ${price} = $${
          quantity * price
        }`}</Price>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
