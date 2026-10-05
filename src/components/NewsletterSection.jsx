import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="my-16 sm:my-20">
      <div className="bg-sand-100 rounded-3xl border border-sand-200/90 p-8 sm:p-12 lg:p-16 max-w-5xl mx-auto shadow-soft text-center relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-sand-200/40 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-sand-200/40 pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sand-200 text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            <Mail className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Occasional Dispatches</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
            Curated finds worth knowing about.
          </h2>

          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            We send a short, thoughtful digest featuring new physical upgrades for your desk, space, and daily carry. No sales spam, no manufactured urgency.
          </p>

          {submitted ? (
            <div className="p-4 bg-sage-50 border border-sage-200 rounded-2xl text-sage-600 text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
              <CheckCircle2 className="w-5 h-5 text-sage-500 shrink-0" />
              <span>Thank you! You are on our dispatch list. (Ready for API integration)</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="pt-2 flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white border border-sand-300 text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-terracotta-500 shadow-xs"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-medium text-sm transition-all shadow-soft inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-charcoal-400 pt-1">
            Free forever. Unsubscribe anytime with a single click.
          </p>
        </div>
      </div>
    </section>
  );
}
