import AdminProfile from "@/pages/admin/AdminProfile";
import CreateCategory from "@/pages/admin/CreateCategory";
import InsertProduct from "@/pages/admin/InsertProduct";
import ManageCategory from "@/pages/admin/ManageCategory";
import ManagePlants from "@/pages/admin/ManagePlants";
import ManageUsers from "@/pages/admin/ManageUsers";
import UpdatePlant from "@/pages/admin/UpdatePlant";
import ViewTransactions from "@/pages/admin/ViewTransactions";
import MyBlogs from "@/pages/MyBlogs";

export const adminPaths = [
  {
    path: "profile",
    element: <AdminProfile />,
  },
  {
    path: "create-category",
    element: <CreateCategory />,
  },
  {
    path: "create-product",
    element: <InsertProduct />,
  },
  {
    path: "manage-users",
    element: <ManageUsers />,
  },
  {
    path: "manage-category",
    element: <ManageCategory />,
  },
  {
    path: "manage-plants",
    element: <ManagePlants />,
  },
  {
    path: "update-plants/:id",
    element: <UpdatePlant />,
  },
  {
    path: "view-transactions",
    element: <ViewTransactions />,
  },
  {
    path: "my-blogs",
    element: <MyBlogs />,
  },
];
