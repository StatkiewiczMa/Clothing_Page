import { useDispatch, useSelector } from "react-redux/es/exports";
import { selectCartCount, selectCartToggleCartDropdown } from "../../store/cart-dropdown/cart_dropdown.selector";
import { setCartDropdownIfActive } from "../../store/cart-dropdown/cart_dropdown.action";

import {
  CartIconContainer,
  ItemCount,
  ShoppingIcon,
} from "./cart-icon.styles.js";

const CartIcon = () => {
  const dispatch = useDispatch();
  const counter = useSelector(selectCartCount);
  const cartDropdownIfActive = useSelector(selectCartToggleCartDropdown);

  const cartDropdownHandler = () => dispatch(setCartDropdownIfActive(!cartDropdownIfActive));
  
  return (
    <CartIconContainer
      onClick={(e) => {
        cartDropdownHandler(e);
      }}
    >
      <ShoppingIcon />
      <ItemCount>{counter}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
