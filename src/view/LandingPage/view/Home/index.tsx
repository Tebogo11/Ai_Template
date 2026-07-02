import { Link } from 'react-router';
import { Sparkles, Zap, Shield, TrendingUp } from 'lucide-react';
import { useAppSetting } from '@/store/useAppSetting';
import Seo from '../../components/Seo';
import { motion } from 'framer-motion';
import {
  homeImageVariants,
  heroOverlayVariants,
  heroItemVariants,
  sectionTitleVariants,
  featureGridVariants,
  featureCardVariants,
} from './animation-variants';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered',
    body: 'Advanced AI generates realistic outfit visualizations instantly',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    body: 'See your new outfit in seconds, not days',
  },
  {
    icon: Shield,
    title: 'Risk-Free',
    body: "Eliminate buyer's remorse before purchasing",
  },
  {
    icon: TrendingUp,
    title: 'Style Evolution',
    body: "Discover styles you never knew you'd love",
  },
];

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
      <section className="bg-base-100 relative h-screen w-screen overflow-hidden">
        <div className="grid h-full w-full md:grid-cols-[1fr_1.15fr_1fr]">
          {/* Her look */}
          <motion.div
            variants={homeImageVariants}
            initial={{ x: -30, opacity: 0 }}
            animate="visible"
            className="relative h-full w-full overflow-hidden"
          >
            <motion.img
              src="/assets/landingPage/hero/hero1.webp"
              alt="Woman in a tailored trench coat crossing a city plaza"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ scale: [1.02, 1.06, 1.02] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="bg-base-100/90 text-base-content absolute bottom-8 left-8 z-10 hidden rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm md:inline-block">
              Her look
            </span>
          </motion.div>

          {/* Copy gutter */}
          <div className="md:bg-base-200 absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-t from-black/75 via-black/20 to-transparent px-6 text-center md:static md:inset-auto md:z-auto md:bg-none md:px-12 md:text-left">
            <motion.div
              variants={heroOverlayVariants}
              initial="hidden"
              animate="visible"
              className="max-w-sm"
            >
              <motion.h1
                variants={heroItemVariants}
                className="md:text-base-content text-5xl leading-[0.95] font-black text-balance text-white md:text-6xl"
              >
                Try it before you buy it.
              </motion.h1>
              <motion.p
                variants={heroItemVariants}
                className="md:text-base-content/70 mt-5 text-base font-medium text-white/85 md:text-lg"
              >
                Upload a photo, add the outfit, and preview exactly how it looks — before
                you spend a cent.
              </motion.p>
              <motion.div
                variants={heroItemVariants}
                className="mt-8 flex justify-center md:justify-start"
              >
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

          {/* His look */}
          <motion.div
            variants={homeImageVariants}
            initial={{ x: 30, opacity: 0 }}
            animate="visible"
            className="relative hidden h-full w-full overflow-hidden md:block"
          >
            <motion.img
              src="/assets/landingPage/hero/hero2.webp"
              alt="Man in a camel overcoat walking past a stone doorway"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover"
              animate={{ scale: [1.03, 1.07, 1.03] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="bg-base-100/90 text-base-content absolute bottom-8 left-8 z-10 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide backdrop-blur-sm">
              His look
            </span>
          </motion.div>
        </div>

        <motion.div
          aria-hidden
          className="md:border-base-content/30 pointer-events-none absolute bottom-8 left-1/2 z-30 h-10 w-6 -translate-x-1/2 rounded-full border border-white/60"
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
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.45 }}
              variants={sectionTitleVariants}
              className="lg:col-span-2"
            >
              <h2 className="text-base-content mb-4 text-5xl font-black text-balance md:text-6xl">
                Why Outfit AI?
              </h2>
              <p className="text-base-content/70 mb-10 max-w-md text-xl">
                Revolutionary AI technology meets fashion-forward thinking
              </p>
              <p className="text-primary max-w-xs text-3xl leading-tight font-black text-balance">
                No returns. No regret. Just certainty.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={featureGridVariants}
              className="border-base-300 divide-base-300 divide-y border-t lg:col-span-3"
            >
              {features.map(({ icon: Icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={featureCardVariants}
                  className="group flex items-start gap-5 py-8"
                >
                  <Icon
                    aria-hidden
                    className="text-primary mt-1 h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                  <div>
                    <h3 className="text-base-content mb-1.5 text-xl font-bold">
                      {title}
                    </h3>
                    <p className="text-base-content/70 max-w-md">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
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
