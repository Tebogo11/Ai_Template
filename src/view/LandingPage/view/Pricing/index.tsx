import { Link } from "react-router-dom";
import Seo from "../components/Seo";

const Pricing = () => {
  const plans = [
    {
      name: "Outfit AI Free Plan",
      price: "$0",
      period: "Month",
      description: "For trying Outfit AI without commitment.",
      billingNote: "Only billed when you upgrade",
      creditSummary: "Free — 200 credits total",
      features: [
        "Generate up to 10 outfit images (no watermarks)",
        "Core controls - season, formality, accessories",
        "Save to your Wardrobe",
        "Email support within 48 hours",
      ],
    },
    {
      name: "Outfit AI Basic Plan",
      price: "$6.99",
      period: "Month",
      description:
        "For weekly outfit planners and casual creators. Try before you buy, instantly.",
      billingNote: "Only billed monthly",
      creditSummary: "Basic — 2000 credits / month",
      features: [
        "100 instant outfit images each month (no watermarks)",
        "Core controls - season, formality, accessories, style intensity",
        "Save to your Wardrobe and re-generate variations",
        "Email support",
      ],
      popular: true,
    },
    {
      name: "Outfit AI Pro Plan",
      price: "$12.99",
      period: "Month",
      description:
        "For power shoppers, creators, and style explorers. Plan a whole season in hours.",
      billingNote: "Only billed monthly",
      creditSummary: "Pro — 5000 credits / month",
      features: [
        "250 instant outfit images each month (no watermarks)",
        "All Basic features",
        "Faster path to the right look with a high monthly allowance",
        "Priority email support",
        "Early access to new styles and tweaks as we ship them",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-base-100 overflow-auto">
      <Seo
        title="Pricing — Outfit AI Plans"
        description="Simple, transparent pricing for AI-powered outfit visualization. Start free, upgrade when ready."
        keywords={["pricing", "plans", "AI fashion", "outfit generator"]}
        url="/pricing"
        siteBase="https://o-ai.co.uk"
      />
      {/* Header */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-base-content">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Choose the perfect plan for your style needs. No hidden fees, cancel
            anytime.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-10 md:px-20">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-col gap-6 rounded-3xl border border-base-200 bg-base-100 p-8 shadow-lg shadow-base-200/40"
            >
              {plan.popular && (
                <span className="badge badge-primary badge-outline w-max">
                  Most popular
                </span>
              )}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-base-content">
                  {plan.name}
                </h3>
                <p className="text-base-content/70">{plan.description}</p>
              </div>
              <div className="flex items-end gap-2 text-base-content">
                <span className="text-5xl font-black">{plan.price}</span>
                <span className="pb-2 text-lg font-semibold">
                  {plan.period}
                </span>
              </div>
              {plan.billingNote && (
                <p className="text-sm font-medium uppercase tracking-wide text-primary">
                  {plan.billingNote}
                </p>
              )}
              <p className="text-base font-semibold text-base-content/80">
                {plan.creditSummary}
              </p>
              <ul className="space-y-3 text-base-content/80">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/login"
                className="btn btn-primary btn-lg mt-auto w-full"
              >
                Start with 200 free credits
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-base-200">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-base-content">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            <div className="collapse collapse-plus bg-base-100">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-xl font-bold">
                Can I switch plans anytime?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  Yes! You can upgrade, downgrade, or cancel your plan at any
                  time. Changes take effect at the start of your next billing
                  cycle.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                Is there a free trial?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  The Starter plan is completely free forever. For paid plans,
                  we offer a 7-day free trial with full access to all features.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                What payment methods do you accept?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  We accept all major credit cards (Visa, MasterCard, American
                  Express), PayPal, and various regional payment methods.
                </p>
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-100">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-xl font-bold">
                Do unused generations roll over?
              </div>
              <div className="collapse-content">
                <p className="text-base-content/70">
                  For the Style Pro plan, unused generations do not roll over.
                  The Fashion Elite plan includes unlimited generations, so
                  there's nothing to roll over!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-base-content">
            Still Have Questions?
          </h2>
          <p className="text-xl text-base-content/70 mb-8">
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
