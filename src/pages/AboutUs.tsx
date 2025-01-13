import { MapPin, Phone, Mail, User } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-10 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700">About Us</h1>
        <p className="text-lg text-gray-600 mt-4">
          Discover the story behind Evergreen Nursery — where passion for nature
          thrives!
        </p>
      </header>

      {/* Mission and Vision Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div>
          <h2 className="text-3xl font-semibold text-green-800">Our Mission</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            At Evergreen Nursery, our mission is to bring the beauty of nature
            closer to every home. We are dedicated to providing the highest
            quality plants, gardening essentials, and expert guidance to help
            our customers create lush, green spaces that inspire.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-green-800">Our Vision</h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            We envision a world where greenery thrives in every corner —
            enhancing the environment, improving air quality, and uplifting the
            spirit of communities. We aim to be the go-to destination for all
            plant enthusiasts and eco-conscious individuals.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-600 mb-10">
            Our team of passionate plant lovers and experts is here to guide and
            support you on your gardening journey.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {["Alice", "Bob", "Charlie", "Diana"].map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4"
              >
                <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
                  <User size={40} className="text-green-700" />
                </div>
                <h3 className="text-lg font-semibold text-green-800">
                  {member}
                </h3>
                <p className="text-sm text-gray-500">Plant Specialist</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-4xl font-bold text-green-700 text-center mb-8">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center space-x-4">
            <MapPin size={24} className="text-green-700" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Location</h3>
              <p className="text-gray-600">
                123 Green St, Plant City, Natureland
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Phone size={24} className="text-green-700" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Call Us</h3>
              <p className="text-gray-600">+1 234 567 890</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail size={24} className="text-green-700" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">Email Us</h3>
              <p className="text-gray-600">contact@evergreennursery.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
