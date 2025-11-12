import { Link } from "react-router-dom";
import { Sparkles, Zap, Shield, TrendingUp } from "lucide-react";
import { useAppSetting } from "@/store/useAppSetting";

const HomePage = () => {
  const { theme } = useAppSetting();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-screen overflow-hidden bg-base-200">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Woman */}
          <div className="relative bg-base-300 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
            <div className="relative z-10 text-center px-8">
              <h2 className="text-6xl md:text-8xl font-black text-primary/90 mb-4">
                Try
              </h2>
              <p className="text-xl text-white/80 font-black">Before You Buy</p>
            </div>
            <img
              src="/assets/landingPage/hero/hero2.webp"
              alt="men"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover backdrop-brightness-55 "
            />
          </div>

          {/* Right Side - Man */}
          <div className="relative bg-base-100 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-bl from-secondary/20 to-transparent"></div>
            <div className="relative z-10 text-center px-8">
              <h2 className="text-6xl md:text-8xl font-black text-primary/90 mb-4">
                AI
              </h2>
              <p className="text-xl text-white/80 font-black">
                Powered Styling
              </p>
            </div>
            <img
              src="/assets/landingPage/hero/hero1.webp"
              alt="Woman Hero Image"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover backdrop-brightness-55"
            />
          </div>
        </div>

        {/* Center Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center pointer-events-auto">
            <h1 className="text-7xl md:text-9xl font-black text-primary mb-6 drop-shadow-2xl">
              OUTFIT AI
            </h1>
            <p className="text-xl md:text-2xl text-white font-bold tracking-widest w-[35ch] mb-8 max-w-2xl mx-auto px-4 bg-neutral/40">
              Visualize your perfect <span className="font-black ">OUTFIT</span>{" "}
              before making a purchase
            </p>
            <Link to="/login" className="btn btn-primary btn-lg text-lg px-8">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-base-100">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4 text-base-content">
            Why Outfit AI?
          </h2>
          <p className="text-center text-xl text-base-content/70 mb-16 max-w-2xl mx-auto">
            Revolutionary AI technology meets fashion-forward thinking
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title text-2xl">AI-Powered</h3>
                <p className="text-base-content/70">
                  Advanced AI generates realistic outfit visualizations
                  instantly
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <Zap className="w-12 h-12 text-secondary mb-4" />
                <h3 className="card-title text-2xl">Instant Results</h3>
                <p className="text-base-content/70">
                  See your new outfit in seconds, not days
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <Shield className="w-12 h-12 text-accent mb-4" />
                <h3 className="card-title text-2xl">Risk-Free</h3>
                <p className="text-base-content/70">
                  Eliminate buyer's remorse before purchasing
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body items-center text-center">
                <TrendingUp className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title text-2xl">Style Evolution</h3>
                <p className="text-base-content/70">
                  Discover styles you never knew you'd love
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-base-200">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16 text-base-content">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-black mx-auto mb-6">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4">Upload Your Style</h3>
              <p className="text-base-content/70">
                Your modal, extra items, fit-level, and your description.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-secondary text-secondary-content flex items-center justify-center text-3xl font-black mx-auto mb-6">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4">AI Generates</h3>
              <p className="text-base-content/70">
                Our advanced AI creates a realistic visualization of your new
                outfit
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent text-accent-content flex items-center justify-center text-3xl font-black mx-auto mb-6">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4">Shop Confident</h3>
              <p className="text-base-content/70">
                Make informed decisions and buy only what you love
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl mt-5  p-2 mx-[2vw]">
          <img
            src={`/assets/landingPage/demo/${theme === "dark" ? "largeScreenImage" : "largeScreenImage-light"}.webp`}
            alt="How it works"
            loading="eager"
            className=" mx-auto hidden md:block"
          />
          <img
            src={`/assets/landingPage/demo/${theme === "dark" ? "mobilescreen" : "mobilescreen-light"}.webp`}
            alt="How it works"
            loading="eager"
            className=" mx-auto  block md:hidden"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-base-content">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-forward shoppers making smarter clothing
            decisions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn btn-primary btn-lg text-lg px-8">
              View Pricing
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg text-lg px-8">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
