// src/pages/admin/BlogManager.jsx
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  User,
  Utensils,
  ChefHat,
} from "lucide-react";
import { format } from "date-fns";
import { API_BASE_URL } from "../../config/api";

export function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    status: "draft",
  });
  const [message, setMessage] = useState("");

  const API_BASE = `${API_BASE_URL}/api`;

  // Fetch blogs from real backend
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/blog/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
        setMessage("");
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        // Fallback to local storage if backend fails
        const savedBlogs = localStorage.getItem("kijiji-blogs");
        if (savedBlogs) {
          setBlogs(JSON.parse(savedBlogs));
        }
      }
    } catch (error) {
      console.error("Backend unavailable, using local data");
      setMessage("Backend connection failed. Using local data.");
      // Fallback to local storage
      const savedBlogs = localStorage.getItem("kijiji-blogs");
      if (savedBlogs) {
        setBlogs(JSON.parse(savedBlogs));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const url = editingBlog
        ? `${API_BASE}/blog/${editingBlog._id}`
        : `${API_BASE}/blog`;

      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchBlogs(); // Refresh the list
        resetForm();
        setMessage(
          editingBlog
            ? "Blog recipe updated successfully!"
            : "Culinary article created successfully!"
        );

        // Also save to local storage as backup
        const updatedBlogs = editingBlog
          ? blogs.map((blog) => (blog._id === editingBlog._id ? data : blog))
          : [data, ...blogs];
        localStorage.setItem("kijiji-blogs", JSON.stringify(updatedBlogs));
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Network error. Saving locally instead.");
      // Fallback to local storage
      const blogData = {
        _id: editingBlog ? editingBlog._id : Date.now().toString(),
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        status: formData.status,
        author: { name: "Kijiji Chef" },
        createdAt: editingBlog ? editingBlog.createdAt : new Date(),
        updatedAt: new Date(),
      };

      if (editingBlog) {
        const updatedBlogs = blogs.map((blog) =>
          blog._id === editingBlog._id ? blogData : blog
        );
        setBlogs(updatedBlogs);
        localStorage.setItem("kijiji-blogs", JSON.stringify(updatedBlogs));
      } else {
        const updatedBlogs = [blogData, ...blogs];
        setBlogs(updatedBlogs);
        localStorage.setItem("kijiji-blogs", JSON.stringify(updatedBlogs));
      }
      resetForm();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      tags: blog.tags ? blog.tags.join(", ") : "",
      status: blog.status,
    });
    setShowForm(true);
  };

  const handleDelete = async (blogId) => {
    if (
      !window.confirm("Are you sure you want to delete this culinary article?")
    )
      return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/blog/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchBlogs();
        setMessage("Recipe article deleted successfully!");
        // Also update local storage
        const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
        localStorage.setItem("kijiji-blogs", JSON.stringify(updatedBlogs));
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      setMessage("Network error. Deleting locally.");
      // Fallback to local deletion
      const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
      setBlogs(updatedBlogs);
      localStorage.setItem("kijiji-blogs", JSON.stringify(updatedBlogs));
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      tags: "",
      status: "draft",
    });
    setEditingBlog(null);
    setShowForm(false);
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-amber-100 text-amber-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.tags &&
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  if (loading && blogs.length === 0) {
    return (
      <div className="p-6">
        <div className="animate-pulse text-red-600">
          <ChefHat className="w-6 h-6 animate-pulse inline mr-2" />
          Loading culinary articles from kitchen database...
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
            Culinary Articles
          </h1>
          <p className="text-gray-600">
            Create and manage recipes and food articles
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Recipe
        </button>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes("Error")
              ? "bg-red-50 border border-red-200 text-red-800"
              : message.includes("locally")
              ? "bg-amber-50 border border-amber-200 text-amber-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Recipe Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            <Utensils className="w-5 h-5 inline mr-2 text-red-600" />
            {editingBlog ? "Edit Recipe Article" : "Create New Recipe"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="e.g., Traditional Kenyan Chapati Recipe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Brief description of the recipe or article"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Recipe/Article Content *
                </label>
                <textarea
                  required
                  rows={8}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Include ingredients, instructions, cooking tips..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="kenyan, bread, breakfast, traditional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-6 rounded-xl transition-all disabled:opacity-50"
              >
                {loading
                  ? "Cooking..."
                  : editingBlog
                  ? "Update Recipe"
                  : "Publish Recipe"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search and Recipes List */}
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Recipes List */}
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Recipe Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <Utensils className="w-4 h-4 inline mr-2 text-red-600" />
                    {blog.title}
                  </h3>
                  {getStatusBadge(blog.status)}
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">
                  {blog.excerpt}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1 text-red-400" />
                    {blog.author?.name || "Kijiji Chef"}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-red-400" />
                    {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                  </div>
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="flex items-center text-red-600 hover:text-red-700 font-medium py-2 px-3 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center text-red-600 hover:text-red-700 font-medium py-2 px-3 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {filteredBlogs.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Utensils className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first recipe article.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
            >
              Create First Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
