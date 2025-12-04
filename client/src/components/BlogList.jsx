// src/components/BlogList.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChefHat,
  Calendar,
  User,
  Tag,
  Utensils,
} from "lucide-react";
import { format } from "date-fns";
import { BlogCardSkeleton } from "./BlogCardSkeleton";
import { API_BASE_URL } from "../config/api";

export function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [usingLocalData, setUsingLocalData] = useState(false);

  const API_BASE = `${API_BASE_URL}/api`;

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "recipes", label: "Recipes" },
    { value: "catering", label: "Catering Tips" },
    { value: "events", label: "Event Planning" },
    { value: "ingredients", label: "Ingredients" },
    { value: "techniques", label: "Cooking Techniques" },
    { value: "culture", label: "Food Culture" },
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url =
        selectedCategory === "all"
          ? `${API_BASE}/blog`
          : `${API_BASE}/blog?category=${selectedCategory}`;

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        const blogData = data.blogs || data;
        const publishedBlogs = blogData.filter(
          (blog) => blog.status === "published"
        );
        setBlogs(publishedBlogs);
        setUsingLocalData(false);
      } else {
        throw new Error("Backend request failed");
      }
    } catch (error) {
      console.log("Backend unavailable, using local data:", error.message);
      setUsingLocalData(true);

      // Fallback to local storage
      const savedBlogs = localStorage.getItem("kijiji-blogs");
      if (savedBlogs) {
        const allBlogs = JSON.parse(savedBlogs);
        const publishedBlogs = allBlogs.filter(
          (blog) => blog.status === "published"
        );
        setBlogs(publishedBlogs);
      } else {
        // Ultimate fallback
        setBlogs([
          {
            _id: "1",
            title: "The Art of Kenyan Cuisine",
            excerpt:
              "Discover the rich flavors and techniques behind authentic Kenyan cooking.",
            author: { name: "Chef Dan Monene" },
            createdAt: new Date("2024-01-15"),
            tags: ["Recipes", "Kenyan Food"],
            status: "published",
          },
          {
            _id: "2",
            title: "Event Catering Success Tips",
            excerpt:
              "How to plan the perfect menu for your corporate or private event.",
            author: { name: "Gawi Mboya" },
            createdAt: new Date("2024-01-10"),
            tags: ["Catering", "Events"],
            status: "published",
          },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.excerpt &&
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.tags &&
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-amber-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Culinary Blog & Recipes
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover delicious recipes, catering tips, and culinary insights
            from our expert chefs
          </p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Data Source Indicator */}
          {usingLocalData && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 text-amber-800">
                <ChefHat className="w-5 h-5" />
                <div className="text-sm">
                  <strong>Local Mode</strong> - Showing locally stored blog
                  posts
                </div>
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="mb-12 bg-white rounded-2xl shadow-lg border border-amber-100 p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search recipes or articles..."
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

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing{" "}
              <span className="font-semibold text-red-600">
                {filteredBlogs.length}
              </span>{" "}
              articles
            </p>
          </div>

          {/* Blogs Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Featured Image */}
                  <div className="h-48 bg-gradient-to-br from-red-500 to-amber-500 relative">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 text-red-600 text-sm font-medium px-3 py-1 rounded-full">
                        <Utensils className="w-4 h-4 inline mr-1" />
                        Culinary
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {blog.author?.name || "Kijiji Cuisine"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-red-600 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to={`/blog/${blog._id}`}
                      className="inline-flex items-center text-red-600 hover:text-red-700 font-semibold transition-colors group"
                    >
                      Read Article
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                No articles found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                {searchTerm || selectedCategory !== "all"
                  ? "No articles match your search criteria. Try adjusting your filters."
                  : "No blog articles have been published yet. Check back soon!"}
              </p>
              {(searchTerm || selectedCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-gradient-to-r from-red-600 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-amber-700 transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}

          {/* Empty State for No Blogs */}
          {!loading &&
            filteredBlogs.length === 0 &&
            !searchTerm &&
            selectedCategory === "all" && (
              <div className="text-center py-16">
                <ChefHat className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Our Kitchen is Still Cooking!
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Delicious articles and recipes are coming soon. Check back for
                  culinary inspiration!
                </p>
                <a
                  href="#book-a-table"
                  className="inline-flex items-center bg-gradient-to-r from-red-600 to-amber-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-red-700 hover:to-amber-700"
                >
                  <Utensils className="w-5 h-5 mr-2" />
                  Book a Tasting Session
                </a>
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
