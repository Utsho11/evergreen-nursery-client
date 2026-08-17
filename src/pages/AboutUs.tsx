import { Sparkles, Leaf, ShieldCheck, Award } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutUs = () => {
  const stats = [
    { number: "10,000+", label: "Happy Gardeners" },
    { number: "500+", label: "Plant Varieties" },
    { number: "100%", label: "Organic Soil Mix" },
    { number: "99.8%", label: "Safe Delivery Rate" },
  ];

  const values = [
    {
      icon: <Leaf className="text-[#81ba00]" size={28} />,
      title: "Eco-Friendly Cultivation",
      description:
        "Every sprout and sapling is nurtured without synthetic pesticides, respecting the natural biological balance of soil.",
    },
    {
      icon: <ShieldCheck className="text-[#81ba00]" size={28} />,
      title: "30-Day Plant Guarantee",
      description:
        "We stand by the health of our botanical collection. If your plant struggles within 30 days, we'll replace it for free.",
    },
    {
      icon: <Award className="text-[#81ba00]" size={28} />,
      title: "Expert Horticulturists",
      description:
        "Our team brings decades of botanical care experience to help you choose the ideal plants for your unique lighting and lifestyle.",
    },
  ];

  const team = [
    { name: "Elena Ramos", role: "Head Botanist", emoji: "🌿" },
    { name: "Marcus Chen", role: "Nursery Operations", emoji: "🪴" },
    { name: "Sarah Jenkins", role: "Soil Health Expert", emoji: "🌱" },
    { name: "David Kim", role: "Customer Plant Doctor", emoji: "🩺" },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 space-y-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          Our Botanical Journey
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight">
          Bringing Nature's Calm to Every Home
        </h1>
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
          Founded on a love for green sanctuaries, Evergreen Nursery has grown into a community of passionate plant parents, delivering hand-nurtured botanical life right to your doorstep.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs text-center space-y-1"
          >
            <p className="text-2xl sm:text-4xl font-extrabold text-[#81ba00]">{stat.number}</p>
            <p className="text-xs sm:text-sm font-semibold text-slate-600">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Mission & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {values.map((v, idx) => (
          <div
            key={idx}
            className="botanical-card p-6 sm:p-8 space-y-4 bg-white"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#81ba00]/10 flex items-center justify-center">
              {v.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-800">{v.title}</h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{v.description}</p>
          </div>
        ))}
      </div>

      {/* Team Showcase */}
      <div className="text-center space-y-8 max-w-5xl mx-auto">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800">
            Meet the Plant Specialists
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            The passionate hands behind our thriving greenhouses
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs text-center space-y-3 hover:border-[#81ba00]/30 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-2xl flex items-center justify-center mx-auto shadow-inner">
                {member.emoji}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-800">{member.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-950 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-extrabold">
          Ready to Add Fresh Greenery to Your Room?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
          Explore hundreds of resilient indoor plants, rare succulents, and organic nursery supplies.
        </p>
        <div className="pt-2">
          <NavLink to="/shop">
            <Button className="bg-[#81ba00] hover:bg-[#72a500] text-white rounded-full px-8 py-5 text-xs font-bold shadow-md">
              Browse Plant Collection
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
