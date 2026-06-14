import { Link } from 'react-router';
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { useAppSetting } from '@/store/useAppSetting';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import {
  homeImageVariants,
  heroOverlayVariants,
  heroItemVariants,
  sectionTitleVariants,
  featureGridVariants,
  featureCardVariants,
  featureTextVariants,
} from './animation-variants';

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
        <motion.div
          aria-hidden
          className="from-primary/22 pointer-events-none absolute top-[-18%] left-[-8%] z-10 h-[35vh] w-[35vh] rounded-full bg-gradient-to-br to-transparent blur-3xl"
          animate={{ x: [0, 30, -10, 0], y: [0, 22, -12, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="from-secondary/22 pointer-events-none absolute right-[-10%] bottom-[-16%] z-10 h-[36vh] w-[36vh] rounded-full bg-gradient-to-tl to-transparent blur-3xl"
          animate={{ x: [0, -24, 6, 0], y: [0, -28, 8, 0], scale: [1, 0.95, 1.06, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-2">
          {/* Left Side - Woman */}
          <motion.div
            variants={homeImageVariants}
            initial={{ x: -30, opacity: 0 }}
            animate="visible"
            className="bg-base-300 relative flex items-center justify-center"
          >
            <div className="from-primary/20 absolute inset-0 bg-gradient-to-br to-transparent"></div>
            <div className="relative z-10 px-8 text-center">
              <h2 className="text-primary/90 mb-4 text-6xl font-black md:text-8xl">
                Try
              </h2>
              <p className="text-xl font-black text-white/100">Before You Buy</p>
            </div>

            <motion.img
              src="/assets/landingPage/hero/hero2.webp"
              alt="men"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover backdrop-brightness-55"
              animate={{ scale: [1.02, 1.05, 1.02], y: [0, -10, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

          {/* Right Side - Man */}
          <motion.div
            variants={homeImageVariants}
            initial={{ x: 30, opacity: 0 }}
            animate="visible"
            className="bg-base-100 relative flex items-center justify-center"
          >
            <div className="from-secondary/20 absolute inset-0 bg-gradient-to-bl to-transparent"></div>
            <div className="relative z-10 px-8 text-center">
              <h2 className="text-primary/90 mb-4 text-6xl font-black md:text-8xl">AI</h2>
              <p className="text-xl font-black text-white/100">Powered Styling</p>
            </div>
            <motion.img
              src="/assets/landingPage/hero/hero1.webp"
              alt="Woman Hero Image"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover backdrop-brightness-55"
              animate={{ scale: [1.03, 1.06, 1.03], y: [0, -12, 0] }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>

        {/* Center Overlay */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            className="pointer-events-auto text-center"
            variants={heroOverlayVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroItemVariants}>
              <h1 className="text-primary mb-48 cursor-pointer text-7xl font-black drop-shadow-2xl md:text-9xl">
                OUTFIT
              </h1>
            </motion.div>

            <motion.p
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.9)' }}
              variants={heroItemVariants}
              className="text- mx-auto mt-[-10rem] mb-8 w-[46ch] max-w-xl px-4 text-sm font-semibold tracking-[0.16em] text-white uppercase sm:text-base"
            >
              Preview confidence before checkout with AI-powered styling
            </motion.p>

            <motion.div variants={heroItemVariants}>
              <motion.div
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <Link
                  to="/login"
                  className="btn btn-primary btn-lg px-8 text-lg shadow-lg"
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-8 left-1/2 z-20 h-10 w-6 -translate-x-1/2 rounded-full border border-white/45"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.6] }}
          transition={{ delay: 1.4, duration: 2.2 }}
        >
          <motion.div
            className="bg-primary mx-auto mt-2 h-2 w-2 rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-base-100 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
            variants={sectionTitleVariants}
            className="text-base-content mb-4 text-center text-5xl font-black md:text-6xl"
          >
            Why Outfit AI?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
            variants={sectionTitleVariants}
            className="text-base-content/70 mx-auto mb-16 max-w-2xl text-center text-xl"
          >
            Revolutionary AI technology meets fashion-forward thinking
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={featureGridVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div
              variants={featureCardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="card-body items-center text-center">
                <Sparkles className="text-primary mb-4 h-12 w-12" />
                <motion.h3 variants={featureTextVariants} className="card-title text-2xl">
                  AI-Powered
                </motion.h3>
                <motion.p variants={featureTextVariants} className="text-base-content/70">
                  Advanced AI generates realistic outfit visualizations instantly
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={featureCardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="card-body items-center text-center">
                <Zap className="text-accent mb-4 h-12 w-12" />
                <motion.h3 variants={featureTextVariants} className="card-title text-2xl">
                  Instant Results
                </motion.h3>
                <motion.p variants={featureTextVariants} className="text-base-content/70">
                  See your new outfit in seconds, not days
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={featureCardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="card-body items-center text-center">
                <Shield className="text-accent mb-4 h-12 w-12" />
                <motion.h3 variants={featureTextVariants} className="card-title text-2xl">
                  Risk-Free
                </motion.h3>
                <motion.p variants={featureTextVariants} className="text-base-content/70">
                  Eliminate buyer's remorse before purchasing
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              variants={featureCardVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="card bg-base-200 shadow-lg transition-shadow hover:shadow-xl"
            >
              <div className="card-body items-center text-center">
                <TrendingUp className="text-primary mb-4 h-12 w-12" />
                <motion.h3 variants={featureTextVariants} className="card-title text-2xl">
                  Style Evolution
                </motion.h3>
                <motion.p variants={featureTextVariants} className="text-base-content/70">
                  Discover styles you never knew you'd love
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-base-200 px-4 py-24">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-base-content mb-16 text-center text-5xl font-black md:text-6xl"
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' }}
                className="bg-primary text-primary-content mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black"
              >
                1
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.18, ease: 'easeOut' }}
                className="mb-4 text-2xl font-bold"
              >
                Upload Your Style
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.24, ease: 'easeOut' }}
                className="text-base-content/70"
              >
                Your modal, the outfits <span className="font-bold">you want to try</span>
                , and your description.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.22, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.29, ease: 'easeOut' }}
                className="bg-secondary text-accent mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black"
              >
                2
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.35, ease: 'easeOut' }}
                className="mb-4 text-2xl font-bold"
              >
                AI Generates
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.41, ease: 'easeOut' }}
                className="text-base-content/70"
              >
                Our advanced AI creates a realistic visualization of your new outfit
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, delay: 0.39, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.46, ease: 'easeOut' }}
                className="bg-accent text-accent-content mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-3xl font-black"
              >
                3
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.52, ease: 'easeOut' }}
                className="mb-4 text-2xl font-bold"
              >
                Shop Confident
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, delay: 0.58, ease: 'easeOut' }}
                className="text-base-content/70"
              >
                Make informed decisions and buy only what you love
              </motion.p>
            </motion.div>
          </div>
        </div>
        <div className="bg-base-100 mx-[2vw] mt-5 rounded-xl p-2">
          <img
            src={`/assets/landingPage/demo/${theme === 'dark' ? 'largeScreenImage' : 'largeScreenImage-light'}.png`}
            alt="How it works"
            loading="eager"
            className="mx-auto hidden md:block"
          />
          <img
            src={`/assets/landingPage/demo/${theme === 'dark' ? 'mobilescreen' : 'mobilescreen-light'}.png`}
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
