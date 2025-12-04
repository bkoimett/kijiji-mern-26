// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "About",
      href: "#about",
      dropdown: [
        { name: "About Us", href: "#about" },
        { name: "Why Us?", href: "#why-us" },
        { name: "Partners", href: "#clients" },
        { name: "Team", href: "#chefs" },
      ],
    },
    { name: "Menu", href: "#menu" },
    { name: "Kijiji-Blog", href: "/blog" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Gallery", href: "/gallery" },
  ];

  const cloudinaryLogo =
    "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={cloudinaryLogo}
              alt="Kijiji Cuisine Logo"
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gray-900 block leading-tight">
                Kijiji <span className="text-red-600">Cuisine</span>
              </span>
              <span className="block text-xs text-gray-600">
                Authentic Kenyan Catering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center font-medium text-gray-700 hover:text-red-600 transition-colors">
                    {item.name}
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdown.map((subItem) => (
                      <a
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
                      >
                        {subItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-medium text-gray-700 hover:text-red-600 transition-colors"
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+254724147654"
              className="flex items-center text-gray-600 hover:text-red-600 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 mr-2" />
              (+254) 724 147 654
            </a>
            <a
              href="#book-a-table"
              className="btn-primary bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
            >
              Book an Event
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) =>
                item.dropdown ? (
                  <div key={item.name} className="space-y-1">
                    <div className="px-3 py-2 font-medium text-gray-700">
                      {item.name}
                    </div>
                    <div className="pl-6 space-y-1 border-l-2 border-gray-100">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 rounded-md font-medium text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              )}
              <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                <a
                  href="tel:+254724147654"
                  className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (+254) 724 147 654
                </a>
                <a
                  href="#book-a-table"
                  className="block mx-3 py-2 btn-primary bg-red-600 hover:bg-red-700 text-white text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book an Event
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
