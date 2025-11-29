// src/components/Header.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/#contact" },
  ];

  const cloudinaryLogo =
    "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/the-serenity-place-logo-2026-removebg_ze7l7v.png";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img
              src={cloudinaryLogo}
              alt="The Serenity Place Logo"
              className="h-10 w-auto object-contain sm:h-12"
            />
            <div className="hidden sm:block">
              <span className="text-lg sm:text-xl font-bold text-gray-900 block leading-tight">
                The Serenity Place
              </span>
              <span className="block text-xs sm:text-sm text-primary-600">
                Rehabilitation Center Nairobi
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile (below 768px) */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.href
                    ? "text-primary-600"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="tel:+254722970951"
              className="hidden lg:flex items-center text-gray-600 hover:text-primary-600 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 mr-2" />
              (+254) 722 970 951
            </a>
            <Link to="/#contact" className="btn-primary whitespace-nowrap">
              Get Help
            </Link>
          </div>

          {/* Mobile menu button - Only visible on mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation - Only visible when menu is open */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md font-medium transition-colors ${
                    location.pathname === item.href
                      ? "bg-primary-50 text-primary-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-gray-200 space-y-2">
                <a
                  href="tel:+254722970951"
                  className="flex items-center px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  (+254) 722 970 951
                </a>
                <Link
                  to="/#contact"
                  className="block mx-3 py-2 btn-primary text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Help
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
