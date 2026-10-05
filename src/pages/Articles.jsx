import React, { useState } from 'react';
import ArticleCard from '../components/ArticleCard';
import Breadcrumbs from '../components/Breadcrumbs';
import NewsletterSection from '../components/NewsletterSection';
import SEO from '../utils/seo';
import { ARTICLES } from '../data/articles';
import { BookOpen } from 'lucide-react';

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Study & Desk', 'Home Finds', 'Tech Finds', 'Gift Ideas'];

  const filteredArticles =
    selectedCategory === 'all'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory || a.categorySlug === selectedCategory);

  return (
    <>
      <SEO
        title="Editorial Articles &amp; Buying Guides"
        description="Thoughtful buying guides, budget study desk breakdowns, and small home upgrade tips written by real curators."
        canonicalPath="/articles"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Breadcrumbs items={[{ label: 'Editorial Articles' }]} />

        {/* Page Header */}
        <div className="pt-4 pb-8 border-b border-sand-200 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand-200/70 border border-sand-300 text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-2">
            <BookOpen className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Curator Perspectives</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 tracking-tight mt-1">
            Editorial Guides &amp; Insights
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-2xl leading-relaxed">
            In-depth guides on intentional workspaces, functional bedroom upgrades, and selecting everyday essentials without marketing noise.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-charcoal-900 text-cream-50 font-semibold'
                  : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
              }`}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        <NewsletterSection />
      </div>
    </>
  );
}
