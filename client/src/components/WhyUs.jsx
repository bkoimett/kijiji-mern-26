// src/components/WhyUs.jsx
import { Clock, Zap, Users } from "lucide-react";
import { IconBox } from "./IconBox";

export function WhyUs() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Speed",
      description:
        "Fast service leading to reduced downtime and increased operational efficiency.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Flexibility",
      description:
        "Flexibility to meet various catering needs in diet, meal timings and location for events in any location across East Africa.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Efficiency",
      description:
        "Support to event objectives through ensuring guest welfare, allowing focus on proceedings.",
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">
                Why Choose KIJIJI CUISINE
              </h3>
              <p className="text-gray-300 mb-8">
                Kijiji Cuisine Group Limited is a distinguished enterprise set
                to take catering services to the next level. We pride our brand
                on the consistent delivery of nutritional and sumptuous cuisine
                packaged with professional service.
              </p>
              <p className="text-gray-300 mb-8">
                To maintain competitive advantage, the Kijiji Cuisine value
                proposition focuses on cultivating relationships to grow with
                our clients through meeting all catering event needs in the long
                term, for both individuals and corporates.
              </p>
              <div className="text-center">
                <a
                  href="tel:+254724147654"
                  className="inline-flex items-center text-red-400 hover:text-red-300 font-semibold"
                >
                  Contact Us
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <IconBox
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  className="bg-gray-800 hover:bg-gray-700 transition-colors"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
