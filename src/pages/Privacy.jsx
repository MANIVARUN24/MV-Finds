import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';

export default function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read the privacy practices and data policies of MV Finds."
        canonicalPath="/privacy"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

        <header className="pt-6 pb-8 border-b border-sand-200">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
            Legal &amp; Transparency
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal-500 mt-2">
            Last updated: October 2025
          </p>
        </header>

        <div className="prose prose-neutral max-w-none pt-8 space-y-6 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              1. Introduction
            </h2>
            <p>
              MV Finds (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates the website located at{' '}
              <span className="font-mono text-xs">mvfinds.in</span>. We respect your personal privacy and are committed to maintaining transparent practices regarding information handling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              2. Information We Collect
            </h2>
            <p>
              We collect minimal information necessary to deliver and improve your discovery experience:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
              <li>
                <strong>Voluntary Submissions:</strong> If you submit an email through our newsletter form or contact us via our contact form or direct email, we collect your name and email address to respond.
              </li>
              <li>
                <strong>Technical &amp; Log Data:</strong> Like standard web hosts, our server infrastructure records basic access logs (such as IP address, browser user-agent, operating system, and timestamp) for security and debugging.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              3. Analytics &amp; Cookies
            </h2>
            <p>
              MV Finds does not deploy aggressive cross-site ad tracking or invasive user fingerprinting. If performance metrics or privacy-focused analytics (such as Cloudflare Web Analytics or Plausible) are enabled in the future, they operate strictly without personal identification cookies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              4. External Retailer &amp; Affiliate Links
            </h2>
            <p>
              Our website contains links to third-party merchant platforms and retailer websites (e.g. Amazon, independent brand shops). When you click an external link, you leave MV Finds and are subject to the respective merchant&apos;s privacy policies and cookie practices. We encourage you to review their terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              5. Your Rights
            </h2>
            <p>
              You have the right to request deletion of any contact email you have submitted to us. To unsubscribe from our newsletter, simply use the unsubscribe link provided in any email dispatch or contact us directly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900">
              6. Contact Information
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please email us at{' '}
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
