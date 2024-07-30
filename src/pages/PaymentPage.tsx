/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { addCustomer } from "@/redux/features/customerSlice";
import { useUpdatePlantQuantitiesMutation } from "@/redux/features/plantApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  console.log(items);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [updatePlantQuantities] = useUpdatePlantQuantitiesMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { toast } = useToast();
  // Define a function to handle form submission

  const onSubmit = async (data: any) => {
    dispatch(addCustomer(data));

    try {
      // Use RTK Query to update plant quantities
      await updatePlantQuantities({ items }).unwrap();
      toast({
        title: "Order added successfully",
        duration: 3000,
        className: "bg-white text-green-500",
      });

      reset();
      navigate("/payment/order");
    } catch (error) {
      console.error("Failed to update quantities", error);
      toast({
        title: "Failed to update quantities",
        duration: 3000,
        className: "bg-white text-red-500",
      });
    }
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div className="my-32 container mx-auto flex flex-col items-center text-center">
      <h1 className="text-3xl mb-16 font-medium">
        You have to Pay $ {total.toFixed(2)}
      </h1>
      <div>
        <h1 className="font-semibold p-2 border-b-2 border-slate-600">
          Select a Payment Option
        </h1>
        <div className="mt-5 space-y-2 p-4 flex flex-col justify-start">
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              disabled
              className="form-checkbox custom-checkbox h-4 w-4 text-[#81ba00]"
            />
            <span className="ml-2 hover:text-[#81ba00]">
              Online Payment (Not Available)
            </span>
          </label>
          <label className="block mb-2 text-sm">
            <input
              type="radio"
              checked={true}
              className="form-checkbox h-4 w-4 bg-[#81ba00]"
            />
            <span className="ml-2 hover:text-[#81ba00]">Cash on Delivery</span>
          </label>
        </div>
      </div>
      <div className={`relative ${isPopoverOpen ? "popover-active" : ""}`}>
        {isPopoverOpen && (
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
        )}
        <Popover>
          <PopoverTrigger className="mt-8">
            <Button
              onClick={() => setIsPopoverOpen(true)}
              className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
            >
              Procceed to Pay
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto bg-white">
            <form
              className="gap-x-3 py-16 space-y-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h1 className="text-3xl font-medium text-center mb-8">
                Customer Info
              </h1>
              <div>
                <div className="grid grid-cols-3">
                  <label htmlFor="name" className="text-lg w-full font-bold">
                    Name:
                  </label>
                  <input
                    size={20}
                    className="col-span-2 p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                    type="text"
                    {...register("name", {
                      required: "Customer Name is required",
                    })}
                  />
                </div>
                <div className="text-center">
                  {errors.name && (
                    <p className="text-red-500">
                      {errors.name?.message as ReactNode}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 items-center">
                  <label htmlFor="phone" className="text-lg w-full font-bold">
                    Phone:
                  </label>
                  <input
                    size={20}
                    className="p-2 border border-gray-300 col-span-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                    type="number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                </div>
                <div className="text-center">
                  {errors.phone && (
                    <p className="text-red-500">
                      {errors.phone?.message as ReactNode}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-3 items-center">
                  <label htmlFor="address" className="text-lg w-full font-bold">
                    Address:
                  </label>
                  <input
                    size={20}
                    className="col-span-2 p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#81ba00]"
                    type="text"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  />
                </div>
                <div className="text-center">
                  {errors.address && (
                    <p className="text-red-500">
                      {errors.address?.message as ReactNode}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center mt-8">
                <Button
                  type="submit"
                  className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
                >
                  Pay
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default PaymentPage;
