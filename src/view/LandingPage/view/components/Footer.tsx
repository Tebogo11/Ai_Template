import { useAppSetting } from "@/store/useAppSetting";
import { useMutation } from "convex/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../../../convex/_generated/api";

const Footer = () => {
  const { theme } = useAppSetting();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const subscribeToNewsletter = useMutation(
    api.landingPageApi.newsLetterSubscriber.subscribeToNewsletter,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await subscribeToNewsletter({ email });
    setIsLoading(false);
    setHasSubmitted(true);
  };

  return (
    <footer className="border-t border-base-300 bg-base-100 text-base-content">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <img
              src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
              alt="Outfit AI"
              className={`h-9 w-auto object-contain transition-transform duration-300 hover:scale-110 `}
              loading="eager"
              decoding="async"
            />
            <span>Outfit AI</span>
          </Link>
          <p className="text-sm text-base-content/70">
            Outfit AI lets you try outfits before you buy. Generate made-to-fit
            looks with hyper-real visuals calibrated to your measurements, style
            goals, and seasonal needs.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-6 text-sm md:flex-row md:justify-end">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-base-content/80">
              Product
            </h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="hover:text-primary">
                Home
              </Link>
              <Link to="/pricing" className="hover:text-primary">
                Pricing
              </Link>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </nav>
          </div>
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-base-content/80">
              Stay in touch
            </h3>
            <p className="text-base-content/70">
              Subscribe to updates for new drop previews, digital fitting tips,
              and platform insights.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-xs flex-col gap-3 md:flex-row"
            >
              {!hasSubmitted ? (
                <>
                  <input
                    type="email"
                    placeholder="Your email"
                    className="input input-bordered input-sm flex-1 min-h-8"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Notify me"}
                  </button>
                </>
              ) : (
                <p className="text-success">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="border-t border-base-300 py-6 text-center text-xs text-base-content/60">
        © {new Date().getFullYear()} Outfit AI. Crafted for styling in the age
        of digital wardrobes.
      </div>
    </footer>
  );
};

export default Footer;
