// src/components/TestimonialCard.jsx
import { Star, Quote } from "lucide-react";

export function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="mb-4 text-red-100">
        <Quote className="w-8 h-8" />
      </div>

      <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>

      <div className="flex items-center gap-3">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <div className="flex gap-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
