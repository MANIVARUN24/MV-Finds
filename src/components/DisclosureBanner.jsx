import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

export default function DisclosureBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-sand-100/90 border-b border-sand-200/80 px-4 py-2 text-xs text-charcoal-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-semibold text-charcoal-900">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            Curator Note:
          </span>
          <span>
            MV Finds is an independent discovery platform. Demonstration catalog active.
          </span>
          <Link
            to="/affiliate-disclosure"
            className="underline underline-offset-2 hover:text-charcoal-950 font-medium transition-colors"
          >
            Affiliate Transparency &amp; Disclosure
          </Link>
        </div>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss banner"
          className="text-charcoal-400 hover:text-charcoal-800 transition-colors p-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
