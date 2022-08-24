import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import "./cart-dropdown.styles.js";
import { useNavigate } from "react-router-dom";
import {
  CartDropdownContainer,
  CartItems,
  EmptyMessage,
} from "./cart-dropdown.styles.js";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart-dropdown/cart_dropdown.selector";
import { FC } from "react";
import { CartItem } from "../../store/cart-dropdown/cart_dropdown.type";
import CartItemDropdown from "../cart-item/cart-item.component";

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
          cartItems.map((item: CartItem) => (
            <CartItemDropdown key={item.id} cartItem={item} />
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
