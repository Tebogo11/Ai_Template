import { Link } from 'react-router';
import Seo from '../../components/Seo';

export default function NotFound() {
  return (
    <div className="bg-base-100 min-h-screen">
      <Seo
        title="Page not found — Outfit AI"
        description="The page you are looking for does not exist."
        url="/404"
        noindex
        nofollow
        siteBase="https://o-ai.co.uk"
      />
      <section className="flex-center h-dvh px-4 pt-28 pb-16">
        <div className="container mx-auto max-w-2xl text-center">
          <h1 className="mb-4 text-6xl font-black">404</h1>
          <p className="text-base-content/70 mb-8 text-lg">
            Sorry, we couldn’t find that page.
          </p>
          <div className="flex justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              Go to Home
            </Link>
            <Link to="/blog" className="btn btn-outline">
              Visit Blog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
