import EyeIcon from "@/assets/icons/EyeIcon";
import { Button } from "../ui/button";
import { Plant } from "@/redux/features/plantApi";
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

interface PlantCardProps {
  plant: Plant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const dispatch = useAppDispatch();

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

  return (
    <div className="">
      <div className="relative">
        <div className="relative group">
          <img src={plant.image} alt="" />
          <div className="absolute left-64 top-0 inset-0 flex flex-col items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink to={`/shop/${plant._id}`}>
                    <Button className="bg-[#81ba00] bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity text-white">
                      <EyeIcon />
                    </Button>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Details</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleAddToCart}
                    className="bg-[#81ba00] bg-opacity-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <CartIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="relative top-20">
                  <p>Add to Cart</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="my-4 flex flex-col justify-center items-center space-y-2">
          <Star stars={plant.rating} />
          <h1 className="font-medium">{plant.title}</h1>
          <p className="text-[#81ba00] font-semibold">${plant.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
