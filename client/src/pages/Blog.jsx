// src/pages/Blog.jsx
import { BlogList } from "../components/BlogList";
import SEO from "../components/seo/SEO";

export function Blog() {
  return (
    <>
      <SEO
        title="Kijiji Cuisine Blog - Culinary Tips & Recipes"
        description="Discover delicious recipes, catering tips, and culinary insights from Kijiji Cuisine. Expert advice on Kenyan cuisine and event planning."
        keywords="Kenyan recipes, catering tips, food blog, culinary articles, event planning Kenya, cooking tips"
        ogImage="https://res.cloudinary.com/deci4v6zv/image/upload/v1762617272/kijiji-mascot.png"
      />
      <BlogList />
    </>
  );
}
