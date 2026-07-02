import { Link } from 'react-router';
import Seo from '../../components/Seo';

const Pricing = () => {
  const plans = [
    {
      name: 'Outfit AI Free Plan',
      price: '$0',
      period: 'Month',
      description: 'For trying Outfit AI without commitment.',
      billingNote: 'Only billed when you upgrade',
      creditSummary: 'Free — 200 credits total',
      features: [
        'Generate up to 10 outfit images (no watermarks)',
        'Core controls - season, formality, accessories',
        'Save to your Wardrobe',
        'Email support within 48 hours',
      ],
    },
    {
      name: 'Outfit AI Basic Plan',
      price: '$6.99',
      period: 'Month',
      description:
        'For weekly outfit planners and casual creators. Try before you buy, instantly.',
      billingNote: 'Only billed monthly',
      creditSummary: 'Basic — 2000 credits / month',
      features: [
        '100 instant outfit images each month (no watermarks)',
        'Core controls - season, formality, accessories, style intensity',
        'Save to your Wardrobe and re-generate variations',
        'Email support',
      ],
      popular: true,
    },
    {
      name: 'Outfit AI Pro Plan',
      price: '$12.99',
      period: 'Month',
      description:
        'For power shoppers, creators, and style explorers. Plan a whole season in hours.',
      billingNote: 'Only billed monthly',
      creditSummary: 'Pro — 5000 credits / month',
      features: [
        '250 instant outfit images each month (no watermarks)',
        'All Basic features',
        'Faster path to the right look with a high monthly allowance',
        'Priority email support',
        'Early access to new styles and tweaks as we ship them',
      ],
    },
  ];

  return (
    <div className="bg-base-100 min-h-screen overflow-auto">
      <Seo
        title="Pricing — Outfit AI Plans"
        description="Simple, transparent pricing for AI-powered outfit visualization. Start free, upgrade when ready."
        keywords={['pricing', 'plans', 'AI fashion', 'outfit generator']}
        url="/pricing"
        siteBase="https://o-ai.co.uk"
      />
      {/* Header */}
      <section className="from-primary/10 to-secondary/10 bg-gradient-to-br px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-base-content mb-6 text-5xl font-black md:text-7xl">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base-content/70 mx-auto max-w-2xl text-xl">
            Choose the perfect plan for your style needs. No hidden fees, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="px-10 py-16 md:px-20">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border-base-200 bg-base-100 shadow-base-200/40 flex flex-col gap-6 rounded-3xl border p-8 shadow-lg"
            >
              {plan.popular && (
                <span className="badge badge-primary badge-outline w-max">
                  Most popular
                </span>
              )}
              <div className="space-y-3">
                <h3 className="text-base-content text-2xl font-bold">{plan.name}</h3>
                <p className="text-base-content/70">{plan.description}</p>
              </div>
              <div className="text-base-content flex items-end gap-2">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="pb-2 text-lg font-semibold">{plan.period}</span>
              </div>
              {plan.billingNote && (
                <p className="text-primary text-sm font-medium tracking-wide uppercase">
                  {plan.billingNote}
                </p>
              )}
              <p className="text-base-content/80 text-base font-semibold">
                {plan.creditSummary}
              </p>
              <ul className="text-base-content/80 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="bg-primary mt-1 inline-block h-2 w-2 rounded-full"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/login" className="btn btn-primary btn-lg mt-auto w-full">
                Start with 200 free credits
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-base-200 px-4 py-16">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-base-content mb-12 text-center text-4xl font-black md:text-5xl">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse-plus bg-base-100 collapse">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-bold">
                Can I switch plans anytime?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  Yes! You can upgrade, downgrade, or cancel your plan at any time.
                  Changes take effect at the start of your next billing cycle.
                </p>
              </div>
            </div>

            <div className="collapse-plus bg-base-100 collapse">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                Is there a free trial?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  The Starter plan is completely free forever. For paid plans, we offer a
                  7-day free trial with full access to all features.
                </p>
              </div>
            </div>

            <div className="collapse-plus bg-base-100 collapse">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                What payment methods do you accept?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  We accept all major credit cards (Visa, MasterCard, American Express),
                  PayPal, and various regional payment methods.
                </p>
              </div>
            </div>

            <div className="collapse-plus bg-base-100 collapse">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                Do unused generations roll over?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  For the Style Pro plan, unused generations do not roll over. The Fashion
                  Elite plan includes unlimited generations, so there's nothing to roll
                  over!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-base-content mb-6 text-4xl font-black md:text-5xl">
            Still Have Questions?
          </h2>
          <p className="text-base-content/70 mb-8 text-xl">
            Our team is here to help you choose the perfect plan
          </p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
