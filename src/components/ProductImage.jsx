import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * ProductImage — renders a product image with a clean fallback.
 *
 * Props:
 *   src      — the image path (local /products/xxx.jpg or external URL)
 *   alt      — descriptive alt text
 *   className — extra Tailwind classes for the <img> element
 */
export default function ProductImage({ src, alt, className = '' }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-sand-100 text-charcoal-400 gap-2">
        <ImageOff className="w-8 h-8 text-sand-400" />
        <span className="text-[11px] text-charcoal-400 font-medium">Image coming soon</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || 'Product image'}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`w-full h-full object-cover ${className}`}
    />
  );
}
