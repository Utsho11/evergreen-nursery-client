import { useGetPlantByIdQuery } from "@/redux/features/plantApi";
import { NavLink, useParams } from "react-router-dom";
import LargeStar from "../ui/LargeStar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import Lottie from "react-lottie";
import animationData from "@/assets/loader/Animation - 1721054166339.json";
import { useAppDispatch } from "@/redux/hooks";
import { addCart } from "@/redux/features/cartSlice";

const PlantDetailsPage = () => {
  const { id } = useParams();

  const { data: plant, error, isLoading } = useGetPlantByIdQuery(id as string);

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
    if (plant.quantity > 0) {
      dispatch(
        addCart({
          productId: plant._id as string,
          name: plant.title,
          image: plant.image,
          quantity: 1,
          price: plant.price,
          availableQuantity: plant.quantity,
        })
      );
    } else {
      console.error("This plant is out of stock.");
    }
  };

  if (error) return <div>Error: {error.toString()}</div>;

  return (
    <div className="container mx-auto my-32">
      <div className="grid grid-cols-10 gap-16 h-full">
        <div className="col-span-4">
          <img src={plant?.image} alt={plant?.title} />
        </div>
        <div className="col-span-6 flex flex-col space-y-5 py-8">
          <div className="flex flex-col flex-grow space-y-5">
            <h1 className="text-5xl font-medium">{plant?.title}</h1>
            <LargeStar stars={plant!.rating} />
            <h1 className="text-xl font-medium">Description:</h1>
            <ScrollArea className="h-[200px] w-[500px] rounded-md py-2">
              {plant?.description} Jokester began sneaking into the castle in
              the middle of the night and leaving jokes all over the place:
              under the king's pillow, in his soup, even in the royal toilet.
              The king was furious, but he couldn't seem to stop Jokester. And
              then, one day, the people of the kingdom discovered that the jokes
              left by Jokester were so funny that they couldn't help but laugh.
              And once they started laughing, they couldn't stop. Jokester began
              sneaking into the castle in the middle of the night and leaving
              jokes all over the place: under the king's pillow, in his soup,
              even in the royal toilet. The king was furious, but he couldn't
              seem to stop Jokester. And then, one day, the people of the
              kingdom discovered that the jokes left by Jokester were so funny
              that they couldn't help but laugh. And once they started laughing,
              they couldn't stop.
            </ScrollArea>
            <div className="grid grid-cols-2">
              <h1 className="text-xl">
                Category:{" "}
                <span className="text-[#81ba00] font-semibold">
                  {plant?.category}
                </span>
              </h1>
              <h1 className="text-xl">
                Price:{" "}
                <span className="text-[#81ba00] font-semibold">
                  ${plant?.price}
                </span>
              </h1>
            </div>
            <div className=" grid grid-cols-2">
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
            <NavLink to="/cart">
              <Button className="hover:bg-[#81ba00] bg-transparent border border-slate-500 hover:text-white rounded-full text-sm font-medium px-8">
                Buy Now
              </Button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsPage;
