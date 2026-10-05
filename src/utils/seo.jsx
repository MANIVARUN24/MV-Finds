import { useEffect } from 'react';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://mvfinds.in';
const SITE_NAME = 'MV Finds';
const DEFAULT_TITLE = 'MV Finds — Curated Finds for Everyday Life';
const DEFAULT_DESC = 'Discover useful, stylish and affordable finds across home, tech, study, style and gifts.';

/**
 * Lightweight, robust SEO component for managing title, meta tags, and JSON-LD schemas
 */
export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonicalPath = '',
  ogType = 'website',
  ogImage = '/favicon.svg',
  schema = null
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : DEFAULT_TITLE;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute, name, content) => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', description);

    // Open Graph
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    if (ogImage) {
      const fullImg = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
      setMetaTag('property', 'og:image', fullImg);
    }

    // Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    // Canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // JSON-LD Structured Data
    const scriptId = 'mv-finds-schema';
    let scriptTag = document.getElementById(scriptId);
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }

    return () => {
      // Clean up script on unmount if needed
    };
  }, [fullTitle, description, canonicalUrl, ogType, ogImage, schema]);

  return null;
}
