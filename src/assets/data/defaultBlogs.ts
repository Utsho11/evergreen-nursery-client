import { TBlog } from "@/types";

const defaultAuthor = {
  _id: "author-evergreen",
  name: "Dr. Evelyn Vance",
  role: "ADMIN",
  email: "evelyn@evergreennursery.com",
  status: "ACTIVE",
  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

export const defaultBlogs: TBlog[] = [
  {
    _id: "demo-blog-1",
    title: "10 Essential Indoor Plants That Naturally Purify Room Air",
    blog:
      "NASA clean air studies proved that houseplants do much more than look aesthetic—they filter out volatile organic compounds (VOCs) such as formaldehyde, benzene, and trichloroethylene. From the resilient Snake Plant to the elegant Peace Lily, adding greenery to your bedroom and office actively improves sleep quality, focus, and humidity levels. Discover the top 10 low-light purifiers recommended by our nursery botanists.",
    image:
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80",
    author: defaultAuthor,
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    _id: "demo-blog-2",
    title: "The Ultimate Soil & Moisture Guide for Thriving Tropical Monsteras",
    blog:
      "Monstera Deliciosa and Adansonii are native to the humid rainforests of Central America, where they climb tree trunks using aerial roots. To replicate these tropical conditions indoors, avoid heavy garden soils. Instead, mix chunky orchid bark, perlite, coco coir, and worm castings to create an airy, moisture-retentive medium that protects tender root systems from rot while promoting dramatic fenestrations.",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80",
    author: defaultAuthor,
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    _id: "demo-blog-3",
    title: "Propagation Masterclass: How to Turn 1 Houseplant into 20",
    blog:
      "Water propagation and node cutting are simple, therapeutic ways to multiply your houseplant collection and share leafy gifts with fellow plant enthusiasts. Learn the exact node-cutting technique for Pothos, Philodendrons, and Monsteras, along with root hormone tips, glass vessel selection, and transitioning water roots into organic soil.",
    image:
      "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1000&q=80",
    author: defaultAuthor,
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
  },
];

