import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "@/pages/Homepage";
import BlogPage from "@/pages/BlogPage";
import ShopPage from "@/pages/ShopPage";
import PlantDetailsPage from "@/components/shared/PlantDetailsPage";
import CartPage from "@/pages/CartPage";
import PaymentPage from "@/pages/PaymentPage";
import LoginPage from "@/pages/LoginPage";
import RegistrationPage from "@/pages/RegistrationPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "@/utils/routeGenerator";
import CustomerDashboard from "@/pages/customer/CustomerDashboard";
import { customerPaths } from "./customer.routes";
import PublishBlog from "@/pages/PublishBlog";
import BlogDetailsPage from "@/pages/BlogDetailsPage";
import ContactUs from "@/pages/ContactUs";
import AboutUs from "@/pages/AboutUs";

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
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegistrationPage />,
      },
      {
        path: "/admin",
        element: (
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: routeGenerator(adminPaths),
      },
      {
        path: "/customer",
        element: (
          <ProtectedRoute role="CUSTOMER">
            <CustomerDashboard />
          </ProtectedRoute>
        ),
        children: routeGenerator(customerPaths),
      },

      {
        path: "/blogs",
        element: <BlogPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetailsPage />,
      },
      {
        path: "/publish-blog",
        element: <PublishBlog />,
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
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
    ],
  },
]);

export default router;
