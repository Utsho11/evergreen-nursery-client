import DeleteIcon from "@/assets/icons/DeleteIcon";
import EmptyCart from "@/assets/icons/EmptyCart";
import MinusIcon from "@/assets/icons/MinusIcon";
import PlusIcon from "@/assets/icons/PlusIcon";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCart,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";



const CartPage = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  // Handler to remove a cart item
  const deleteCart = (id: string) => {
    dispatch(removeCart(id));
  };

  // Handler to increase quantity
  const incQuantity = (id: string, availableQuantity: number) => {
    dispatch(
      increaseQuantity({ productId: id, quantity: 1, availableQuantity })
    );
  };

  // Handler to decrease quantity
  const decQuantity = (id: string) => {
    dispatch(decreaseQuantity({ productId: id, quantity: 1 }));
  };



  
  return (
    <div className="">
      <div
        style={{
          backgroundImage: `url("https://soilplant-codezeel.myshopify.com/cdn/shop/files/footer-parallax.jpg?v=1668839490")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=""
      >
        <div className="w-full h-[200px] flex items-center justify-center">
          <h1 className="text-[2.875rem] text-white font-medium">
            Your Shoping Cart
          </h1>
        </div>
      </div>
      {items.length > 0 ? (
        <Table className="container my-32 mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold w-[120px] text-center">
                Image
              </TableHead>
              <TableHead className="font-semibold text-center">Name</TableHead>
              <TableHead className="font-semibold text-center">
                Quantity
              </TableHead>
              <TableHead className="font-semibold text-center">
                Price per Item
              </TableHead>
              <TableHead className="font-semibold text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.productId}>
                <TableCell>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover"
                  />
                </TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="flex justify-center items-center text-center  gap-2">
                  <Button
                    onClick={() => decQuantity(item.productId)}
                    className="hover:bg-[#81ba00]  hover:text-white"
                  >
                    <MinusIcon />
                  </Button>
                  <p className="px-2 py-7">{item.quantity}</p>
                  <Button
                    onClick={() =>
                      incQuantity(item.productId, item.availableQuantity)
                    }
                    className="hover:bg-[#81ba00] hover:text-white"
                  >
                    <PlusIcon />
                  </Button>
                </TableCell>
                <TableCell className="text-center font-semibold text-[#81ba00]">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    className="navlink hover:bg-transparent"
                    onClick={() => deleteCart(item.productId)}
                  >
                    <DeleteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>
                <NavLink to="/shop">
                  <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-16">
                    Continue Shopping
                  </Button>
                </NavLink>
              </TableCell>
              <TableCell className="text-right font-bold">Total</TableCell>
              <TableCell className="text-center font-semibold text-[#81ba00]">
                ${total.toFixed(2)}
              </TableCell>
              <TableCell className="flex justify-center items-center">
                <NavLink to="/payment">
                  <Button className="hover:bg-[#81ba00] border-2 border-slate-500 hover:text-white rounded-full text-sm font-medium text-center px-8">
                    Check Out
                  </Button>
                </NavLink>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center space-y-8 my-32">
            <div className="w-[100px] h-[100px]">
              <EmptyCart />
            </div>
            <p className="text-3xl font-medium">Your Cart is Empty</p>
            <NavLink to="/shop">
              <Button className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-16">
                Continue Shopping
              </Button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
