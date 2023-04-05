import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button from "../button/button.component";
import * as t from "../button/button.types";
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  
  const paymentHandler = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return; // if no stripe or elements, go back

    
  };
  
  return (
    <PaymentFormContainer>
      <h2>Credit Card Payment:</h2>
      <CardElement />
      <Button buttonType={t.INVERTED_BUTTON}>Pay now</Button>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
