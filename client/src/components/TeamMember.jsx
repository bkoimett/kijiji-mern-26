// src/components/TeamMember.jsx
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export function TeamMember({ chef }) {
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={chef.image}
          alt={chef.name}
          className="w-full md:w-1/2 lg:w-[80%] h-full relative bg-center bg-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-1">{chef.name}</h4>
        <p className="text-red-600 font-semibold mb-4">{chef.position}</p>
        <p className="text-gray-600 text-sm mb-4">{chef.description}</p>

        <div className="flex justify-center gap-3">
          <a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-red-600 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
