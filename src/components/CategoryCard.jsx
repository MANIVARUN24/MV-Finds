import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  if (!category) return null;

  return (
    <Link
      to={category.route}
      className="group relative rounded-2xl overflow-hidden bg-charcoal-900 border border-sand-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-end min-h-[300px] sm:min-h-[340px] p-6 img-zoom-wrapper"
    >
      {/* Background Image */}
      <img
        src={category.heroImage}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-75 transition-opacity"
      />

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-sand-300">
          {category.eyebrow || 'Curated Category'}
        </span>

        <h3 className="font-serif text-2xl text-white group-hover:text-sand-100 transition-colors">
          {category.name}
        </h3>

        <p className="text-xs sm:text-sm text-sand-200/90 line-clamp-2 leading-relaxed max-w-sm">
          {category.shortDescription}
        </p>

        <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-sand-100 group-hover:text-white transition-colors">
          <span>Explore Category</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
