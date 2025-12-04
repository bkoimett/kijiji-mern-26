// src/components/Chefs.jsx
import { Twitter, Facebook, Instagram, Linkedin, Quote } from "lucide-react";
import { TeamMember } from "./TeamMember";

export function Chefs() {
  const chefs = [
    {
      name: "Alex Milenye",
      position: "C.E.O",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/IMG_7982.jpg",
      description:
        "We live in a rapidly changing world, a world in which survival in business must never be taken for granted. Our vision of the future must be clear and unequivocal in order to anticipate and respond to each new challenge and opportunity.",
      quote: true,
    },
    {
      name: "Dan Monene",
      position: "Master Chef",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/chef_dan.jpg",
      description:
        "Leads the culinary team with expertise and passion. Crafts exceptional dishes by blending creativity with tradition.",
    },
    {
      name: "Gawi Mboya",
      position: "Pastry Chef",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/chef_gawi_2_(1).jpg",
      description:
        "Our pastry chef brings years of experience creating delightful baked goods with passion and creativity.",
    },
    {
      name: "Faith Njuki",
      position: "Pantry Chef",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/IMG_7972.jpg",
      description:
        "Skilled in preparing and cooking savory dishes, ensuring each meal is cooked to perfection with focus on speed and precision.",
    },
    {
      name: "Stephen Kamau",
      position: "Salad Chef",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/galmain/IMG_7975.jpg",
      description:
        "Specializes in preparing vibrant, fresh salads with a creative touch. Focuses on quality ingredients and perfect presentation.",
    },
  ];

  return (
    <section id="chefs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            MEET
          </h2>
          <p className="text-gray-600 text-lg">
            Our <span className="text-red-600 font-semibold">TEAM</span>
          </p>
        </div>

        {/* CEO Section */}
        <div className="bg-gray-900 rounded-2xl p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src={chefs[0].image}
                alt={chefs[0].name}
                className="rounded-2xl w-full h-64 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                WORD FROM THE CEO
              </h3>
              <div className="text-red-400 mb-4">
                <Quote className="w-8 h-8" />
              </div>
              <p className="text-gray-300 mb-6">
                {chefs[0].description}
                <br />
                <br />
                We must constantly learn how to stay in business by adapting to
                the dynamic conditions in which we live and work. For that
                reason we are committed to offering you our impeccable services.
              </p>
              <div className="text-white">
                <h4 className="text-xl font-bold">{chefs[0].name}</h4>
                <div className="w-24 h-1 bg-red-600 my-2"></div>
                <p className="text-red-400 font-semibold">
                  {chefs[0].position}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chefs.slice(1).map((chef, index) => (
            <TeamMember key={index} chef={chef} />
          ))}
        </div>
      </div>
    </section>
  );
}
