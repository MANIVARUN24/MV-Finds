/**
 * MV Finds — Backend API Service Client
 * Connects the React frontend to the Spring Boot REST API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiService {
  /**
   * Helper for fetch requests with error handling
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers: options.body instanceof FormData ? options.headers : headers
      });

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch {
          // Response body was not JSON
        }
        const error = new Error(
          errorData.message || `Request failed with status ${response.status}`
        );
        error.status = response.status;
        error.data = errorData;
        throw error;
      }

      if (response.status === 204) {
        return null;
      }

      return await response.json();
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        // Backend server is unreachable / offline
        const networkError = new Error('MV Finds product service is currently unavailable.');
        networkError.isNetworkError = true;
        throw networkError;
      }
      throw err;
    }
  }

  // 1. Get All Products
  async getAllProducts() {
    const products = await this.request('/api/products');
    return products.map(this.normalizeProduct);
  }

  // 2. Get Featured Products
  async getFeaturedProducts() {
    const products = await this.request('/api/products/featured');
    return products.map(this.normalizeProduct);
  }

  // 3. Get Product By Slug
  async getProductBySlug(slug) {
    const product = await this.request(`/api/products/slug/${encodeURIComponent(slug)}`);
    return this.normalizeProduct(product);
  }

  // 4. Get Products By Category
  async getProductsByCategory(category) {
    const products = await this.request(`/api/products/category/${encodeURIComponent(category)}`);
    return products.map(this.normalizeProduct);
  }

  // 5. Search Products
  async searchProducts(query) {
    const clean = query ? query.trim() : '';
    if (!clean) return [];
    const products = await this.request(`/api/products/search?q=${encodeURIComponent(clean)}`);
    return products.map(this.normalizeProduct);
  }

  // 6. Create Product
  async createProduct(productData) {
    const payload = this.preparePayload(productData);
    const created = await this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
    return this.normalizeProduct(created);
  }

  // 7. Update Product
  async updateProduct(id, productData) {
    const payload = this.preparePayload(productData);
    const updated = await this.request(`/api/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    return this.normalizeProduct(updated);
  }

  // 8. Delete Product
  async deleteProduct(id) {
    return await this.request(`/api/products/${id}`, {
      method: 'DELETE'
    });
  }

  // 9. Upload Product Image (multipart/form-data)
  async uploadImage(file, slug) {
    const formData = new FormData();
    formData.append('file', file);
    if (slug) {
      formData.append('slug', slug);
    }

    const result = await this.request('/api/products/upload-image', {
      method: 'POST',
      headers: {}, // Let browser set multipart boundary
      body: formData
    });

    return {
      imageUrl: result.imageUrl,
      filename: result.filename
    };
  }

  /**
   * Normalizes backend entity fields for seamless React UI compatibility
   */
  normalizeProduct(p) {
    if (!p) return null;
    const img = p.imageUrl || p.image || '/products/desk-lamp.jpg';
    return {
      ...p,
      image: img,
      imageUrl: img,
      pros: Array.isArray(p.pros) ? p.pros : [],
      cons: Array.isArray(p.cons) ? p.cons : [],
      rating: p.rating !== null && p.rating !== undefined ? Number(p.rating) : null,
      price: p.price || '',
      featured: !!p.featured
    };
  }

  preparePayload(p) {
    return {
      name: p.name,
      slug: p.slug,
      category: p.category,
      description: p.description,
      whyWePickedIt: p.whyWePickedIt || '',
      imageUrl: p.image || p.imageUrl,
      productUrl: p.productUrl,
      retailer: p.retailer || 'Amazon',
      price: p.price || '',
      rating: p.rating !== '' && p.rating !== null && p.rating !== undefined ? Number(p.rating) : null,
      bestFor: p.bestFor || '',
      featured: !!p.featured
    };
  }
}

export const api = new ApiService();
export default api;
