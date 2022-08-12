import { useContext } from "react";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import {
  CheckoutItemContainer,
  RemoveButton,
  Price,
  Quantity,
  Image,
  Name,
  Arrow,
  Value,
} from "./checkout-item.styles.js";

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
    <CheckoutItemContainer>
      <Image src={imageUrl} alt={name} />
      <Name>{name}</Name>
      <Quantity>
        <Arrow onClick={(event) => onArrowClickHandler(event)} id="leftArrow">
          &#10094;
        </Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={(event) => onArrowClickHandler(event)} id="rightArrow">
          &#10095;
        </Arrow>
      </Quantity>
      <Price>{`$${quantity * price}`}</Price>
      <RemoveButton
        className="remove-button"
        onClick={() => removeItemFromCart(cartItem, "all")}
      >
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};
export default CheckoutItem;
