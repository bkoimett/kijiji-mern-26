// src/components/Hero.jsx
import { Play } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-cover bg-center bg-no-repeat py-20 md:py-28"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764866680/aboutUS_fm81as.jpg')`,
      }}
    >
      {/* Optional overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Enjoy Your Healthy
              <br />
              <span className="text-red-600">Delicious Food</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
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
                className="flex items-center justify-center gap-2 text-white hover:text-red-300 transition-colors"
              >
                <div className="w-12 h-12 bg-red-600/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
                  <Play className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <span className="font-medium">Watch Video</span>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764843081/serenity-gallery/oiyttyoxm6ol73bfn1rz.png"
                alt="Kijiji Cuisine Mascot"
                className="w-64 h-64 md:w-80 md:h-80 object-contain animate-float drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
