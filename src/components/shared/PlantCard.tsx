import EyeIcon from "@/assets/icons/EyeIcon";
import { Button } from "../ui/button";
import CartIcon from "@/assets/icons/CartIcon";
import Star from "../ui/Star";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { addCart } from "@/redux/features/cartSlice";
import { TPlant } from "@/types";

interface PlantCardProps {
  plant: TPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (plant.quantity > 0) {
      dispatch(
        addCart({
          productId: plant._id as string,
          name: plant.title,
          image: plant.images[0],
          discount: plant.discount,
          quantity: 1,
          price: plant.price,
          availableQuantity: plant.quantity,
        })
      );
    } else {
      console.error("This plant is out of stock.");
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <div className="relative group">
        {/* Product Image */}
        <img
          src={plant.images[0]}
          alt={plant.title}
          className="w-full rounded-lg"
        />

        {/* Icons (View and Cart) */}
        <div className="absolute top-0 right-0 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Details Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to={`/shop/${plant._id}`}>
                  <Button className="bg-[#81ba00] text-white p-2 rounded-lg shadow-md">
                    <EyeIcon />
                  </Button>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent>
                <p>Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* Add to Cart Button */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleAddToCart}
                  className="bg-[#81ba00] text-white p-2 rounded-lg shadow-md"
                >
                  <CartIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center space-y-2">
        {/* Centered Star Component */}
        <div className="flex justify-center">
          <Star stars={plant.rating} />
        </div>
        {/* Title */}
        <h1 className="text-lg font-medium">{plant.title}</h1>
        {/* Price */}
        <h1 className="text-lg">
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
    </div>
  );
};

export default PlantCard;
