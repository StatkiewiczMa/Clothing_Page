import { FC } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart-dropdown/cart_dropdown.action";
import { selectCartItems } from "../../store/cart-dropdown/cart_dropdown.selector";
import { CartItem } from "../../store/cart-dropdown/cart_dropdown.type";
import {
  CheckoutItemContainer,
  RemoveButton,
  Quantity,
  Image,
  Arrow,
  Value,
  Span,
} from "./checkout-item.styles";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, quantity, price, imageUrl } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <Image src={imageUrl} alt={name} />
      <Span>{name}</Span>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <Span>{`$${quantity * price}`}</Span>
      <RemoveButton
        className="remove-button"
        onClick={() => dispatch(removeItemFromCart(cartItems, cartItem, "all"))}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
