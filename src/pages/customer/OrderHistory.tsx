import { useGetCustomerOrderHistoryQuery } from "@/redux/services/authApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingBag, CheckCircle2, Clock, AlertCircle, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderHistory = () => {
  const { data, isLoading } = useGetCustomerOrderHistoryQuery(null);
  const orderHistory = data?.data || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <ShoppingCart size={24} className="text-[#81ba00]" />
            <span>My Nursery Orders</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Review past transactions, item receipts, and delivery updates
          </p>
        </div>

        <NavLink to="/shop">
          <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-1.5 shadow-sm">
            <ShoppingBag size={15} />
            <span>Shop New Plants</span>
          </Button>
        </NavLink>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : orderHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <TableHead>Order Invoice</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Shipping Address</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead className="text-right">Order Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderHistory.map((invoice, index) => {
                  const isPaid =
                    invoice.status === "Completed" ||
                    invoice.status === "Paid" ||
                    invoice.status === "SUCCESS";

                  return (
                    <TableRow
                      key={index}
                      className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {invoice.transactionId || `INV-${index + 1000}`}
                      </TableCell>
                      <TableCell className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                        {invoice.userInfo?.name || "Customer"}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {invoice.userInfo?.location || "Standard Home Delivery"}
                      </TableCell>
                      <TableCell>
                        {isPaid ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        ) : invoice.status === "Pending" ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full">
                            <Clock size={12} />
                            Pending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full">
                            <AlertCircle size={12} />
                            {invoice.status || "Processing"}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(invoice.createdAt || Date.now()).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right font-extrabold text-slate-800 dark:text-slate-100 text-base">
                        ${Number(invoice.totalPrice).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="p-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#81ba00]/10 text-[#81ba00] mx-auto flex items-center justify-center">
              <ShoppingBag size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">No Orders Yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Your botanical garden journey is just beginning. Explore our shop to find beautiful indoor & outdoor plants!
            </p>
            <NavLink to="/shop">
              <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6 text-xs font-bold">
                Start Shopping
              </Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
