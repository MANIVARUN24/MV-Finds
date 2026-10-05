import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import FilterBar from '../components/FilterBar';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';
import { useProducts } from '../context/ProductContext';

export default function Shop() {
  const { products, getCategorySlug } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial category from query string if present (e.g. /shop?category=tech-finds)
  const categoryParam = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('featured');

  // Handle category change and sync with URL
  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    setSelectedType('all');
    if (catSlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catSlug);
    }
    setSearchParams(searchParams);
  };

  // Derive available types based on selected category — removed (no type field in new schema)
  const availableTypes = [];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter(
        p => getCategorySlug(p.category) === selectedCategory
      );
    }

    if (selectedSort === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedSort === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else {
      // featured first
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedCategory, selectedSort, getCategorySlug]);

  const handleReset = () => {
    setSelectedCategory('all');
    setSelectedType('all');
    setSelectedSort('featured');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  return (
    <>
      <SEO
        title="All Curated Finds — Shop Catalog"
        description="Browse all hand-picked finds across home upgrades, tech accessories, study essentials, style, and gifts."
        canonicalPath="/shop"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <Breadcrumbs items={[{ label: 'Shop / All Finds' }]} />

        {/* Page Header */}
        <div className="pt-4 pb-8 border-b border-sand-200 mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-500">
            Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 tracking-tight mt-1">
            All Curated Finds
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 mt-2 max-w-2xl leading-relaxed">
            Every item in our collection is selected for functional utility, build quality, and timeless aesthetic value.
          </p>
        </div>

        {/* Filter Controls */}
        <FilterBar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          availableTypes={availableTypes}
          onReset={handleReset}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6 text-xs text-charcoal-500">
          <span>
            Showing <strong className="text-charcoal-900">{filteredProducts.length}</strong> finds
          </span>
          {selectedCategory !== 'all' && (
            <span className="text-charcoal-700">Filtered by category</span>
          )}
        </div>

        {/* Product Grid */}
        <ProductGrid
          products={filteredProducts}
          emptyMessage="No finds match your filter criteria."
        />
      </div>
    </>
  );
}
