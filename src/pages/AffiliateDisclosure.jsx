import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';
import { AFFILIATE_CONFIG } from '../utils/affiliate';
import { ShieldCheck, Info, CheckCircle2 } from 'lucide-react';

export default function AffiliateDisclosure() {
  const isApproved = AFFILIATE_CONFIG.isApprovedAssociate;

  return (
    <>
      <SEO
        title="Affiliate &amp; Compensation Disclosure"
        description="Learn how MV Finds approaches affiliate links, compensation, and editorial independence."
        canonicalPath="/affiliate-disclosure"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Breadcrumbs items={[{ label: 'Affiliate Disclosure' }]} />

        <header className="pt-6 pb-8 border-b border-sand-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Transparency First</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
            Affiliate Disclosure
          </h1>

          <p className="text-xs text-charcoal-500 mt-2">
            Last updated: October 2025
          </p>
        </header>

        {/* Current Program Status Callout */}
        <div className="my-8 p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-charcoal-800 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-charcoal-900">
            <Info className="w-4 h-4 text-amber-700" />
            <span>Current Program Participation Status</span>
          </div>
          {isApproved ? (
            <p className="text-charcoal-700 leading-relaxed">
              MV Finds actively participates in the Amazon Associates Program. As an Amazon Associate I earn from qualifying purchases.
            </p>
          ) : (
            <p className="text-charcoal-700 leading-relaxed">
              <strong>Pre-Approval Status Notice:</strong> Some product links on this website may become affiliate links in the future upon official program enrollment. MV Finds does not currently claim active Amazon Associates participation. Current catalog links serve as curated editorial previews.
            </p>
          )}
        </div>

        <div className="prose prose-neutral max-w-none space-y-6 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              How Affiliate Partnerships Work
            </h2>
            <p>
              MV Finds participates in affiliate marketing programs. If you purchase a product through certain links on this website, MV Finds may earn a small referral commission at no additional cost to you.
            </p>
            <p>
              The retailer pays this small referral fee directly out of their marketing budget. The price you pay for the product remains identical whether you use our link or navigate to the retailer independently.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              Amazon Associates Statement
            </h2>
            <p>
              When official enrollment is complete, the following statement applies:
            </p>
            <blockquote className="italic border-l-2 border-charcoal-400 pl-4 py-1 text-charcoal-800 bg-sand-100/60 rounded-r-xl">
              &ldquo;As an Amazon Associate I earn from qualifying purchases.&rdquo;
            </blockquote>
            <p className="text-xs text-charcoal-500">
              (Note: Displayed in compliance with Amazon Associates Operating Agreement requirements upon active enrollment).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              Our Editorial Integrity Pledge
            </h2>
            <p>
              Our recommendations are chosen solely by our editorial team based on design merit, practical utility, build quality, and real value.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                <span>We never accept payment to write positive product reviews.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                <span>We never fabricate customer reviews, star ratings, or sales statistics.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-sage-600 mt-0.5 shrink-0" />
                <span>We always include realistic trade-offs and limitations for items we curate.</span>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              Identifying Affiliate Links
            </h2>
            <p>
              Whenever a product link is an active affiliate link, it is clearly designated with disclosure text such as{' '}
              <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-sand-200 text-charcoal-900">(paid link)</span>{' '}
              or an explicit notice adjacent to the action button.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              Questions or Verification
            </h2>
            <p>
              If you have any questions regarding our affiliate disclosures or wish to suggest an addition, please reach out to us at{' '}
              <a href="mailto:themvfinds@gmail.com" className="font-medium text-charcoal-900 underline">
                themvfinds@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
