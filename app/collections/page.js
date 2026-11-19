'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { initialProducts, categoriesList, fabricsList, sizesList } from '../../lib/data/products';
import ProductCard from '../../components/ProductCard';
import ProductDetailModal from '../../components/ProductDetailModal';
import CatalogueDownloadModal from '../../components/CatalogueDownloadModal';
import { Search, Filter, X, Download, SlidersHorizontal, ShoppingBag, RotateCcw, Loader2 } from 'lucide-react';
import { useInquiry } from '../../context/InquiryContext';

function CollectionsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedMoq, setSelectedMoq] = useState('All');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  const { totalItemsCount, setIsDrawerOpen } = useInquiry();

  // Update selectedCategory if URL parameter changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Handle Quick View click
  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFabric('All');
    setSelectedSize('All');
    setSelectedMoq('All');
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All' || selectedFabric !== 'All' || selectedSize !== 'All' || selectedMoq !== 'All';

  // Filter logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Search Query (name, SKU, or fabric)
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSku = product.sku.toLowerCase().includes(q);
        const matchesFabric = product.fabric.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesFabric) return false;
      }

      // 2. Category
      if (selectedCategory !== 'All' && product.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // 3. Fabric
      if (selectedFabric !== 'All' && product.fabric.toLowerCase() !== selectedFabric.toLowerCase()) {
        return false;
      }

      // 4. Size range
      if (selectedSize !== 'All') {
        const hasSize = product.sizes && product.sizes.some(s => s.toLowerCase() === selectedSize.toLowerCase());
        if (!hasSize) return false;
      }

      // 5. MOQ
      if (selectedMoq !== 'All') {
        const moqVal = Number(product.moq) || 0;
        if (selectedMoq === 'under-80' && moqVal > 80) return false;
        if (selectedMoq === '80-100' && (moqVal < 80 || moqVal > 100)) return false;
        if (selectedMoq === 'over-100' && moqVal <= 100) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedFabric, selectedSize, selectedMoq]);

  return (
    <div style={{ backgroundColor: 'var(--color-ivory-light)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* ----------------------------------------------------
          PAGE HEADER & EDITORIAL BANNER
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-ivory)',
          padding: '4.5rem 0 3.5rem',
          borderBottom: '1px solid rgba(184, 137, 59, 0.3)'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem'
            }}
          >
            <div>
              <span
                style={{
                  color: 'var(--color-gold)',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '8px'
                }}
              >
                Wholesale Garment Catalogue
              </span>
              <h1
                style={{
                  color: 'var(--color-ivory)',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                  margin: 0
                }}
              >
                Core Export Collections
              </h1>
              <p
                style={{
                  color: 'rgba(244, 239, 230, 0.8)',
                  maxWidth: '600px',
                  marginTop: '10px',
                  marginBottom: 0,
                  fontSize: '1rem',
                  lineHeight: 1.6
                }}
              >
                Explore our 16 signature Indian craft styles. Low MOQs from 50 pieces, custom private label tagging, and indicative FOB seaport/airport quotations.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setIsCatalogueOpen(true)}
                className="btn btn-gold btn-sm"
              >
                <Download size={14} />
                <span>Download Lookbook (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          SEARCH & FILTER TOOLBAR
          ---------------------------------------------------- */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: '80px',
          zIndex: 800,
          boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
        }}
      >
        <div className="container" style={{ padding: '14px 1.5rem' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            {/* Search Input */}
            <div
              style={{
                position: 'relative',
                flex: '1 1 280px',
                maxWidth: '400px'
              }}
            >
              <Search
                size={16}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-gray-subtle)'
                }}
              />
              <input
                type="text"
                placeholder="Search style name, SKU (e.g. MF-001) or fabric..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 38px',
                  fontSize: '0.88rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-ivory-light)',
                  outline: 'none'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-gray-subtle)'
                  }}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Desktop Filters Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap'
              }}
              className="desktop-filter-bar"
            >
              {/* Category Select */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFF',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <option value="All">All Categories ({initialProducts.length})</option>
                {categoriesList.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {/* Fabric Select */}
              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFF',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Fabrics</option>
                {fabricsList.filter(f => f !== 'All').map((fab) => (
                  <option key={fab} value={fab}>
                    {fab}
                  </option>
                ))}
              </select>

              {/* Size Select */}
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFF',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All Sizes</option>
                {sizesList.filter(s => s !== 'All').map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>

              {/* MOQ Select */}
              <select
                value={selectedMoq}
                onChange={(e) => setSelectedMoq(e.target.value)}
                style={{
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: '#FFF',
                  cursor: 'pointer'
                }}
              >
                <option value="All">All MOQs</option>
                <option value="under-80">Low MOQ (≤ 80 pcs)</option>
                <option value="80-100">Medium MOQ (80-100 pcs)</option>
                <option value="over-100">Volume MOQ (&gt; 100 pcs)</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    background: 'none',
                    border: '1px solid var(--color-gold)',
                    color: 'var(--color-gold)',
                    cursor: 'pointer'
                  }}
                  title="Clear all active filters"
                >
                  <RotateCcw size={13} />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="mobile-filter-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                backgroundColor: 'var(--color-navy)',
                color: 'var(--color-ivory)',
                border: 'none',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              <SlidersHorizontal size={15} />
              <span>Filters {hasActiveFilters && '•'}</span>
            </button>
          </div>

          {/* Mobile Filter Drawer Overlay */}
          {mobileFilterOpen && (
            <div
              style={{
                marginTop: '14px',
                paddingTop: '14px',
                borderTop: '1px solid var(--color-border)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}
            >
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '8px', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}
              >
                <option value="All">All Categories</option>
                {categoriesList.filter(c => c !== 'All').map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                style={{ padding: '8px', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}
              >
                <option value="All">All Fabrics</option>
                {fabricsList.filter(f => f !== 'All').map((fab) => (
                  <option key={fab} value={fab}>{fab}</option>
                ))}
              </select>

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ padding: '8px', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}
              >
                <option value="All">All Sizes</option>
                {sizesList.filter(s => s !== 'All').map((sz) => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>

              <select
                value={selectedMoq}
                onChange={(e) => setSelectedMoq(e.target.value)}
                style={{ padding: '8px', fontSize: '0.8rem', border: '1px solid var(--color-border)' }}
              >
                <option value="All">All MOQs</option>
                <option value="under-80">≤ 80 pcs</option>
                <option value="80-100">80-100 pcs</option>
                <option value="over-100">&gt; 100 pcs</option>
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{
                    gridColumn: 'span 2',
                    padding: '8px',
                    backgroundColor: 'var(--color-navy)',
                    color: '#FFF',
                    border: 'none',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------
          ACTIVE FILTER STATUS & RESULTS COUNT
          ---------------------------------------------------- */}
      <div className="container" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.88rem',
            color: 'var(--color-charcoal-light)'
          }}
        >
          <div>
            Showing <strong style={{ color: 'var(--color-navy)' }}>{filteredProducts.length}</strong> of{' '}
            {initialProducts.length} export styles
            {hasActiveFilters && (
              <span style={{ color: 'var(--color-gold)', marginLeft: '8px' }}>
                (filtered)
              </span>
            )}
          </div>

          {totalItemsCount > 0 && (
            <button
              onClick={() => setIsDrawerOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-navy)',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <ShoppingBag size={15} style={{ color: 'var(--color-gold)' }} />
              <span>View Shortlist ({totalItemsCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* ----------------------------------------------------
          PRODUCT GRID OR EMPTY STATE
          ---------------------------------------------------- */}
      <div className="container">
        {filteredProducts.length === 0 ? (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--color-border)',
              padding: '80px 20px',
              textAlign: 'center',
              margin: '2rem 0'
            }}
          >
            <Filter size={40} style={{ color: 'var(--color-gold)', margin: '0 auto 16px', opacity: 0.6 }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-navy)', marginBottom: '8px' }}>
              No Styles Matched Your Filter
            </h3>
            <p style={{ color: 'var(--color-charcoal-light)', maxWidth: '480px', margin: '0 auto 24px', fontSize: '0.9rem' }}>
              We could not find any garment matching your selected category, fabric, or size range. Try resetting your search parameters.
            </p>
            <button onClick={resetFilters} className="btn btn-primary btn-sm">
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.sku}
                product={prod}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Catalogue Download Modal */}
      <CatalogueDownloadModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
      />

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.desktop-filter-bar) {
            display: none !important;
          }
          :global(.mobile-filter-btn) {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--color-navy)' }}>
          <Loader2 size={32} className="animate-spin" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem' }}>Loading Collections Catalogue...</p>
        </div>
      }
    >
      <CollectionsContent />
    </Suspense>
  );
}
