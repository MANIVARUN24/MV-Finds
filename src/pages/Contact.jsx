import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';
import { Mail, Send, Info, ArrowUpRight } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle | notice

  const handleSubmit = (e) => {
    e.preventDefault();
    // Honest feedback as requested
    setStatus('notice');
  };

  return (
    <>
      <SEO
        title="Contact MV Finds"
        description="Get in touch with the MV Finds curation team for feedback, suggestions, or editorial inquiries."
        canonicalPath="/contact"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Breadcrumbs items={[{ label: 'Contact' }]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-6">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
                Get In Touch
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
                Contact MV Finds
              </h1>
              <p className="text-sm text-charcoal-600 mt-2 leading-relaxed">
                Whether you have a product recommendation, noticed a broken link, or want to suggest an editorial topic, we’d love to hear from you.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-sand-200 shadow-soft space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center text-charcoal-800">
                  <Mail className="w-5 h-5 text-terracotta-500" />
                </div>
                <div>
                  <span className="text-xs font-medium text-charcoal-500 block">Direct Email</span>
                  <a
                    href="mailto:themvfinds@gmail.com"
                    className="font-medium text-sm text-charcoal-900 hover:text-terracotta-600 transition-colors"
                  >
                    themvfinds@gmail.com
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-sand-100">
                <span className="text-xs font-medium text-charcoal-500 block mb-1">
                  Social &amp; Inquiries
                </span>
                <a
                  href="https://www.pinterest.com/themvfinds/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-700 hover:text-charcoal-950 py-1.5 px-3 rounded-lg bg-sand-100 hover:bg-sand-200 transition-colors"
                >
                  <span>Pinterest @themvfinds</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-charcoal-400" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-sand-100/70 border border-sand-200 text-xs text-charcoal-600 leading-relaxed">
              We read every message and aim to respond within 2 business days.
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-sand-200 p-6 sm:p-8 shadow-soft">
              <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 mb-2">
                Send a Message
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-600 mb-6">
                Fill out the form below to share your note with our team.
              </p>

              {status === 'notice' && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-6 flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <strong className="block font-semibold mb-0.5">Frontend Form Demo</strong>
                    This web form is currently being prepared for backend dispatch. Please contact us directly by email at{' '}
                    <a href="mailto:themvfinds@gmail.com" className="font-semibold underline">
                      themvfinds@gmail.com
                    </a>.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-charcoal-700 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maya Sharma"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-sand-50 border border-sand-300 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-charcoal-700 mb-1">
                    Your Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. maya@example.com"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-sand-50 border border-sand-300 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-terracotta-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-charcoal-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what's on your mind or share a product find..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-sand-50 border border-sand-300 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-terracotta-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-sm transition-all shadow-soft inline-flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
