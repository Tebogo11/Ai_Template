import { useMutation } from 'convex/react';
import { useState } from 'react';
import { api } from '../../../../../convex/_generated/api';
import Seo from '../../components/Seo';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const contactUsMessage = useMutation(api.landingPageApi.contactUs.contactUsMessage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setHasSubmitted(false);
    try {
      await contactUsMessage(formData);
      setHasSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to send contact message', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-base-100 min-h-screen">
      <Seo
        title="Contact — Outfit AI"
        description="Get in touch with the Outfit AI team for questions about pricing, features, and support."
        keywords={['contact', 'support', 'AI fashion']}
        url="/contact"
        siteBase="https://o-ai.co.uk"
      />
      {/* Header */}
      <section className="from-primary/10 to-secondary/10 bg-gradient-to-br px-4 pt-24 pb-12">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-base-content mb-6 text-5xl font-black md:text-7xl">
            Get in Touch
          </h1>
          <p className="text-base-content/70 mx-auto max-w-2xl text-xl">
            Have questions about Outfit AI? We're here to help you find the perfect style
            solution.
          </p>
        </div>
      </section>

      {/* Contact Form & Image */}
      <section className="px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="card bg-base-200 shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-base-content mb-6 text-3xl">
                  Send Us a Message
                </h2>

                {hasSubmitted && (
                  <div className="alert alert-success">
                    <span>Thanks for reaching out. We will get back to you soon.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input input-bordered w-full"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="input input-bordered w-full"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Subject</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className="input input-bordered w-full"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Message</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more..."
                      className="textarea textarea-bordered h-32 w-full"
                      disabled={isLoading}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary btn-block ${isLoading ? 'loading' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>

            {/* Floating Image */}
            <div className="relative hidden lg:block">
              <div className="sticky top-24">
                <img
                  src="/assets/landingPage/contact-fashion.jpg"
                  alt="Fashion styling showcase"
                  className="h-auto w-full rounded-lg object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Reference */}
      <section className="bg-base-200 px-4 py-16">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-base-content mb-6 text-4xl font-black md:text-5xl">
            Need Quick Answers?
          </h2>
          <p className="text-base-content/70 mb-8 text-xl">
            Check out our pricing page for frequently asked questions
          </p>
          <a href="/pricing" className="btn btn-outline btn-lg">
            View FAQ
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
