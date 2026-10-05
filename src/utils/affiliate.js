/**
 * Centralized Affiliate Configuration System for MV Finds
 * 
 * IMPORTANT COMPLIANCE NOTE:
 * MV Finds does not currently claim active participation in the Amazon Associates Program.
 * All outbound links currently resolve either to demonstration URLs or safe placeholders ('#').
 * 
 * Once your Amazon Associates account is officially reviewed and approved:
 * 1. Set `IS_AFFILIATE_ACTIVE = true` below.
 * 2. Update `DEFAULT_DISCLOSURE_TEXT` if necessary.
 * 3. Add legitimate Amazon Special Links with your approved Associate Tag inside `src/data/products.js`.
 */

export const AFFILIATE_CONFIG = {
  // Toggle this to true ONLY after you receive official Amazon Associates approval
  isApprovedAssociate: false,

  // Future Amazon Associate Tag (leave empty until officially assigned)
  associateTag: '',

  // Default link label
  ctaLabel: 'View Find',

  // Compliance notices
  preApprovalNotice: 'Demonstration catalog item. Some product links may become affiliate links in the future upon official program enrollment.',
  activeDisclosureNotice: 'As an Amazon Associate I earn from qualifying purchases. MV Finds may earn a small commission on qualifying purchases at no additional cost to you.',
  shortNotice: '(demo link)'
};

/**
 * Returns the outbound destination URL for a given product.
 * In pre-approval mode, if the product has a placeholder '#', it stays on page
 * or opens a safe external demo link if provided.
 */
export function getAffiliateUrl(product) {
  if (!product) return '#';
  if (product.affiliateUrl && product.affiliateUrl !== '#') {
    return product.affiliateUrl;
  }
  return '#';
}

/**
 * Returns compliance disclosure text based on program enrollment status.
 */
export function getDisclosureStatement() {
  if (AFFILIATE_CONFIG.isApprovedAssociate) {
    return AFFILIATE_CONFIG.activeDisclosureNotice;
  }
  return AFFILIATE_CONFIG.preApprovalNotice;
}

/**
 * Returns small badge text shown near product CTAs
 */
export function getLinkDisclosureBadge() {
  if (AFFILIATE_CONFIG.isApprovedAssociate) {
    return '(paid link)';
  }
  return '(preview link)';
}
