import { CartItem } from "../../store/cart-dropdown/cart_dropdown.type";
import {
  CartItemContainer,
  Image,
  ItemDetails,
  Name,
  Price,
} from "./cart-item.styles";

export type CartItemProps = {
  cartItem: CartItem;
};

const CartItemDropdown = ({ cartItem }: CartItemProps) => {
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

export default CartItemDropdown;
