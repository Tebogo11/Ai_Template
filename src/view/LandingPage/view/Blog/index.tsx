import Seo from '../../components/Seo';
import BlogList from './BlogList';
import { posts } from './data';

export default function BlogIndex() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Seo
        title="Outfit AI Blog — Tips, Guides, and AI Styling News"
        description="Read Outfit AI tutorials, style guides, and updates on AI-powered outfit generation."
        keywords={['AI fashion', 'outfit generator', 'style guides', 'blog']}
        url="/blog"
        siteBase="https://o-ai.co.uk"
      />
      <section className="from-primary/10 to-secondary/10 bg-gradient-to-br px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-base-content mb-6 text-5xl font-black md:text-7xl">Blog</h1>
          <p className="text-base-content/70 mx-auto max-w-2xl text-xl">
            Tutorials, inspiration, and updates from the Outfit AI team.
          </p>
        </div>
      </section>
      <section className="px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          <BlogList posts={posts} />
        </div>
      </section>
    </div>
  );
}
