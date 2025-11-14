import { useParams, Link } from "react-router-dom";
import { posts } from "./data";
import Seo from "../components/Seo";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto max-w-4xl pt-32 px-4">
        <h1 className="text-3xl font-black mb-4">Post not found</h1>
        <Link to="/blog" className="btn btn-primary btn-sm">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Seo
        title={`${post.title} — Outfit AI Blog`}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.slug}`}
        siteBase="https://o-ai.co.uk"
        type="article"
        structuredData={{
          "@type": "BlogPosting",
          headline: post.title,
          image: post.image,
          datePublished: post.date,
          author: { "@type": "Organization", name: "Outfit AI" },
          keywords: post.tags.join(", "),
        }}
      />
      <article className="container mx-auto max-w-3xl pt-28 pb-16 px-4">
        <Link to="/blog" className="link link-primary">← Back to Blog</Link>
        <h1 className="text-4xl md:text-5xl font-black mt-4 mb-4">{post.title}</h1>
        <div className="text-sm opacity-60 mb-6">{new Date(post.date).toDateString()}</div>
        <img src={post.image} alt={post.title} className="w-full rounded-lg shadow mb-8" />
        <p className="text-lg leading-8 text-base-content/80 whitespace-pre-line">{post.content}</p>
        <div className="mt-8 flex gap-2 flex-wrap">
          {post.tags.map((t) => (
            <span key={t} className="badge badge-outline">{t}</span>
          ))}
        </div>
      </article>
    </div>
  );
}
