import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CartPage = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const shippingFee = total > 100 || total === 0 ? 0 : 9.99;
  const discountAmount = promoApplied ? total * 0.1 : 0;
  const finalTotal = Math.max(0, total - discountAmount + shippingFee);

  const handleDelete = (id: string, name: string) => {
    dispatch(removeCart(id));
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "EVERGREEN10" || promoCode.trim().toUpperCase() === "NURSERY10") {
      setPromoApplied(true);
      toast({
        title: "Promo Applied!",
        description: "10% botanical discount applied to your order.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Try code 'EVERGREEN10' for 10% off your purchase!",
      });
    }
  };

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please Sign In",
        description: "You must be logged in to proceed with checkout.",
      });
      navigate("/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast({
        title: "Customer Account Required",
        description: "Admin accounts cannot checkout orders. Please login as a customer.",
      });
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Checkout Progress Stepper */}
      <div className="max-w-2xl mx-auto py-4">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-full bg-slate-200 -z-10" />
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-[#81ba00] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              1
            </div>
            <span className="text-xs font-bold text-[#81ba00]">Shopping Cart</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <span className="text-xs font-medium text-slate-400">Checkout Info</span>
          </div>
          <div className="flex flex-col items-center gap-1.5 bg-[#FAFAF8] px-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <span className="text-xs font-medium text-slate-400">Confirmation</span>
          </div>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-100">
              <div className="p-5 flex items-center justify-between bg-slate-50/70">
                <h2 className="text-base font-bold text-slate-800">
                  Cart Items ({items.reduce((acc, item) => acc + item.quantity, 0)})
                </h2>
                <span className="text-xs text-slate-400 font-medium">Standard Delivery</span>
              </div>

              {items.map((item) => (
                <div
                  key={item.productId}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0"
                    />
                    <div className="space-y-1">
                      <NavLink
                        to={`/shop/${item.productId}`}
                        className="text-sm sm:text-base font-bold text-slate-800 hover:text-[#81ba00] transition-colors"
                      >
                        {item.name}
                      </NavLink>
                      <p className="text-xs text-slate-400">Unit Price: ${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Quantity Stepper, Line Total, Delete */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8">
                    {/* Stepper */}
                    <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-white">
                      <button
                        onClick={() =>
                          dispatch(decreaseQuantity({ productId: item.productId, quantity: 1 }))
                        }
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(increaseQuantity({ productId: item.productId, quantity: 1 }))
                        }
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-sm sm:text-base font-extrabold text-[#81ba00]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(item.productId, item.name)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Back to Shop Link */}
            <div className="pt-2">
              <NavLink
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#81ba00] transition-colors"
              >
                <span>← Continue Browsing Plants</span>
              </NavLink>
            </div>
          </div>

          {/* Sticky Order Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6">
              <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-4">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code (e.g. EVERGREEN10)"
                    disabled={promoApplied}
                    className="flex-grow text-xs uppercase px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-hidden focus:border-[#81ba00] disabled:bg-slate-100"
                  />
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={promoApplied || !promoCode.trim()}
                    className="text-xs font-bold rounded-xl"
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 size={12} /> 10% Discount Applied!
                  </p>
                )}
              </form>

              {/* Financial Breakdown */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">${total.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Voucher Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <p className="text-[11px] text-slate-400">
                    Add ${(100 - total).toFixed(2)} more to qualify for <strong>FREE Shipping</strong>.
                  </p>
                )}
                <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline text-base sm:text-lg font-extrabold text-slate-800">
                  <span>Total Amount</span>
                  <span className="text-xl sm:text-2xl text-[#81ba00]">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#81ba00] hover:bg-[#72a500] text-white rounded-2xl py-6 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </Button>

              {/* Trust Badges */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-6 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" /> SSL Encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-emerald-600" /> Plant Safe Delivery
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="max-w-md mx-auto py-16 text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-[#81ba00]/10 text-[#81ba00] mx-auto flex items-center justify-center">
            <ShoppingBag size={36} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-800">Your Cart is Empty</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Looks like you haven't added any botanical greens to your cart yet.
            </p>
          </div>
          <NavLink to="/shop" className="inline-block pt-2">
            <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-8 py-5 text-xs font-bold shadow-md">
              Start Shopping Plants
            </Button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default CartPage;
