import React, { useEffect } from "react";

export const OrganizationSchema = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      "@id": "https://kijijicorporatecuisine.co.ke/#organization",
      name: "Kijiji Cuisine Group Ltd",
      description:
        "Premier catering service in Nairobi, Kenya offering authentic Kenyan cuisine for corporate events, private functions, and special occasions. 10+ years of catering experience.",
      url: "https://kijijicorporatecuisine.co.ke",
      telephone: "+254-724-147654",
      email: "kijijicorporatecuisine@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kahawa Sukari Street, Taveta Road, 1st North Avenue",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        postalCode: "00618",
        addressCountry: "KE",
      },
      location: {
        "@type": "Place",
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-1.2033",
          longitude: "36.8939",
        },
      },
      sameAs: [
        "https://www.facebook.com/kijijicuisine",
        "https://www.instagram.com/kijijicuisine",
        "https://x.com/kijijicuisine",
        "https://www.linkedin.com/in/kijiji-cuisine-884bb0193",
        "https://www.youtube.com/@kijijicuisine",
      ],
      openingHours: ["Mo-Su 06:00-24:00"],
      servesCuisine: [
        "Kenyan Cuisine",
        "African Cuisine",
        "Continental Cuisine",
        "Vegetarian Options",
        "Vegan Options",
      ],
      priceRange: "$$",
      hasMenu: "https://kijijicorporatecuisine.co.ke/#menu",
      acceptsReservations: "True",
      foundingDate: "2014",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
      },
      areaServed: [
        "Nairobi",
        "Kiambu",
        "Machakos",
        "Kajiado",
        "All Kenya",
        "East Africa Region",
      ],
      serviceType: [
        "Corporate Catering",
        "Private Event Catering",
        "Wedding Catering",
        "Conference Catering",
        "Party Catering",
        "Food Delivery",
      ],
      brand: {
        "@type": "Brand",
        name: "Kijiji Cuisine",
        logo: "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png",
        slogan: "Making Your Event Stand Out",
      },
      employee: [
        {
          "@type": "Person",
          name: "Alex Milenye",
          jobTitle: "Chief Executive Officer",
        },
        {
          "@type": "Person",
          name: "Dan Monene",
          jobTitle: "Master Chef",
        },
        {
          "@type": "Person",
          name: "Gawi Mboya",
          jobTitle: "Pastry Chef",
        },
      ],
      paymentAccepted: ["Cash", "Credit Card", "Mobile Money", "Bank Transfer"],
      currenciesAccepted: "KES, USD, EUR",
      vatID: "P051V1234567K",
      knowsAbout: [
        "Kenyan Traditional Cuisine",
        "Event Catering",
        "Corporate Functions",
        "Food Presentation",
        "Menu Planning",
        "Dietary Requirements",
      ],
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    script.id = "organization-schema";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("organization-schema");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
};

export const ArticleSchema = ({ post }) => {
  useEffect(() => {
    if (!post) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `https://kijijicorporatecuisine.co.ke/blog/${post._id}#article`,
      headline: post.title,
      description:
        post.excerpt ||
        post.content?.substring(0, 160) ||
        "Culinary article from Kijiji Cuisine",
      image:
        post.image ||
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png",
      datePublished: post.createdAt,
      dateModified: post.updatedAt || post.createdAt,
      author: {
        "@type": "Person",
        name: post.author?.name || "Kijiji Cuisine Chef",
        jobTitle: "Professional Chef",
        worksFor: {
          "@type": "Organization",
          name: "Kijiji Cuisine Group Ltd",
        },
      },
      publisher: {
        "@type": "Organization",
        name: "Kijiji Cuisine Group Ltd",
        logo: {
          "@type": "ImageObject",
          url: "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://kijijicorporatecuisine.co.ke/blog/${post._id}`,
      },
      keywords:
        post.tags?.join(", ") || "catering, recipes, Kenyan cuisine, food",
      articleSection: "Culinary Articles",
      wordCount: post.content?.length || 0,
      timeRequired: `PT${post.readTime?.replace(" min", "M") || "5M"}`,
      inLanguage: "en",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structructuredData);
    script.id = "article-schema";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("article-schema");
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [post]);

  return null;
};

export const EventSchema = ({ event }) => {
  useEffect(() => {
    if (!event) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title || "Catering Event",
      description:
        event.description || "Professional catering service by Kijiji Cuisine",
      startDate: event.startDate,
      endDate: event.endDate,
      location: {
        "@type": "Place",
        name: event.location || "Client's Venue",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Nairobi",
          addressCountry: "KE",
        },
      },
      organizer: {
        "@type": "Organization",
        name: "Kijiji Cuisine Group Ltd",
        url: "https://kijijicorporatecuisine.co.ke",
      },
      performer: {
        "@type": "Organization",
        name: "Kijiji Cuisine Catering Team",
      },
      offers: {
        "@type": "Offer",
        url: "https://kijijicorporatecuisine.co.ke/#book-a-table",
        price: event.price || "0",
        priceCurrency: "KES",
        availability: "https://schema.org/InStock",
        validFrom: new Date().toISOString(),
      },
      eventStatus: "https://schema.org/EventScheduled",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [event]);

  return null;
};

export const LocalBusinessSchema = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": ["FoodEstablishment", "LocalBusiness"],
      "@id": "https://kijijicorporatecuisine.co.ke/#localbusiness",
      name: "Kijiji Cuisine Group Ltd",
      image:
        "https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png",
      description:
        "Professional catering services for corporate and private events in Nairobi, Kenya",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Kahawa Sukari Street, Taveta Road, 1st North Avenue",
        addressLocality: "Nairobi",
        addressRegion: "Nairobi County",
        postalCode: "00618",
        addressCountry: "KE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "-1.2033",
        longitude: "36.8939",
      },
      url: "https://kijijicorporatecuisine.co.ke",
      telephone: "+254-724-147654",
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "06:00",
          closes: "24:00",
        },
      ],
      priceRange: "$$",
      servesCuisine: [
        "Kenyan",
        "African",
        "Continental",
        "Vegetarian",
        "Vegan",
      ],
      hasMenu: "https://kijijicorporatecuisine.co.ke/#menu",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};

// Combined Schema Component for all structured data
export const AllSchemas = () => {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
    </>
  );
};

// Additional schema components for better SEO
export const FAQSchema = ({ faqs }) => {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [faqs]);

  return null;
};

export const MenuSchema = ({ menuItems }) => {
  useEffect(() => {
    if (!menuItems) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Menu",
      "name": "Kijiji Cuisine Menu",
      "description": "Catering menu for events and functions",
      "url": "https://kijijicorporatecuisine.co.ke/#menu",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://kijijicorporatecuisine.co.ke/#menu"
      },
      "hasMenuSection": menuItems.map(section => ({
        "@type": "MenuSection",
        "name": section.name,
        "description": section.description,
        "hasMenuItem": section.items.map(item => ({
          "@type": "MenuItem",
          "name": item.name,
          "description": item.description,
          "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "KES"
          }
        }))
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [menuItems]);

  return null;
};

export const BreadcrumbSchema = ({ items }) => {
  useEffect(() => {
    if (!items || items.length === 0) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items]);

  return null;
};

// Usage in your components:
/*
// In Home.jsx
import { AllSchemas } from './StructuredData';

function Home() {
  return (
    <>
      <AllSchemas />
      // ... rest of your component
    </>
  );
}

// In BlogPost.jsx
import { ArticleSchema } from './StructuredData';

function BlogPost({ post }) {
  return (
    <>
      <ArticleSchema post={post} />
      // ... rest of your component
    </>
  );
}
*/

export default AllSchemas;
