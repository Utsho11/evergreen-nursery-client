import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import ENForm from "@/components/form/ENForm";
import ENInput from "@/components/form/ENInput";
import ENTextarea from "@/components/form/ENTextarea";
import { FieldValues } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const ContactUs = () => {
  const { toast } = useToast();

  const handleSubmit = (data: FieldValues) => {
    if (data) {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. A botanical specialist will contact you within 24 hours.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-slate-950 py-8 sm:py-16 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#81ba00]/15 text-[#81ba00] text-xs font-bold uppercase tracking-wider">
            <Sparkles size={13} />
            We're Here to Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400">
            Have questions about plant care, order status, or custom nursery orders? Our team is always ready to assist.
          </p>
        </div>

        {/* Grid: Contact Cards + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center flex-shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Email Inquiries</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">support@evergreennursery.com</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Average response time: 2 hours</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center flex-shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Call Us Directly</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">+1 (800) 456-PLANT</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Mon - Sat: 9:00 AM – 6:00 PM EST</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs flex items-start gap-4 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#81ba00]/10 text-[#81ba00] flex items-center justify-center flex-shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Nursery Greenhouse</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">1400 Botanical Haven Blvd, Green Valley, CA 90210</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">Open for in-person visits daily</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-6 rounded-3xl bg-emerald-950 dark:bg-slate-900 text-white border border-transparent dark:border-slate-800 space-y-3 shadow-xs">
              <h4 className="text-sm font-bold text-white dark:text-slate-100">Follow Our Botanical Community</h4>
              <p className="text-xs text-emerald-200 dark:text-slate-400">
                Tag @evergreen.nursery to be featured on our official Instagram feed!
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#81ba00] flex items-center justify-center transition-colors"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#81ba00] flex items-center justify-center transition-colors"
                >
                  <Twitter size={16} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#81ba00] flex items-center justify-center transition-colors"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-6 transition-colors">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <MessageSquare size={20} className="text-[#81ba00]" />
                <span>Send Us a Direct Message</span>
              </h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Fill out the details below and we'll reply to your email address promptly.
              </p>
            </div>

            <ENForm onSubmit={handleSubmit} label="Send Message">
              <div className="space-y-4">
                <ENInput
                  name="name"
                  label="Full Name"
                  placeholder="e.g. Julian Hayes"
                />
                <ENInput
                  name="email"
                  label="Email Address"
                  placeholder="e.g. julian@example.com"
                />
                <ENTextarea
                  rows={5}
                  name="message"
                  label="Message / Plant Inquiry"
                  placeholder="Tell us how we can help you or ask about specific plant varieties..."
                />
              </div>
            </ENForm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
