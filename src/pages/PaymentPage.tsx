import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import { useToast } from "@/components/ui/use-toast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/services/authApi";
import { FieldValues } from "react-hook-form";
import { NavLink } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Lock,
  MapPin,
} from "lucide-react";

const PaymentPage = () => {
  const { toast } = useToast();
  const user = useAppSelector(selectCurrentUser);
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const { items, total } = useAppSelector((state) => state.cart);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Your Cart is Empty</h2>
        <p className="text-sm text-slate-500">Please add items to your cart before proceeding to payment.</p>
        <NavLink to="/shop">
          <button className="bg-[#81ba00] text-white px-6 py-2.5 rounded-full text-xs font-semibold">
            Browse Plants
          </button>
        </NavLink>
      </div>
    );
  }

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

    try {
      const res = await createOrder(paymentData).unwrap();
      if (res?.data?.payment_url) {
        toast({
          title: "Redirecting to Secure Gateway",
          description: "Please complete your payment on the secure SSLCommerz portal.",
        });
        window.location.href = res.data.payment_url;
      }
    } catch {
      toast({
        title: "Failed to create order",
        description: "Please check your network connection and try again.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="max-w-2xl mx-auto py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 -z-10" />
          <NavLink to="/cart" className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shadow-xs">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-xs font-medium text-slate-500">Shopping Cart</span>
          </NavLink>
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              2
            </div>
            <span className="text-xs font-bold text-[#81ba00]">Checkout Info</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-xs font-medium text-slate-400">Confirmation</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form (7 cols) + Order Review (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
        {/* Delivery Information Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
              <MapPin size={20} className="text-[#81ba00]" />
              <span>Delivery & Customer Details</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Please provide accurate shipping information for safe nursery delivery.
            </p>
          </div>

          <ENForm
            label="Proceed to Secure Payment"
            onSubmit={onSubmit}
            isLoading={isLoading}
            defaultValues={{
              name: user?.name || "",
              email: user?.email || "",
              phone: "",
              location: "",
            }}
          >
            <div className="space-y-4">
              <div>
                <ENInput
                  name="name"
                  label="Full Recipient Name"
                  placeholder="e.g. Eleanor Vance"
                />
              </div>

              <div>
                <ENInput
                  name="email"
                  label="Email Address (for order receipts)"
                  placeholder="e.g. eleanor@example.com"
                />
              </div>

              <div>
                <ENInput
                  name="phone"
                  label="Contact Phone Number"
                  placeholder="e.g. +1 555 019 2834"
                />
              </div>

              <div>
                <ENInput
                  name="location"
                  label="Delivery Address & City"
                  placeholder="e.g. 42 Green Orchard Lane, Apt 3B, New York, NY"
                />
              </div>
            </div>
          </ENForm>

          <NavLink
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#81ba00] pt-2"
          >
            <ArrowLeft size={14} />
            <span>Return to Cart Review</span>
          </NavLink>
        </div>

        {/* Order Review Sidebar (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 sticky top-24">
          <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-4 flex items-center gap-2">
            <CreditCard size={18} className="text-[#81ba00]" />
            <span>Order Overview</span>
          </h3>

          {/* Mini item list */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-100 flex-shrink-0"
                  />
                  <div className="truncate max-w-[140px]">
                    <p className="font-bold text-slate-800 truncate">{item.name}</p>
                    <p className="text-slate-400 font-medium">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total Breakdown */}
          <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Botanical Packaging</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline text-base font-extrabold text-slate-800">
              <span>Amount Due</span>
              <span className="text-2xl text-[#81ba00]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* SSL Security Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-[11px] text-slate-500">
            <Lock size={16} className="text-emerald-600 flex-shrink-0" />
            <span>Payments are securely processed via 256-bit encrypted SSLCommerz gateway.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
