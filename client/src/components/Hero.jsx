// src/components/Hero.jsx
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Enjoy Your Healthy
              <br />
              <span className="text-red-600">Delicious Food</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Authentic Kenyan Cuisine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#book-a-table"
                className="bg-red-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Book an Event
              </a>
              <a
                href="https://www.youtube.com/watch?v=P02gb39TEyA"
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-red-600" fill="currentColor" />
                </div>
                <span className="font-medium">Watch Video</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png"
                alt="Kijiji Cuisine Mascot"
                className="w-64 h-64 md:w-80 md:h-80 object-contain animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
