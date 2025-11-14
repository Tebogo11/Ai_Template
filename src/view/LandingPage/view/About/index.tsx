import { ShoppingBag, Smartphone, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const About = () => {
  return (
    <div className="min-h-screen bg-base-100">
      <Seo
        title="About Outfit AI — Virtual Try-On Powered by AI"
        description="Outfit AI brings 'try before you buy' to online shopping with photorealistic outfit generation tailored to your style."
        keywords={["about", "AI fashion", "virtual try-on", "outfit generator"]}
        url="/about"
        siteBase="https://o-ai.co.uk"
      />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-base-content">
            Revolutionizing Digital Fashion
          </h1>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto">
            With the explosive growth of digital shopping, we're bringing "try
            before you buy" into the AI era
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
                The Digital Shopping Dilemma
              </h2>
              <p className="text-lg text-base-content/70 mb-4">
                E-commerce has transformed how we shop, but it comes with a
                fundamental challenge: you can't try before you buy.
              </p>
              <p className="text-lg text-base-content/70 mb-4">
                Return rates in online fashion retail have soared to over 30%,
                costing retailers billions and creating environmental waste.
                Customers struggle with fit, style, and visualizing how clothes
                will actually look on them.
              </p>
              <p className="text-lg text-base-content/70">
                Traditional "try before you buy" programs require shipping,
                waiting, and complex logistics. There had to be a better way.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="stat bg-base-200 rounded-lg shadow-lg">
                <div className="stat-figure text-primary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="stat-title">Return Rate</div>
                <div className="stat-value text-primary">30%+</div>
                <div className="stat-desc">Online fashion purchases</div>
              </div>

              <div className="stat bg-base-200 rounded-lg shadow-lg">
                <div className="stat-figure text-secondary">
                  <Smartphone className="w-8 h-8" />
                </div>
                <div className="stat-title">Digital Shoppers</div>
                <div className="stat-value text-secondary">2.7B</div>
                <div className="stat-desc">Worldwide in 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-16 px-4 bg-base-200">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
              Enter Outfit AI
            </h2>
            <p className="text-xl text-base-content/70 max-w-3xl mx-auto">
              We've combined cutting-edge AI with fashion expertise to create
              the ultimate virtual fitting room experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <Sparkles className="w-12 h-12 text-primary mb-4" />
                <h3 className="card-title text-2xl">
                  AI-Powered Visualization
                </h3>
                <p className="text-base-content/70">
                  Advanced generative AI creates photorealistic images of you in
                  different outfits, styles, and combinations
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <TrendingUp className="w-12 h-12 text-secondary mb-4" />
                <h3 className="card-title text-2xl">Instant Results</h3>
                <p className="text-base-content/70">
                  No more waiting days for shipping or dealing with returns. See
                  your outfit in seconds and make confident decisions
                </p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-lg">
              <div className="card-body items-center text-center">
                <ShoppingBag className="w-12 h-12 text-accent mb-4" />
                <h3 className="card-title text-2xl">Smarter Shopping</h3>
                <p className="text-base-content/70">
                  Reduce returns, save money, and build a wardrobe you'll
                  actually wear. Better for you and the planet
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-base-content">
            Powered by Advanced AI
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="badge badge-primary badge-lg">1</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Style Input</h4>
                    <p className="text-base-content/70">
                      Your modal, extra items, fit-level, and your description.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="badge badge-secondary badge-lg">2</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">AI Processing</h4>
                    <p className="text-base-content/70">
                      Our Gemini Flash-powered AI analyzes your inputs and
                      generates realistic outfit visualizations
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="badge badge-accent badge-lg">3</div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Instant Preview</h4>
                    <p className="text-base-content/70">
                      View photorealistic images of your new outfit and make
                      informed purchasing decisions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-base-200 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Key Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Customizable style with tags</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Find the right fit</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Chase the latest trends, without your wallet</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Accessory visualization and matching</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Multiple style variations from single input</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>High-quality, photorealistic output</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-gradient-to-br from-secondary/10 to-primary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
            Our Mission
          </h2>
          <p className="text-xl text-base-content/70 mb-8 max-w-3xl mx-auto">
            To revolutionize online shopping by making "try before you buy"
            instant, accessible, and sustainable through AI technology. We
            believe everyone deserves confidence in their fashion choices, and
            the planet deserves fewer returns.
          </p>
          <div className="stats stats-vertical hidden md:stats-horizontal shadow-lg bg-base-100">
            <div className="stat">
              <div className="stat-title">Carbon Saved</div>
              <div className="stat-value text-success">12K kg</div>
              <div className="stat-desc">From reduced returns</div>
            </div>

            <div className="stat">
              <div className="stat-title">Happy Customers</div>
              <div className="stat-value text-primary">50K+</div>
              <div className="stat-desc">And growing daily</div>
            </div>

            <div className="stat">
              <div className="stat-title">Outfits Generated</div>
              <div className="stat-value text-secondary">1M+</div>
              <div className="stat-desc">Visualizations created</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
            Join the Fashion Revolution
          </h2>
          <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Experience the future of online shopping with AI-powered outfit
            visualization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/pricing" className="btn btn-primary btn-lg">
              Get Started Today
            </Link>
            <Link to="/" className="btn btn-outline btn-lg">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
