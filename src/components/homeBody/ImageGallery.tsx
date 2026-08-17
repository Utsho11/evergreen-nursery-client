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
import { Sparkles, Instagram, Heart } from "lucide-react";
import { useState } from "react";

const galleryItems = [
  { src: plant1, tag: "Lush Living Wall", author: "@botanical_corner" },
  { src: plant2, tag: "Golden Pothos Haven", author: "@plantparenthood" },
  { src: plant3, tag: "Indoor Vine Sanctuary", author: "@urban_jungle" },
  { src: plant4, tag: "Ceramic Planter Styling", author: "@green_abode" },
  { src: plant5, tag: "Rare Aroid Specimen", author: "@flora_aesthetic" },
  { src: plant6, tag: "Peace Lily Blossom", author: "@serene_greens" },
  { src: plant7, tag: "Sunlit Terracotta Pots", author: "@nature_in_home" },
  { src: plant8, tag: "Tropical Monstera Corner", author: "@planty_vibes" },
  { src: plant9, tag: "Succulent Oasis", author: "@desert_flora" },
  { src: plant10, tag: "Cascading Foliage", author: "@botanist_diary" },
  { src: plant11, tag: "Artisan Greenery Studio", author: "@evergreen_living" },
  { src: plant12, tag: "Indoor Plant Nook", author: "@home_sanctuary" },
];

const ImageGallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="my-20 sm:my-32 container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Gallery Header */}
      <div className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={12} />
          #EvergreenCommunity
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
          Botanical Living Gallery
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Inspiration from living plant sanctuaries styled by our passionate community of plant parents across the globe.
        </p>
        <div className="w-16 h-1 bg-[#81ba00] rounded-full mt-2" />
      </div>

      {/* 12-Image Responsive Masonry-Inspired Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(item.src)}
            className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-[#81ba00]/40 transition-all duration-300 cursor-pointer"
          >
            {/* Plant Photography */}
            <img
              src={item.src}
              alt={item.tag}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />

            {/* Frosted Glass Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 sm:p-5">
              {/* Top Icons */}
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center text-xs">
                  <Instagram size={14} />
                </span>
                <span className="w-8 h-8 rounded-full bg-[#81ba00] text-white flex items-center justify-center shadow-md">
                  <Heart size={14} fill="currentColor" />
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="space-y-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                  {item.tag}
                </p>
                <p className="text-[11px] text-[#a3e635] font-medium">
                  {item.author}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-900"
          >
            <img
              src={selectedImage}
              alt="Expanded Plant View"
              className="w-full h-full object-contain max-h-[80vh]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-[#81ba00] flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageGallery;
