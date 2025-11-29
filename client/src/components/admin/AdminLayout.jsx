import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, Outlet } from "react-router-dom";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Blog Manager", href: "/admin/blog", icon: "📝" },
    { name: "Gallery Manager", href: "/admin/gallery", icon: "🖼️" },
    { name: "Contact Manager", href: "/admin/contacts", icon: "📧" },
    { name: "User Management", href: "/admin/users", icon: "👥" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`
          ${isSidebarOpen ? "hidden" : "lg:hidden"}
          "lg:hidden fixed top-4 left-4 z-50 p-2 text-blue hover:bg-gradient-to-br from-blue-600 to-teal-600 hover:text-white rounded-lg"`}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40
        w-64 bg-gradient-to-br from-blue-600 to-teal-600 text-white transition-transform duration-300 ease-in-out
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white border px-1 rounded"
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <div className="mb-6 p-3 bg-blue-700 rounded-lg">
            <p className="text-sm">Welcome,</p>
            <p className="font-semibold">{user?.name || user?.email}</p>
            <p className="text-xs text-blue-200 capitalize">{user?.role}</p>
          </div>

          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    location.pathname === item.href
                      ? "bg-blue-900 text-white"
                      : "text-blue-100 hover:bg-blue-700"
                  }`}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            onClick={logout}
            className="w-full mt-6 flex items-center px-3 py-2 text-sm text-blue-100 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 mt-16 lg:mt-0">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
