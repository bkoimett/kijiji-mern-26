// src/pages/admin/GalleryManager.jsx - CORRECTED VERSION
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Image as ImageIcon,
  Star,
  ChefHat,
  Upload,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "food",
    featured: false,
    order: 0,
    image: null,
  });

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "food", label: "Food" },
    { value: "events", label: "Events" },
    { value: "team", label: "Kitchen Team" },
    { value: "venues", label: "Venues" },
    { value: "presentation", label: "Presentation" },
    { value: "desserts", label: "Desserts" },
  ];

  const API_BASE = `${API_BASE_URL}/api`;

  useEffect(() => {
    fetchGalleryItems();
  }, [selectedCategory]);

  const fetchGalleryItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const url =
        selectedCategory === "all"
          ? `${API_BASE}/gallery`
          : `${API_BASE}/gallery?category=${selectedCategory}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data.items || data);
      } else {
        throw new Error("Failed to fetch gallery items");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
      setMessage("Error loading gallery items");
    } finally {
      setLoading(false);
    }
  };

  // CORRECTED handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.image && !editingItem) {
      setMessage("Please select an image");
      return;
    }

    if (!formData.title.trim()) {
      setMessage("Please enter a title");
      return;
    }

    if (!formData.category) {
      setMessage("Please select a category");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      // For updates (PUT)
      if (editingItem) {
        const url = `${API_BASE}/gallery/${editingItem._id}`;

        const updateData = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          featured: formData.featured,
          order: formData.order || 0,
        };

        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updateData),
        });

        const data = await response.json();

        if (response.ok) {
          await fetchGalleryItems();
          resetForm();
          setMessage("Gallery item updated successfully!");
        } else {
          setMessage(`Error: ${data.message || "Update failed"}`);
        }
      } else {
        // For new items (POST) - use FormData correctly
        const formDataToSend = new FormData();

        formDataToSend.append("title", formData.title);
        formDataToSend.append("description", formData.description || "");
        formDataToSend.append("category", formData.category);
        formDataToSend.append("featured", formData.featured);
        formDataToSend.append("order", formData.order || 0);

        if (formData.image) {
          // Make sure we're appending the file correctly
          formDataToSend.append("image", formData.image);
        }

        console.log("Sending form data with image:", formData.image?.name);

        const response = await fetch(`${API_BASE}/gallery`, {
          method: "POST",
          headers: {
            // DON'T set Content-Type header for FormData - browser will set it with boundary
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        });

        const data = await response.json();
        console.log("Response data:", data);

        if (response.ok) {
          await fetchGalleryItems();
          resetForm();
          setMessage("Gallery item created successfully!");
        } else {
          setMessage(`Error: ${data.message || "Upload failed"}`);
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      setMessage("Network error. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      featured: item.featured || false,
      order: item.order || 0,
      image: null,
    });
    setImagePreview(item.image?.secure_url || null);
    setShowForm(true);
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/gallery/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchGalleryItems();
        setMessage("Gallery item deleted successfully!");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "food",
      featured: false,
      order: 0,
      image: null,
    });
    setImagePreview(null);
    setEditingItem(null);
    setShowForm(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage("Image size must be less than 5MB");
        return;
      }

      // Check file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setMessage("Please select a valid image file (JPEG, PNG, WEBP)");
        return;
      }

      setFormData({ ...formData, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredItems = galleryItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center">
          <ChefHat className="w-6 h-6 animate-pulse text-red-600 mr-2" />
          <span className="text-red-600">Loading food gallery...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Food Gallery Management
          </h1>
          <p className="text-gray-600">
            Manage culinary images and featured content
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Food Image
        </button>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes("Error")
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button
              onClick={() => setMessage("")}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Gallery Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            <ChefHat className="w-5 h-5 inline mr-2 text-red-600" />
            {editingItem ? "Edit Food Image" : "Add New Food Image"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editingItem ? "Change Image (optional)" : "Food Image *"}
              </label>

              <div className="space-y-4">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden border-2 border-red-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* Upload Area */}
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-red-300 border-dashed rounded-xl cursor-pointer bg-red-50 hover:bg-red-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-red-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WEBP (MAX. 5MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {formData.image && (
                  <p className="text-sm text-green-600 flex items-center">
                    <ImageIcon className="w-4 h-4 mr-1" />
                    Selected: {formData.image.name}
                  </p>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="e.g., Kenyan Chapati Platter"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="Optional description or recipe notes"
              />
            </div>

            {/* Category and Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {categories
                    .filter((cat) => cat.value !== "all")
                    .map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center p-3 bg-red-50 rounded-xl">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                <span className="font-medium">Feature on homepage</span>
                <span className="text-gray-500 ml-1">
                  (max 3 featured images)
                </span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    {editingItem ? "Updating..." : "Uploading..."}
                  </>
                ) : (
                  <>
                    {editingItem ? (
                      <>
                        <Edit className="w-4 h-4 mr-2" />
                        Update Food Image
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Food Image
                      </>
                    )}
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl shadow-lg border border-red-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search food images..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="sm:w-64">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow-lg border border-red-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 bg-gradient-to-br from-red-100 to-amber-100 overflow-hidden">
              <img
                src={item.image?.secure_url || item.image}
                alt={item.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              {item.featured && (
                <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  <Star className="w-3 h-3 inline mr-1" />
                  Featured
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">
                  <ChefHat className="w-4 h-4 inline mr-1 text-red-500" />
                  {item.title}
                </h3>
              </div>

              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {item.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  {item.category}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No food images found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== "all"
              ? "Try adjusting your search or filters"
              : "Get started by adding your first culinary image"}
          </p>
          {!searchTerm && selectedCategory === "all" && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Add First Food Image
            </button>
          )}
        </div>
      )}
    </div>
  );
}
