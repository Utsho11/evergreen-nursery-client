import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { useState } from "react";
interface CheckoutFormProps {
  total: number;
  // Add other props if needed
}

const CheckoutForm: React.FC<CheckoutFormProps> = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message as string);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-16 px-32 w-[51rem] border-2 border-[#aab7c4] rounded-xl"
    >
      <h1 className="mb-8 text-lg text-[#aab7c4]">
        Please give your Information
      </h1>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              padding: "4px",
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <p className="text-sm font-medium text-red-500 my-8">{error}</p>
      <Button
        className="bg-[#81ba00] mb-8 text-white rounded-full text-sm font-medium px-8"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </Button>
    </form>
  );
};

export default CheckoutForm;
