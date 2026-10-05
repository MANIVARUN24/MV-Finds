import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../utils/seo';
import ProductFormModal from '../../components/admin/ProductFormModal';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import {
  Plus,
  Search,
  ExternalLink,
  Edit,
  Trash2,
  LogOut,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  Package,
  Layers,
  CheckCircle2,
  Home,
  Check,
  AlertTriangle,
  Loader2,
  RefreshCw
} from 'lucide-react';

const CATEGORY_TABS = [
  'All',
  'Home Finds',
  'Style Finds',
  'Tech Finds',
  'Study & Desk',
  'Gift Ideas'
];

export default function AdminProducts() {
  const {
    products,
    deleteProduct,
    loading,
    error,
    isDatabaseConnected,
    refreshProducts
  } = useProducts();
  const { logout } = useAuth();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  // Calculate Summary Counts Dynamically
  const summary = useMemo(() => {
    const counts = {
      total: products.length,
      home: 0,
      style: 0,
      tech: 0,
      study: 0,
      gifts: 0,
      featured: 0
    };

    products.forEach((p) => {
      if (p.featured) counts.featured++;
      const cat = p.category;
      if (cat === 'Home Finds') counts.home++;
      else if (cat === 'Style Finds') counts.style++;
      else if (cat === 'Tech Finds') counts.tech++;
      else if (cat === 'Study & Desk' || cat === 'Study & Desk Finds') counts.study++;
      else if (cat === 'Gift Ideas') counts.gifts++;
    });

    return counts;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'All') {
        const matchesCategory =
          p.category === selectedCategory ||
          (selectedCategory === 'Study & Desk' &&
            (p.category === 'Study & Desk' || p.category === 'Study & Desk Finds'));
        if (!matchesCategory) return false;
      }

      // Search match (name, category, retailer)
      if (cleanQuery) {
        const nameMatch = p.name.toLowerCase().includes(cleanQuery);
        const catMatch = p.category.toLowerCase().includes(cleanQuery);
        const retailerMatch = (p.retailer || '').toLowerCase().includes(cleanQuery);
        const descMatch = (p.description || '').toLowerCase().includes(cleanQuery);
        if (!nameMatch && !catMatch && !retailerMatch && !descMatch) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  // Handle Add Product
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  // Handle Edit Product
  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsFormOpen(true);
  };

  // Handle Delete Confirmation
  const handleConfirmDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deleteProduct(id);
      setIsDeleting(false);
      setDeletingProduct(null);
      showToast('Product successfully removed from catalog.');
    } catch (err) {
      console.error('Delete failed', err);
      setIsDeleting(false);
    }
  };

  const showToast = (message) => {
    setSuccessToast(message);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  return (
    <>
      <SEO
        title="MV Finds — Product Manager"
        description="Private Product Discovery Catalog Management"
      />

      <div className="min-h-screen bg-sand-50/50 pb-20">
        {/* Top Management Navbar */}
        <header className="bg-white border-b border-sand-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-charcoal-900">
                MV Finds
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sand-100 text-charcoal-700 border border-sand-200">
                Product Manager
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-600 hover:text-charcoal-900 transition-colors px-3 py-1.5 rounded-xl hover:bg-sand-100"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-500 hover:text-terracotta-600 transition-colors px-3 py-1.5 rounded-xl hover:bg-terracotta-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </header>

        {/* Success Toast */}
        {successToast && (
          <div className="fixed bottom-5 right-5 z-50 bg-charcoal-900 text-cream-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-fadeIn border border-sand-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          {/* Error Notice Banner */}
          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-amber-900 text-xs">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div>
                  <span className="font-semibold block">{error}</span>
                  <span className="text-[11px] text-amber-700">
                    Verify that PostgreSQL service is active and the Spring Boot backend is running on port 8080.
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={refreshProducts}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold transition-colors text-xs self-start sm:self-auto shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Connection</span>
              </button>
            </div>
          )}

          {/* Header Title & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  Dashboard
                </span>
                <span className="text-sand-300">•</span>
                <span
                  className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isDatabaseConnected
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isDatabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                    }`}
                  />
                  <span>
                    {isDatabaseConnected
                      ? 'PostgreSQL Connected (Spring Boot API)'
                      : 'PostgreSQL Connecting / Offline'}
                  </span>
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 tracking-tight font-bold">
                Product Catalog
              </h1>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                PostgreSQL is the source of truth. Manage, add, and update products live across all public categories.
              </p>
            </div>

            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-semibold text-sm transition-all shadow-soft hover:shadow-soft-md shrink-0"
            >
              <Plus className="w-4 h-4 text-terracotta-400" />
              <span>+ Add New Product</span>
            </button>
          </div>

          {/* Section: Summary Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Total Products
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.total}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Home Finds
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.home}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Style Finds
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.style}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Tech Finds
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.tech}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Study & Desk
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.study}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-sand-200 shadow-soft">
              <span className="text-[11px] font-medium text-charcoal-500 uppercase tracking-wider block">
                Gift Ideas
              </span>
              <span className="font-sans font-bold text-2xl text-charcoal-900 mt-1 block">
                {summary.gifts}
              </span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white p-4 rounded-3xl border border-sand-200 shadow-soft space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, category, retailer..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-sand-50 border border-sand-200 text-xs sm:text-sm text-charcoal-900 placeholder:text-charcoal-400 focus:bg-white focus:border-charcoal-400 focus:outline-none transition-colors"
                />
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3 pointer-events-none" />
              </div>

              <div className="text-xs text-charcoal-500">
                Showing <strong className="text-charcoal-900">{filteredProducts.length}</strong> of{' '}
                <strong className="text-charcoal-900">{products.length}</strong> products
              </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORY_TABS.map((tab) => {
                const isActive = selectedCategory === tab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSelectedCategory(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-charcoal-900 text-cream-50 shadow-xs'
                        : 'bg-sand-100/80 text-charcoal-600 hover:bg-sand-200/80 hover:text-charcoal-900'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Products List (Responsive: Desktop Table / Mobile Cards) */}
          <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Package className="w-10 h-10 mx-auto text-sand-300" />
                <h3 className="font-serif text-lg font-semibold text-charcoal-800">
                  No products found
                </h3>
                <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
                  No products matched your search or selected filter. Try adjusting your query or click "+ Add New Product".
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-sand-200 bg-sand-50/70 text-[11px] font-bold uppercase tracking-wider text-charcoal-500">
                        <th className="py-3.5 px-6">Product</th>
                        <th className="py-3.5 px-4">Category</th>
                        <th className="py-3.5 px-4">Retailer</th>
                        <th className="py-3.5 px-4">Price</th>
                        <th className="py-3.5 px-4">Featured</th>
                        <th className="py-3.5 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-100 text-sm">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-sand-50/60 transition-colors group">
                          {/* Image & Name */}
                          <td className="py-3.5 px-6">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-xl overflow-hidden bg-sand-100 border border-sand-200 shrink-0">
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-semibold text-charcoal-900 group-hover:text-charcoal-700 truncate max-w-xs">
                                  {p.name}
                                </h4>
                                <span className="font-mono text-[11px] text-charcoal-400 block truncate">
                                  /product/{p.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3.5 px-4">
                            <span className="inline-block text-xs font-medium px-2.5 py-0.5 rounded-full bg-sand-100 text-charcoal-700">
                              {p.category}
                            </span>
                          </td>

                          {/* Retailer */}
                          <td className="py-3.5 px-4">
                            <span className="text-xs font-semibold text-charcoal-800">
                              {p.retailer || 'Amazon'}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-4">
                            <span className="text-xs text-charcoal-600">
                              {p.price && p.price.trim() ? (
                                <span className="font-semibold text-charcoal-900">{p.price}</span>
                              ) : (
                                <span className="text-charcoal-400 italic">Check retailer</span>
                              )}
                            </span>
                          </td>

                          {/* Featured */}
                          <td className="py-3.5 px-4">
                            {p.featured ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded-full border border-terracotta-200">
                                <Sparkles className="w-3 h-3 text-terracotta-500" />
                                <span>Featured</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-charcoal-400">—</span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {/* View on Public Site */}
                              <Link
                                to={`/product/${p.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View public product page"
                                className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-sand-100 transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Link>

                              {/* Edit */}
                              <button
                                type="button"
                                onClick={() => handleOpenEdit(p)}
                                title="Edit product"
                                className="p-2 rounded-xl text-charcoal-500 hover:text-charcoal-900 hover:bg-sand-100 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => setDeletingProduct(p)}
                                title="Delete product"
                                className="p-2 rounded-xl text-charcoal-500 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden divide-y divide-sand-100">
                  {filteredProducts.map((p) => (
                    <div key={p.id} className="p-4 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-sand-100 border border-sand-200 shrink-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-sand-100 text-charcoal-700">
                              {p.category}
                            </span>
                            {p.featured && (
                              <span className="text-[10px] font-bold text-terracotta-600 bg-terracotta-50 px-1.5 py-0.5 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                          <h4 className="font-semibold text-sm text-charcoal-900 truncate">
                            {p.name}
                          </h4>
                          <span className="text-xs text-charcoal-500 block mt-0.5">
                            {p.retailer || 'Amazon'} • {p.price || 'Check retailer'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-sand-100 text-xs">
                        <Link
                          to={`/product/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-charcoal-700 font-semibold"
                        >
                          <span>View live</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(p)}
                            className="px-3 py-1.5 rounded-lg border border-sand-200 text-charcoal-700 font-medium hover:bg-sand-100"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingProduct(p)}
                            className="px-3 py-1.5 rounded-lg border border-terracotta-200 text-terracotta-600 font-medium hover:bg-terracotta-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        <ProductFormModal
          isOpen={isFormOpen}
          product={editingProduct}
          onClose={() => {
            setIsFormOpen(false);
            setEditingProduct(null);
          }}
          onSaved={(saved) => {
            showToast(
              editingProduct
                ? `Changes saved for "${saved.name}".`
                : `Product "${saved.name}" successfully added to catalog.`
            );
          }}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          product={deletingProduct}
          isDeleting={isDeleting}
          onCancel={() => setDeletingProduct(null)}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </>
  );
}
