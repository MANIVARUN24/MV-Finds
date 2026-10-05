import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import ArticleCard from '../components/ArticleCard';
import SEO from '../utils/seo';
import { getArticleBySlug, ARTICLES } from '../data/articles';
import { getProductBySlug } from '../data/products';
import { CATEGORIES } from '../data/categories';
import NotFound from './NotFound';
import { Clock, Calendar, Share2, Copy, Check, ArrowRight, ExternalLink, Bookmark } from 'lucide-react';

export default function ArticleDetail() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!article) {
    return <NotFound />;
  }

  // Load recommended products
  const recommendedProducts = (article.recommendedProductSlugs || [])
    .map((s) => getProductBySlug(s))
    .filter(Boolean);

  // Load related articles
  const relatedArticles = (article.relatedArticleSlugs || [])
    .map((s) => getArticleBySlug(s))
    .filter(Boolean);

  // Fallback related if not specified
  const finalRelated =
    relatedArticles.length > 0
      ? relatedArticles
      : ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://mvfinds.in/articles/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(article.heroImage)}&description=${encodeURIComponent(article.title)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(currentUrl)}`;

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [article.heroImage],
    datePublished: '2025-10-15',
    dateModified: '2025-10-15',
    author: {
      '@type': 'Organization',
      name: 'MV Finds Editorial Team',
      url: 'https://mvfinds.in'
    },
    publisher: {
      '@type': 'Organization',
      name: 'MV Finds',
      url: 'https://mvfinds.in'
    },
    description: article.excerpt
  };

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonicalPath={`/articles/${article.slug}`}
        ogType="article"
        ogImage={article.heroImage}
        schema={articleSchema}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Articles', path: '/articles' },
            { label: article.category, path: `/${article.categorySlug}` },
            { label: article.title }
          ]}
        />

        {/* Article Header */}
        <header className="pt-6 pb-8 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-sand-200 text-charcoal-800">
              {article.category}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal-900 tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-charcoal-500 border-b border-sand-200 pb-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-charcoal-400" />
                {article.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-charcoal-400" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>By MV Finds Editorial</span>
            </div>

            {/* Social Share Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={pinterestShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Pin on Pinterest"
                className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-charcoal-700 transition-colors flex items-center gap-1 text-xs px-2.5"
              >
                <Bookmark className="w-3.5 h-3.5 text-red-600" />
                <span>Save Pin</span>
              </a>

              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Share on X"
                className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-charcoal-700 transition-colors text-xs px-2.5"
              >
                Share
              </a>

              <button
                onClick={handleCopyLink}
                title="Copy article link"
                className="p-1.5 rounded-lg bg-sand-100 hover:bg-sand-200 text-charcoal-700 transition-colors flex items-center gap-1 text-xs px-2.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Link'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden bg-sand-200 mb-10 shadow-soft">
          <img
            src={article.heroImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Lead Excerpt */}
        <div className="text-base sm:text-xl text-charcoal-700 font-serif italic leading-relaxed mb-8 p-6 bg-cream-100/70 rounded-2xl border-l-4 border-terracotta-500">
          &ldquo;{article.excerpt}&rdquo;
        </div>

        {/* Table of Contents */}
        {article.sections && article.sections.length > 2 && (
          <div className="bg-white rounded-2xl border border-sand-200 p-5 mb-10 shadow-soft">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-800 mb-3">
              In this guide:
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-charcoal-600">
              {article.sections.map((sec, idx) => (
                <li key={idx} className="hover:text-charcoal-900 transition-colors">
                  <a href={`#section-${idx}`} className="hover:underline">
                    {sec.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Content Body */}
        <div className="prose prose-neutral max-w-none space-y-8">
          {article.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="space-y-3 pt-2 scroll-mt-24">
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
                {section.heading}
              </h2>
              <div className="text-sm sm:text-base text-charcoal-700 leading-relaxed space-y-3 whitespace-pre-line">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Curated Products Mentioned */}
        {recommendedProducts.length > 0 && (
          <div className="mt-14 pt-10 border-t border-sand-200">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                Curated Gear
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mt-1">
                Products featured in this guide
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Pinterest Plug Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-sand-100 border border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-lg font-semibold text-charcoal-900">
              Love aesthetic desk and home inspiration?
            </h4>
            <p className="text-xs text-charcoal-600 mt-0.5">
              Follow our official Pinterest boards for weekly curated setups.
            </p>
          </div>
          <a
            href="https://www.pinterest.com/themvfinds/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-charcoal-900 text-white text-xs font-semibold hover:bg-charcoal-800 transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            <span>Follow @themvfinds</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Explore More Categories */}
        <div className="mt-16 pt-10 border-t border-sand-200">
          <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900 mb-4">
            Explore more MV Finds
          </h3>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={cat.route}
                className="px-4 py-2 rounded-xl bg-white hover:bg-sand-100 border border-sand-200 text-xs font-medium text-charcoal-800 transition-colors inline-flex items-center gap-1"
              >
                <span>{cat.name}</span>
                <ArrowRight className="w-3 h-3 text-charcoal-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        {finalRelated.length > 0 && (
          <div className="mt-16 pt-10 border-t border-sand-200">
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mb-6">
              Related Editorial Reads
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelated.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
