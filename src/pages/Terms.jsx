import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms &amp; Conditions"
        description="Terms of service and usage guidelines for MV Finds discovery platform."
        canonicalPath="/terms"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />

        <header className="pt-6 pb-8 border-b border-sand-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
            Legal &amp; Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
            Terms of Service
          </h1>
          <p className="text-xs text-charcoal-500 mt-2">
            Last updated: October 2025
          </p>
        </header>

        <div className="prose prose-neutral max-w-none pt-8 space-y-6 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              1. Discovery Service Only — Not a Merchant
            </h2>
            <p>
              MV Finds is an editorial product recommendation and discovery publication. <strong>MV Finds does not sell, manufacture, inventory, pack, ship, or process payments for any products listed on this website.</strong>
            </p>
            <p>
              When you decide to purchase a product discovered through MV Finds, your transaction occurs entirely on the external third-party merchant&apos;s website (such as Amazon or independent brand retailers). All customer service questions, warranty inquiries, returns, and delivery issues must be directed to that merchant.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              2. Product Information, Pricing &amp; Availability
            </h2>
            <p>
              We strive to ensure product descriptions, indicative pricing, and specifications are accurate at the time of publication. However, retailer prices fluctuate frequently and product availability changes without notice. The price and availability displayed on the merchant&apos;s site at the moment of checkout always supersede any information listed on MV Finds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              3. Limitation of Liability
            </h2>
            <p>
              MV Finds provides all content on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis for informational and editorial discovery purposes. In no event shall MV Finds or its operators be held liable for any damages, losses, or issues arising from purchases made on third-party merchant platforms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              4. Intellectual Property
            </h2>
            <p>
              All original written editorial content, curation summaries, articles, guides, and branding elements on MV Finds are protected by copyright. Product names and trademarks referenced remain the property of their respective owners.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              5. Questions
            </h2>
            <p>
              Please address any inquiries regarding these terms to{' '}
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
