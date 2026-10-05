import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | submitted

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('submitting');
    setTimeout(() => {
      setStatus('submitted');
      setEmail('');
    }, 600);
  };

  return (
    <footer className="bg-sand-100/70 border-t border-sand-200 pt-16 pb-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-sand-200">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-sans font-bold text-xl tracking-[0.18em] text-charcoal-900 uppercase">
                MV FINDS
              </span>
            </Link>
            <p className="text-charcoal-600 text-sm max-w-sm leading-relaxed">
              Curated finds for everyday life. A deliberate product discovery space built around simple, useful, and aesthetic items worth having.
            </p>
            <div className="pt-2">
              <a
                href="https://www.pinterest.com/themvfinds/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-charcoal-700 hover:text-charcoal-950 py-1.5 px-3 rounded-full bg-sand-200/80 hover:bg-sand-300/80 transition-colors"
              >
                <span>Follow MV Finds on Pinterest</span>
                <ExternalLink className="w-3 h-3 text-charcoal-500" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-charcoal-900 mb-4">
              Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/home-finds" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Home Finds
                </Link>
              </li>
              <li>
                <Link to="/style-finds" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Style Finds
                </Link>
              </li>
              <li>
                <Link to="/tech-finds" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Tech Finds
                </Link>
              </li>
              <li>
                <Link to="/study-desk-finds" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Study &amp; Desk Finds
                </Link>
              </li>
              <li>
                <Link to="/gift-ideas" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Gift Ideas
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-charcoal-900 font-medium hover:underline inline-flex items-center gap-1">
                  <span>Browse All</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Editorial */}
          <div>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-charcoal-900 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  About MV Finds
                </Link>
              </li>
              <li>
                <Link to="/articles" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Editorial Articles
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-charcoal-600 hover:text-charcoal-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li className="pt-2">
                <span className="block font-semibold text-xs tracking-wider uppercase text-charcoal-900 mb-2">
                  Legal
                </span>
                <div className="space-y-2 text-xs">
                  <Link to="/privacy" className="block text-charcoal-500 hover:text-charcoal-800 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="block text-charcoal-500 hover:text-charcoal-800 transition-colors">
                    Terms &amp; Conditions
                  </Link>
                  <Link to="/affiliate-disclosure" className="block text-charcoal-500 hover:text-charcoal-800 transition-colors">
                    Affiliate Disclosure
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Form */}
          <div>
            <h3 className="font-semibold text-xs tracking-wider uppercase text-charcoal-900 mb-2">
              Stay in Touch
            </h3>
            <p className="text-xs text-charcoal-600 mb-3 leading-relaxed">
              Get occasional finds worth knowing about. No spam, ever.
            </p>

            {status === 'submitted' ? (
              <div className="bg-sage-100 border border-sage-200 text-sage-600 p-3 rounded-xl text-xs flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-sage-500 mt-0.5" />
                <div>
                  <p className="font-medium text-charcoal-900">Thank you for subscribing!</p>
                  <p className="text-[11px] text-charcoal-600 mt-0.5">
                    (Frontend demo ready. Hook to your newsletter API endpoint in .env)
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-sand-300 text-charcoal-900 placeholder:text-charcoal-400 focus:outline-none focus:border-terracotta-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full text-xs font-semibold py-2 px-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{status === 'submitting' ? 'Subscribing...' : 'Subscribe'}</span>
                </button>
                <p className="text-[10px] text-charcoal-400 leading-tight">
                  Ready for Mailchimp / ConvertKit / Buttondown.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} MV Finds. All rights reserved.</p>
          <p className="text-center sm:text-right max-w-xl text-[11px] text-charcoal-400">
            MV Finds is an independent discovery platform. We curate products we genuinely appreciate. Demonstration catalog active until official affiliate enrollment.
          </p>
        </div>
      </div>
    </footer>
  );
}
