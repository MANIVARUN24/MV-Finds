import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';
import { Sparkles, Compass, Shield, Heart, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function About() {
  return (
    <>
      <SEO
        title="About MV Finds — Our Curation Story"
        description="MV Finds is an independent product discovery space built around a simple idea: finding useful things shouldn't require endless scrolling."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Breadcrumbs items={[{ label: 'About' }]} />

        {/* Header */}
        <header className="pt-6 pb-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200 text-xs font-semibold uppercase tracking-wider text-charcoal-700">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Behind The Project</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 tracking-tight leading-tight">
            About MV Finds
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-charcoal-700 leading-relaxed border-l-2 border-terracotta-500 pl-4 py-1">
            &ldquo;MV Finds is a product discovery space built around a simple idea: finding useful things shouldn&apos;t require endless scrolling.&rdquo;
          </p>
        </header>

        {/* Narrative */}
        <div className="space-y-8 text-sm sm:text-base text-charcoal-700 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl text-charcoal-900">
              The Problem with Modern Shopping
            </h2>
            <p>
              If you’ve searched for a desk lamp, a laptop stand, or a storage basket online recently, you know the drill: pages crowded with sponsored ads, suspiciously identical five-star reviews written by bots, and identical items sold under dozens of unpronounceable brand names.
            </p>
            <p>
              Instead of spending two hours digging through review sections trying to figure out if a table lamp will actually survive a year, we believe discovery should feel calm, transparent, and intentional.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-sand-200">
            <h2 className="font-serif text-2xl text-charcoal-900">
              What We Curate
            </h2>
            <p>
              MV Finds focuses strictly on five everyday domains where small physical upgrades make a genuine, measurable difference to your daily routine:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {CATEGORIES.map((cat) => (
                <div key={cat.id} className="p-4 rounded-xl bg-white border border-sand-200 shadow-xs">
                  <h3 className="font-semibold text-charcoal-900 mb-1">{cat.name}</h3>
                  <p className="text-xs text-charcoal-600">{cat.shortDescription}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 pt-4 border-t border-sand-200">
            <h2 className="font-serif text-2xl text-charcoal-900">
              Our Honest Guarantees
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal-900 block">No Fake Social Proof</strong>
                  <span className="text-xs text-charcoal-600">
                    We never claim millions of happy users, invented award badges, or fabricated 5-star ratings. We evaluate items using genuine material qualities, ergonomics, and practical feedback.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-terracotta-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal-900 block">Editorial Independence</strong>
                  <span className="text-xs text-charcoal-600">
                    We only recommend products that meet our aesthetic, durability, and utility standards. If an item has trade-offs (like a lamp requiring an E27 bulb or a bag being spot-clean only), we state it upfront in the &quot;Keep in mind&quot; section.
                  </span>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-terracotta-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-charcoal-900 block">A Discovery Guide, Not a Marketplace</strong>
                  <span className="text-xs text-charcoal-600">
                    MV Finds does not manufacture or warehouse inventory. We point you to reputable retailers where you can purchase directly, and we clearly disclose any future affiliate relationships.
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-sand-100 border border-sand-200 mt-8">
            <h3 className="font-serif text-lg font-semibold text-charcoal-900 mb-2">
              Have a suggestion or question?
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-600 mb-4">
              We love discovering thoughtful tools and minimal lifestyle pieces. Feel free to say hello.
            </p>
            <div className="flex gap-3">
              <Link
                to="/contact"
                className="px-4 py-2 rounded-xl bg-charcoal-900 text-cream-50 text-xs font-semibold hover:bg-charcoal-800 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/shop"
                className="px-4 py-2 rounded-xl bg-white border border-sand-300 text-charcoal-800 text-xs font-semibold hover:bg-sand-50 transition-colors inline-flex items-center gap-1"
              >
                <span>Browse Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
