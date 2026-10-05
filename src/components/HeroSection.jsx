import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 border-b border-sand-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand-200/70 border border-sand-300/80 text-charcoal-800 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              <span>MV FINDS</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl xl:text-6xl text-charcoal-900 tracking-tight leading-[1.12] text-balance">
              Find things you’ll <span className="italic font-normal">actually</span> want.
            </h1>

            <p className="text-base sm:text-lg text-charcoal-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Curated products for your space, your style, your setup, and everyday life. No endless scrolling, no fake reviews—just thoughtful finds worth discovering.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-cream-50 font-medium text-sm transition-all shadow-soft hover:shadow-soft-md"
              >
                <span>Explore Finds</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="#categories"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-sand-100 border border-sand-300 text-charcoal-800 font-medium text-sm transition-all shadow-soft"
              >
                <Compass className="w-4 h-4 text-charcoal-500" />
                <span>Browse Categories</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
                <span>5 Core Categories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                <span>Editorial Research</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sand-400" />
                <span>Zero Fake Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Collage Column */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-lg mx-auto lg:max-w-none">
              {/* Image 1 - Large vertical */}
              <div className="space-y-3 sm:space-y-4">
                <div className="relative rounded-2xl overflow-hidden shadow-soft-md bg-sand-200 aspect-[3/4] group img-zoom-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=700&q=80"
                    alt="Minimal architect desk lamp"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-300">
                      Study &amp; Desk
                    </span>
                    <p className="text-xs sm:text-sm font-serif font-medium leading-snug">
                      Cantilever Lamp &amp; Oak Workstation
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-soft bg-sand-200 aspect-square group img-zoom-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
                    alt="Ceramic travel tumbler"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white bg-charcoal-900/60 backdrop-blur-xs p-2 rounded-xl">
                    <p className="text-[11px] font-medium leading-tight">
                      Ceramic-Lined Morning Tumbler
                    </p>
                  </div>
                </div>
              </div>

              {/* Image 2 - Offset Column */}
              <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                <div className="relative rounded-2xl overflow-hidden shadow-soft bg-sand-200 aspect-square group img-zoom-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
                    alt="Earthenware Ribbed Table Lamp"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white bg-charcoal-900/60 backdrop-blur-xs p-2 rounded-xl">
                    <p className="text-[11px] font-medium leading-tight">
                      Warm Earthenware Bedside Light
                    </p>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden shadow-soft-md bg-sand-200 aspect-[3/4] group img-zoom-wrapper">
                  <img
                    src="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=700&q=80"
                    alt="Clean aluminum laptop stand setup"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-sand-300">
                      Tech Finds
                    </span>
                    <p className="text-xs sm:text-sm font-serif font-medium leading-snug">
                      Ergonomic Aluminum Riser
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle floating editorial badge */}
            <div className="hidden sm:flex absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-sand-200 shadow-soft-md items-center gap-2 text-xs text-charcoal-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Curated weekly for modern living</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
