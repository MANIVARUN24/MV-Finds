import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag, BookOpen, Package } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { ARTICLES } from '../data/articles';
import { CATEGORIES } from '../data/categories';

export default function SearchBar({ isOpen, onClose }) {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQuery = query.trim().toLowerCase();
  const [apiProducts, setApiProducts] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!cleanQuery) {
      setApiProducts(null);
      setSearching(false);
      return;
    }

    let isCurrent = true;
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await api.searchProducts(cleanQuery);
        if (isCurrent && Array.isArray(results)) {
          setApiProducts(results.slice(0, 6));
        }
      } catch {
        if (isCurrent) setApiProducts(null);
      } finally {
        if (isCurrent) setSearching(false);
      }
    }, 200);

    return () => {
      isCurrent = false;
      clearTimeout(timer);
    };
  }, [cleanQuery]);

  // Search filter
  const matchedCategories = cleanQuery
    ? CATEGORIES.filter(c =>
        c.name.toLowerCase().includes(cleanQuery) ||
        c.shortDescription.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedProducts = cleanQuery
    ? (apiProducts !== null
        ? apiProducts
        : products.filter(p => {
            const desc = (p.description || p.shortDescription || '').toLowerCase();
            return (
              p.name.toLowerCase().includes(cleanQuery) ||
              p.category.toLowerCase().includes(cleanQuery) ||
              desc.includes(cleanQuery)
            );
          }).slice(0, 6))
    : [];

  const matchedArticles = cleanQuery
    ? ARTICLES.filter(a =>
        a.title.toLowerCase().includes(cleanQuery) ||
        a.excerpt.toLowerCase().includes(cleanQuery) ||
        a.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 4)
    : [];

  const hasResults =
    matchedCategories.length > 0 ||
    matchedProducts.length > 0 ||
    matchedArticles.length > 0;

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Search finds"
    >
      <div
        className="bg-cream-50 rounded-2xl shadow-soft-lg w-full max-w-2xl border border-sand-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative border-b border-sand-200 p-4 sm:p-5 flex items-center gap-3">
          <Search className="w-5 h-5 text-charcoal-400 shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search finds, categories, articles..."
            className="w-full bg-transparent text-charcoal-900 placeholder:text-charcoal-400 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-charcoal-400 hover:text-charcoal-700 p-1"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-medium px-2 py-1 rounded bg-sand-200 text-charcoal-700 hover:bg-sand-300 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          {!cleanQuery && (
            <div className="py-8 text-center text-charcoal-500">
              <p className="text-sm font-medium">Quick suggestions to explore:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Desk Lamp', 'Laptop Stand', 'Bedside', 'Walnut Coasters', 'USB-C Hub', 'Study'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-full bg-sand-100 hover:bg-sand-200 text-charcoal-800 transition-colors border border-sand-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {cleanQuery && !hasResults && (
            <div className="py-12 text-center">
              <p className="text-charcoal-800 font-medium text-base mb-1">
                No finds yet. Try another search.
              </p>
              <p className="text-xs text-charcoal-500">
                Try searching for broader keywords like &quot;desk&quot;, &quot;lamp&quot;, &quot;wallet&quot;, or &quot;cable&quot;.
              </p>
            </div>
          )}

          {/* Categories matches */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-2.5">
                <Tag className="w-3.5 h-3.5" />
                <span>Categories</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchedCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleSelect(cat.route)}
                    className="flex items-center justify-between p-3 rounded-xl bg-white hover:bg-sand-100 border border-sand-200/80 text-left transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-sm text-charcoal-900 group-hover:text-terracotta-600 transition-colors">
                        {cat.name}
                      </div>
                      <div className="text-xs text-charcoal-500 line-clamp-1">
                        {cat.shortDescription}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product matches */}
          {matchedProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-2.5">
                <Package className="w-3.5 h-3.5" />
                <span>Products ({matchedProducts.length})</span>
              </div>
              <div className="space-y-2">
                {matchedProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => handleSelect(`/product/${product.slug}`)}
                    className="w-full flex items-center gap-3.5 p-2.5 rounded-xl bg-white hover:bg-sand-100 border border-sand-200/80 text-left transition-colors group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                      className="w-12 h-12 rounded-lg object-cover bg-sand-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-semibold text-charcoal-500 tracking-wider">
                        {product.category}
                      </span>
                      <div className="font-medium text-sm text-charcoal-900 truncate group-hover:text-terracotta-600 transition-colors">
                        {product.name}
                      </div>
                      <p className="text-xs text-charcoal-500 truncate">
                        {product.description || product.shortDescription || ''}
                      </p>
                    </div>
                    {product.price && (
                      <span className="text-xs font-medium text-charcoal-800 shrink-0 px-2 py-1 bg-sand-100 rounded-md">
                        {product.price}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Article matches */}
          {matchedArticles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-400 mb-2.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Articles ({matchedArticles.length})</span>
              </div>
              <div className="space-y-2">
                {matchedArticles.map(article => (
                  <button
                    key={article.id}
                    onClick={() => handleSelect(`/articles/${article.slug}`)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-white hover:bg-sand-100 border border-sand-200/80 text-left transition-colors group"
                  >
                    <div className="pr-2">
                      <div className="font-medium text-sm text-charcoal-900 group-hover:text-terracotta-600 transition-colors line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-xs text-charcoal-500 flex items-center gap-2 mt-0.5">
                        <span>{article.category}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-sand-100/70 border-t border-sand-200 px-4 py-2.5 text-xs text-charcoal-500 flex items-center justify-between">
          <span>Search finds across MV Finds</span>
          <span className="text-[11px]">Instant client-side index</span>
        </div>
      </div>
    </div>
  );
}
