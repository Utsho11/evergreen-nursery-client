import { NavLink, useParams } from "react-router-dom";
import LargeStar from "../ui/LargeStar";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { addCart } from "@/redux/features/cartSlice";
import {
  useGetPlantsQuery,
  useGetSinglePlantQuery,
  useGetSinglePlantReviewsQuery,
} from "@/redux/services/plantApi";
import { defaultPlants } from "@/assets/data/defaultPlants";
import { useState, useEffect } from "react";
import PlantReview from "./PlantReview";
import PlantCard from "./PlantCard";
import {
  CheckCircle2,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import { useToast } from "../ui/use-toast";

const PlantDetailsPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const { data, isLoading } = useGetSinglePlantQuery(id as string, {
    skip: !id || id.startsWith("demo-plant"),
  });
  
  // Smart fallback to defaultPlants if API doesn't find it or for demo plants
  const plant = data?.data || defaultPlants.find((p) => p._id === id) || defaultPlants[0];
  const categoryId = plant?.category?._id;

  const { data: relatedPlants } = useGetPlantsQuery(
    categoryId ? { category: categoryId } : null,
    { skip: !categoryId }
  );
  const { data: reviews } = useGetSinglePlantReviewsQuery(id as string, {
    skip: !id || id.startsWith("demo-plant"),
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"desc" | "care" | "reviews">("desc");

  useEffect(() => {
    if (plant?.images && plant.images.length > 0) {
      setSelectedImage(plant.images[0]);
    }
  }, [plant]);

  if (isLoading && !plant) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="space-y-6">
            <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
            <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
            <div className="h-24 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
            <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="container mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Plant Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">The plant you are looking for does not exist or has been removed.</p>
        <NavLink to="/shop">
          <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-6">
            Return to Shop
          </Button>
        </NavLink>
      </div>
    );
  }

  const discountedPrice = plant.discount
    ? plant.price - plant.price * plant.discount * 0.01
    : plant.price;

  const handleAddToCart = () => {
    if (plant.quantity >= quantity) {
      dispatch(
        addCart({
          productId: plant._id as string,
          name: plant.title,
          image: plant.images[0],
          quantity: quantity,
          discount: plant.discount || 0,
          price: plant.price,
          availableQuantity: plant.quantity,
        })
      );
      toast({
        title: "Added to Cart!",
        description: `${quantity} × ${plant.title} added to your shopping cart.`,
      });
    } else {
      toast({
        title: "Quantity Exceeded",
        description: `Only ${plant.quantity} items available in stock.`,
      });
    }
  };

  const filteredRelated = relatedPlants?.data
    ?.filter((p) => p._id !== plant._id)
    ?.slice(0, 4);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
        <NavLink to="/" className="hover:text-[#81ba00]">Home</NavLink>
        <ChevronRight size={14} />
        <NavLink to="/shop" className="hover:text-[#81ba00]">Shop</NavLink>
        <ChevronRight size={14} />
        {plant.category?.name && (
          <>
            <NavLink to={`/shop/category/${plant.category.name}`} className="hover:text-[#81ba00] capitalize">
              {plant.category.name}
            </NavLink>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-slate-800 font-semibold truncate max-w-[200px]">{plant.title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-slate-100 border border-slate-100 shadow-sm group">
            <img
              src={selectedImage || plant.images[0]}
              alt={plant.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {plant.discount && plant.discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#81ba00] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1">
                <Sparkles size={12} />
                {plant.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {plant.images && plant.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {plant.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    (selectedImage || plant.images[0]) === img
                      ? "border-[#81ba00] ring-2 ring-[#81ba00]/20 shadow-sm"
                      : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details (6 cols) */}
        <div className="lg:col-span-6 flex flex-col space-y-6">
          {/* Title & Category */}
          <div className="space-y-2">
            {plant.category?.name && (
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#81ba00] bg-[#81ba00]/10 px-3 py-1 rounded-full">
                {plant.category.name}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
              {plant.title}
            </h1>
            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-3 pt-1">
              <LargeStar stars={plant.rating || 5} />
              <span className="text-xs text-slate-400 font-medium">
                {reviews?.data?.length || 0} Customer Reviews
              </span>
            </div>
          </div>

          {/* Price Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-[#81ba00]">
                ${discountedPrice.toFixed(2)}
              </span>
              {plant.discount && plant.discount > 0 && (
                <span className="text-base text-slate-400 line-through">
                  ${plant.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Stock Meter */}
            <div>
              {plant.quantity > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100/80 px-3 py-1.5 rounded-full">
                  <CheckCircle2 size={14} />
                  In Stock ({plant.quantity})
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Description Summary */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {plant.description}
          </p>

          {/* Quantity Controls & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center border border-slate-200 rounded-2xl p-1 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || plant.quantity === 0}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center font-bold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(plant.quantity, quantity + 1))}
                  disabled={quantity >= plant.quantity || plant.quantity === 0}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={plant.quantity === 0}
                className="flex-grow bg-[#81ba00] hover:bg-[#72a500] text-white rounded-2xl py-6 font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <ShoppingCart size={18} />
                <span>{plant.quantity === 0 ? "Out of Stock" : "Add to Cart"}</span>
              </Button>
            </div>
          </div>

          {/* Value Props & Guarantee */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
              <Truck size={18} className="text-[#81ba00] flex-shrink-0" />
              <span>Safe Plant Packaging</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
              <ShieldCheck size={18} className="text-[#81ba00] flex-shrink-0" />
              <span>30-Day Guarantee</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50">
              <RotateCcw size={18} className="text-[#81ba00] flex-shrink-0" />
              <span>Free Replacement</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Description, Care Guide, Reviews */}
      <div className="rounded-3xl bg-white border border-slate-100 shadow-sm p-6 sm:p-10 space-y-6">
        {/* Tab Buttons */}
        <div className="flex border-b border-slate-100 gap-6">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm sm:text-base font-bold transition-all ${
              activeTab === "desc"
                ? "text-[#81ba00] border-b-2 border-[#81ba00]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Detailed Overview
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`pb-3 text-sm sm:text-base font-bold transition-all ${
              activeTab === "care"
                ? "text-[#81ba00] border-b-2 border-[#81ba00]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Botanical Care Instructions
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm sm:text-base font-bold transition-all ${
              activeTab === "reviews"
                ? "text-[#81ba00] border-b-2 border-[#81ba00]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            Customer Reviews ({reviews?.data?.length || 0})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "desc" && (
          <div className="text-sm sm:text-base text-slate-600 leading-relaxed space-y-4">
            <p>{plant.description}</p>
            <p>
              Each plant from Evergreen Nursery is grown under certified nursery conditions with organic fertilizers, ensuring healthy roots, vibrant foliage, and robust longevity.
            </p>
          </div>
        )}

        {activeTab === "care" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
              <h4 className="font-bold text-emerald-900">☀️ Sunlight</h4>
              <p className="text-slate-600">Thrives best in moderate to bright indirect sunlight. Avoid scorching direct midday heat.</p>
            </div>
            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
              <h4 className="font-bold text-sky-900">💧 Watering</h4>
              <p className="text-slate-600">Water once every 7–10 days when the top 2 inches of soil feel dry to the touch.</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
              <h4 className="font-bold text-amber-900">🌱 Soil & Fertilizer</h4>
              <p className="text-slate-600">Use well-draining organic potting mix. Feed monthly with balanced organic liquid fertilizer.</p>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="pt-2">
            <PlantReview reviews={reviews?.data ?? []} />
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {filteredRelated && filteredRelated.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
              Related Greenery
            </h2>
            <NavLink to="/shop" className="text-xs sm:text-sm font-bold text-[#81ba00] hover:underline">
              View All Plants →
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredRelated.map((p) => (
              <PlantCard key={p._id} plant={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantDetailsPage;
