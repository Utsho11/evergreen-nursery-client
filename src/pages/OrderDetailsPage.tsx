import EyeIcon from "@/assets/icons/EyeIcon";
import ProfileIcon from "@/assets/icons/ProfileIcon";
import ShopIcon from "@/assets/icons/ShopIcon";
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
import { useAppSelector } from "@/redux/hooks";
import { NavLink } from "react-router-dom";

const OrderDetailsPage = () => {
  const customer = useAppSelector((state) => state.customer);
  const { items, total } = useAppSelector((state) => state.cart);

  return (
    <div className="py-32">
      {customer.length > 0 ? (
        <div className="">
          <div className="">
            <div className="text-5xl flex justify-center items-center gap-3 mb-8">
              <ProfileIcon />
              <h1>Customer Details</h1>
            </div>
            <div className="flex justify-center gap-5">
              <div className="">
                <p className="text-lg font-semibold text-[#81ba00]">
                  Customer Name:{" "}
                </p>
                <p className="text-lg font-semibold text-[#81ba00]">
                  Customer Phone:{" "}
                </p>
                <p className="text-lg font-semibold text-[#81ba00]">
                  Customer Address:{" "}
                </p>
              </div>
              <div className="">
                <p className="text-lg text-slate-500">{customer[0].name}</p>
                <p className="text-lg text-slate-500">{customer[0].phone}</p>
                <p className="text-lg text-slate-500">{customer[0].address}</p>
              </div>
            </div>
            <div className="text-5xl flex justify-center items-center gap-5 mt-16">
              <ShopIcon />
              <h1>Order Lists</h1>
            </div>
          </div>
          <div className="container mt-8 mx-auto">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold w-[120px] text-center">
                    Image
                  </TableHead>
                  <TableHead className="font-semibold text-center">
                    Name
                  </TableHead>
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

                    <TableCell className="text-center font-semibold text-[#81ba00]">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-center font-semibold text-[#81ba00]">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-center">
                      <NavLink to={`/shop/${item.productId}`}>
                        <Button className="navlink hover:bg-transparent">
                          <EyeIcon />
                        </Button>
                      </NavLink>
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
                </TableRow>
              </TableFooter>
            </Table>
            <div className="text-center mt-8">
              <p>
                <span className="font-semibold text-lg text-[#81ba00]">
                  Note:{" "}
                </span>
                <span className="text-sm text-slate-400">
                  Your Order will be delvered within 7 days to 10 days.
                </span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-5xl font-semibold">No Order Placed Yet !!!</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
