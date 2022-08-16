import CheckoutItem from "../../components/checkout-item.scss/checkout-item.component";
import { useSelector } from "react-redux/es/exports";
import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart-dropdown/cart_dropdown.selector";
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from "./checkout.styles";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalCost = useSelector(selectCartTotal);
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
