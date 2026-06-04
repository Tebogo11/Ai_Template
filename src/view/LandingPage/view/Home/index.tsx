import { Link } from 'react-router';
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { useAppSetting } from '@/store/useAppSetting';
import Seo from '../components/Seo';

const HomePage = () => {
  const { theme } = useAppSetting();

  return (
    <div className="min-h-screen">
      <Seo
        title="Outfit AI — Try Outfits Before You Buy"
        description="Upload your photo, add clothing and tags, and generate photorealistic outfits with AI. Try before you buy in seconds."
        keywords={[
          'AI fashion',
          'virtual try-on',
          'outfit generator',
          'try before you buy',
          'styling AI',
        ]}
        image="/assets/landingPage/hero/hero1.webp"
        url="/"
        siteBase="https://o-ai.co.uk"
        type="website"
        structuredData={[
          {
            '@type': 'Organization',
            name: 'Outfit AI',
            url: '/',
            logo: '/assets/logo/Logo.png',
          },
          {
            '@type': 'WebSite',
            name: 'Outfit AI',
            url: '/',
            potentialAction: {
              '@type': 'SearchAction',
              target: '/search?q={query}',
              'query-input': 'required name=query',
            },
          },
        ]}
      />
      {/* Hero Section */}
      <section className="bg-base-200 relative h-screen w-screen overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Woman */}
          <div className="bg-base-300 relative flex items-center justify-center">
            <div className="from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent"></div>
            <div className="relative z-10 px-8 text-center">
              <h2 className="text-primary/90 mb-4 text-6xl font-black md:text-8xl">
                Try
              </h2>
              <p className="text-xl font-black text-white/80">Before You Buy</p>
            </div>
            <img
              src="/assets/landingPage/hero/hero2.webp"
              alt="men"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover backdrop-brightness-55"
            />
          </div>

          {/* Right Side - Man */}
          <div className="bg-base-100 relative flex items-center justify-center">
            <div className="from-secondary/20 absolute inset-0 bg-gradient-to-bl to-transparent"></div>
            <div className="relative z-10 px-8 text-center">
              <h2 className="text-primary/90 mb-4 text-6xl font-black md:text-8xl">AI</h2>
              <p className="text-xl font-black text-white/80">Powered Styling</p>
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
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto text-center">
            <h1 className="text-primary mb-6 text-7xl font-black drop-shadow-2xl md:text-9xl">
              OUTFIT AI
            </h1>
            <p className="bg-neutral/40 mx-auto mb-8 w-[35ch] max-w-2xl px-4 text-xl font-bold tracking-widest text-white md:text-2xl">
              Visualize your perfect <span className="font-black">OUTFIT</span> before
              making a purchase
            </p>
            <Link to="/login" className="btn btn-primary btn-lg px-8 text-lg">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-base-100 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-base-content mb-4 text-center text-5xl font-black md:text-6xl">
            Why Outfit AI?
          </h2>
          <p className="text-base-content/70 mx-auto mb-16 max-w-2xl text-center text-xl">
            Revolutionary AI technology meets fashion-forward thinking
          </p>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center text-center">
                <Sparkles className="text-primary mb-4 h-12 w-12" />
                <h3 className="card-title text-2xl">AI-Powered</h3>
                <p className="text-base-content/70">
                  Advanced AI generates realistic outfit visualizations instantly
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center text-center">
                <Zap className="text-secondary mb-4 h-12 w-12" />
                <h3 className="card-title text-2xl">Instant Results</h3>
                <p className="text-base-content/70">
                  See your new outfit in seconds, not days
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center text-center">
                <Shield className="text-accent mb-4 h-12 w-12" />
                <h3 className="card-title text-2xl">Risk-Free</h3>
                <p className="text-base-content/70">
                  Eliminate buyer's remorse before purchasing
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl">
              <div className="card-body items-center text-center">
                <TrendingUp className="text-primary mb-4 h-12 w-12" />
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
      <section className="bg-base-200 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-base-content mb-16 text-center text-5xl font-black md:text-6xl">
            How It Works
          </h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-primary text-primary-content mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black">
                1
              </div>
              <h3 className="mb-4 text-2xl font-bold">Upload Your Style</h3>
              <p className="text-base-content/70">
                Your modal, extra items, fit-level, and your description.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-secondary text-secondary-content mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black">
                2
              </div>
              <h3 className="mb-4 text-2xl font-bold">AI Generates</h3>
              <p className="text-base-content/70">
                Our advanced AI creates a realistic visualization of your new outfit
              </p>
            </div>

            <div className="text-center">
              <div className="bg-accent text-accent-content mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black">
                3
              </div>
              <h3 className="mb-4 text-2xl font-bold">Shop Confident</h3>
              <p className="text-base-content/70">
                Make informed decisions and buy only what you love
              </p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 mx-[2vw] mt-5 rounded-xl p-2">
          <img
            src={`/assets/landingPage/demo/${theme === 'dark' ? 'largeScreenImage' : 'largeScreenImage-light'}.webp`}
            alt="How it works"
            loading="eager"
            className="mx-auto hidden md:block"
          />
          <img
            src={`/assets/landingPage/demo/${theme === 'dark' ? 'mobilescreen' : 'mobilescreen-light'}.webp`}
            alt="How it works"
            loading="eager"
            className="mx-auto block md:hidden"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary/10 to-secondary/10 bg-gradient-to-br px-4 py-24">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-base-content mb-6 text-5xl font-black md:text-6xl">
            Ready to Transform Your Wardrobe?
          </h2>
          <p className="text-base-content/70 mx-auto mb-8 max-w-2xl text-xl">
            Join thousands of fashion-forward shoppers making smarter clothing decisions
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link to="/pricing" className="btn btn-primary btn-lg px-8 text-lg">
              View Pricing
            </Link>
            <Link to="/about" className="btn btn-outline btn-lg px-8 text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
