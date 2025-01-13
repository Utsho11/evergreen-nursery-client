import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
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
        title: "Message Sent",
        description:
          "Thank you for contacting us. We will respond to your message shortly.",
      });
    }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Contact Us</h2>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you! Please fill out the form or contact us
            through the following channels.
          </p>
        </div>

        {/* Contact Information */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 bg-[#81ba00] text-white rounded-full">
              <Mail size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Email Us</h3>
            <p className="text-gray-600">contact@evergreen.com</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 bg-[#81ba00] text-white rounded-full">
              <Phone size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Call Us</h3>
            <p className="text-gray-600">+1 (800) XXX-XXXX</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 p-4 bg-[#81ba00] text-white rounded-full">
              <MapPin size={40} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              Our Location
            </h3>
            <p className="text-gray-600">123 Main Street,Y City,X Country</p>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="https://facebook.com"
            className="text-[#81ba00] hover:text-gray-800"
          >
            <Facebook size={30} />
          </a>
          <a
            href="https://twitter.com"
            className="text-[#81ba00] hover:text-gray-800"
          >
            <Twitter size={30} />
          </a>
          <a
            href="https://instagram.com"
            className="text-[#81ba00] hover:text-gray-800"
          >
            <Instagram size={30} />
          </a>
        </div>

        {/* Contact Form */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 text-center">
            Send Us a Message
          </h3>
          <ENForm onSubmit={handleSubmit} label="Send Message">
            <ENInput
              name="name"
              label="Your name"
              placeholder="Enter your name"
            />
            <ENInput
              name="email"
              label="Your email"
              placeholder="Enter your email"
            />
            <ENTextarea
              rows={8}
              name="message"
              label="Message"
              placeholder="Write your message"
            />
          </ENForm>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
