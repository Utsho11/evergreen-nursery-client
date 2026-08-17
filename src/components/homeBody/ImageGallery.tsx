import plant1 from "@/assets/plants/plant1.jpeg";
import plant2 from "@/assets/plants/plant2.jpeg";
import plant3 from "@/assets/plants/plant3.jpeg";
import plant4 from "@/assets/plants/plant4.jpeg";
import plant5 from "@/assets/plants/plant5.jpeg";
import plant6 from "@/assets/plants/plant6.jpeg";
import plant7 from "@/assets/plants/plant7.jpeg";
import plant8 from "@/assets/plants/plant8.jpeg";
import plant9 from "@/assets/plants/plant9.jpeg";
import plant10 from "@/assets/plants/plant10.jpeg";
import plant11 from "@/assets/plants/plant11.jpeg";
import plant12 from "@/assets/plants/plant12.jpeg";
import {
  Sparkles,
  Heart,
  Bookmark,
  Share2,
  ExternalLink,
  MessageCircle,
  X,
  Check,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { NavLink } from "react-router-dom";

interface PinItem {
  id: number;
  src: string;
  tag: string;
  board: string;
  author: string;
  avatar: string;
  aspectClass: string;
  likes: number;
  comments: number;
}

const pinsData: PinItem[] = [
  {
    id: 1,
    src: plant1,
    tag: "Lush Living Wall & Vertical Foliage",
    board: "Living Walls & Planters",
    author: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 342,
    comments: 28,
  },
  {
    id: 2,
    src: plant2,
    tag: "Golden Pothos Cascading Vines",
    board: "Urban Jungle Living",
    author: "Marcus Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[4/5]",
    likes: 512,
    comments: 45,
  },
  {
    id: 3,
    src: plant3,
    tag: "Pruned Indoor Vines & Leaf Health",
    board: "Botanical Plant Care",
    author: "Sophia Laurent",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 289,
    comments: 19,
  },
  {
    id: 4,
    src: plant4,
    tag: "Terracotta Planter Styling on Wooden Shelf",
    board: "Aesthetic Plant Corners",
    author: "Oliver Vance",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-square",
    likes: 674,
    comments: 52,
  },
  {
    id: 5,
    src: plant5,
    tag: "Rare Botanical Specimen with Crimson Foliage",
    board: "Exotic & Rare Flora",
    author: "Dr. Alistair Bloom",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/5]",
    likes: 890,
    comments: 73,
  },
  {
    id: 6,
    src: plant6,
    tag: "Blooming White Peace Lily Care Routine",
    board: "Indoor Air Purifiers",
    author: "Chloe Dubois",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[4/5]",
    likes: 420,
    comments: 31,
  },
  {
    id: 7,
    src: plant7,
    tag: "Sun-Drenched Window Garden Sanctuary",
    board: "Sunlight & Green Spaces",
    author: "Noah Kim",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 310,
    comments: 14,
  },
  {
    id: 8,
    src: plant8,
    tag: "Giant Monstera Deliciosa Living Room Centerpiece",
    board: "Monstera & Aroids",
    author: "Aria Thorne",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 955,
    comments: 88,
  },
  {
    id: 9,
    src: plant9,
    tag: "Minimalist Desert Succulents on Concrete Stool",
    board: "Desert Flora & Cacti",
    author: "Lucas Gray",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-square",
    likes: 480,
    comments: 39,
  },
  {
    id: 10,
    src: plant10,
    tag: "Cascading Foliage & Variegated Leaves",
    board: "Variegated Collectors",
    author: "Isabella Rossi",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 622,
    comments: 41,
  },
  {
    id: 11,
    src: plant11,
    tag: "Botanical Nursery Greenhouse Showcase",
    board: "Nursery Behind the Scenes",
    author: "Julian Hayes",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[4/5]",
    likes: 780,
    comments: 63,
  },
  {
    id: 12,
    src: plant12,
    tag: "Cozy Bedroom Plant Nook with Soft Lighting",
    board: "Bedroom Botanical Decor",
    author: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&auto=format&fit=crop&q=60",
    aspectClass: "aspect-[3/4]",
    likes: 540,
    comments: 36,
  },
];

const ImageGallery = () => {
  const { toast } = useToast();
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [savedPins, setSavedPins] = useState<Record<number, boolean>>({});
  const [likedPins, setLikedPins] = useState<Record<number, boolean>>({});

  const toggleSave = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setSavedPins((prev) => {
      const isSaved = !prev[id];
      toast({
        title: isSaved ? "Saved to your Plant Board!" : "Removed from Board",
        description: isSaved ? "Find this inspiration anytime in your Evergreen collection." : "",
      });
      return { ...prev, [id]: isSaved };
    });
  };

  const toggleLike = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setLikedPins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="my-20 sm:my-32 container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={12} />
            Pinterest Community Feed
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
            Botanical Inspiration Board
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
            Explore curated living spaces, rare aroid collections, and DIY botanical styling pinned by our worldwide community.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <NavLink
            to="/blogs"
            className="px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-200 hover:border-[#81ba00] hover:text-[#81ba00] transition-colors shadow-xs"
          >
            Read Plant Stories
          </NavLink>
          <NavLink
            to="/shop"
            className="px-5 py-2.5 rounded-full bg-[#81ba00] hover:bg-[#70a400] text-white text-xs font-bold transition-all shadow-sm shadow-[#81ba00]/25"
          >
            Shop Pinned Plants
          </NavLink>
        </div>
      </div>

      {/* True Pinterest Masonry Waterfall Columns */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-5 space-y-5">
        {pinsData.map((pin) => {
          const isSaved = !!savedPins[pin.id];
          const isLiked = !!likedPins[pin.id];

          return (
            <div
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              className="break-inside-avoid group relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-[#81ba00]/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image Container with Dynamic Aspect Ratio */}
              <div className={`relative w-full ${pin.aspectClass} overflow-hidden bg-slate-100 dark:bg-slate-800`}>
                <img
                  src={pin.src}
                  alt={pin.tag}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Floating Pinterest Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between pointer-events-none">
                  {/* Top Row: Board Tag & Save Button */}
                  <div className="flex items-center justify-between pointer-events-auto">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate max-w-[120px]">
                      {pin.board}
                    </span>

                    <button
                      onClick={(e) => toggleSave(e, pin.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all transform hover:scale-105 ${
                        isSaved
                          ? "bg-slate-900 text-white border border-white/20"
                          : "bg-rose-600 hover:bg-rose-700 text-white"
                      }`}
                    >
                      {isSaved ? <Check size={12} /> : <Bookmark size={12} />}
                      <span>{isSaved ? "Saved" : "Save"}</span>
                    </button>
                  </div>

                  {/* Bottom Row: Action Icons */}
                  <div className="flex items-center justify-between pointer-events-auto pt-2">
                    <button
                      onClick={(e) => toggleLike(e, pin.id)}
                      className={`w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
                        isLiked
                          ? "bg-rose-500 text-white shadow-md"
                          : "bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-rose-500 hover:text-white"
                      }`}
                    >
                      <Heart size={14} fill={isLiked ? "currentColor" : "none"} />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard?.writeText(window.location.href);
                        toast({ title: "Link Copied!", description: "Share this plant pin with friends." });
                      }}
                      className="w-8 h-8 rounded-full bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-[#81ba00] hover:text-white backdrop-blur-md flex items-center justify-center transition-colors"
                    >
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Pin Card Metadata Footer */}
              <div className="p-3.5 space-y-2">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2">
                  {pin.tag}
                </h3>

                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <img
                      src={pin.avatar}
                      alt={pin.author}
                      className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                    />
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[100px]">
                      {pin.author}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <Heart size={11} className={isLiked ? "text-rose-500 fill-rose-500" : ""} />
                    <span>{pin.likes + (isLiked ? 1 : 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pinterest Lightbox Drawer Modal */}
      {selectedPin && (
        <div
          onClick={() => setSelectedPin(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPin(null)}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            {/* Left: Large Image */}
            <div className="md:col-span-7 bg-slate-950 flex items-center justify-center p-4">
              <img
                src={selectedPin.src}
                alt={selectedPin.tag}
                className="w-full h-auto max-h-[75vh] object-contain rounded-2xl"
              />
            </div>

            {/* Right: Pin Details & Community Interactions */}
            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
              {/* Header Action Bar */}
              <div className="flex items-center justify-between pr-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#81ba00] bg-[#81ba00]/10 px-3 py-1 rounded-full">
                  {selectedPin.board}
                </span>

                <button
                  onClick={(e) => toggleSave(e, selectedPin.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold shadow-md flex items-center gap-1.5 transition-all ${
                    savedPins[selectedPin.id]
                      ? "bg-slate-900 text-white"
                      : "bg-rose-600 hover:bg-rose-700 text-white"
                  }`}
                >
                  {savedPins[selectedPin.id] ? <Check size={13} /> : <Bookmark size={13} />}
                  <span>{savedPins[selectedPin.id] ? "Saved Pin" : "Save Pin"}</span>
                </button>
              </div>

              {/* Title & Description */}
              <div className="space-y-3">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 leading-tight">
                  {selectedPin.tag}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Featured in the Evergreen Botanical Community Gallery. Grown with organic potting mixes and high-humidity indoor placement.
                </p>
              </div>

              {/* Author Profile */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedPin.avatar}
                    alt={selectedPin.author}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedPin.author}</h4>
                    <p className="text-[11px] text-slate-400">Plant Enthusiast • 1.4k followers</p>
                  </div>
                </div>

                <NavLink
                  to="/blogs"
                  className="text-[11px] font-bold text-[#81ba00] hover:underline flex items-center gap-1"
                >
                  <span>Follow</span>
                  <ExternalLink size={11} />
                </NavLink>
              </div>

              {/* Interaction Stats & CTA */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Heart size={14} className="text-rose-500 fill-rose-500" />
                    {selectedPin.likes + (likedPins[selectedPin.id] ? 1 : 0)} Likes
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MessageCircle size={14} className="text-sky-500" />
                    {selectedPin.comments} Comments
                  </span>
                </div>

                <NavLink to="/shop" className="block">
                  <button className="w-full bg-[#81ba00] hover:bg-[#70a400] text-white rounded-2xl py-3 text-xs font-bold shadow-md transition-all">
                    Shop Plants in this Picture
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
