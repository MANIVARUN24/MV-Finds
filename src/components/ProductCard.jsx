import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProductImage from './ProductImage';

export default function ProductCard({ product }) {
  if (!product) return null;

  // Resolve display price (honest: never invent fake prices)
  const priceDisplay =
    product.price && product.price.trim() ? product.price.trim() : null;

  // Retailer name if present
  const retailerName =
    product.retailer && product.retailer.trim() ? product.retailer.trim() : null;

  return (
    <article className="group bg-white rounded-2xl border border-sand-200/90 overflow-hidden shadow-soft hover:shadow-card-hover hover:border-sand-300 transition-all duration-300 flex flex-col h-full">
      {/* Product Image */}
      <Link
        to={`/product/${product.slug}`}
        className="block relative aspect-[4/3] bg-sand-100 overflow-hidden img-zoom-wrapper"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductImage src={product.image} alt={product.name} />

        <div className="absolute top-3 left-3">
          <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-cream-50/95 backdrop-blur-xs text-charcoal-700 border border-sand-200 shadow-xs">
            {product.category}
          </span>
        </div>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-charcoal-500 font-medium">
              {retailerName ? `Found on ${retailerName}` : 'Curated Find'}
            </span>
            <span className="text-xs font-semibold text-charcoal-800 bg-sand-100 px-2 py-0.5 rounded">
              {priceDisplay || 'Check retailer'}
            </span>
          </div>

          <h3 className="font-sans font-semibold text-base sm:text-lg text-charcoal-900 group-hover:text-charcoal-700 transition-colors line-clamp-1 mb-2">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-charcoal-600 line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Card CTA */}
        <div className="pt-3 border-t border-sand-100 flex items-center justify-between gap-2 mt-auto">
          <Link
            to={`/product/${product.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-900 group-hover:text-terracotta-600 transition-colors"
          >
            <span>View Find</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <span className="text-[10px] text-charcoal-400">
            {product.productUrl &&
            product.productUrl !== 'PASTE_PRODUCT_LINK_HERE' &&
            product.productUrl !== 'PASTE_REAL_RETAILER_URL_HERE' &&
            product.productUrl.trim()
              ? 'retailer link ready'
              : 'link coming soon'}
          </span>
        </div>
      </div>
    </article>
  );
}
