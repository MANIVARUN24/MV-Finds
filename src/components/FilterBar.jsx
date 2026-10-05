import React from 'react';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  selectedType,
  onTypeChange,
  availableTypes = [],
  onReset
}) {
  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSort !== 'featured' ||
    selectedType !== 'all';

  return (
    <div className="bg-white rounded-2xl border border-sand-200/90 p-4 sm:p-5 shadow-soft mb-8 space-y-4">
      {/* Category Pills (horizontal scroll on mobile) */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1 -mx-1 px-1">
        <button
          onClick={() => onCategoryChange('all')}
          className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-charcoal-900 text-cream-50 font-semibold'
              : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
          }`}
        >
          All Finds
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.slug)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat.slug
                ? 'bg-charcoal-900 text-cream-50 font-semibold'
                : 'bg-sand-100 text-charcoal-700 hover:bg-sand-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Secondary Controls: Type, Sort, and Reset */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-sand-100">
        <div className="flex flex-wrap items-center gap-3">
          {/* Subtype Filter */}
          {availableTypes.length > 0 && (
            <div className="flex items-center gap-2 text-xs">
              <label htmlFor="type-filter" className="text-charcoal-500 font-medium flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Type:</span>
              </label>
              <select
                id="type-filter"
                value={selectedType}
                onChange={(e) => onTypeChange(e.target.value)}
                className="bg-sand-100 border border-sand-200 text-charcoal-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-terracotta-500"
              >
                <option value="all">All Types</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-selector" className="text-charcoal-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </label>
            <select
              id="sort-selector"
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-sand-100 border border-sand-200 text-charcoal-800 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-terracotta-500"
            >
              <option value="featured">Featured Curations</option>
              <option value="name-asc">Name (A – Z)</option>
              <option value="name-desc">Name (Z – A)</option>
            </select>
          </div>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-charcoal-500 hover:text-charcoal-900 transition-colors py-1 px-2.5 rounded-lg hover:bg-sand-100"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
