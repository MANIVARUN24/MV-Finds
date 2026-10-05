import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import ArticleCard from '../components/ArticleCard';
import Breadcrumbs from '../components/Breadcrumbs';
import SEO from '../utils/seo';
import { getCategoryBySlug } from '../data/categories';
import { useProducts } from '../context/ProductContext';
import { getArticlesByCategory } from '../data/articles';
import NotFound from './NotFound';
import { Sparkles, ArrowRight, BookOpen, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function Category({ forcedSlug }) {
  const { getProductsByCategory } = useProducts();
  const { slug } = useParams();
  const activeSlug = forcedSlug || slug;

  const category = getCategoryBySlug(activeSlug);
  const [categoryProducts, setCategoryProducts] = useState(() =>
    category ? getProductsByCategory(category.slug) : []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) return;
    let isMounted = true;
    async function loadCategory() {
      setLoading(true);
      try {
        const fetched = await api.getProductsByCategory(category.name);
        if (isMounted && Array.isArray(fetched) && fetched.length > 0) {
          setCategoryProducts(fetched);
        } else if (isMounted) {
          setCategoryProducts(getProductsByCategory(category.slug));
        }
      } catch {
        if (isMounted) {
          setCategoryProducts(getProductsByCategory(category.slug));
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadCategory();
    return () => {
      isMounted = false;
    };
  }, [category, activeSlug, getProductsByCategory]);

  if (!category) {
    return <NotFound />;
  }

  const featuredInCat = categoryProducts.filter((p) => p.featured);
  const regularInCat = categoryProducts.filter((p) => !p.featured);
  const relatedArticles = getArticlesByCategory(category.slug);

  return (
    <>
      <SEO
        title={`${category.name} — Curated Collection`}
        description={category.longDescription}
        canonicalPath={category.route}
      />

      {/* Hero Header */}
      <div className="bg-cream-100/70 border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
          <Breadcrumbs
            items={[
              { label: 'Shop', path: '/shop' },
              { label: category.name }
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-sand-200 text-xs font-semibold uppercase tracking-wider text-charcoal-700">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                <span>{category.eyebrow}</span>
              </span>

              <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 tracking-tight">
                {category.name}
              </h1>

              <p className="text-base sm:text-lg text-charcoal-600 max-w-2xl leading-relaxed">
                {category.longDescription}
              </p>

              {category.curatorNote && (
                <div className="p-4 rounded-xl bg-sand-200/60 border border-sand-300/80 text-xs text-charcoal-700 max-w-xl">
                  <strong className="text-charcoal-900 block mb-0.5">Curator’s Perspective:</strong>
                  {category.curatorNote}
                </div>
              )}
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-soft-md border border-sand-200">
                <img
                  src={category.heroImage}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* Featured Picks in Category */}
        {featuredInCat.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                  Highlighted
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
                  Featured {category.name}
                </h2>
              </div>
            </div>
            <ProductGrid products={featuredInCat} />
          </div>
        )}

        {/* All / Additional Finds in Category */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                Full Collection
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
                {featuredInCat.length > 0 ? `More ${category.name}` : `All ${category.name}`}
              </h2>
            </div>
          </div>
          <ProductGrid
            products={featuredInCat.length > 0 ? regularInCat : categoryProducts}
            emptyMessage={`No additional items found in ${category.name}.`}
          />
        </div>

        {/* Related Editorial Articles & Guides */}
        {relatedArticles.length > 0 && (
          <div className="pt-8 border-t border-sand-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                  Knowledge &amp; Setup Tips
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-terracotta-500" />
                  Related Guides &amp; Articles
                </h2>
              </div>
              <Link
                to="/articles"
                className="text-xs font-semibold text-charcoal-900 hover:text-terracotta-600 transition-colors flex items-center gap-1"
              >
                <span>All Guides</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((art) => (
                <ArticleCard key={art.id} article={art} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
