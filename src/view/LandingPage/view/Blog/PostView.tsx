import { useParams, Link } from 'react-router';
import { posts } from './data';
import Seo from '../../components/Seo';
import ReactMarkdown from 'react-markdown';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto max-w-4xl px-4 pt-32">
        <h1 className="mb-4 text-3xl font-black">Post not found</h1>
        <Link to="/blog" className="btn btn-primary btn-sm">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-base-100 min-h-screen">
      <Seo
        title={`${post.title} — Outfit AI Blog`}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.slug}`}
        siteBase="https://o-ai.co.uk"
        type="article"
        structuredData={{
          '@type': 'BlogPosting',
          headline: post.title,
          image: post.image,
          datePublished: post.date,
          author: { '@type': 'Organization', name: 'Outfit AI' },
          keywords: post.tags.join(', '),
        }}
      />
      <article className="container mx-auto max-w-3xl px-4 pt-28 pb-16">
        <Link to="/blog" className="link link-primary">
          ← Back to Blog
        </Link>
        <h1 className="mt-4 mb-4 text-4xl font-black md:text-5xl">{post.title}</h1>
        <div className="mb-6 text-sm opacity-60">
          {new Date(post.date).toDateString()}
        </div>
        <img
          src={post.image}
          alt={post.title}
          className="mb-8 h-[400px] w-full rounded-lg shadow"
        />
        <article className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="badge badge-outline">
              {t}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}
