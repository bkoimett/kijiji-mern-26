// src/components/Stats.jsx
import { useEffect, useRef, useState } from "react";

function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          let startTime = null;
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count}+
    </span>
  );
}

export function Stats() {
  const stats = [
    { value: 232, label: "Clients" },
    { value: 521, label: "Events" },
    { value: 1453, label: "Hours Of Support" },
    { value: 32, label: "Workers" },
  ];

  return (
    <section id="stats" className="py-20 bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/stats-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="mb-2">
                <Counter end={stat.value} />
              </div>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
