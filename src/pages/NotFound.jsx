import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../utils/seo';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <SEO
        title="404 — No Find Here"
        description="Looks like this page wandered off. Return to MV Finds."
        canonicalPath="/404"
      />

      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center space-y-5 bg-white p-8 sm:p-12 rounded-3xl border border-sand-200 shadow-soft">
          <div className="w-16 h-16 rounded-2xl bg-sand-100 flex items-center justify-center mx-auto text-charcoal-700">
            <Compass className="w-8 h-8 text-terracotta-500 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-charcoal-400">
              Error 404
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              No find here.
            </h1>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Looks like this page wandered off. The product or guide you are looking for may have moved or no longer exists.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-medium text-xs transition-colors shadow-soft"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to MV Finds</span>
            </Link>

            <Link
              to="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-medium text-xs transition-colors border border-sand-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Explore All Finds</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
