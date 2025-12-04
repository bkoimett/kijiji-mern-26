// src/components/Clients.jsx
export function Clients() {
  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Partners
          </h2>
          <p className="text-gray-600 text-lg">
            Our <span className="text-red-600 font-semibold">Clients</span>
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764842904/serenity-gallery/ucqhqfna3c7syjsp5mp6.png"
            alt="Kijiji Cuisine Clients"
            className="max-w-4xl w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
