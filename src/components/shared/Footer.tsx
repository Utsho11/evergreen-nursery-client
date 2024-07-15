import footer from "@/assets/footer.webp";
import FacebookIcon from "@/assets/icons/FacebookIcon";
import InstagramIcon from "@/assets/icons/InstagramIcon";
import LocationIcon from "@/assets/icons/LocationIcon";
import MailIcon from "@/assets/icons/MailIcon";
import PhoneIcon from "@/assets/icons/PhoneIcon";
import PininterestIcon from "@/assets/icons/PininterestIcon";
import YoutubeIcon from "@/assets/icons/YoutubeIcon";
const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${footer})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="p-32 bg-fixed"
    >
      <div className="grid grid-cols-4">
        <div>
          <h1 className="font-semibold text-lg text-white">Policy & Info</h1>
          <hr className="border-2 border-[#81ba00] my-4 w-24" />
          <ul className="space-y-2 text-[#9e9e9e] text-sm">
            <li className="hover:text-[#81ba00]">Policy For Seller</li>
            <li className="hover:text-[#81ba00]">Policy For Buyer</li>
            <li className="hover:text-[#81ba00]">Shipping & Refund</li>
            <li className="hover:text-[#81ba00]">Wholesale Policy</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-white">Quick links</h1>
          <hr className="border-2 border-[#81ba00] my-4 w-24" />
          <ul className="space-y-2 text-[#9e9e9e] text-sm">
            <li className="hover:text-[#81ba00]">Search</li>
            <li className="hover:text-[#81ba00]">Delivery Information</li>
            <li className="hover:text-[#81ba00]">About Us</li>
            <li className="hover:text-[#81ba00]">Terms and Conditions</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-white">Information</h1>
          <hr className="border-2 border-[#81ba00] my-4 w-24" />
          <ul className="space-y-2 text-[#9e9e9e] text-sm">
            <li className="hover:text-[#81ba00]">Contact</li>
            <li className="hover:text-[#81ba00]">Shiping</li>
            <li className="hover:text-[#81ba00]">FAQs</li>
            <li className="hover:text-[#81ba00]">Support</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold text-lg text-white">Contact us</h1>
          <hr className="border-2 border-[#81ba00] my-4 w-24" />
          <ul className="space-y-2 text-[#9e9e9e] text-sm">
            <li className="grid grid-cols-7 items-center">
              <LocationIcon />
              <p className="col-span-6">
                33 New Montgomery St. Ste 750 San Francisco, CA, USA 94105
              </p>
            </li>
            <li className=" grid grid-cols-7 items-center">
              <MailIcon />
              <p className="col-span-6">evergreenNursery@exampledemo.com</p>
            </li>
            <li className=" grid grid-cols-7 items-center">
              <PhoneIcon />
              <p className="col-span-6">+8801 3889098</p>
            </li>
          </ul>
          <div className="my-4 flex gap-2 items-center">
            <div className="rounded-full w-8 h-8 bg-[#595959] hover:bg-[#81ba00] flex justify-center items-center">
              <FacebookIcon />
            </div>
            <div className="rounded-full w-8 h-8 bg-[#595959] hover:bg-[#81ba00] flex justify-center items-center">
              <PininterestIcon />
            </div>
            <div className="rounded-full w-8 h-8 bg-[#595959] hover:bg-[#81ba00] flex justify-center items-center">
              <InstagramIcon />
            </div>
            <div className="rounded-full w-8 h-8 bg-[#595959] hover:bg-[#81ba00] flex justify-center items-center">
              <YoutubeIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
