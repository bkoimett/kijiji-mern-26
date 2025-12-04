// src/components/Testimonials.jsx
import { Star } from "lucide-react";
import { TestimonialCard } from "./TestimonialCard";

export function Testimonials() {
  const testimonials = [
    {
      name: "Fay Favourite",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/Fay.jpg",
      quote:
        "Quality begins with kijiji Cuisine. The cakes are always sweet and dope. Keep up the Good work Bigups",
      rating: 5,
    },
    {
      name: "Kevin Gitahi Karanja",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/Kevin.jpg",
      quote:
        "The best cuisine crew in town... I just love how you will lick your fingers after a meal cooked by them. Bravo Kijiji Cuisine",
      rating: 5,
    },
    {
      name: "Clive Silva",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/Clive.jpg",
      quote: "As a matter of fact, quality begins with Kijiji cuisine...",
      rating: 5,
    },
    {
      name: "Maurene Okemo",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/Maurene.jpg",
      quote:
        "Creative and organised on their work. From the look I love your work. Big up!!!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            TESTIMONIALS
          </h2>
          <p className="text-gray-600 text-lg">
            What Are They{" "}
            <span className="text-red-600 font-semibold">Saying About Us</span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
