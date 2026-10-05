import React from 'react';
import ProductCard from './ProductCard';
import { PackageOpen } from 'lucide-react';

export default function ProductGrid({
  products = [],
  title,
  subtitle,
  emptyMessage = 'No finds match your current selection.'
}) {
  if (!products || products.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-sand-300 p-8 my-6">
        <PackageOpen className="w-10 h-10 text-charcoal-400 mx-auto mb-3" />
        <h4 className="text-base font-semibold text-charcoal-800 mb-1">
          {emptyMessage}
        </h4>
        <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
          Try clearing your filters or browsing another category to find something worth seeing.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || subtitle) && (
        <div className="mb-8">
          {title && (
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 tracking-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm sm:text-base text-charcoal-600 mt-1 max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
        {products.map((product) => (
          <ProductCard key={product.id || product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
