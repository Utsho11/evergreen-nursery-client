import { TPlant } from "@/types";

export const defaultPlants: TPlant[] = [
  {
    _id: "demo-plant-1",
    title: "Monstera Deliciosa",
    description:
      "The Swiss Cheese Plant has iconic, perforated glossy green foliage. Highly adaptable, forgiving, and an excellent natural indoor air purifier that brings tropical rainforest serenity to your room.",
    price: 45.0,
    discount: 15,
    quantity: 18,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-indoor",
      name: "Indoor Plants",
      image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-plant-2",
    title: "Ficus Lyrata (Fiddle Leaf Fig)",
    description:
      "A statement houseplant featuring massive, violin-shaped emerald leaves with prominent sculptural veins. Thrives in bright, filtered light and adds instant architectural drama to living rooms.",
    price: 65.0,
    discount: 20,
    quantity: 8,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-indoor",
      name: "Indoor Plants",
      image: "https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-plant-3",
    title: "Sansevieria Laurentii (Snake Plant)",
    description:
      "Virtually indestructible and renowned for night-time oxygen production. Features upright, sword-like leaves banded in silver-green with golden margins. Ideal for beginners and low-light spaces.",
    price: 32.0,
    discount: 0,
    quantity: 25,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1599598425947-320e8b2b73bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-succulent",
      name: "Succulents",
      image: "https://images.unsplash.com/photo-1599598425947-320e8b2b73bc?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-plant-4",
    title: "Spathiphyllum (Peace Lily)",
    description:
      "Graceful indoor blooming plant showcasing striking white spathes against lush dark foliage. Cleans household air toxins while signaling when it is thirsty with drooping leaves.",
    price: 38.0,
    discount: 10,
    quantity: 14,
    rating: 4,
    images: [
      "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-flowers",
      name: "Flowering Pots",
      image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-plant-5",
    title: "Epipremnum Aureum (Golden Pothos)",
    description:
      "Vigorous trailing vine with heart-shaped leaves marbled in creamy yellow and vibrant green. Cascades wonderfully from bookshelves and hanging macrame planters.",
    price: 24.0,
    discount: 0,
    quantity: 30,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-hanging",
      name: "Hanging Vines",
      image: "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo-plant-6",
    title: "Zamioculcas Zamiifolia (ZZ Plant)",
    description:
      "Glossy, feather-shaped wand leaves that store water in underground rhizomes. Highly drought-tolerant and thrives on low maintenance.",
    price: 42.0,
    discount: 12,
    quantity: 12,
    rating: 5,
    images: [
      "https://images.unsplash.com/photo-1632338344719-7561858c4033?auto=format&fit=crop&w=800&q=80",
    ],
    category: {
      _id: "cat-indoor",
      name: "Indoor Plants",
      image: "https://images.unsplash.com/photo-1632338344719-7561858c4033?auto=format&fit=crop&w=800&q=80",
    },
    createdAt: new Date().toISOString(),
  },
];
