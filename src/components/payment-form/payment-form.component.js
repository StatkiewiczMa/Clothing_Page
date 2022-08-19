import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import {
  FromContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart-dropdown/cart_dropdown.selector";
import { selectCurrentUser } from "../../store/user/user_selector";

const PaymentFrom = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsProcessingPayment(true);
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    const {
      paymentIntent: { client_secret },
    } = response;
    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "guest",
        },
      },
    });
    setIsProcessingPayment(false);
    if (paymentResult.error) alert(paymentResult.error);
    else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FromContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={"inverted"}>
          Pay Now
        </PaymentButton>
      </FromContainer>
    </PaymentFormContainer>
  );
};

export default PaymentFrom;
