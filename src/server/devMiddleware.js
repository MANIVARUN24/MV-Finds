import fs from 'fs';
import path from 'path';

/**
 * Serializes products array back into src/data/products.js with full documentation
 * and helper functions intact.
 */
export function writeProductsFile(products) {
  const filePath = path.resolve(process.cwd(), 'src/data/products.js');
  const fileHeader = `/**
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

export const PRODUCTS = `;

  const helpers = `

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
    categoryName.toLowerCase().replace(/\\s+/g, '-').replace(/&/g, 'and')
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
    const identifier = p.slug || p.id || \`product_\${idx}\`;
    if (!p.name || !p.name.trim()) {
      console.warn(\`MV Finds product warning: \${identifier} has no name.\`);
    }
    if (!p.slug || !p.slug.trim()) {
      console.warn(\`MV Finds product warning: \${identifier} has no slug.\`);
    }
    if (!p.category || !p.category.trim()) {
      console.warn(\`MV Finds product warning: \${identifier} has no category.\`);
    }
    if (!p.image || !p.image.trim()) {
      console.warn(\`MV Finds product warning: \${identifier} has no image.\`);
    }
    if (typeof p.productUrl !== 'string') {
      console.warn(\`MV Finds product warning: \${identifier} has no productUrl.\`);
    }
    if (p.slug) {
      if (slugs.has(p.slug)) {
        console.warn(\`MV Finds product warning: duplicate slug detected "\${p.slug}".\`);
      }
      slugs.add(p.slug);
    }
  });
}

// Automatically validate on load
validateProducts(PRODUCTS);
`;

  const fileContent = fileHeader + JSON.stringify(products, null, 2) + ';' + helpers;
  fs.writeFileSync(filePath, fileContent, 'utf8');
}

/**
 * Helper to parse JSON request bodies in standard Node http middleware
 */
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      // Safeguard against oversized payloads (e.g. max 25MB for images)
      if (body.length > 25 * 1024 * 1024) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

/**
 * Vite Dev Server API Plugin for MV Finds Admin
 */
export function devApiPlugin() {
  return {
    name: 'mv-finds-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        // 1. GET /api/products — Fetch products directly from source file
        if (req.url === '/api/products' && req.method === 'GET') {
          try {
            const filePath = path.resolve(process.cwd(), 'src/data/products.js');
            const fileContent = fs.readFileSync(filePath, 'utf8');
            // Extract the JSON array from export const PRODUCTS = [...];
            const match = fileContent.match(/export\s+const\s+PRODUCTS\s*=\s*(\[[\s\S]*?\]);/);
            if (match && match[1]) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(match[1]);
              return;
            }
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Could not parse products array' }));
            return;
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        // 2. POST /api/products — Save updated products list to src/data/products.js
        if (req.url === '/api/products' && req.method === 'POST') {
          try {
            const data = await parseJsonBody(req);
            if (!Array.isArray(data.products)) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Expected products array' }));
              return;
            }
            writeProductsFile(data.products);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, count: data.products.length }));
            return;
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        // 3. POST /api/upload — Upload product image to public/products/
        if (req.url === '/api/upload' && req.method === 'POST') {
          try {
            const data = await parseJsonBody(req);
            const { filename, dataUrl, slug } = data;

            if (!dataUrl || !dataUrl.includes('base64,')) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Valid base64 dataUrl is required' }));
              return;
            }

            // Extract file extension (jpg, png, webp, jpeg)
            const mimeMatch = dataUrl.match(/^data:image\/([a-zA-Z0-9-+]+);base64,/);
            let ext = 'jpg';
            if (mimeMatch && mimeMatch[1]) {
              ext = mimeMatch[1].toLowerCase();
              if (ext === 'jpeg') ext = 'jpg';
              if (ext === 'svg+xml') ext = 'svg';
            } else if (filename) {
              const fileExt = path.extname(filename).replace('.', '').toLowerCase();
              if (fileExt) ext = fileExt;
            }

            // Safe filename based on slug
            const safeSlug = (slug || 'product').toLowerCase().replace(/[^\w-]/g, '');
            const safeFilename = `${safeSlug}.${ext}`;
            const targetDir = path.resolve(process.cwd(), 'public/products');

            if (!fs.existsSync(targetDir)) {
              fs.mkdirSync(targetDir, { recursive: true });
            }

            const targetFilePath = path.join(targetDir, safeFilename);

            // Strip the data URL prefix and write buffer
            const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(targetFilePath, buffer);

            const imagePath = `/products/${safeFilename}`;
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              imagePath,
              filename: safeFilename
            }));
            return;
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
            return;
          }
        }

        next();
      });
    }
  };
}
