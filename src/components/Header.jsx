import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, Menu, X, ArrowUpRight } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Home Finds', path: '/home-finds' },
    { name: 'Style', path: '/style-finds' },
    { name: 'Tech', path: '/tech-finds' },
    { name: 'Study & Desk', path: '/study-desk-finds' },
    { name: 'Gifts', path: '/gift-ideas' },
    { name: 'Articles', path: '/articles' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-50/90 backdrop-blur-md border-b border-sand-200/90 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="group flex flex-col items-start focus:outline-none"
                aria-label="MV Finds Home"
              >
                <span className="font-sans font-bold text-xl sm:text-2xl tracking-[0.18em] text-charcoal-900 group-hover:text-charcoal-700 transition-colors uppercase">
                  MV FINDS
                </span>
                <span className="text-[9px] tracking-[0.25em] text-charcoal-500 uppercase -mt-0.5">
                  Curated Finds
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'text-charcoal-950 font-semibold bg-sand-200/80 shadow-xs'
                        : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-sand-100/80'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search finds"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-charcoal-600 hover:text-charcoal-900 bg-sand-100 hover:bg-sand-200/80 border border-sand-200 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-charcoal-500" />
                <span>Search finds...</span>
                <kbd className="hidden xl:inline text-[10px] font-mono bg-white px-1.5 py-0.5 rounded border border-sand-200 text-charcoal-400">
                  ⌘K
                </kbd>
              </button>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `text-sm font-medium px-3 py-1.5 rounded-lg transition-colors ${
                    isActive
                      ? 'text-charcoal-950 font-semibold'
                      : 'text-charcoal-600 hover:text-charcoal-900'
                  }`
                }
              >
                About
              </NavLink>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
                className="p-2 rounded-lg text-charcoal-700 hover:text-charcoal-900 hover:bg-sand-100 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                className="p-2 rounded-lg text-charcoal-700 hover:text-charcoal-900 hover:bg-sand-100 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-sand-200 bg-cream-50/98 px-4 pt-3 pb-6 space-y-1 animate-in slide-in-from-top-4 duration-200">
            <div className="mb-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-sand-100 border border-sand-200 text-charcoal-600 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-charcoal-400" />
                  Search finds, articles...
                </span>
                <span className="text-xs text-charcoal-400">Tap to search</span>
              </button>
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3.5 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'text-charcoal-950 font-semibold bg-sand-200'
                      : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-sand-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 mt-3 border-t border-sand-200 space-y-2">
              <NavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-sand-100"
              >
                About MV Finds
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-sand-100"
              >
                Contact
              </NavLink>
              <a
                href="https://www.pinterest.com/themvfinds/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium text-charcoal-700 hover:bg-sand-100"
              >
                <span>Follow on Pinterest</span>
                <ArrowUpRight className="w-4 h-4 text-charcoal-400" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
