import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      toast({
        title: "Welcome to the Evergreen Club!",
        description: "Your 10% discount code has been sent to your email.",
      });
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-300 pt-16 pb-12 overflow-hidden border-t border-slate-800">
      {/* Botanical Background Accent Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#81ba00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-emerald-800/10 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <NavLink to="/" className="inline-block group">
              <Logo size="lg" />
            </NavLink>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Evergreen Nursery is dedicated to cultivating sustainably grown indoor & outdoor plants, providing expert care guidance, and bringing fresh serenity into modern living spaces.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Join our Plant Club (10% off)
              </span>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="bg-white/10 border border-white/20 rounded-l-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#81ba00] flex-grow"
                />
                <button
                  type="submit"
                  className="bg-[#81ba00] hover:bg-[#72a500] text-white px-4 rounded-r-xl text-xs font-bold transition-colors flex items-center justify-center"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="w-10 h-0.5 bg-[#81ba00] rounded-full" />
            <ul className="space-y-2 text-xs">
              <li>
                <NavLink to="/shop" className="hover:text-[#81ba00] transition-colors">
                  All Plant Catalog
                </NavLink>
              </li>
              <li>
                <NavLink to="/blogs" className="hover:text-[#81ba00] transition-colors">
                  Gardening Journal
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-[#81ba00] transition-colors">
                  Our Nursery Story
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-[#81ba00] transition-colors">
                  Plant Doctor & Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Customer Care
            </h4>
            <div className="w-10 h-0.5 bg-[#81ba00] rounded-full" />
            <ul className="space-y-2 text-xs">
              <li>
                <span className="hover:text-[#81ba00] cursor-pointer">Shipping & Packaging</span>
              </li>
              <li>
                <span className="hover:text-[#81ba00] cursor-pointer">30-Day Guarantee</span>
              </li>
              <li>
                <span className="hover:text-[#81ba00] cursor-pointer">Plant Care FAQs</span>
              </li>
              <li>
                <span className="hover:text-[#81ba00] cursor-pointer">Privacy & Terms</span>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Nursery Greenhouse
            </h4>
            <div className="w-10 h-0.5 bg-[#81ba00] rounded-full" />
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-[#81ba00] flex-shrink-0 mt-0.5" />
                <span>1400 Botanical Haven Blvd, Green Valley, CA 90210</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-[#81ba00] flex-shrink-0" />
                <span>support@evergreennursery.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-[#81ba00] flex-shrink-0" />
                <span>+1 (800) 456-PLANT</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#81ba00] text-white flex items-center justify-center transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#81ba00] text-white flex items-center justify-center transition-colors"
              >
                <Instagram size={14} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#81ba00] text-white flex items-center justify-center transition-colors"
              >
                <Twitter size={14} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#81ba00] text-white flex items-center justify-center transition-colors"
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Evergreen Nursery Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Grown with <Heart size={13} className="text-rose-500 fill-rose-500" /> for nature lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
