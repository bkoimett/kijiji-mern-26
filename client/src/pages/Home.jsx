// src/pages/Home.jsx
import React from "react";
import SEO from "../components/seo/SEO";
import AllSchemas, { OrganizationSchema } from "../components/seo/StructuredData";
import { Hero } from "../components/Hero";;
import { About } from "./About";
import { WhyUs } from "../components/WhyUs";
import { Clients } from "../components/Clients";
import { Stats } from "../components/Stats";
import { Menu } from "../components/Menu";
import { Testimonials } from "../components/Testimonials";
import { Chefs } from "../components/Chefs";
import { BookEvent } from "../components/BookEvent";


export function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Kijiji Cuisine | Authentic Kenyan Catering",
    description:
      "Kijiji Cuisine offers professional catering services for private and corporate events in Nairobi, Kenya. Authentic Kenyan cuisine with 10+ years of experience.",
    url: "https://kijijicuisine.com",
    servesCuisine: "Kenyan Cuisine",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kahawa Sukari Street, Taveta Road, 1st North Avenue",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
  };

  return (
    <>
      {/* <SEO
        title="Kijiji Cuisine | Authentic Kenyan Catering Services"
        description="Professional catering for private and corporate events in Nairobi. 10+ years experience in authentic Kenyan cuisine. Book your event today!"
        keywords="catering services Kenya, Nairobi catering, corporate events catering, Kenyan cuisine, event catering Nairobi, private chef services"
        ogImage="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png"
        structuredData={structuredData}
      /> */}
      <AllSchemas/>
      <OrganizationSchema />

      <Hero />
      <About />
      <WhyUs />
      <Clients />
      <Stats />
      <Menu />
      <Testimonials />
      <Chefs />
      <BookEvent />
    </>
  );
}
