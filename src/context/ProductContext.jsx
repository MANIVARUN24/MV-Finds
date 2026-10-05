import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import {
  PRODUCTS as FALLBACK_PRODUCTS,
  getCategorySlug as deriveCategorySlug
} from '../data/products';

const ProductContext = createContext(null);

export function generateSlug(name, existingProducts = [], currentId = null) {
  let baseSlug = (name || '')
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!baseSlug) baseSlug = 'product';

  let slug = baseSlug;
  let counter = 2;

  while (
    existingProducts.some(
      (p) => p.slug === slug && (currentId ? p.id !== currentId : true)
    )
  ) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDatabaseConnected, setIsDatabaseConnected] = useState(false);

  // Fetch all products from Spring Boot REST API
  const refreshProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.getAllProducts();
      if (Array.isArray(data)) {
        setProducts(data);
        setIsDatabaseConnected(true);
        setError(null);
      }
    } catch (err) {
      console.warn('Backend API connection notice:', err.message);
      setIsDatabaseConnected(false);
      if (err.isNetworkError) {
        setError('MV Finds product service is currently unavailable.');
      } else {
        setError('Unable to connect to the product database.');
      }
      // Keep fallback products in memory so UI does not show a blank broken screen
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
  }, [refreshProducts]);

  // Create Product via Backend API
  const addProduct = useCallback(
    async (productData) => {
      try {
        const created = await api.createProduct(productData);
        setProducts((prev) => [created, ...prev]);
        setIsDatabaseConnected(true);
        return created;
      } catch (err) {
        // Fallback for offline dev
        const slug = productData.slug || generateSlug(productData.name, products);
        const fallbackCreated = {
          id: Date.now(),
          ...productData,
          slug,
          image: productData.imageUrl || productData.image,
          imageUrl: productData.imageUrl || productData.image
        };
        setProducts((prev) => [fallbackCreated, ...prev]);
        throw err;
      }
    },
    [products]
  );

  // Update Product via Backend API
  const updateProduct = useCallback(
    async (id, productData) => {
      try {
        const updated = await api.updateProduct(id, productData);
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        setIsDatabaseConnected(true);
        return updated;
      } catch (err) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...productData,
                  image: productData.imageUrl || productData.image || p.image,
                  imageUrl: productData.imageUrl || productData.image || p.imageUrl
                }
              : p
          )
        );
        throw err;
      }
    },
    []
  );

  // Delete Product via Backend API
  const deleteProduct = useCallback(
    async (id) => {
      try {
        await api.deleteProduct(id);
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setIsDatabaseConnected(true);
        return true;
      } catch (err) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        throw err;
      }
    },
    []
  );

  // Upload image via Spring Boot multipart endpoint
  const uploadImage = useCallback(async (file, slug) => {
    try {
      const response = await api.uploadImage(file, slug);
      return {
        success: true,
        imagePath: response.imageUrl,
        previewUrl: response.imageUrl
      };
    } catch {
      // Fallback: local FileReader data URL
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            success: true,
            imagePath: reader.result,
            previewUrl: reader.result
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }, []);

  // Helper selectors
  const getProductBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug),
    [products]
  );

  const getProductsByCategory = useCallback(
    (categorySlugOrName) => {
      return products.filter((p) => {
        return (
          p.category === categorySlugOrName ||
          deriveCategorySlug(p.category) === categorySlugOrName ||
          (categorySlugOrName === 'study-desk-finds' &&
            (p.category === 'Study & Desk' || p.category === 'Study & Desk Finds'))
        );
      });
    },
    [products]
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        isDatabaseConnected,
        refreshProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        generateSlug: (name, currentId) => generateSlug(name, products, currentId),
        getProductBySlug,
        getProductsByCategory,
        getFeaturedProducts,
        getCategorySlug: deriveCategorySlug
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
