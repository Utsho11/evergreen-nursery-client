import CreateCategory from "@/pages/admin/CreateCategory";
import InsertProduct from "@/pages/admin/InsertProduct";

export const adminPaths = [
  {
    path: "create-category",
    element: <CreateCategory />,
  },
  {
    path: "create-product",
    element: <InsertProduct />,
  },
];
