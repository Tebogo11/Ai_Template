import { useAppSetting } from "@/store/useAppSetting";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router";

const Footer = () => {
  const { theme } = useAppSetting();
  return (
    <footer className="border-t border-base-300 bg-base-100 text-base-content">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <LazyLoadImage
              src={`/assets/logo/${theme === "light" ? "Logo" : "Logo-white"}.png`}
              alt="Outfit AI"
              className={`h-9 w-auto object-contain transition-transform duration-300 hover:scale-110 `}
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
            <form className="flex w-full max-w-xs flex-col gap-3 md:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered input-sm flex-1"
              />
              <button type="submit" className="btn btn-sm btn-primary">
                Notify me
              </button>
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
