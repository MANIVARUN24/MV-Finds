import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DisclosureBanner from './components/DisclosureBanner';

// Context Providers
import { ProductProvider } from './context/ProductContext';
import { AuthProvider, ProtectedAdminRoute } from './context/AuthContext';

// Public Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import AffiliateDisclosure from './pages/AffiliateDisclosure';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminProducts from './pages/admin/AdminProducts';

/**
 * ScrollToTop helper on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <AuthProvider>
      <ProductProvider>
        <div className="flex flex-col min-h-screen bg-cream-50 text-charcoal-900 selection:bg-sand-200">
          <ScrollToTop />

          {/* Public Top Compliance Notice Banner (hidden on admin pages) */}
          {!isAdminRoute && <DisclosureBanner />}

          {/* Sticky Main Navigation (hidden on admin pages) */}
          {!isAdminRoute && <Header />}

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />

              {/* Dedicated Category Routes */}
              <Route path="/home-finds" element={<Category forcedSlug="home-finds" />} />
              <Route path="/style-finds" element={<Category forcedSlug="style-finds" />} />
              <Route path="/tech-finds" element={<Category forcedSlug="tech-finds" />} />
              <Route path="/study-desk-finds" element={<Category forcedSlug="study-desk-finds" />} />
              <Route path="/gift-ideas" element={<Category forcedSlug="gift-ideas" />} />
              <Route path="/category/:slug" element={<Category />} />

              {/* Product Detail Route */}
              <Route path="/product/:slug" element={<ProductDetail />} />

              {/* Articles & Guides */}
              <Route path="/articles" element={<Articles />} />
              <Route path="/articles/:slug" element={<ArticleDetail />} />

              {/* Information & Legal */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />

              {/* Private Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route
                path="/admin/products"
                element={
                  <ProtectedAdminRoute>
                    <AdminProducts />
                  </ProtectedAdminRoute>
                }
              />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Editorial Footer (hidden on admin pages) */}
          {!isAdminRoute && <Footer />}
        </div>
      </ProductProvider>
    </AuthProvider>
  );
}
