import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item.scss/checkout-item.component";
import { CartDropdownContext } from "../../contexts/cart-dropdown.context";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

const Checkout = () => {
  const { cartItems, totalCost } = useContext(CartDropdownContext);
  // console.log(cartItems);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((currentItem) => (
        <CheckoutItem
          key={currentItem.id}
          cartItem={currentItem}
        ></CheckoutItem>
      ))}

      <Total>{`Total: $${totalCost}`}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;
