import { PricingTable } from "@clerk/clerk-react";

import { Link } from "react-router";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for trying out Outfit AI",
      features: [
        "5 outfit generations per month",
        "Basic style options",
        "Standard quality images",
        "Email support",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Style Pro",
      price: "$19",
      period: "/month",
      description: "For fashion enthusiasts",
      features: [
        "100 outfit generations per month",
        "Advanced style customization",
        "High-quality images",
        "Priority email support",
        "Save favorite outfits",
        "Style history tracking",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Fashion Elite",
      price: "$49",
      period: "/month",
      description: "For professionals and influencers",
      features: [
        "Unlimited outfit generations",
        "Premium AI models",
        "4K quality images",
        "24/7 priority support",
        "Advanced analytics",
        "API access",
        "Commercial usage rights",
        "White-label options",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
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
        <PricingTable />
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
          <Link to="/about" className="btn btn-primary btn-lg">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
