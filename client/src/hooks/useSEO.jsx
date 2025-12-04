import { useEffect } from "react";

export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  structuredData,
}) => {
  useEffect(() => {
    // Update document title
    const siteTitle = "Kijiji Cuisine | Authentic Kenyan Catering";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    document.title = fullTitle;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    const defaultDescription =
      "Premier catering service in Nairobi, Kenya offering authentic Kenyan cuisine for corporate events, private functions, and special occasions. 10+ years of catering experience.";
    const finalDescription = description || defaultDescription;

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      metaDescription.content = finalDescription;
      document.head.appendChild(metaDescription);
    } else {
      metaDescription.content = finalDescription;
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    const defaultKeywords =
      "Kenyan catering, corporate catering Nairobi, event catering Kenya, authentic Kenyan cuisine, food delivery Nairobi, wedding catering Kenya, private chef Nairobi, African cuisine, traditional food Kenya, Nairobi caterers";
    const finalKeywords = keywords
      ? `${keywords}, ${defaultKeywords}`
      : defaultKeywords;

    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      metaKeywords.content = finalKeywords;
      document.head.appendChild(metaKeywords);
    } else {
      metaKeywords.content = finalKeywords;
    }

    // Update canonical
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    const finalCanonical = canonical || "https://kijijicorporatecuisine.co.ke";

    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      linkCanonical.href = finalCanonical;
      document.head.appendChild(linkCanonical);
    } else {
      linkCanonical.href = finalCanonical;
    }

    // Update Open Graph tags
    const updateMetaTag = (property, content) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // Also update standard meta tags for compatibility
    const updateMetaName = (name, content) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = content;
    };

    // Open Graph tags
    updateMetaTag("og:title", fullTitle);
    updateMetaTag("og:description", finalDescription);
    updateMetaTag(
      "og:image",
      ogImage ||
        "https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764843081/serenity-gallery/oiyttyoxm6ol73bfn1rz.png"
    );
    updateMetaTag("og:type", "website");
    updateMetaTag("og:url", finalCanonical);
    updateMetaTag("og:site_name", "Kijiji Cuisine");
    updateMetaTag("og:locale", "en_KE");

    // Additional OG tags for better social sharing
    updateMetaTag("og:image:width", "1200");
    updateMetaTag("og:image:height", "630");
    updateMetaTag("og:image:alt", "Kijiji Cuisine - Authentic Kenyan Catering");
    updateMetaTag("og:image:type", "image/png");

    // Twitter Card tags
    updateMetaName("twitter:card", "summary_large_image");
    updateMetaName("twitter:title", fullTitle);
    updateMetaName("twitter:description", finalDescription);
    updateMetaName(
      "twitter:image",
      ogImage ||
        "https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764843081/serenity-gallery/oiyttyoxm6ol73bfn1rz.png"
    );
    updateMetaName("twitter:site", "@kijijicuisine");
    updateMetaName("twitter:creator", "@kijijicuisine");
    updateMetaName(
      "twitter:image:alt",
      "Kijiji Cuisine - Authentic Kenyan Catering"
    );

    // Additional important meta tags
    updateMetaName("author", "Kijiji Cuisine Group Ltd");
    updateMetaName(
      "robots",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );

    // Mobile and viewport optimization
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      viewportMeta.content =
        "width=device-width, initial-scale=1, maximum-scale=5";
      document.head.appendChild(viewportMeta);
    }

    // Add structured data
    if (structuredData) {
      let scriptStructured = document.querySelector(
        'script[type="application/ld+json"]'
      );
      if (!scriptStructured) {
        scriptStructured = document.createElement("script");
        scriptStructured.type = "application/ld+json";
        scriptStructured.id = "seo-structured-data";
        document.head.appendChild(scriptStructured);
      }
      scriptStructured.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Reset to default SEO on component unmount if needed
      document.title = "Kijiji Cuisine | Authentic Kenyan Catering";

      // Remove the structured data script we added
      const scriptStructured = document.getElementById("seo-structured-data");
      if (scriptStructured) {
        document.head.removeChild(scriptStructured);
      }
    };
  }, [title, description, keywords, canonical, ogImage, structuredData]);
};

// Helper function to generate page-specific SEO data
export const generatePageSEO = (pageType, pageData = {}) => {
  const baseUrl = "https://kijijicorporatecuisine.co.ke";

  const pageConfigs = {
    home: {
      title: "Home",
      description:
        "Premier catering service in Nairobi offering authentic Kenyan cuisine for corporate events, private functions, weddings and special occasions.",
      canonical: baseUrl,
      keywords:
        "Kenyan catering Nairobi, corporate event catering, wedding catering Kenya, authentic African food",
    },
    about: {
      title: "About Us",
      description:
        "Learn about Kijiji Cuisine - 10+ years of catering excellence in Nairobi. Our story, team, and commitment to authentic Kenyan cuisine.",
      canonical: `${baseUrl}/about`,
      keywords:
        "about Kijiji Cuisine, our story, catering team Nairobi, Kenyan chefs",
    },
    services: {
      title: "Catering Services",
      description:
        "Comprehensive catering services in Nairobi: corporate events, weddings, private parties, conferences, and food delivery.",
      canonical: `${baseUrl}/services`,
      keywords:
        "catering services Nairobi, corporate catering, wedding catering, event planning",
    },
    menu: {
      title: "Our Menu",
      description:
        "Explore our authentic Kenyan cuisine menu featuring traditional dishes, modern interpretations, and dietary-specific options.",
      canonical: `${baseUrl}/menu`,
      keywords:
        "Kenyan food menu, catering menu Nairobi, traditional dishes, vegetarian options",
    },
    gallery: {
      title: "Food Gallery",
      description:
        "View our culinary creations and past events. See how we transform ingredients into memorable dining experiences.",
      canonical: `${baseUrl}/gallery`,
      keywords:
        "food photos Nairobi, event gallery, catering portfolio, Kenyan cuisine pictures",
    },
    blog: {
      title: pageData.title || "Culinary Blog",
      description:
        pageData.excerpt ||
        "Culinary articles, recipes, and catering insights from Kijiji Cuisine's professional chefs.",
      canonical: pageData.slug
        ? `${baseUrl}/blog/${pageData.slug}`
        : `${baseUrl}/blog`,
      keywords: pageData.tags
        ? pageData.tags.join(", ")
        : "culinary blog, recipes Kenya, catering tips, food articles",
    },
    contact: {
      title: "Contact Us",
      description:
        "Get in touch with Kijiji Cuisine for catering inquiries, quotes, and event planning consultations in Nairobi.",
      canonical: `${baseUrl}/contact`,
      keywords:
        "contact caterer Nairobi, catering quote Kenya, event consultation, booking information",
    },
    booking: {
      title: "Book Your Event",
      description:
        "Book Kijiji Cuisine for your next event. Corporate functions, weddings, private parties - we handle all the details.",
      canonical: `${baseUrl}/book-event`,
      keywords:
        "book catering Nairobi, event booking Kenya, catering reservation, schedule event",
    },
  };

  return pageConfigs[pageType] || pageConfigs.home;
};

// Example usage in your components:
/*
// In Home.jsx
import { useSEO, generatePageSEO } from './useSEO';

function Home() {
  const seoData = generatePageSEO('home');
  
  useSEO({
    title: seoData.title,
    description: seoData.description,
    canonical: seoData.canonical,
    keywords: seoData.keywords,
    ogImage: "https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764843081/serenity-gallery/oiyttyoxm6ol73bfn1rz.png"
  });
  
  return (
    // Your home component
  );
}

// In BlogPost.jsx
function BlogPost({ post }) {
  useSEO({
    title: post.title,
    description: post.excerpt,
    canonical: `https://kijijicorporatecuisine.co.ke/blog/${post.slug}`,
    keywords: post.tags.join(", "),
    ogImage: post.featuredImage || "https://res.cloudinary.com/dhr3m2yj8/image/upload/v1764843081/serenity-gallery/oiyttyoxm6ol73bfn1rz.png"
  });
  
  return (
    // Your blog post component
  );
}
*/
