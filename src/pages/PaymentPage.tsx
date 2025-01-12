import banner from "@/assets/bg/footer-parallax.webp";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import { useToast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/services/authApi";
import { FieldValues } from "react-hook-form";

const PaymentPage = () => {
  const { toast } = useToast();
  const user = useAppSelector(selectCurrentUser);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { items, total } = useAppSelector((state) => state.cart);

  const onSubmit = async (data: FieldValues) => {
    const paymentData = {
      userInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        location: data.location,
      },
      cartItems: items,
      totalPrice: total,
    };
    console.log(paymentData);
    try {
      const res = await createOrder(paymentData).unwrap();
      console.log(res.data.payment_url);

      if (res.data.result === "true") {
        window.location.href = res.data.payment_url;
        toast({
          title: "Order Placed!",
          description:
            "Thank you for your order. Your payment will be processed shortly.",
        });
      }
    } catch {
      toast({
        title: "Failed to place order!",
        description: "Please try again later.",
      });
    }
  };
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="flex items-center justify-center sm:min-h-[40vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">Payment</h1>
      </div>

      {/* Payment Section */}
      <div className="mx-auto w-full max-w-md sm:max-w-lg p-6 border shadow-md rounded-lg bg-white mb-8">
        {/* User Info */}
        <h1 className="text-center text-3xl font-semibold mb-6">User Info</h1>
        <ENForm
          label="Procceed to payment"
          onSubmit={onSubmit}
          isLoading={isLoading}
          defaultValues={user || {}}
        >
          <ENInput
            name="name"
            label="Customer Name"
            placeholder="Enter customer name"
          />
          <ENInput
            name="email"
            label="Customer Email"
            placeholder="Enter customer email"
          />
          <ENInput
            name="phone"
            label="Customer Phone"
            placeholder="Enter customer phone number"
          />
          <ENInput
            name="location"
            label="Customer Location"
            placeholder="Enter customer location"
          />
          <div className="">
            <p className="font-semibold text-xl">
              You have to pay: <span className="text-[#81BA00]">${total}</span>
            </p>
          </div>
        </ENForm>
      </div>
    </div>
  );
};

export default PaymentPage;
