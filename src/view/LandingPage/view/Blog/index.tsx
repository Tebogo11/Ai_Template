import Seo from "../components/Seo";
import BlogList from "./BlogList";
import { posts } from "./data";

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-base-100">
      <Seo
        title="Outfit AI Blog — Tips, Guides, and AI Styling News"
        description="Read Outfit AI tutorials, style guides, and updates on AI-powered outfit generation."
        keywords={["AI fashion", "outfit generator", "style guides", "blog"]}
        url="/blog"
        siteBase="https://o-ai.co.uk"
      />
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-base-content">Blog</h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Tutorials, inspiration, and updates from the Outfit AI team.
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <BlogList posts={posts} />
        </div>
      </section>
    </div>
  );
}
