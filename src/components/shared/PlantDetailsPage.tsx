import { NavLink, useParams } from "react-router-dom";
import LargeStar from "../ui/LargeStar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { useAppDispatch } from "@/redux/hooks";
import { addCart } from "@/redux/features/cartSlice";
import { useGetSinglePlantQuery } from "@/redux/services/plantApi";
import { useState } from "react";

const PlantDetailsPage = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetSinglePlantQuery(id as string);
  const plant = data?.data;
  const [currentImage, setCurrentImage] = useState<string>(
    plant?.images[0] as string
  );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const dispatch = useAppDispatch();

  if (isLoading)
    return (
      <div className="flex justify-center items-center my-32">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );

  if (!plant) {
    return <div>No data available</div>;
  }

  const handleAddToCart = () => {
    if (plant?.quantity > 0) {
      dispatch(
        addCart({
          productId: plant._id as string,
          name: plant.title,
          image: plant.images[0],
          quantity: 1,
          discount: plant.discount,
          price: plant.price,
          availableQuantity: plant.quantity,
        })
      );
    } else {
      console.error("This plant is out of stock.");
    }
  };

  const handleImageChange = (image: string) => {
    setCurrentImage(image);
  };

  if (error) return <div>Error: {error.toString()}</div>;

  console.log(plant);

  return (
    <div className="container mx-auto my-32 px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10 h-full">
        {/* Image Section */}
        <div className="sm:col-span-4 h-full">
          <div className="w-full sm:h-[80%] flex justify-center items-center">
            <img
              src={currentImage}
              alt={plant?.title}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>
          <div className="mt-4 space-x-4 flex">
            {plant?.images?.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index}`}
                className={`cursor-pointer w-24 h-24 object-cover rounded-xl border-2 ${
                  image === currentImage ? "border-[#81BA00]" : ""
                }`}
                onClick={() => handleImageChange(image)}
              />
            ))}
          </div>
        </div>

        {/* Plant Details */}
        <div className="md:col-span-6 flex flex-col space-y-5 py-8">
          <div className="flex flex-col flex-grow space-y-5">
            <h1 className="text-3xl sm:text-5xl font-medium">{plant?.title}</h1>
            <LargeStar stars={plant!.rating} />
            <h1 className="text-xl font-medium">Description:</h1>
            <ScrollArea className="h-[200px] lg:w-full md:w-[500px] border rounded-md p-2">
              {plant?.description}
            </ScrollArea>
            <div className="grid grid-cols-2">
              <h1 className="text-xl">
                Category:{" "}
                <span className="text-[#81ba00] font-semibold">
                  {plant?.category.name}
                </span>
              </h1>
              <h1 className="text-xl">
                Price:{" "}
                {plant.discount ? (
                  <span className="">
                    <span className="text-gray-500 line-through mr-2">
                      ${plant?.price}
                    </span>
                    <span className="text-[#81ba00] font-semibold">
                      ${plant.price - plant.price * plant?.discount * 0.01}
                    </span>
                    <span className="text-sm text-red-500 ml-2">
                      ({plant.discount}% OFF)
                    </span>
                  </span>
                ) : (
                  <span className="text-[#81ba00] font-semibold">
                    ${plant?.price}
                  </span>
                )}
              </h1>
            </div>
            <div className="grid grid-cols-2">
              <h1 className="text-xl">
                Availability:{" "}
                {plant!.quantity > 0 ? (
                  <span className="text-[#81ba00] font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Out of Stock
                  </span>
                )}
              </h1>
              <h1 className="text-xl">
                Quantity:{" "}
                <span className="text-[#81ba00] font-semibold">
                  {plant!.quantity}
                </span>
              </h1>
            </div>
          </div>
          <div className="flex gap-10 mt-auto">
            <Button
              onClick={handleAddToCart}
              className="bg-[#81ba00] text-white rounded-full text-sm font-medium px-8"
            >
              Add to Cart
            </Button>
            <NavLink to="/shop">
              <Button className="hover:bg-[#81ba00] bg-transparent border border-slate-500 hover:text-white rounded-full text-sm font-medium px-8">
                Continue Shopping
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
