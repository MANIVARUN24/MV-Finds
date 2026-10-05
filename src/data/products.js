/**
 * MV Finds — Product Catalog & Management System
 *
 * HOW TO ADD A NEW PRODUCT (2 steps only):
 * ─────────────────────────────────────────────────────────────────────────────
 * STEP 1: Put the product image in:   public/products/your-image.jpg
 * STEP 2: Add ONE object to the PRODUCTS array below.
 *
 * FIELD GUIDE:
 * ─────────────────────────────────────────────────────────────────────────────
 *  id          — unique string, no spaces (e.g. "minimal-desk-lamp")
 *  name        — product display name (e.g. "Minimal Desk Lamp")
 *  slug        — URL-safe slug (e.g. "minimal-desk-lamp" creates /product/minimal-desk-lamp)
 *  category    — MUST be one of:
 *                  "Home Finds"
 *                  "Style Finds"
 *                  "Tech Finds"
 *                  "Study & Desk"
 *                  "Gift Ideas"
 *  description — short honest product description
 *  whyWePickedIt — why MV Finds recommends this product
 *  image       — local path e.g. "/products/desk-lamp.jpg" or external https:// URL
 *  productUrl  — paste the real retailer / Amazon URL here
 *  retailer    — retailer name: "Amazon", "Flipkart", "Myntra", "Croma", "Nykaa", etc.
 *  price       — verified price string e.g. "₹899" or "" if checking retailer
 *  rating      — null always (only set to number if verified)
 *  pros        — array of short honest positive statements
 *  cons        — array of honest trade-offs / limitations
 *  bestFor     — one sentence describing the ideal buyer
 *  featured    — true = featured on homepage, false = standard catalog item
 *
 * PINTEREST JOURNEY NOTE:
 * ─────────────────────────────────────────────────────────────────────────────
 * Pinterest Pins link to MV Finds: https://mvfinds.in/product/[slug]
 * Customers land on MV Finds first, then click "View on [Retailer]" to reach the retailer.
 */

export const PRODUCTS = [];

// ─────────────────────────────────────────────────────────────────────────────
// Helper Functions — do NOT edit these
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derives the URL slug for a category name.
 * Maps "Study & Desk" → "study-desk-finds", "Home Finds" → "home-finds", etc.
 */
export function getCategorySlug(categoryName) {
  const map = {
    'Home Finds': 'home-finds',
    'Style Finds': 'style-finds',
    'Tech Finds': 'tech-finds',
    'Study & Desk': 'study-desk-finds',
    'Study & Desk Finds': 'study-desk-finds',
    'Gift Ideas': 'gift-ideas'
  };
  return (
    map[categoryName] ||
    categoryName.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')
  );
}

export function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(categorySlugOrName) {
  return PRODUCTS.filter(p => {
    return (
      p.category === categorySlugOrName ||
      getCategorySlug(p.category) === categorySlugOrName ||
      (categorySlugOrName === 'study-desk-finds' &&
        (p.category === 'Study & Desk' || p.category === 'Study & Desk Finds'))
    );
  });
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

/**
 * Basic product validation to identify issues in development.
 * Logs console warnings without crashing the website.
 */
export function validateProducts(products) {
  if (typeof console === 'undefined') return;
  const slugs = new Set();
  products.forEach((p, idx) => {
    const identifier = p.slug || p.id || `product_${idx}`;
    if (!p.name || !p.name.trim()) {
      console.warn(`MV Finds product warning: ${identifier} has no name.`);
    }
    if (!p.slug || !p.slug.trim()) {
      console.warn(`MV Finds product warning: ${identifier} has no slug.`);
    }
    if (!p.category || !p.category.trim()) {
      console.warn(`MV Finds product warning: ${identifier} has no category.`);
    }
    if (!p.image || !p.image.trim()) {
      console.warn(`MV Finds product warning: ${identifier} has no image.`);
    }
    if (typeof p.productUrl !== 'string') {
      console.warn(`MV Finds product warning: ${identifier} has no productUrl.`);
    }
    if (p.slug) {
      if (slugs.has(p.slug)) {
        console.warn(`MV Finds product warning: duplicate slug detected "${p.slug}".`);
      }
      slugs.add(p.slug);
    }
  });
}

// Automatically validate on load
validateProducts(PRODUCTS);
