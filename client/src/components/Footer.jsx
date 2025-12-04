// src/components/Footer.jsx
import {
  MapPin,
  Phone,
  Clock,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Address */}
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-3">Address</h4>
              <p className="text-gray-300">
                KAHAWA SUKARI STREET, TAVETA ROAD, 1st NORTH AVENUE
                <br />
                NAIROBI, KENYA
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-3">Contact</h4>
              <p className="text-gray-300">
                <strong>Phone:</strong>
                <br />
                <a
                  href="tel:+254724147654"
                  className="hover:text-red-400 transition-colors"
                >
                  +254 724 147 654
                </a>
                <br />
                <a
                  href="tel:+254718256626"
                  className="hover:text-red-400 transition-colors"
                >
                  +254 718 256 626
                </a>
                <br />
                <strong className="mt-2 block">Email:</strong>
                <a
                  href="mailto:kijijicorporatecuisine@gmail.com"
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  kijijicorporatecuisine@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-bold mb-3">Opening Hours</h4>
              <p className="text-gray-300">
                <strong>Mon-Sun:</strong> 6AM - 12PM
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/kijijicuisine"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/kijijicuisine"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/kijijicuisine/"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://ke.linkedin.com/in/kijiji-cuisine-884bb0193"
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © Copyright <strong className="text-white">Kijiji Cuisine</strong>{" "}
            All Rights Reserved
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Supported by{" "}
            <a href="#" className="text-red-400 hover:text-red-300">
              OcculusTechnologies
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
