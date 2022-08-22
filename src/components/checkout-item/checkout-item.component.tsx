import { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart-dropdown/cart_dropdown.action";
import { selectCartItems } from "../../store/cart-dropdown/cart_dropdown.selector";
import { CategoryItem } from "../../store/categories/category.types";
import {
  CheckoutItemContainer,
  RemoveButton,
  Quantity,
  Image,
  Arrow,
  Value,
  Span,
} from "./checkout-item.styles.js";

type CheckoutItemProps = {
  cartItem: CategoryItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, quantity, price, imageUrl } = cartItem;
  const cartItems = useSelector(selectCartItems);

  const onArrowClickHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.id);
    if (event.target.id === "leftArrow") {
      // console.log("Left Arrow klik brada");
      dispatch(removeItemFromCart(cartItems, cartItem));
    } else if (event.target.id === "rightArrow") {
      // console.log("Right Arrow klik brada");
      dispatch(addItemToCart(cartItems, cartItem));
    }
  };

  return (
    <CheckoutItemContainer>
      <Image src={imageUrl} alt={name} />
      <Span>{name}</Span>
      <Quantity>
        <Arrow onClick={() => onArrowClickHandler} id="leftArrow">
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={() => onArrowClickHandler} id="rightArrow">
          &#10095;
        </Arrow>
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
