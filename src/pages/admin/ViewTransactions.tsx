import { useState } from "react";
import { useGetAllTransactionHistoryQuery } from "@/redux/services/adminApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react";

const ViewTransactions = () => {
  const { data, isLoading } = useGetAllTransactionHistoryQuery(null);
  const [searchQuery, setSearchQuery] = useState("");

  const rawOrders = data?.data || [];
  const filteredOrders = rawOrders.filter((order) => {
    const term = searchQuery.toLowerCase();
    return (
      order.transactionId?.toLowerCase().includes(term) ||
      order.userInfo?.name?.toLowerCase().includes(term) ||
      order.userInfo?.email?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <CreditCard size={24} className="text-[#81ba00]" />
            <span>Transaction Ledger</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Monitor SSLCommerz payment receipts, order amounts, and billing statuses
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-[#81ba00]"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 space-y-4">
            {[...Array(4)].map((_, idx) => (
              <div key={idx} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-800/50">
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Payment Gateway</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead className="text-right">Total Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((invoice, index) => {
                  const isPaid =
                    invoice.status === "Completed" ||
                    invoice.status === "Paid" ||
                    invoice.status === "SUCCESS";

                  return (
                    <TableRow
                      key={index}
                      className="border-b border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-slate-600 dark:text-slate-300 font-semibold">
                        {invoice.transactionId || `TXN-${index + 1000}`}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                            {invoice.userInfo?.name || "Customer"}
                          </p>
                          <p className="text-xs text-slate-400 font-normal">
                            {invoice.userInfo?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                          SSLCommerz Gateway
                        </span>
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
                            {invoice.status || "Failed"}
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
          <div className="p-16 text-center space-y-3">
            <CreditCard size={36} className="text-[#81ba00] mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              No Transactions Found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No payment transactions match your current search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTransactions;
