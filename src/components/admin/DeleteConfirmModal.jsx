import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function DeleteConfirmModal({ product, onConfirm, onCancel, isDeleting }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full border border-sand-200 shadow-2xl p-6 relative">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute top-5 right-5 p-2 rounded-full text-charcoal-400 hover:text-charcoal-700 hover:bg-sand-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-4 text-terracotta-600">
          <div className="w-12 h-12 rounded-2xl bg-terracotta-50 flex items-center justify-center border border-terracotta-200 shrink-0">
            <AlertTriangle className="w-6 h-6 text-terracotta-600" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Delete Product?
            </h3>
            <p className="text-xs text-charcoal-500">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-sand-50 rounded-2xl border border-sand-200 flex items-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-sand-200 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-semibold text-sm text-charcoal-900 truncate">
              {product.name}
            </h4>
            <span className="text-xs text-charcoal-500 block">
              {product.category} • {product.retailer || 'Amazon'}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl border border-sand-200 text-charcoal-700 text-sm font-semibold hover:bg-sand-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(product.id)}
            disabled={isDeleting}
            className="px-5 py-2.5 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white text-sm font-semibold shadow-soft hover:shadow-soft-md transition-all disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Product'}
          </button>
        </div>
      </div>
    </div>
  );
}
