import CustomerProfile from "@/pages/customer/CustomerProfile";
import OrderHistory from "@/pages/customer/OrderHistory";
import WriteReview from "@/pages/customer/WriteReview";

export const customerPaths = [
  {
    path: "profile",
    element: <CustomerProfile />,
  },
  {
    path: "add-review",
    element: <WriteReview />,
  },
  {
    path: "order-history",
    element: <OrderHistory />,
  },
];
