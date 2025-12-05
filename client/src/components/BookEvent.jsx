// src/components/BookEvent.jsx - UPDATED VERSION
import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { API_BASE_URL } from "../config/api";

export function BookEvent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    eventTime: "",
    numberOfGuests: "",
    inquiryType: "corporate", // This maps to booking type
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const inquiryTypes = [
    { value: "corporate", label: "Corporate Event" },
    { value: "wedding", label: "Wedding" },
    { value: "birthday", label: "Birthday Party" },
    { value: "conference", label: "Conference/Meeting" },
    { value: "private", label: "Private Dinner" },
    { value: "catering", label: "Catering Service" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            data.message ||
            "Your booking request was sent successfully! We will contact you shortly to confirm.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          eventTime: "",
          numberOfGuests: "",
          inquiryType: "corporate",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message ||
            data.errors?.[0]?.msg ||
            "Failed to send booking request. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Network error. Please try again or call us directly.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="book-a-table"
      className="py-20 bg-gradient-to-b from-amber-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Event
          </h2>
          <p className="text-xl text-gray-600">
            Let us handle the catering for your{" "}
            <span className="text-red-600 font-semibold">special occasion</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Event Planning Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Call Us</h4>
                    <p className="text-gray-600">+254-724-147654</p>
                    <p className="text-sm text-green-500">Available 8AM-10PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Us</h4>
                    <p className="text-gray-600">events@kijijicuisine.co.ke</p>
                    <p className="text-sm text-green-500">
                      Response within 2 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Our Location
                    </h4>
                    <p className="text-gray-600">
                      Kahawa Sukari Street, Taveta Road, 1st North Avenue,
                      Nairobi
                    </p>
                    <p className="text-sm text-green-500">
                      Free venue consultation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h4 className="font-bold text-amber-800 mb-2">What to Expect</h4>
              <ul className="text-amber-700 text-sm space-y-1">
                <li>✓ Custom menu planning</li>
                <li>✓ Professional staff service</li>
                <li>✓ Quality Kenyan ingredients</li>
                <li>✓ Setup and cleanup included</li>
                <li>✓ Dietary requirements accommodated</li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              {submitStatus && (
                <div
                  className={`p-4 rounded-xl mb-6 ${
                    submitStatus.type === "success"
                      ? "bg-green-50 border border-green-200 text-green-800"
                      : "bg-red-50 border border-red-200 text-red-800"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      placeholder="+254-724-147654"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        name="eventTime"
                        value={formData.eventTime}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="numberOfGuests"
                        value={formData.numberOfGuests}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                        placeholder="50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                    placeholder="Tell us about your event: venue, theme, dietary requirements, special requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Book Your Event
                    </>
                  )}
                </button>

                <p className="text-sm text-gray-500 text-center">
                  We'll contact you within 2 hours to discuss details and
                  provide a custom quote.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
