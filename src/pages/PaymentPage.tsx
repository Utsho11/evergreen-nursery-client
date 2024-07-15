import CheckoutForm from "@/components/shared/CheckoutForm";
import { useAppSelector } from "@/redux/hooks";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const PaymentPage = () => {
  const { total } = useAppSelector((state) => state.cart);

  return (
    <div className="my-32 container mx-auto flex flex-col justify-center items-center text-center px-32 py-32">
      <h1 className="text-3xl mb-16 font-medium">You have to Pay $ {total}</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm total={total} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
