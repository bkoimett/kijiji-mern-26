// src/pages/Gallery.jsx
import { useState, useEffect } from "react";
import SEO from "../components/seo/SEO";
import { ChevronLeft, ChevronRight, X, Search, Filter } from "lucide-react";
import { GalleryCardSkeleton } from "../components/GalleryCardSkeleton";
import { API_BASE_URL } from "../config/api";

export function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "events", label: "Events" },
    { value: "team", label: "Team" },
    { value: "venues", label: "Venues" },
    { value: "presentation", label: "Presentation" },
    { value: "desserts", label: "Desserts" },
  ];

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const url =
        selectedCategory === "all"
          ? `${API_BASE_URL}/api/gallery`
          : `${API_BASE_URL}/api/gallery?category=${selectedCategory}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.items);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description &&
        item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredItems.length - 1 : prevIndex - 1
    );
  };

  const openModal = (index) => {
    setSelectedImage(filteredItems[index]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const nextModalImage = () => {
    const currentIdx = filteredItems.findIndex(
      (item) => item._id === selectedImage._id
    );
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIdx]);
  };

  const prevModalImage = () => {
    const currentIdx = filteredItems.findIndex(
      (item) => item._id === selectedImage._id
    );
    const prevIdx =
      (currentIdx - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIdx]);
  };

  const visibleItems = filteredItems.slice(
    Math.max(0, currentIndex - 1),
    Math.min(filteredItems.length, currentIndex + 2)
  );

  return (
    <>
      <SEO
        title="Kijiji Cuisine Gallery - Our Culinary Creations"
        description="View our collection of delicious dishes, beautifully presented events, and culinary creations from Kijiji Cuisine."
        keywords="food gallery, catering photos, event catering images, Kenyan cuisine pictures, restaurant gallery"
        ogImage="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png"
      />

      <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-red-600 to-amber-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeIn">
              Our Culinary Gallery
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto animate-fadeIn delay-100">
              Feast your eyes on our delicious creations and beautifully
              presented events
            </p>
          </div>
        </section>

        {/* Gallery Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filters and Search */}
            <div className="mb-12 bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search gallery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  />
                </div>
                <div className="sm:w-64">
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Section */}
            {loading ? (
              <div className="flex justify-center gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="w-full max-w-sm">
                    <GalleryCardSkeleton />
                  </div>
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="relative">
                {/* Navigation Arrows */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-red-50 hover:text-red-600 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-8 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-red-50 hover:text-red-600 transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Carousel */}
                <div className="flex justify-center items-center gap-8 px-12">
                  {visibleItems.map((item, index) => {
                    const isCenter = index === 1 && visibleItems.length === 3;
                    const isEdge = index !== 1;

                    return (
                      <div
                        key={item._id}
                        className={`
                          relative group cursor-pointer transition-all duration-500
                          ${isCenter ? "z-20 scale-110" : "z-10 scale-90"}
                          ${isEdge ? "opacity-70 blur-sm" : "opacity-100"}
                        `}
                        onClick={() => openModal(currentIndex + index - 1)}
                      >
                        <div className="relative overflow-hidden rounded-2xl shadow-xl">
                          <img
                            src={item.image.secure_url}
                            alt={item.title}
                            className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                          />

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <h3 className="text-white text-xl font-bold mb-2">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-amber-200 text-sm line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                              <span className="inline-flex items-center px-4 py-1 mt-3 rounded-full text-sm font-medium bg-red-600/90 text-white">
                                {item.category}
                              </span>
                            </div>
                          </div>

                          {/* Center Badge */}
                          {isCenter && (
                            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                              Featured
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center gap-3 mt-12">
                  {filteredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`
                        w-3 h-3 rounded-full transition-all
                        ${
                          index === currentIndex
                            ? "bg-red-600 w-8"
                            : "bg-amber-300 hover:bg-amber-400"
                        }
                      `}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="text-center mt-6 text-amber-700">
                  <span className="font-semibold">{currentIndex + 1}</span>
                  <span className="mx-2">/</span>
                  <span>{filteredItems.length}</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  No images found
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "No images match your search criteria. Try adjusting your filters."
                    : "Our gallery is being prepared. Check back soon for delicious visuals!"}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                    }}
                    className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
                  >
                    Show All Images
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal for Full-size Image */}
      {modalOpen && selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fadeIn">
          <button
            onClick={closeModal}
            className="absolute top-6 right-6 text-white hover:text-red-400 z-10 transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={prevModalImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-red-400 z-10 transition-colors"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={nextModalImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-red-400 z-10 transition-colors"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="max-w-6xl max-h-[85vh] relative">
            <img
              src={selectedImage.image.secure_url}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-lg"
            />

            {/* Image Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-8 rounded-b-lg">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-amber-200 mb-3">
                    {selectedImage.description}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-600 text-white">
                    {selectedImage.category}
                  </span>
                  <span className="text-sm text-amber-300">
                    {filteredItems.findIndex(
                      (item) => item._id === selectedImage._id
                    ) + 1}{" "}
                    / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Navigation Hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-gray-400">
            Use ← → arrow keys to navigate • ESC to close
          </div>
        </div>
      )}
    </>
  );
}
