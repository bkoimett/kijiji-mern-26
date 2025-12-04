// src/pages/admin/UserRegistration.jsx
import { useState, useEffect } from "react";
import {
  UserPlus,
  Edit,
  Trash2,
  User,
  Mail,
  Shield,
  Database,
  Laptop,
  RefreshCw,
  Save,
  X,
  Key,
  ChefHat,
} from "lucide-react";
import { API_BASE_URL } from "../../config/api";

export function UserRegistration() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "staff",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
  const [usingLocalData, setUsingLocalData] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const API_BASE = `${API_BASE_URL}/api`;

  // Get current user from token
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
          }
        }
      } catch (error) {
        console.log("Could not fetch current user:", error);
      }
    };
    getCurrentUser();
  }, []);

  // Fetch users from backend
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No authentication token");
      }

      console.log("Fetching kitchen staff from backend...");
      const response = await fetch(`${API_BASE}/auth/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(usersData);
        setUsingLocalData(false);
        setMessage({ type: "success", text: "Connected to kitchen database" });
        console.log("✅ Loaded kitchen staff from MongoDB");
      } else {
        throw new Error("Failed to fetch users from backend");
      }
    } catch (error) {
      console.log("Backend unavailable, using local data:", error.message);
      setUsingLocalData(true);
      setMessage({
        type: "info",
        text: "Using local storage (backend unavailable)",
      });
      loadLocalUsers();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalUsers = () => {
    const savedUsers = localStorage.getItem("kijiji-users");
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    } else {
      setUsers([
        {
          _id: "1",
          name: "Kitchen Administrator",
          email: "admin@kijijicuisine.com",
          role: "admin",
          createdAt: new Date("2024-01-01"),
        },
      ]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    // Validation
    if (!editingUser && formData.password !== formData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    if (!editingUser && formData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (editingUser) {
        // UPDATE EXISTING USER
        const updateData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };

        // Include password only if changing it
        if (showPasswordFields && formData.password) {
          if (formData.password !== formData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            setLoading(false);
            return;
          }
          if (formData.password.length < 6) {
            setMessage({
              type: "error",
              text: "Password must be at least 6 characters",
            });
            setLoading(false);
            return;
          }
          updateData.password = formData.password;
        }

        const response = await fetch(
          `${API_BASE}/auth/users/${editingUser._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          await fetchUsers();
          setMessage({
            type: "success",
            text: `Kitchen staff ${formData.name} updated successfully!`,
          });
          resetForm();
        } else {
          throw new Error(data.message || "Update failed");
        }
      } else {
        // CREATE NEW USER
        const response = await fetch(`${API_BASE}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          await fetchUsers();
          setMessage({
            type: "success",
            text: `Kitchen staff ${formData.name} registered successfully!`,
          });
          resetForm();
        } else {
          throw new Error(data.message || "Registration failed");
        }
      }
    } catch (error) {
      console.log("Operation failed, using local storage:", error.message);
      handleLocalSave();
    } finally {
      setLoading(false);
    }
  };

  const handleLocalSave = () => {
    if (editingUser) {
      // Update local user
      const updatedUsers = users.map((user) =>
        user._id === editingUser._id
          ? {
              ...user,
              name: formData.name,
              email: formData.email,
              role: formData.role,
              // In a real app, you'd hash the password here
              ...(showPasswordFields &&
                formData.password && { password: formData.password }),
            }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("kijiji-users", JSON.stringify(updatedUsers));
      setMessage({
        type: "success",
        text: `Kitchen staff ${formData.name} updated successfully locally!`,
      });
    } else {
      // Create new local user
      const newUser = {
        _id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        createdAt: new Date(),
      };

      // Check if email already exists
      const existingUser = users.find((user) => user.email === formData.email);
      if (existingUser) {
        setMessage({
          type: "error",
          text: "User with this email already exists",
        });
        return;
      }

      const updatedUsers = [newUser, ...users];
      setUsers(updatedUsers);
      localStorage.setItem("kijiji-users", JSON.stringify(updatedUsers));
      setMessage({
        type: "success",
        text: `Kitchen staff ${formData.name} registered successfully locally!`,
      });
    }
    resetForm();
    setUsingLocalData(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      confirmPassword: "",
      role: user.role,
    });
    setShowPasswordFields(false);
    setShowForm(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this kitchen staff?"))
      return;

    try {
      const token = localStorage.getItem("token");
      const userToDelete = users.find((user) => user._id === userId);

      // Don't allow deleting the main admin or yourself
      if (userToDelete?.email === "admin@kijijicuisine.com") {
        setMessage({
          type: "error",
          text: "Cannot delete the main kitchen administrator",
        });
        return;
      }

      if (userToDelete?._id === currentUser?._id) {
        setMessage({ type: "error", text: "Cannot delete your own account" });
        return;
      }

      // Staff cannot delete other users
      if (
        currentUser?.role === "staff" &&
        userToDelete?._id !== currentUser?._id
      ) {
        setMessage({
          type: "error",
          text: "Kitchen staff can only delete their own account",
        });
        return;
      }

      const response = await fetch(`${API_BASE}/auth/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        await fetchUsers();
        setMessage({
          type: "success",
          text: "Kitchen staff deleted successfully!",
        });
      } else {
        const data = await response.json();
        throw new Error(data.message || "Delete failed");
      }
    } catch (error) {
      console.log("Deleting from local storage:", error.message);

      const userToDelete = users.find((user) => user._id === userId);
      if (userToDelete?.email === "admin@kijijicuisine.com") {
        setMessage({
          type: "error",
          text: "Cannot delete the main kitchen administrator",
        });
        return;
      }

      if (userToDelete?._id === currentUser?._id) {
        setMessage({ type: "error", text: "Cannot delete your own account" });
        return;
      }

      if (
        currentUser?.role === "staff" &&
        userToDelete?._id !== currentUser?._id
      ) {
        setMessage({
          type: "error",
          text: "Kitchen staff can only delete their own account",
        });
        return;
      }

      const updatedUsers = users.filter((user) => user._id !== userId);
      setUsers(updatedUsers);
      localStorage.setItem("kijiji-users", JSON.stringify(updatedUsers));
      setMessage({
        type: "success",
        text: "Kitchen staff deleted successfully locally!",
      });
      setUsingLocalData(true);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "staff",
    });
    setEditingUser(null);
    setShowPasswordFields(false);
    setShowForm(false);
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-red-100 text-red-800",
      staff: "bg-amber-100 text-amber-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${styles[role]}`}
      >
        {role.toUpperCase()}
      </span>
    );
  };

  const canModifyUser = (targetUser) => {
    if (!currentUser) return false;
    if (currentUser.role === "admin") return true;
    if (currentUser.role === "staff" && targetUser._id === currentUser._id)
      return true;
    return false;
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center text-red-600">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          Loading kitchen staff...
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
            Kitchen Staff Management
          </h1>
          <p className="text-gray-600">
            {usingLocalData
              ? "Using local storage"
              : "Connected to kitchen database"}
            {currentUser &&
              ` • Logged in as ${currentUser.name} (${currentUser.role})`}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className="flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Refresh
          </button>
          {currentUser?.role === "admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
            >
              <UserPlus className="w-4 h-4 mr-2" /> Add Staff
            </button>
          )}
        </div>
      </div>

      {/* Data Source Indicator */}
      <div
        className={`p-4 rounded-xl flex items-center gap-3 ${
          usingLocalData
            ? "bg-amber-50 border border-amber-200 text-amber-800"
            : "bg-green-50 border border-green-200 text-green-800"
        }`}
      >
        {usingLocalData ? (
          <Laptop className="w-5 h-5" />
        ) : (
          <Database className="w-5 h-5" />
        )}
        <div>
          <strong>{usingLocalData ? "Local Mode" : "Kitchen Database"}</strong>
          <div className="text-sm">
            {usingLocalData
              ? "Staff data stored in your browser"
              : "Staff data stored in MongoDB Atlas"}
          </div>
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div
          className={`p-4 rounded-xl ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : message.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-blue-50 border border-blue-200 text-blue-800"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Kitchen Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-2xl shadow-sm border border-red-100 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-amber-500 rounded-xl flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              {getRoleBadge(user.role)}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {user.name}
              {user._id === currentUser?._id && (
                <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </h3>
            <div className="flex items-center text-gray-600 mb-3">
              <Mail className="w-4 h-4 mr-2" />
              {user.email}
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Joined: {new Date(user.createdAt).toLocaleDateString()}
            </div>

            <div className="flex gap-2">
              {canModifyUser(user) && (
                <button
                  onClick={() => handleEdit(user)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-medium py-2 px-3 rounded-xl transition-all text-sm"
                >
                  <Edit className="w-4 h-4 mr-1 inline" /> Edit
                </button>
              )}
              {canModifyUser(user) &&
                user.email !== "admin@kijijicuisine.com" && (
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-3 rounded-xl transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1 inline" /> Remove
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Staff Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {editingUser ? (
                    <Edit className="w-8 h-8 text-red-600" />
                  ) : (
                    <UserPlus className="w-8 h-8 text-red-600" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser ? "Edit Kitchen Staff" : "Add New Kitchen Staff"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {usingLocalData
                    ? `Staff will be ${
                        editingUser ? "updated" : "added"
                      } locally`
                    : `Staff will be ${
                        editingUser ? "updated" : "added"
                      } to kitchen database`}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter staff full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="staff@kijijicuisine.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kitchen Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    disabled={currentUser?.role !== "admin"}
                  >
                    <option value="staff">Kitchen Staff</option>
                    <option value="admin">Kitchen Administrator</option>
                  </select>
                  {currentUser?.role !== "admin" && (
                    <p className="text-xs text-gray-500 mt-1">
                      Only kitchen administrators can change staff roles
                    </p>
                  )}
                </div>

                {/* Password Fields */}
                {editingUser ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowPasswordFields(!showPasswordFields)}
                      className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Key className="w-4 h-4 mr-2" />
                      {showPasswordFields
                        ? "Cancel Password Change"
                        : "Change Password"}
                    </button>

                    {showPasswordFields && (
                      <div className="mt-3 space-y-3 p-3 bg-red-50 rounded-xl">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                confirmPassword: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Enter password"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm Password *
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        placeholder="Confirm password"
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-4 rounded-xl transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                        {editingUser ? "Updating..." : "Adding Staff..."}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        {editingUser ? (
                          <Save className="w-4 h-4 mr-2" />
                        ) : (
                          <UserPlus className="w-4 h-4 mr-2" />
                        )}
                        {editingUser ? "Update Staff" : "Add to Kitchen"}
                      </span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4 mr-2 inline" /> Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {users.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No kitchen staff found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by adding your first kitchen team member.
          </p>
          {currentUser?.role === "admin" && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-semibold py-2 px-6 rounded-xl transition-all"
            >
              Add First Kitchen Staff
            </button>
          )}
        </div>
      )}
    </div>
  );
}
