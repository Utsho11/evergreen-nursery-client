import EyeIcon from "@/assets/icons/EyeIcon";
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
import { useToast } from "../ui/use-toast";
import { Sparkles } from "lucide-react";

interface PlantCardProps {
  plant: TPlant;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const discountedPrice = plant.discount
    ? plant.price - plant.price * plant.discount * 0.01
    : plant.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (plant.quantity > 0) {
      dispatch(
        addCart({
          productId: plant._id as string,
          name: plant.title,
          image: plant.images[0],
          discount: plant.discount || 0,
          quantity: 1,
          price: plant.price,
          availableQuantity: plant.quantity,
        })
      );
      toast({
        title: "Added to Cart!",
        description: `${plant.title} has been added to your shopping cart.`,
      });
    } else {
      toast({
        title: "Out of Stock",
        description: "Sorry, this plant is currently unavailable.",
      });
    }
  };

  return (
    <div className="botanical-card group relative flex flex-col justify-between overflow-hidden p-3.5 sm:p-4 transition-all duration-300">
      {/* Product Image & Badges */}
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-slate-100/70">
        <NavLink to={`/shop/${plant._id}`} className="block w-full h-full">
          <img
            src={plant.images[0]}
            alt={plant.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
          />
        </NavLink>

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {plant.discount && plant.discount > 0 ? (
            <span className="inline-flex items-center gap-1 bg-[#81ba00] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs tracking-wide">
              <Sparkles size={11} />
              {plant.discount}% OFF
            </span>
          ) : null}
          {plant.quantity === 0 && (
            <span className="bg-rose-500/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">
              Out of Stock
            </span>
          )}
          {plant.quantity > 0 && plant.quantity <= 3 && (
            <span className="bg-amber-500/90 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-xs">
              Only {plant.quantity} left
            </span>
          )}
        </div>

        {/* Quick Action Floating Buttons */}
        <div className="absolute top-2.5 right-2.5 flex flex-col items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 z-20">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NavLink to={`/shop/${plant._id}`}>
                  <button
                    aria-label="View plant details"
                    className="w-9 h-9 rounded-full bg-white/95 text-slate-700 hover:bg-[#81ba00] hover:text-white shadow-md flex items-center justify-center transition-all duration-200"
                  >
                    <EyeIcon />
                  </button>
                </NavLink>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Quick Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleAddToCart}
                  disabled={plant.quantity === 0}
                  aria-label="Add to cart"
                  className="w-9 h-9 rounded-full bg-white/95 text-slate-700 hover:bg-[#81ba00] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-700 shadow-md flex items-center justify-center transition-all duration-200"
                >
                  <CartIcon />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">{plant.quantity === 0 ? "Out of Stock" : "Add to Cart"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Product Info */}
      <div className="pt-3.5 flex flex-col flex-grow justify-between space-y-2 text-center">
        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5">
          <Star stars={plant.rating || 5} />
          <span className="text-[11px] text-slate-400 font-medium">({plant.rating || 5}.0)</span>
        </div>

        {/* Title */}
        <NavLink to={`/shop/${plant._id}`} className="block">
          <h2 className="text-sm sm:text-base font-semibold text-slate-800 hover:text-[#81ba00] transition-colors line-clamp-1">
            {plant.title}
          </h2>
        </NavLink>

        {/* Price & Action */}
        <div className="pt-1 flex items-center justify-center gap-2">
          {plant.discount && plant.discount > 0 ? (
            <>
              <span className="text-sm text-slate-400 line-through font-normal">
                ${plant.price.toFixed(2)}
              </span>
              <span className="text-base sm:text-lg font-bold text-[#81ba00]">
                ${discountedPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-base sm:text-lg font-bold text-[#81ba00]">
              ${plant.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
