// src/components/About.jsx
import { CheckCircle, Play } from "lucide-react";

export function About() {
  const services = [
    "Private Events",
    "Corporate Events",
    "Cocktail Parties",
    "Food Delivery Services",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-gray-600 text-lg">
            Learn More{" "}
            <span className="text-red-600 font-semibold">About Us</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <img
              src="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/DSC_0161.jpg"
              alt="Kijiji Cuisine Team"
              className="rounded-2xl shadow-xl w-full h-80 object-cover mb-8"
            />

            <a href="tel:+254724147654" className="block">
              <div className="bg-red-50 rounded-xl p-6 text-center hover:bg-red-100 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Book an Event
                </h3>
                <p className="text-2xl font-semibold text-red-600">
                  +254 724 147 654
                </p>
              </div>
            </a>
          </div>

          <div>
            <div className="mb-8">
              <p className="text-gray-600 italic text-lg mb-6">
                Kijiji Cuisine Group Ltd is a Kenya based business with 10 years
                of experience in providing catering experiences for individual
                and corporate events. Our commercial kitchen is located at
                Kahawa Sukari, Thika road in Nairobi.
              </p>
              <p className="text-gray-600 mb-6">
                With active presence in the catering industry in Kenya, we have
                a vision of becoming a leading East African catering brand
                providing creative, nutritious and cost effective catering
                solutions to our customers in both stationary and mobile
                settings.
              </p>
              <p className="text-gray-600 mb-8">
                Below are some of the services we offer:
              </p>

              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 mb-8">
              Kijiji Cuisine plays a contemporary role in Kenyan Food Culture!!
              <br />
              Making Your event Stand out is our priority
            </p>

            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/IMG_6670.jpg"
                alt="Kijiji Cuisine Food Preparation"
                className="w-full h-64 object-cover"
              />
              <a
                href="https://www.youtube.com/watch?v=P02gb39TEyA"
                className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
              >
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" fill="currentColor" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
