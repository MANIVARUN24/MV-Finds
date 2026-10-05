import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Clock } from 'lucide-react';

export default function ArticleCard({ article }) {
  if (!article) return null;

  return (
    <article className="group bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
      {/* Article Hero Image */}
      <Link
        to={`/articles/${article.slug}`}
        className="block relative aspect-[16/10] bg-sand-100 overflow-hidden img-zoom-wrapper"
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={article.heroImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-cream-50/95 backdrop-blur-xs text-charcoal-700 border border-sand-200 shadow-xs">
            {article.category}
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 text-xs text-charcoal-500 mb-2.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-charcoal-400" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
          </div>

          <h3 className="font-serif text-lg sm:text-xl text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-2 leading-snug mb-3">
            <Link to={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-3 leading-relaxed mb-4">
            {article.excerpt}
          </p>
        </div>

        <div className="pt-3 border-t border-sand-100 flex items-center justify-between text-xs font-semibold text-charcoal-900 group-hover:text-terracotta-600 transition-colors mt-auto">
          <span>Read Guide</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </article>
  );
}
