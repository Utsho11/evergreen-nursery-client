import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "@/pages/Homepage";
import ProductManagementPage from "@/pages/ProductManagementPage";
import InsertProduct from "@/pages/InsertProduct";
import BlogPage from "@/pages/BlogPage";
import ShopPage from "@/pages/ShopPage";
import PlantDetailsPage from "@/components/shared/PlantDetailsPage";
import UpdateProduct from "@/pages/UpdateProduct";
import CartPage from "@/pages/CartPage";
import PaymentPage from "@/pages/PaymentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/manageProducts",
        element: <ProductManagementPage></ProductManagementPage>,
      },
      {
        path: "/manageProducts/update/:id",
        element: <UpdateProduct></UpdateProduct>,
      },
      {
        path: "/insertProduct",
        element: <InsertProduct></InsertProduct>,
      },
      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
        children: [
          {
            path: "category/:name",
            element: <ShopPage />,
          },
        ],
      },
      {
        path: "/shop/:id",
        element: <PlantDetailsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
    ],
  },
]);

export default router;
