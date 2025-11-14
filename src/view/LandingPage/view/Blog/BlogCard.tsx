import { Link } from "react-router-dom";
import { BlogPost } from "./types";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure className="h-48 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
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
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((t) => (
            <span key={t} className="badge badge-outline">
              {t}
            </span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <Link to={`/blog/${post.slug}`} className="btn btn-primary btn-sm">
            Read more
          </Link>
        </div>
      </div>
    </article>
  );
}
