import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import ArticleCard from '../components/ArticleCard';
import NewsletterSection from '../components/NewsletterSection';
import SEO from '../utils/seo';
import { CATEGORIES } from '../data/categories';
import { useProducts } from '../context/ProductContext';
import { ARTICLES } from '../data/articles';
import { ArrowRight, ShieldCheck, HeartHandshake, Eye, Sparkles } from 'lucide-react';

export default function Home() {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();
  const recentArticles = ARTICLES.slice(0, 3);

  // Home structured data schema (WebSite & Organization)
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'MV Finds',
    url: 'https://mvfinds.in',
    description: 'Curated products for your space, your style, your setup, and everyday life.',
    publisher: {
      '@type': 'Organization',
      name: 'MV Finds',
      url: 'https://mvfinds.in'
    }
  };

  return (
    <>
      <SEO
        title="Curated Finds for Everyday Life"
        description="Discover useful, stylish and affordable finds across home, tech, study, style and gifts. No fake reviews, just thoughtful physical finds."
        canonicalPath="/"
        schema={homeSchema}
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Category Section */}
      <section id="categories" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              Browse Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
              Explore by category
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 hover:text-terracotta-600 transition-colors"
          >
            <span>View all finds</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}

          {/* Editorial Card Linking to Articles */}
          <div className="rounded-2xl border border-sand-200 bg-sand-100/70 p-6 flex flex-col justify-between sm:min-h-[340px]">
            <div>
              <div className="w-8 h-8 rounded-full bg-sand-200 flex items-center justify-center mb-4 text-charcoal-700">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-charcoal-500">
                Editorial Guides
              </span>
              <h3 className="font-serif text-2xl text-charcoal-900 mt-2 mb-3">
                Research before you buy.
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Explore in-depth setup guides, student budget breakdowns, and practical tips written by real people.
              </p>
            </div>
            <Link
              to="/articles"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-900 hover:text-terracotta-600 pt-6 transition-colors"
            >
              <span>Browse All Guides</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured / Currently Loving Section */}
      <section className="py-16 sm:py-20 bg-cream-100/60 border-y border-sand-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sand-200 text-[11px] font-semibold tracking-wider uppercase text-charcoal-700 mb-2">
                <Sparkles className="w-3 h-3 text-terracotta-500" />
                <span>Hand-Picked Picks</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
                Currently Loving
              </h2>
              <p className="text-sm sm:text-base text-charcoal-600 mt-1 max-w-xl">
                Recent discoveries our editors have tested or researched that balance aesthetics, durability, and practical utility.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 hover:text-terracotta-600 transition-colors"
            >
              <span>Explore all finds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* The MV Finds Curation Manifesto */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-sand-200 p-8 sm:p-12 lg:p-16 shadow-soft">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              Our Curation Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight">
              Why we built MV Finds
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
              Modern online shopping has become an exhausting chore of sponsored search ads, fabricated reviews, and identical dropshipped products. We created MV Finds as an antidote.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-4 rounded-2xl bg-cream-50/60 border border-sand-200/60">
              <div className="w-10 h-10 rounded-xl bg-sand-200 flex items-center justify-center text-charcoal-900">
                <Eye className="w-5 h-5 text-terracotta-500" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                Deliberate Curation
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                We don’t list thousands of random items. Every piece must solve real everyday friction, last well, and look calm in your space.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-cream-50/60 border border-sand-200/60">
              <div className="w-10 h-10 rounded-xl bg-sand-200 flex items-center justify-center text-charcoal-900">
                <ShieldCheck className="w-5 h-5 text-sage-600" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                Honest Pros &amp; Cons
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Nothing is perfect. We explicitly list product limitations, sizing caveats, and real trade-offs so you can decide with clarity.
              </p>
            </div>

            <div className="space-y-3 p-4 rounded-2xl bg-cream-50/60 border border-sand-200/60">
              <div className="w-10 h-10 rounded-xl bg-sand-200 flex items-center justify-center text-charcoal-900">
                <HeartHandshake className="w-5 h-5 text-terracotta-500" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-charcoal-900">
                Zero Fabricated Proof
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                No fake 5-star badges, no fake countdown timers, no fake customer counts. We treat our readers with the respect of a thoughtful publication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Articles Preview */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              From Our Editorial Desk
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight mt-1">
              Helpful Guides &amp; Setups
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600 mt-1 max-w-xl">
              Original advice on building clean desks, creating calm bedrooms, and choosing gear that lasts.
            </p>
          </div>
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 hover:text-terracotta-600 transition-colors"
          >
            <span>Read all articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsletterSection />
      </div>
    </>
  );
}
