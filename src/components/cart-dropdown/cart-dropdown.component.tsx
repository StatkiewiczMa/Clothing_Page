import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./cart-dropdown.styles.js";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.js";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart-dropdown/cart_dropdown.selector";
import { FC } from "react";
import { CartsItem } from "../../store/cart-dropdown/cart_dropdown.type";

const CartDropdown: FC = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item: CartsItem) => (
            <CartItem key={item.id} cartItem={item} />
          ))
        ) : (
          <EmptyMessage>Your Cart is Empty</EmptyMessage>
        )}

        <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={goToCheckout}>
          go to checkout
        </Button>
      </CartItems>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
