import { useClerk } from '@clerk/clerk-react';

type TermsConditionsOverlayProps = {
  hasAccepted: boolean;
  onAccepted: () => void;
};

function TermsConditionsOverlay({
  hasAccepted,
  onAccepted,
}: TermsConditionsOverlayProps) {
  const { signOut } = useClerk();
  if (hasAccepted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[220] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-8">
      <div className="border-base-300 bg-base-100 mx-auto flex h-3/4 w-full max-w-5xl flex-col overflow-hidden rounded-2xl border shadow-2xl">
        <div className="border-base-300 bg-base-200/80 border-b px-6 py-5">
          <h2 className="text-base-content text-2xl font-extrabold tracking-tight">
            Outfit AI - Terms and Conditions
          </h2>
          <p className="text-base-content/70 mt-2 text-sm">Last updated: 05/07/2026</p>
        </div>

        <div className="text-base-content overflow-y-auto px-6 py-6 text-sm leading-7 md:text-base">
          <p className="mb-4">
            These Terms and Conditions ("Terms") govern your use of Outfit AI, the
            AI-powered virtual try-on service available at o-ai.co.uk and any related
            applications (the "Service"), operated by Tebogo Dube, trading as Outfit AI
            ("Outfit AI", "we", "us", "our").
          </p>
          <p className="mb-8">
            By creating an account or using the Service, you agree to these Terms. If you
            do not agree, do not use the Service.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">1. The Service</h3>
          <p className="mb-4">
            Outfit AI lets you upload photographs and images of clothing to generate
            AI-created images showing how garments may look on you ("Generated Images").
            Generated Images are illustrative visualisations only - they are not an exact
            representation of fit, size, colour, fabric behaviour, or how a garment will
            actually look in real life. You should not rely on Generated Images as the
            sole basis for a purchase decision.
          </p>
          <p className="mb-4">
            We may modify, suspend, or discontinue any part of the Service at any time.
            Where changes materially affect a paid subscription, we will give you
            reasonable notice.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">2. Eligibility and Accounts</h3>
          <p className="mb-4">
            You must be at least 18 years old to use the Service. By using the Service,
            you confirm you meet this requirement.
          </p>
          <p className="mb-4">
            You are responsible for keeping your account credentials secure and for all
            activity under your account. Notify us immediately at outfitai@proton.me if
            you suspect unauthorised use. You must provide accurate account information
            and keep it up to date.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">3. Your Content</h3>
          <p className="mb-4">
            "Your Content" means anything you upload to the Service, including photos of
            yourself and images of clothing.
          </p>
          <p className="mb-2 font-semibold">Ownership.</p>
          <p className="mb-4">
            You retain all rights to Your Content. We do not claim ownership of it.
          </p>
          <p className="mb-2 font-semibold">Licence to us.</p>
          <p className="mb-4">
            You grant us a limited, non-exclusive, worldwide, royalty-free licence to
            store, process, reproduce, and modify Your Content solely to operate, provide,
            and improve the Service - including processing your photos through our AI
            models to create Generated Images.
          </p>
          <p className="mb-2 font-semibold">Your responsibilities.</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>
              You only upload photos of yourself, or of another person who has given you
              their explicit consent.
            </li>
            <li>You will never upload photos of anyone under 18.</li>
            <li>You own or have the necessary rights to everything you upload.</li>
            <li>
              Your Content does not infringe any third party's intellectual property,
              privacy, or other rights, and does not violate any law.
            </li>
          </ul>
          <p className="mb-2 font-semibold">Photo processing.</p>
          <p className="mb-4">
            Your uploaded photos may include images of your face and body. By uploading
            them, you consent to us processing these images for the purpose of generating
            try-on visualisations. Details of how we handle your data, including retention
            and deletion, are set out in our Privacy Policy at [PRIVACY POLICY URL], which
            forms part of these Terms.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">4. Generated Images</h3>
          <p className="mb-4">
            Subject to these Terms and payment of any applicable fees, we assign to you
            all rights we hold in the Generated Images created from Your Content. You may
            use them for personal and commercial purposes.
          </p>
          <p className="mb-2">You acknowledge that:</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>
              AI-generated output is probabilistic - results may contain inaccuracies,
              artefacts, or distortions, and may not perfectly preserve your likeness or
              the garment's appearance.
            </li>
            <li>
              Similar or identical outputs may be generated for other users from similar
              inputs, and we cannot guarantee uniqueness.
            </li>
            <li>
              You are responsible for how you use Generated Images, including compliance
              with any advertising, consumer protection, or platform rules if you publish
              them.
            </li>
          </ul>
          <p className="mb-4">
            We may retain Generated Images and anonymised or aggregated data to operate
            and improve the Service, as described in our Privacy Policy.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">5. Acceptable Use</h3>
          <p className="mb-2">You must not use the Service to:</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>
              Create, upload, or generate sexual, nude, or sexually suggestive content.
            </li>
            <li>
              Create content depicting or involving anyone under 18, in any context.
            </li>
            <li>
              Generate images of another person without their explicit consent, including
              celebrities and public figures.
            </li>
            <li>
              Create content that is deceptive, defamatory, harassing, hateful, violent,
              or otherwise unlawful.
            </li>
            <li>
              Impersonate any person or misrepresent a Generated Image as an unedited
              photograph where that would be misleading.
            </li>
            <li>
              Reverse engineer, scrape, data-mine, or use automated means to access the
              Service, or attempt to extract our models, prompts, or source code.
            </li>
            <li>Circumvent usage limits, credit systems, or security measures.</li>
            <li>
              Resell, sublicense, or provide the Service to third parties as a competing
              offering.
            </li>
          </ul>
          <p className="mb-4">
            We may remove content, suspend, or terminate accounts that breach this
            section, without refund where the breach is serious.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">6. Plans, Credits and Billing</h3>
          <p className="mb-2 font-semibold">Free tier.</p>
          <p className="mb-3">
            We offer a free tier with limited usage. Free tier limits may change at any
            time.
          </p>
          <p className="mb-2 font-semibold">Subscriptions.</p>
          <p className="mb-3">
            Paid plans (e.g. Plus and Pro) are billed in advance on a recurring monthly
            basis until cancelled. Prices are displayed at checkout and include VAT where
            applicable. We may change subscription prices with at least 30 days' notice;
            changes take effect at your next billing cycle.
          </p>
          <p className="mb-2 font-semibold">Credit packs.</p>
          <p className="mb-3">
            Credits are one-off purchases, are consumed when you generate images, and [do
            not expire / expire 12 months after purchase - CHOOSE ONE]. Credits are
            non-transferable and have no cash value.
          </p>
          <p className="mb-2 font-semibold">Cancellation.</p>
          <p className="mb-3">
            You can cancel your subscription at any time via your account settings.
            Cancellation takes effect at the end of the current billing period; you keep
            access until then. We do not provide pro-rata refunds for partial billing
            periods except where required by law.
          </p>
          <p className="mb-2 font-semibold">Refunds and your statutory rights.</p>
          <p className="mb-3">
            If you are a consumer in the UK, you normally have a 14-day right to cancel a
            digital service purchase. By starting to use paid features (including
            generating images) within that period, you request immediate supply of digital
            content and acknowledge that you lose the right to cancel once generation
            begins, to the extent permitted by the Consumer Rights Act 2015 and the
            Consumer Contracts Regulations 2013. Nothing in these Terms affects your
            statutory rights, including remedies where digital content is faulty.
          </p>
          <p className="mb-2 font-semibold">Failed payments.</p>
          <p className="mb-4">
            If a payment fails, we may retry it and suspend paid features until payment
            succeeds.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">7. Intellectual Property</h3>
          <p className="mb-4">
            The Service - including our software, models, branding, design, and all
            content other than Your Content and your Generated Images - is owned by us or
            our licensors and protected by intellectual property laws. We grant you a
            limited, non-exclusive, non-transferable, revocable licence to use the Service
            for its intended purpose. No other rights are granted.
          </p>
          <p className="mb-4">
            Feedback you provide about the Service may be used by us without restriction
            or compensation.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">8. Third-Party Services</h3>
          <p className="mb-4">
            The Service relies on third-party providers (such as hosting, authentication,
            payment processing, and AI infrastructure). We are not responsible for
            third-party services, and your use of them may be subject to their own terms.
            Payments are processed by our payment provider; we do not store full card
            details.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">9. Disclaimers</h3>
          <p className="mb-4">
            The Service is provided "as is" and "as available". To the fullest extent
            permitted by law, we exclude all warranties not expressly set out in these
            Terms, including that the Service will be uninterrupted, error-free, or that
            Generated Images will meet your expectations or accurately depict fit or
            appearance.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">10. Limitation of Liability</h3>
          <p className="mb-4">
            Nothing in these Terms limits or excludes liability for death or personal
            injury caused by negligence, fraud or fraudulent misrepresentation, or any
            other liability that cannot lawfully be excluded.
          </p>
          <p className="mb-2">Subject to that, to the fullest extent permitted by law:</p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>
              We are not liable for loss of profits, loss of business, loss of data, or
              any indirect or consequential loss.
            </li>
            <li>
              We are not liable for purchase decisions you make based on Generated Images.
            </li>
            <li>
              Our total aggregate liability to you arising out of or in connection with
              the Service is limited to the greater of (a) the amounts you paid us in the
              12 months before the claim arose, or (b) GBP 50.
            </li>
          </ul>
          <p className="mb-4">
            If you are a consumer, these limitations apply only to the extent permitted by
            consumer protection law.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">11. Indemnity</h3>
          <p className="mb-4">
            You will indemnify us against claims, losses, and costs arising from Your
            Content, your breach of these Terms, or your unlawful use of the Service,
            except to the extent caused by our own breach or negligence.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">12. Suspension and Termination</h3>
          <p className="mb-4">
            You may stop using the Service and delete your account at any time. We may
            suspend or terminate your access immediately if you materially breach these
            Terms, if required by law, or if we discontinue the Service (in which case we
            will give reasonable notice and, where applicable, a pro-rata refund of
            prepaid fees for undelivered service).
          </p>
          <p className="mb-4">
            On termination, your licence to use the Service ends. Sections that by their
            nature should survive (including 4, 7, 9, 10, 11, and 14) will survive.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">13. Changes to These Terms</h3>
          <p className="mb-4">
            We may update these Terms from time to time. For material changes, we will
            notify you by email or in-app notice at least 14 days before they take effect.
            Continued use of the Service after that date constitutes acceptance. If you do
            not agree, you should stop using the Service and may cancel any subscription.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">14. General</h3>
          <p className="mb-2 font-semibold">Governing law.</p>
          <p className="mb-3">
            These Terms are governed by the laws of England and Wales. Disputes are
            subject to the exclusive jurisdiction of the courts of England and Wales,
            except that consumers may bring proceedings in their local courts where the
            law allows.
          </p>
          <p className="mb-2 font-semibold">Entire agreement.</p>
          <p className="mb-3">
            These Terms, together with the Privacy Policy, form the entire agreement
            between you and us regarding the Service.
          </p>
          <p className="mb-2 font-semibold">Severability.</p>
          <p className="mb-3">
            If any provision is found unenforceable, the rest of the Terms remain in
            effect.
          </p>
          <p className="mb-2 font-semibold">No waiver.</p>
          <p className="mb-3">Failure to enforce a provision is not a waiver of it.</p>
          <p className="mb-2 font-semibold">Assignment.</p>
          <p className="mb-4">
            You may not transfer your rights under these Terms. We may assign ours as part
            of a business transfer.
          </p>

          <h3 className="mt-6 mb-2 text-lg font-bold">15. Contact</h3>
          <p className="mb-1">Tebogo Dube, trading as Outfit AI</p>
          <p className="mb-1">[SERVICE ADDRESS]</p>
          <p className="mb-8">Email: outfitai@proton.me</p>
        </div>

        <div className="border-base-300 bg-base-200/80 border-t px-6 py-4">
          <div className="flex justify-between">
            <button
              type="button"
              className="btn btn-active min-w-40"
              onClick={() => signOut()}
            >
              Log Out
            </button>
            <button
              type="button"
              className="btn btn-primary min-w-40"
              onClick={() => onAccepted()}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsConditionsOverlay;
