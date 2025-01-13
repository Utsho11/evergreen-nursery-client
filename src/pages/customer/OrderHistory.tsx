import banner from "@/assets/bg/footer-parallax.webp";
import { useGetCustomerOrderHistoryQuery } from "@/redux/services/authApi";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const OrderHistory = () => {
  const { data, isLoading } = useGetCustomerOrderHistoryQuery(null);

  //   console.log(data);

  const orderHistory = data?.data || [];

  return (
    <div className="">
      <div
        className="flex items-center justify-center min-h-[40vh] sm:min-h-[35vh] mb-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <h1 className="text-white text-4xl font-bold sm:text-5xl">
          Order History
        </h1>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center my-32">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      ) : (
        <div className="flex justify-center sm:mx-auto gap-5 mb-8">
          {orderHistory.length > 0 ? (
            <div className="border w-[20rem] sm:w-[70rem]">
              <Table className="">
                <TableCaption>Customer Order History</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-end">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderHistory.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>{invoice.transactionId}</TableCell>
                      <TableCell>{invoice.userInfo.name}</TableCell>
                      <TableCell>{invoice.userInfo.email}</TableCell>
                      <TableCell
                        className={`px-4 py-2 ${
                          invoice.status === "Completed"
                            ? "text-[#81BA00]"
                            : "text-rose-500"
                        }`}
                      >
                        {invoice.status}
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </TableCell>
                      <TableCell className="text-right text-lg">
                        ${invoice.totalPrice}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold ">
                Order History is Empty
              </h1>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
