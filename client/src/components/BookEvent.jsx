// src/components/BookEvent.jsx
import { useState } from "react";
import { Send } from "lucide-react";

export function BookEvent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    people: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false });

    // Simulate API call
    setTimeout(() => {
      setStatus({ loading: false, success: true, error: false });
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        people: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="book-a-table" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Book an Event</h2>
          <p className="text-gray-300 text-lg">
            Book Your{" "}
            <span className="text-red-400 font-semibold">Event With Us</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 bg-gray-800 rounded-2xl overflow-hidden">
          <div
            className="h-64 lg:h-auto bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764867711/2en1_5_prhj8u.jpg")',
            }}
          />

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <input
                  type="number"
                  name="people"
                  value={formData.people}
                  onChange={handleChange}
                  placeholder="# of people"
                  min="1"
                  required
                  className="bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Message"
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <div className="relative">
                {status.loading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                  </div>
                )}

                {status.success && (
                  <div className="bg-green-500/20 text-green-400 p-4 rounded-lg mb-4">
                    Your booking request was sent. We will call back or send an
                    Email to confirm your reservation. Thank you!
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className={`w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    status.loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {!status.loading && <Send className="w-5 h-5" />}
                  Book an Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
