import { Link } from 'react-router';
import { BlogPost } from './types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card bg-base-100 shadow-md transition hover:shadow-lg">
      <figure className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="card-body">
        <div className="text-xs opacity-60">{new Date(post.date).toDateString()}</div>
        <h3 className="card-title text-2xl">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-base-content/70">{post.excerpt}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span key={t} className="badge badge-outline">
              {t}
            </span>
          ))}
        </div>
        <div className="card-actions mt-4 justify-end">
          <Link to={`/blog/${post.slug}`} className="btn btn-primary btn-sm">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
