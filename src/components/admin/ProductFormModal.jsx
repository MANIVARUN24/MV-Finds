import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const CATEGORIES = [
  'Home Finds',
  'Style Finds',
  'Tech Finds',
  'Study & Desk',
  'Gift Ideas'
];

const RETAILERS = [
  'Amazon',
  'Flipkart',
  'Myntra',
  'Croma',
  'Nykaa',
  'Other'
];

export default function ProductFormModal({
  product = null, // null for Add, object for Edit
  isOpen,
  onClose,
  onSaved
}) {
  const { addProduct, updateProduct, uploadImage, generateSlug } = useProducts();
  const fileInputRef = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Home Finds',
    retailer: 'Amazon',
    productUrl: '',
    image: '',
    description: '',
    whyWePickedIt: '',
    price: '',
    rating: '',
    bestFor: '',
    featured: false,
    pros: [''],
    cons: ['']
  });

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Validation Errors
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Populate form on edit or reset on add
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        slug: product.slug || '',
        category: product.category || 'Home Finds',
        retailer: product.retailer || 'Amazon',
        productUrl: product.productUrl || '',
        image: product.image || '',
        description: product.description || '',
        whyWePickedIt: product.whyWePickedIt || '',
        price: product.price || '',
        rating: product.rating !== null && product.rating !== undefined ? String(product.rating) : '',
        bestFor: product.bestFor || '',
        featured: !!product.featured,
        pros: Array.isArray(product.pros) && product.pros.length > 0 ? [...product.pros] : [''],
        cons: Array.isArray(product.cons) && product.cons.length > 0 ? [...product.cons] : ['']
      });
      setImagePreview(product.image || '');
      setImageFileName(product.image ? product.image.split('/').pop() : '');
      setImageFile(null);
    } else {
      setFormData({
        name: '',
        slug: '',
        category: 'Home Finds',
        retailer: 'Amazon',
        productUrl: '',
        image: '',
        description: '',
        whyWePickedIt: '',
        price: '',
        rating: '',
        bestFor: '',
        featured: false,
        pros: [''],
        cons: ['']
      });
      setImagePreview('');
      setImageFileName('');
      setImageFile(null);
    }
    setErrors({});
  }, [product, isOpen]);

  if (!isOpen) return null;

  // Handle Name Change & Auto-Slug Generation
  const handleNameChange = (e) => {
    const val = e.target.value;
    const newSlug = generateSlug(val, product?.id);
    setFormData((prev) => ({
      ...prev,
      name: val,
      slug: newSlug
    }));
    if (errors.name) setErrors((prev) => ({ ...prev, name: null }));
  };

  // Handle Image Selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setImageFileName(file.name);

    // Generate local preview immediately
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setImageFileName('');
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Pros & Cons helpers
  const handleProChange = (index, value) => {
    const updated = [...formData.pros];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, pros: updated }));
  };

  const addProField = () => {
    setFormData((prev) => ({ ...prev, pros: [...prev.pros, ''] }));
  };

  const removeProField = (index) => {
    const updated = formData.pros.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, pros: updated.length ? updated : [''] }));
  };

  const handleConChange = (index, value) => {
    const updated = [...formData.cons];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, cons: updated }));
  };

  const addConField = () => {
    setFormData((prev) => ({ ...prev, cons: [...prev.cons, ''] }));
  };

  const removeConField = (index) => {
    const updated = formData.cons.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, cons: updated.length ? updated : [''] }));
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required.';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }

    if (!formData.retailer) {
      newErrors.retailer = 'Retailer is required.';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required.';
    }

    if (!formData.productUrl.trim()) {
      newErrors.productUrl = 'Please enter the retailer URL.';
    } else if (!formData.productUrl.trim().startsWith('https://')) {
      newErrors.productUrl = 'Product URL must begin with https://';
    }

    if (!imageFile && !formData.image && !imagePreview) {
      newErrors.image = 'Please upload a product image.';
    }

    if (formData.rating !== '' && formData.rating !== null) {
      const num = Number(formData.rating);
      if (isNaN(num) || num < 1 || num > 5) {
        newErrors.rating = 'Rating must be a number between 1.0 and 5.0 (or left empty).';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      let finalImagePath = formData.image;

      // If a new local file was selected, upload it
      if (imageFile) {
        setIsUploading(true);
        const targetSlug = formData.slug || generateSlug(formData.name, product?.id);
        const uploadResult = await uploadImage(imageFile, targetSlug);
        finalImagePath = uploadResult.imagePath;
        setIsUploading(false);
      }

      const productPayload = {
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name, product?.id),
        category: formData.category,
        retailer: formData.retailer,
        productUrl: formData.productUrl,
        image: finalImagePath,
        description: formData.description,
        whyWePickedIt: formData.whyWePickedIt,
        price: formData.price,
        rating: formData.rating !== '' ? Number(formData.rating) : null,
        pros: formData.pros.filter((p) => p.trim() !== ''),
        cons: formData.cons.filter((c) => c.trim() !== ''),
        bestFor: formData.bestFor,
        featured: formData.featured
      };

      if (product) {
        await updateProduct(product.id, productPayload);
      } else {
        await addProduct(productPayload);
      }

      setSubmitting(false);
      onSaved?.(productPayload);
      onClose();
    } catch (err) {
      console.error('Failed to save product:', err);
      setErrors((prev) => ({
        ...prev,
        form: 'Failed to save product. Please try again.'
      }));
      setSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-sand-200 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-sand-200 flex items-center justify-between bg-cream-50/70 shrink-0">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
              {product ? 'Edit Catalog Entry' : 'New Catalog Entry'}
            </span>
            <h2 className="font-serif text-2xl font-bold text-charcoal-900">
              {product ? 'Edit Product' : 'Add New Product'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-sand-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {errors.form && (
            <div className="p-4 bg-terracotta-50 border border-terracotta-200 rounded-2xl text-terracotta-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Product Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Product Name <span className="text-terracotta-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="e.g. Minimal Desk Lamp"
                className={`w-full px-4 py-3 rounded-xl bg-sand-50 border text-sm text-charcoal-900 transition-colors focus:bg-white focus:outline-none ${
                  errors.name
                    ? 'border-terracotta-400 focus:border-terracotta-500'
                    : 'border-sand-200 focus:border-charcoal-400'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-terracotta-600 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Generated Slug */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Product URL Slug (Auto-generated)
              </label>
              <div className="flex items-center rounded-xl bg-sand-100 border border-sand-200 px-3.5 py-2.5 text-xs text-charcoal-600">
                <span className="text-charcoal-400 select-none">/product/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      slug: e.target.value.toLowerCase().replace(/[^\w-]/g, '')
                    }))
                  }
                  placeholder="minimal-desk-lamp"
                  className="bg-transparent font-mono text-xs text-charcoal-800 focus:outline-none flex-1 ml-0.5"
                />
              </div>
              <p className="text-[11px] text-charcoal-400 mt-1">
                Pinterest and website visitors will reach this item at: /product/{formData.slug || 'product-slug'}
              </p>
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Category <span className="text-terracotta-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Retailer Dropdown */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Retailer <span className="text-terracotta-500">*</span>
              </label>
              <select
                value={formData.retailer}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, retailer: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none"
              >
                {RETAILERS.map((ret) => (
                  <option key={ret} value={ret}>
                    {ret}
                  </option>
                ))}
              </select>
            </div>

            {/* Product URL */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Retailer Product URL <span className="text-terracotta-500">*</span>
              </label>
              <input
                type="text"
                value={formData.productUrl}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, productUrl: e.target.value }));
                  if (errors.productUrl) setErrors((prev) => ({ ...prev, productUrl: null }));
                }}
                placeholder="https://www.amazon.in/dp/..."
                className={`w-full px-4 py-3 rounded-xl bg-sand-50 border text-sm text-charcoal-900 focus:bg-white focus:outline-none ${
                  errors.productUrl
                    ? 'border-terracotta-400 focus:border-terracotta-500'
                    : 'border-sand-200 focus:border-charcoal-400'
                }`}
              />
              {errors.productUrl ? (
                <p className="mt-1 text-xs text-terracotta-600 font-medium">
                  {errors.productUrl}
                </p>
              ) : (
                <p className="text-[11px] text-charcoal-400 mt-1">
                  Paste the legitimate retailer URL or official Amazon Special Link.
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Product Image Upload */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
              Product Image <span className="text-terracotta-500">*</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
              {/* Image Preview Box */}
              <div className="sm:col-span-5 aspect-[4/3] rounded-2xl border-2 border-dashed border-sand-300 bg-sand-50 overflow-hidden relative flex flex-col items-center justify-center text-charcoal-400 group">
                {imagePreview ? (
                  <>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-charcoal-900/80 text-white hover:bg-terracotta-600 transition-colors shadow-xs"
                      title="Remove image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon className="w-10 h-10 mx-auto text-sand-400 mb-2" />
                    <span className="text-xs font-medium text-charcoal-600 block">
                      Product Image Preview
                    </span>
                    <span className="text-[10px] text-charcoal-400">
                      JPG, PNG, or WebP
                    </span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="sm:col-span-7 space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl border border-sand-300 bg-white hover:bg-cream-50 text-charcoal-800 text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Upload className="w-4 h-4 text-charcoal-600" />
                  <span>{imagePreview ? 'Replace Image' : 'Upload Product Image from Computer'}</span>
                </button>

                {imageFileName && (
                  <div className="flex items-center justify-between text-xs text-charcoal-600 bg-sand-100/70 px-3.5 py-2 rounded-xl">
                    <span className="truncate max-w-[200px] font-mono">
                      {imageFileName}
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="text-terracotta-600 hover:text-terracotta-700 text-xs font-semibold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                )}

                <div className="pt-1">
                  <span className="text-[11px] text-charcoal-500 block mb-1">
                    Or specify an existing image path / URL:
                  </span>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, image: e.target.value }));
                      setImagePreview(e.target.value);
                      if (errors.image) setErrors((prev) => ({ ...prev, image: null }));
                    }}
                    placeholder="/products/desk-lamp.jpg or https://..."
                    className="w-full px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-900 focus:bg-white focus:outline-none"
                  />
                </div>

                {errors.image && (
                  <p className="text-xs text-terracotta-600 font-medium">
                    {errors.image}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Editorial Content */}
          <div className="space-y-4 pt-2 border-t border-sand-200">
            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Product Description <span className="text-terracotta-500">*</span>
              </label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, description: e.target.value }));
                  if (errors.description) setErrors((prev) => ({ ...prev, description: null }));
                }}
                placeholder="A concise, honest description of the product and its aesthetic/functional qualities."
                className={`w-full px-4 py-3 rounded-xl bg-sand-50 border text-sm text-charcoal-900 focus:bg-white focus:outline-none leading-relaxed ${
                  errors.description
                    ? 'border-terracotta-400 focus:border-terracotta-500'
                    : 'border-sand-200 focus:border-charcoal-400'
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-terracotta-600 font-medium">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Why We Picked It */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Why We Picked It
              </label>
              <textarea
                rows={2}
                value={formData.whyWePickedIt}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, whyWePickedIt: e.target.value }))
                }
                placeholder="Curator commentary explaining what makes this find worth recommending."
                className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none leading-relaxed"
              />
            </div>

            {/* Price & Rating (Optional) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Verified Retail Price (Optional)
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, price: e.target.value }))
                  }
                  placeholder="e.g. ₹899 (Leave empty if unsure)"
                  className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none"
                />
                <span className="text-[11px] text-charcoal-400 block mt-1">
                  Leave empty to display "Check retailer for current pricing"
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                  Rating (Optional, 1.0 - 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, rating: e.target.value }))
                  }
                  placeholder="Leave empty for null (no stars)"
                  className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none"
                />
                <span className="text-[11px] text-charcoal-400 block mt-1">
                  Strictly verified ratings only. Default is empty (no fake stars).
                </span>
              </div>
            </div>

            {/* Best For */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700 mb-1.5">
                Best Suited For
              </label>
              <input
                type="text"
                value={formData.bestFor}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, bestFor: e.target.value }))
                }
                placeholder="e.g. Students and compact desk spaces"
                className="w-full px-4 py-3 rounded-xl bg-sand-50 border border-sand-200 text-sm text-charcoal-900 focus:bg-white focus:border-charcoal-400 focus:outline-none"
              />
            </div>

            {/* Pros List */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                  What We Like (Pros)
                </label>
                <button
                  type="button"
                  onClick={addProField}
                  className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point</span>
                </button>
              </div>
              <div className="space-y-2">
                {formData.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={pro}
                      onChange={(e) => handleProChange(idx, e.target.value)}
                      placeholder="e.g. Solid aluminum construction"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-900 focus:bg-white focus:outline-none"
                    />
                    {formData.pros.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProField(idx)}
                        className="p-2 text-charcoal-400 hover:text-terracotta-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cons List */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                  Keep in Mind (Cons / Trade-offs)
                </label>
                <button
                  type="button"
                  onClick={addConField}
                  className="text-xs font-semibold text-terracotta-600 hover:text-terracotta-700 inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Point</span>
                </button>
              </div>
              <div className="space-y-2">
                {formData.cons.map((con, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={con}
                      onChange={(e) => handleConChange(idx, e.target.value)}
                      placeholder="e.g. Check retailer listing for current specs"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-sand-50 border border-sand-200 text-xs text-charcoal-900 focus:bg-white focus:outline-none"
                    />
                    {formData.cons.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeConField(idx)}
                        className="p-2 text-charcoal-400 hover:text-terracotta-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="pt-2">
              <label className="flex items-center gap-3 p-4 rounded-2xl bg-sand-50 border border-sand-200 cursor-pointer hover:bg-sand-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, featured: e.target.checked }))
                  }
                  className="w-4 h-4 text-charcoal-900 rounded border-sand-300 focus:ring-0 cursor-pointer"
                />
                <div>
                  <span className="text-sm font-semibold text-charcoal-900 block">
                    Show as Featured Product
                  </span>
                  <span className="text-xs text-charcoal-500">
                    If checked, this item will appear in the homepage "Currently Loving" section.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-sand-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white py-3">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-5 py-2.5 rounded-xl border border-sand-200 text-charcoal-700 text-sm font-semibold hover:bg-sand-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || isUploading}
              className="px-6 py-2.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 text-sm font-semibold shadow-soft hover:shadow-soft-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>
                {submitting
                  ? isUploading
                    ? 'Uploading image...'
                    : 'Saving product...'
                  : product
                  ? 'Save Changes'
                  : 'Add Product'}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
