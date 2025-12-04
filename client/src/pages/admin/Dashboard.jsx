// src/pages/admin/Dashboard.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  Calendar,
  Edit,
  Plus,
  ChefHat,
  Utensils,
  Package,
} from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { user, isAdmin, isStaff } = useAuth();
  const [stats, setStats] = useState({
    totalBlogs: 0,
    totalContacts: 0,
    totalMessages: 0,
    monthlyVisitors: 0,
    myBlogs: 0,
    totalEvents: 0,
  });

  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      totalBlogs: isAdmin ? 15 : 4,
      totalContacts: isAdmin ? 32 : 0,
      totalMessages: isAdmin ? 28 : 0,
      monthlyVisitors: isAdmin ? 1845 : 0,
      myBlogs: 4,
      totalEvents: isAdmin ? 12 : 0,
    });

    setRecentActivity([
      {
        id: 1,
        action: "New recipe published",
        user: "You",
        time: "3 hours ago",
      },
      {
        id: 2,
        action: "Blog post updated",
        user: "Chef Dan",
        time: "1 day ago",
      },
      ...(isAdmin
        ? [
            {
              id: 3,
              action: "New event inquiry",
              user: "Corporate Client",
              time: "6 hours ago",
            },
          ]
        : []),
    ]);
  }, [isAdmin]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600">
              {isAdmin ? "Kitchen Manager Dashboard" : "Chef Dashboard"} •{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* My Recipes - Visible to all */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">My Recipes</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.myBlogs}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <Edit className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <Link
              to="/admin/blog"
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Manage recipes →
            </Link>
          </div>
        </div>

        {/* Total Recipes - Visible to all */}
        <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Recipes</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalBlogs}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Admin-only stats */}
        {isAdmin && (
          <>
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalEvents}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalContacts}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/blog"
            className="bg-red-50 hover:bg-red-100 rounded-xl p-4 text-center transition-colors"
          >
            <FileText className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">Recipes</p>
            <p className="text-sm text-gray-600">Create and edit recipes</p>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/users"
              className="bg-green-50 hover:bg-green-100 rounded-xl p-4 text-center transition-colors"
            >
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Team</p>
              <p className="text-sm text-gray-600">Manage kitchen staff</p>
            </Link>
          )}

          <Link
            to="/admin/blog?create=new"
            className="bg-purple-50 hover:bg-purple-100 rounded-xl p-4 text-center transition-colors"
          >
            <Plus className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="font-medium text-gray-900">New Recipe</p>
            <p className="text-sm text-gray-600">Add new recipe</p>
          </Link>

          {isAdmin && (
            <Link
              to="/admin/contacts"
              className="bg-amber-50 hover:bg-amber-100 rounded-xl p-4 text-center transition-colors"
            >
              <Package className="w-8 h-8 text-amber-600 mx-auto mb-2" />
              <p className="font-medium text-gray-900">Inquiries</p>
              <p className="text-sm text-gray-600">View event inquiries</p>
            </Link>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Kitchen Activity
        </h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-2 border-b border-red-100 last:border-0"
            >
              <div>
                <p className="font-medium text-gray-900">
                  <Utensils className="w-4 h-4 inline mr-2 text-red-400" />
                  {activity.action}
                </p>
                <p className="text-sm text-gray-600">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
