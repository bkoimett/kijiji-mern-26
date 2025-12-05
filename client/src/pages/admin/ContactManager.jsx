// src/pages/admin/ContactManager.jsx - UPDATED VERSION
import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MessageSquare,
  Calendar,
  Phone,
  CheckCircle,
  Clock,
  ChefHat,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { API_BASE_URL } from "../../config/api";

export function ContactManager() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState("");

  const statusOptions = [
    { value: "all", label: "All Status", color: "gray" },
    { value: "new", label: "New Inquiry", color: "red" },
    { value: "contacted", label: "Contacted", color: "amber" },
    { value: "resolved", label: "Resolved", color: "green" },
    { value: "pending", label: "Pending", color: "blue" },
    { value: "confirmed", label: "Confirmed", color: "green" },
    { value: "cancelled", label: "Cancelled", color: "gray" },
  ];

  const inquiryTypeColors = {
    corporate: "bg-red-100 text-red-800",
    wedding: "bg-purple-100 text-purple-800",
    birthday: "bg-pink-100 text-pink-800",
    conference: "bg-blue-100 text-blue-800",
    private: "bg-indigo-100 text-indigo-800",
    catering: "bg-amber-100 text-amber-800",
    general: "bg-gray-100 text-gray-800",
    appointment: "bg-green-100 text-green-800",
    counseling: "bg-teal-100 text-teal-800",
    facility: "bg-cyan-100 text-cyan-800",
    other: "bg-gray-100 text-gray-800",
  };

  const API_BASE = `${API_BASE_URL}/api`;

  useEffect(() => {
    fetchContacts();
    fetchStats();
  }, [statusFilter]);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const url =
        statusFilter === "all"
          ? `${API_BASE}/contact`
          : `${API_BASE}/contact?status=${statusFilter}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setMessage("Error loading inquiries");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/contact/stats/summary`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchContactDetails = async (contactId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/contact/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const contact = await response.json();
        setSelectedContact(contact);
      }
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  };

  const updateContactStatus = async (contactId, newStatus, adminNotes = "") => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE}/contact/${contactId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus, adminNotes }),
      });

      if (response.ok) {
        await fetchContacts();
        await fetchStats();

        // Update selected contact if it's the one being viewed
        if (selectedContact && selectedContact._id === contactId) {
          const updatedContact = await response.json();
          setSelectedContact(updatedContact);
        }

        setMessage(`Inquiry marked as ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating contact status:", error);
      setMessage("Error updating inquiry status");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "new":
        return <Clock className="w-4 h-4" />;
      case "contacted":
        return <MessageSquare className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <span>×</span>;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 border-red-200";
      case "contacted":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isBookingInquiry = (contact) => {
    const bookingTypes = [
      "corporate",
      "wedding",
      "birthday",
      "conference",
      "private",
      "catering",
    ];
    return bookingTypes.includes(contact.inquiryType);
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.phone && contact.phone.includes(searchTerm))
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Event & Contact Inquiries
          </h1>
          <p className="text-gray-600">
            Manage booking requests and general inquiries
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 animate-pulse"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="w-20 h-4 bg-red-200 rounded mb-2"></div>
                  <div className="w-12 h-6 bg-red-200 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-red-200 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Inquiries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New</p>
                <p className="text-2xl font-bold text-red-600">{stats.new}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contacted</p>
                <p className="text-2xl font-bold text-amber-600">
                  {stats.contacted}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {stats.resolved}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-xl ${
            message.includes("Error")
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-green-50 border border-green-200 text-green-800"
          }`}
        >
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <div className="sm:w-48">
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400 w-4 h-4" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiries List */}
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 animate-pulse"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-200 rounded-full"></div>
                      <div>
                        <div className="w-24 h-4 bg-red-200 rounded mb-2"></div>
                        <div className="w-32 h-3 bg-red-100 rounded"></div>
                      </div>
                    </div>
                    <div className="w-16 h-6 bg-red-200 rounded-full"></div>
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="w-full h-3 bg-red-100 rounded"></div>
                    <div className="w-2/3 h-3 bg-red-100 rounded"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-20 h-4 bg-red-100 rounded"></div>
                    <div className="w-16 h-4 bg-red-100 rounded"></div>
                  </div>
                </div>
              ))
            ) : filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact._id}
                  className={`bg-white rounded-2xl shadow-sm border border-red-100 p-6 cursor-pointer hover:shadow-md transition-shadow ${
                    selectedContact?._id === contact._id
                      ? "ring-2 ring-red-500"
                      : ""
                  }`}
                  onClick={() => fetchContactDetails(contact._id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                        {/* Event Type Badge */}
                        {isBookingInquiry(contact) && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                            <Calendar className="w-3 h-3 mr-1" />
                            Event Booking
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        contact.status
                      )}`}
                    >
                      {getStatusIcon(contact.status)}
                      <span className="ml-1 capitalize">{contact.status}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3 line-clamp-2">
                    {contact.message}
                  </p>

                  {/* Booking Information */}
                  {isBookingInquiry(contact) && contact.eventDate && (
                    <div className="mb-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Event Date:</span>
                          <p className="font-medium">
                            {new Date(contact.eventDate).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-600">Guests:</span>
                          <p className="font-medium">
                            {contact.numberOfGuests || "Not specified"} people
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1 text-red-400" />
                        {contact.phone}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inquiryTypeColors[contact.inquiryType] ||
                          inquiryTypeColors.other
                        }`}
                      >
                        {contact.inquiryType || "general"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1 text-red-400" />
                      {format(new Date(contact.createdAt), "MMM dd, yyyy")}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No inquiries found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No inquiries yet"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Details Sidebar */}
        <div className="lg:col-span-1">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 animate-pulse">
              <div className="flex items-center justify-between mb-6">
                <div className="w-32 h-6 bg-red-200 rounded"></div>
                <div className="w-6 h-6 bg-red-200 rounded"></div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-200 rounded-full"></div>
                  <div>
                    <div className="w-24 h-4 bg-red-200 rounded mb-2"></div>
                    <div className="w-32 h-3 bg-red-100 rounded"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-red-100 rounded"></div>
                  <div className="w-24 h-4 bg-red-100 rounded"></div>
                  <div className="w-16 h-6 bg-red-200 rounded-full"></div>
                </div>
              </div>
              <div className="mb-6">
                <div className="w-16 h-4 bg-red-200 rounded mb-2"></div>
                <div className="bg-red-100 rounded-xl p-4 space-y-2">
                  <div className="w-full h-3 bg-red-200 rounded"></div>
                  <div className="w-4/5 h-3 bg-red-200 rounded"></div>
                  <div className="w-3/5 h-3 bg-red-200 rounded"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="w-24 h-4 bg-red-200 rounded"></div>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-20 h-8 bg-red-100 rounded-xl"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedContact ? (
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inquiry Details
                </h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-red-600"
                >
                  ×
                </button>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {selectedContact.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {selectedContact.email}
                    </p>
                    {isBookingInquiry(selectedContact) && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 mt-1">
                        <Calendar className="w-3 h-3 mr-1" />
                        Event Booking
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-red-400" />
                    {selectedContact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-red-400" />
                    {format(
                      new Date(selectedContact.createdAt),
                      "MMM dd, yyyy 'at' h:mm a"
                    )}
                  </div>
                  <div className="flex items-center text-sm">
                    <span
                      className={`px-2 py-1 rounded-full capitalize ${
                        inquiryTypeColors[selectedContact.inquiryType] ||
                        inquiryTypeColors.other
                      }`}
                    >
                      {selectedContact.inquiryType || "general"}
                    </span>
                  </div>
                </div>

                {/* Booking Details Section */}
                {isBookingInquiry(selectedContact) &&
                  selectedContact.eventDate && (
                    <div className="mt-4 p-4 bg-red-50 rounded-xl border border-red-200">
                      <h5 className="font-semibold text-red-800 mb-3 flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        Booking Details
                      </h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <span className="text-xs text-gray-600 block">
                            Event Date
                          </span>
                          <p className="font-medium text-sm">
                            {new Date(
                              selectedContact.eventDate
                            ).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 block">
                            Event Time
                          </span>
                          <p className="font-medium text-sm">
                            {selectedContact.eventTime || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 block">
                            Number of Guests
                          </span>
                          <p className="font-medium text-sm">
                            {selectedContact.numberOfGuests || "Not specified"}{" "}
                            people
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-600 block">
                            Event Type
                          </span>
                          <p className="font-medium text-sm capitalize">
                            {selectedContact.inquiryType?.replace(/_/g, " ") ||
                              "Event"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 mb-2">Message</h5>
                <div className="bg-red-50 rounded-xl p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-900">Update Status</h5>
                <div className="flex flex-wrap gap-2">
                  {statusOptions
                    .filter((opt) => opt.value !== "all")
                    .map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          updateContactStatus(selectedContact._id, option.value)
                        }
                        disabled={selectedContact.status === option.value}
                        className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          selectedContact.status === option.value
                            ? getStatusColor(option.value)
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        } disabled:opacity-50`}
                      >
                        {getStatusIcon(option.value)}
                        <span className="ml-1 capitalize">{option.label}</span>
                      </button>
                    ))}
                </div>
              </div>

              {/* Booking-specific Status Actions */}
              {isBookingInquiry(selectedContact) && (
                <div className="mt-4 space-y-3">
                  <h5 className="font-semibold text-gray-900">
                    Booking Status
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() =>
                        updateContactStatus(
                          selectedContact._id,
                          "confirmed",
                          "Event confirmed with client"
                        )
                      }
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedContact.status === "confirmed"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Confirm Booking
                    </button>
                    <button
                      onClick={() =>
                        updateContactStatus(
                          selectedContact._id,
                          "pending",
                          "Waiting for client confirmation"
                        )
                      }
                      className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedContact.status === "pending"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Clock className="w-4 h-4 mr-1" />
                      Mark as Pending
                    </button>
                    <button
                      onClick={() =>
                        updateContactStatus(
                          selectedContact._id,
                          "cancelled",
                          "Event cancelled by client/chef"
                        )
                      }
                      className="flex items-center px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              {selectedContact.adminNotes && (
                <div className="mt-6">
                  <h5 className="font-semibold text-gray-900 mb-2">
                    Chef's Notes
                  </h5>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm">
                      {selectedContact.adminNotes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Select an Inquiry
              </h3>
              <p className="text-gray-600">
                Click on an inquiry to view details and manage its status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
