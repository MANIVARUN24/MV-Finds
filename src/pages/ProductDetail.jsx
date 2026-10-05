import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductGrid from '../components/ProductGrid';
import ProductImage from '../components/ProductImage';
import SEO from '../utils/seo';
import { useProducts } from '../context/ProductContext';
import NotFound from './NotFound';
import {
  ExternalLink,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Copy,
  CheckCheck,
  MessageCircle,
  Share2,
  Loader2
} from 'lucide-react';
import api from '../services/api';

export default function ProductDetail() {
  const { slug } = useParams();
  const { getProductBySlug, getProductsByCategory, getCategorySlug } = useProducts();
  const [product, setProduct] = useState(() => getProductBySlug(slug));
  const [loading, setLoading] = useState(!product);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadProduct() {
      try {
        const fetched = await api.getProductBySlug(slug);
        if (isMounted && fetched) {
          setProduct(fetched);
        }
      } catch {
        // Fall back to context products
        if (isMounted) {
          const cached = getProductBySlug(slug);
          if (cached) setProduct(cached);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadProduct();
    return () => {
      isMounted = false;
    };
  }, [slug, getProductBySlug]);

  if (loading && !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 flex flex-col items-center justify-center text-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta-500" />
        <p className="text-sm font-medium text-charcoal-600">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return <NotFound />;
  }

  // Related products — same category, excluding this product, up to 4
  const categorySlug = getCategorySlug(product.category);
  const relatedProducts = getProductsByCategory(categorySlug)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  // Origin and Product URL on MV Finds
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://mvfinds.in';
  const mvProductPageUrl = `${origin}/product/${product.slug}`;

  // Full image URL for social previews / Pinterest
  const fullImageUrl = product.image.startsWith('http')
    ? product.image
    : `${origin}${product.image}`;

  // Resolve whether the retailer CTA should be active
  const hasRealUrl =
    product.productUrl &&
    product.productUrl.trim() !== '' &&
    product.productUrl !== 'PASTE_PRODUCT_LINK_HERE' &&
    product.productUrl !== 'PASTE_REAL_RETAILER_URL_HERE' &&
    product.productUrl !== '#';

  // Retailer display & dynamic CTA button text
  const retailerName =
    product.retailer && product.retailer.trim() ? product.retailer.trim() : null;
  const ctaButtonLabel = retailerName
    ? `View on ${retailerName}`
    : 'View Product';

  // Price display
  const priceDisplay =
    product.price && product.price.trim() ? product.price.trim() : null;

  // Rating check (strictly no fake ratings)
  const hasValidRating =
    product.rating !== null &&
    product.rating !== undefined &&
    typeof product.rating === 'number' &&
    !isNaN(product.rating) &&
    product.rating > 0;

  // Social sharing destinations (ALWAYS pointing to the MV Finds product page)
  const pinterestShareUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
    mvProductPageUrl
  )}&media=${encodeURIComponent(fullImageUrl)}&description=${encodeURIComponent(
    `${product.name} — Curated on MV Finds: ${product.description}`
  )}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Check out ${product.name} on MV Finds: ${mvProductPageUrl}`
  )}`;

  // Handle Copy Link with inline notification (no alert)
  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(mvProductPageUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = mvProductPageUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  // SEO Product Schema (strict compliance)
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: fullImageUrl,
    category: product.category,
    ...(priceDisplay && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: priceDisplay.replace(/[^\d]/g, ''),
        availability: 'https://schema.org/InStock',
        ...(hasRealUrl && { url: product.productUrl })
      }
    })
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        canonicalPath={`/product/${product.slug}`}
        ogImage={product.image}
        schema={productSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Breadcrumbs
          items={[
            { label: 'Shop', path: '/shop' },
            { label: product.category, path: `/${categorySlug}` },
            { label: product.name }
          ]}
        />

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pt-6 pb-16 border-b border-sand-200">
          {/* Left Column: Image */}
          <div className="lg:col-span-7">
            <div className="sticky top-28 bg-white rounded-3xl border border-sand-200 p-3 sm:p-4 shadow-soft overflow-hidden">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sand-100 img-zoom-wrapper">
                <ProductImage src={product.image} alt={product.name} />
                <div className="absolute top-4 left-4">
                  <Link
                    to={`/${categorySlug}`}
                    className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full bg-cream-50/95 backdrop-blur-xs text-charcoal-800 border border-sand-200 shadow-xs hover:border-sand-400 transition-colors"
                  >
                    {product.category}
                  </Link>
                </div>
              </div>

              <div className="p-3 text-center text-xs text-charcoal-500">
                <span>Curated discovery catalog item • Editorial review</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  {retailerName ? `Found on ${retailerName}` : 'Curated Find'}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Price Section */}
              {priceDisplay ? (
                <div className="mt-3 space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-sans font-bold text-2xl text-charcoal-900">
                      {priceDisplay}
                    </span>
                    <span className="text-xs text-charcoal-500">
                      verified retail price
                    </span>
                  </div>
                  <p className="text-[11px] text-charcoal-400">
                    Prices may change. Check the retailer for the current price.
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <span className="inline-flex items-center text-xs font-medium text-charcoal-600 bg-sand-100 px-2.5 py-1 rounded-md">
                    Check retailer for current pricing
                  </span>
                </div>
              )}

              {/* Verified Rating (Only when explicitly entered as a number) */}
              {hasValidRating && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-charcoal-700">
                  <span className="text-terracotta-600 font-semibold">
                    ★ {product.rating}
                  </span>
                  <span className="text-charcoal-400">/ 5.0 (verified)</span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              {product.description}
            </p>

            {/* CTA Section */}
            <div className="p-5 rounded-2xl bg-sand-100/80 border border-sand-200/90 space-y-3">
              {hasRealUrl ? (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-sm transition-all shadow-soft hover:shadow-soft-md flex items-center justify-center gap-2 group"
                >
                  <span>{ctaButtonLabel}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <div className="w-full py-3.5 px-6 rounded-xl bg-sand-200/90 text-charcoal-500 font-semibold text-sm flex items-center justify-center gap-2 cursor-not-allowed select-none">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Retailer link coming soon</span>
                </div>
              )}

              {/* Affiliate Disclosure Area */}
              <div className="text-[11px] text-charcoal-500 text-center leading-relaxed">
                {hasRealUrl &&
                (product.productUrl.includes('tag=') ||
                  product.productUrl.includes('affiliate'))
                  ? 'MV Finds may earn a commission from qualifying purchases made through certain links, at no additional cost to you.'
                  : 'MV Finds is currently using demonstration retailer links. Affiliate links will be added after the relevant program approval.'}
              </div>
            </div>

            {/* Sharing Tools (Pinterest, WhatsApp, Copy Link) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs text-charcoal-500 mb-2.5">
                <span className="font-semibold uppercase tracking-wider text-[11px]">
                  Share this Find
                </span>
                {copied && (
                  <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200 animate-fadeIn">
                    <CheckCheck className="w-3 h-3" />
                    Link copied
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Save to Pinterest Button */}
                <a
                  href={pinterestShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Save to Pinterest"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-medium border border-sand-200 hover:border-sand-300 transition-colors shadow-xs group"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#E60023] shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0a12 12 0 0 0-4.37 23.18c-.05-.98-.1-2.48.02-3.55l.72-3.08s-.18-.37-.18-.91c0-.86.5-1.5 1.12-1.5.53 0 .78.4.78.87 0 .53-.34 1.33-.51 2.06-.14.62.32 1.13.93 1.13 1.12 0 1.98-1.18 1.98-2.88 0-1.51-1.08-2.56-2.63-2.56-1.92 0-3.05 1.44-3.05 2.93 0 .58.22 1.2.5 1.54.05.07.06.13.04.2l-.19.78c-.03.12-.1.17-.23.11-1.01-.47-1.64-1.94-1.64-3.13 0-2.55 1.85-4.89 5.34-4.89 2.8 0 4.98 2 4.98 4.67 0 2.79-1.76 5.03-4.2 5.03-.82 0-1.6-.43-1.86-.93l-.51 1.94c-.18.72-.68 1.62-1.01 2.16A11.98 11.98 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z" />
                  </svg>
                  <span className="truncate">Pinterest</span>
                </a>

                {/* WhatsApp Share Button */}
                <a
                  href={whatsappShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on WhatsApp"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-medium border border-sand-200 hover:border-sand-300 transition-colors shadow-xs group"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>

                {/* Copy Link Button */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  aria-label="Copy Product Link"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white hover:bg-cream-100 text-charcoal-800 text-xs font-medium border border-sand-200 hover:border-sand-300 transition-colors shadow-xs group"
                >
                  {copied ? (
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-charcoal-600 shrink-0" />
                  )}
                  <span className="truncate">{copied ? 'Copied' : 'Copy Link'}</span>
                </button>
              </div>
            </div>

            {/* Retailer Responsibility Statement */}
            <div className="p-3.5 rounded-xl bg-sand-100/60 border border-sand-200 text-[11px] text-charcoal-600 leading-relaxed">
              <strong className="text-charcoal-900 block mb-0.5 font-medium">
                Retailer Responsibility Notice
              </strong>
              MV Finds is a product discovery platform. We do not sell, ship, or
              fulfill the products shown here. Orders, returns, refunds, delivery
              and warranties are handled by the retailer or manufacturer.
            </div>

            {/* Why We Picked It */}
            {product.whyWePickedIt && (
              <div className="space-y-2 pt-2">
                <h3 className="font-serif text-lg font-semibold text-charcoal-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-terracotta-500" />
                  Why we picked it
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed bg-white p-4 rounded-xl border border-sand-200">
                  {product.whyWePickedIt}
                </p>
              </div>
            )}

            {/* Pros and Cons */}
            {(product.pros?.length > 0 || product.cons?.length > 0) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Pros */}
                {product.pros?.length > 0 && (
                  <div className="bg-sage-50/70 border border-sage-200/80 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sage-600 mb-3 flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-sage-500" />
                      What we like
                    </h4>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      {product.pros.map((pro, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-1.5 shrink-0" />
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Cons */}
                {product.cons?.length > 0 && (
                  <div className="bg-terracotta-50/60 border border-terracotta-200/80 rounded-2xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-terracotta-600 mb-3 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-terracotta-500" />
                      Keep in mind
                    </h4>
                    <ul className="space-y-2 text-xs text-charcoal-700">
                      {product.cons.map((con, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500 mt-1.5 shrink-0" />
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Best For */}
            {product.bestFor && (
              <div className="pt-2 text-xs text-charcoal-700 bg-sand-100 p-4 rounded-xl border border-sand-200">
                <strong className="text-charcoal-900 block mb-1">
                  Best suited for:
                </strong>
                {product.bestFor}
              </div>
            )}
          </div>
        </div>

        {/* Related Finds from Same Category */}
        {relatedProducts.length > 0 && (
          <div className="py-12 sm:py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                  More in {product.category}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 mt-1">
                  You might also appreciate
                </h2>
              </div>
              <Link
                to={`/${categorySlug}`}
                className="text-xs font-semibold text-charcoal-900 hover:text-terracotta-600 transition-colors flex items-center gap-1"
              >
                <span>View category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </>
  );
}
