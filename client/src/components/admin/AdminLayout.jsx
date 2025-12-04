import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Image,
  MessageSquare,
  Users,
  LogOut,
  ChefHat,
  Utensils,
  Menu,
} from "lucide-react";

export const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
      description: "Kitchen overview",
    },
    {
      name: "Recipes",
      href: "/admin/blog",
      icon: <FileText className="w-5 h-5" />,
      description: "Manage culinary articles",
    },
    {
      name: "Food Gallery",
      href: "/admin/gallery",
      icon: <Image className="w-5 h-5" />,
      description: "Manage food images",
    },
    {
      name: "Event Inquiries",
      href: "/admin/contacts",
      icon: <MessageSquare className="w-5 h-5" />,
      description: "Manage event bookings",
    },
    {
      name: "Kitchen Staff",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      description: "Manage team members",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-red-50 to-amber-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`
          ${isSidebarOpen ? "hidden" : "lg:hidden"}
          fixed top-12 left-2 z-50 p-2 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105
        `}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <div
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 fixed lg:relative inset-y-0 left-0 z-40
          w-64 lg:w-72 bg-gradient-to-b from-red-700 to-red-800 text-white transition-transform duration-300 ease-in-out
          border-r border-red-600 shadow-xl
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-red-600">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-red-500 rounded-xl flex items-center justify-center">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Kitchen Manager</h1>
              <p className="text-xs text-red-200">Kijiji Cuisine</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-amber-300 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="p-5">
          {/* User Info */}
          <div className="mb-6 p-4 bg-gradient-to-r from-red-600/50 to-red-700/50 rounded-xl border border-red-500/30">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || "K"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-red-200 truncate">Welcome back,</p>
                <p className="font-semibold truncate">
                  {user?.name || user?.email}
                </p>
                <p className="text-xs text-amber-300 capitalize font-medium">
                  {user?.role === "admin"
                    ? "Kitchen Administrator"
                    : "Kitchen Staff"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl text-sm transition-all duration-200
                    ${
                      location.pathname === item.href
                        ? "bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg"
                        : "text-red-100 hover:bg-red-600/50 hover:shadow-md"
                    }
                  `}
                >
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    ${
                      location.pathname === item.href
                        ? "bg-white/20"
                        : "bg-red-600/30"
                    }
                  `}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-red-200/70 mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  {location.pathname === item.href && (
                    <div className="w-2 h-2 bg-amber-300 rounded-full animate-pulse"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout Button */}
          <div className="mt-8 pt-5 border-t border-red-600/50">
            <button
              onClick={logout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 
                text-red-100 bg-red-600/30 hover:bg-red-600/50 rounded-xl 
                transition-all duration-200 hover:shadow-md border border-red-500/30"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Exit Kitchen</span>
            </button>
            <div className="mt-3 text-center">
              <p className="text-xs text-red-200/50">
                Version 1.0 • Kijiji Cuisine
              </p>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Top Bar for Mobile */}
        <div className="lg:hidden sticky top-0 z-20 bg-gradient-to-r from-red-600 to-amber-600 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ChefHat className="w-6 h-6" />
              <span className="font-bold">Kitchen Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {user?.role === "admin" ? "Admin" : "Staff"}
              </span>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 lg:mt-0">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-red-100 p-4 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Kijiji Cuisine • Culinary Management
            System
          </p>
        </footer>
      </div>
    </div>
  );
};
