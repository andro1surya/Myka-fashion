'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { initialProducts } from '../lib/data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import CatalogueDownloadModal from '../components/CatalogueDownloadModal';
import {
  ArrowRight,
  Sparkles,
  Layers,
  Globe2,
  Users,
  Factory,
  ShieldCheck,
  Download,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  // Curate 6 signature showcase styles from the 16 products
  const showcaseProducts = initialProducts.filter(p => p.isFeatured || ['MF-001', 'MF-002', 'MF-004', 'MF-006', 'MF-008', 'MF-010'].includes(p.sku)).slice(0, 6);

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* ----------------------------------------------------
          1. EDITORIAL HERO SECTION
          ---------------------------------------------------- */}
      <section
        style={{
          position: 'relative',
          backgroundColor: 'var(--color-navy-dark)',
          color: 'var(--color-ivory)',
          overflow: 'hidden',
          minHeight: '85vh',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Editorial Background Image with Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `linear-gradient(to right, rgba(13, 22, 41, 0.92) 20%, rgba(13, 22, 41, 0.72) 60%, rgba(13, 22, 41, 0.45) 100%), url('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            opacity: 0.92
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                backgroundColor: 'rgba(184, 137, 59, 0.15)',
                border: '1px solid rgba(184, 137, 59, 0.4)',
                marginBottom: '1.5rem'
              }}
            >
              <Sparkles size={14} style={{ color: 'var(--color-gold)' }} />
              <span
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold)',
                  fontWeight: 600
                }}
              >
                B2B Wholesale & Global Garment Export
              </span>
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ivory)',
                fontSize: 'clamp(2.6rem, 5.5vw, 4.4rem)',
                lineHeight: 1.12,
                fontWeight: 400,
                marginBottom: '1.5rem',
                textTransform: 'none'
              }}
            >
              Exquisite Indian Craftsmanship for Global Fashion Houses
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(244, 239, 230, 0.85)',
                marginBottom: '2.5rem',
                maxWidth: '660px'
              }}
            >
              Artisanal block-printed kurtis, hand-embroidered Lucknowi chikankari tunics, linen co-ords, and conscious natural-fiber garments. Tailored for international boutiques, department stores, and private labels with flexible low MOQs from 50 pieces.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
              <Link href="/collections" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                <span>Explore Collections</span>
                <ArrowRight size={16} />
              </Link>

              <Link href="/contact" className="btn btn-outline-white" style={{ textDecoration: 'none' }}>
                <span>Request a Quote</span>
              </Link>

              <button
                onClick={() => setIsCatalogueOpen(true)}
                className="btn btn-outline-gold"
                style={{ background: 'rgba(20, 33, 61, 0.4)' }}
              >
                <Download size={15} />
                <span>Download Lookbook (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          2. TRUST STRIP (Clearly marked demonstration metrics)
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-ivory)',
          borderBottom: '1px solid rgba(184, 137, 59, 0.25)',
          padding: '2rem 0'
        }}
      >
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 600 }}>
                From 50 pcs
              </div>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244, 239, 230, 0.8)' }}>
                Low MOQ per Style
              </div>
              <span className="demo-tag" style={{ marginTop: '4px' }}>Demo Target</span>
            </div>

            <div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 600 }}>
                25,000 pcs
              </div>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244, 239, 230, 0.8)' }}>
                Monthly Garment Capacity
              </div>
              <span className="demo-tag" style={{ marginTop: '4px' }}>Subject to Verification</span>
            </div>

            <div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 600 }}>
                120 Artisans
              </div>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244, 239, 230, 0.8)' }}>
                Production & Craft Team
              </div>
              <span className="demo-tag" style={{ marginTop: '4px' }}>Subject to Verification</span>
            </div>

            <div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-gold)', fontWeight: 600 }}>
                7 Export Hubs
              </div>
              <div style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(244, 239, 230, 0.8)' }}>
                UK • UAE • USA • EU • AUS
              </div>
              <span className="demo-tag" style={{ marginTop: '4px' }}>Demonstration Metric</span>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          3. FOUR VISUALLY PROMINENT CATEGORY TILES
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Signature Curations</span>
            <h2 className="section-title">Wholesale Product Categories</h2>
            <p className="section-subtitle">
              Engineered with export-grade stitching, pre-shrunk natural textiles, and authentic regional artisan techniques.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {/* Tile 1: Kurtis & Tunics */}
            <Link
              href="/collections?category=Kurtis"
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'block',
                border: '1px solid var(--color-border)'
              }}
              className="category-tile group"
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                alt="Kurtis and Tunics"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="tile-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 33, 61, 0.85) 0%, rgba(20, 33, 61, 0.2) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: 'var(--color-ivory)'
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Artisanal Heritage
                </span>
                <h3 style={{ color: 'var(--color-ivory)', margin: '4px 0 8px 0', fontSize: '1.6rem' }}>Kurtis & Tunics</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(244, 239, 230, 0.85)', margin: 0 }}>
                  Bagru block prints, Lucknow chikankari & straight slub tunics.
                </p>
              </div>
            </Link>

            {/* Tile 2: Summer Dresses */}
            <Link
              href="/collections?category=Dresses"
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'block',
                border: '1px solid var(--color-border)'
              }}
              className="category-tile group"
            >
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
                alt="Boho Maxi & Tiered Dresses"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="tile-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 33, 61, 0.85) 0%, rgba(20, 33, 61, 0.2) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: 'var(--color-ivory)'
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Resort & Summer
                </span>
                <h3 style={{ color: 'var(--color-ivory)', margin: '4px 0 8px 0', fontSize: '1.6rem' }}>Bespoke Dresses</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(244, 239, 230, 0.85)', margin: 0 }}>
                  Fluid botanical rayon maxis & tiered organic cotton voile midis.
                </p>
              </div>
            </Link>

            {/* Tile 3: Co-ord Sets */}
            <Link
              href="/collections?category=Co-ord Sets"
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'block',
                border: '1px solid var(--color-border)'
              }}
              className="category-tile group"
            >
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                alt="Linen & Cotton Co-ord Sets"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="tile-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 33, 61, 0.85) 0%, rgba(20, 33, 61, 0.2) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: 'var(--color-ivory)'
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Contemporary Loungewear
                </span>
                <h3 style={{ color: 'var(--color-ivory)', margin: '4px 0 8px 0', fontSize: '1.6rem' }}>Co-ord Sets</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(244, 239, 230, 0.85)', margin: 0 }}>
                  European linen blend duos & block-printed matching ensembles.
                </p>
              </div>
            </Link>

            {/* Tile 4: Tops & Bottoms */}
            <Link
              href="/collections?category=Tops"
              style={{
                position: 'relative',
                height: '420px',
                overflow: 'hidden',
                display: 'block',
                border: '1px solid var(--color-border)'
              }}
              className="category-tile group"
            >
              <img
                src="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80"
                alt="Tops, Shirts and Bottoms"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                className="tile-img"
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 33, 61, 0.85) 0%, rgba(20, 33, 61, 0.2) 60%, transparent 100%)',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: 'var(--color-ivory)'
                }}
              >
                <span style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                  Separates & Bottoms
                </span>
                <h3 style={{ color: 'var(--color-ivory)', margin: '4px 0 8px 0', fontSize: '1.6rem' }}>Tops & Bottoms</h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(244, 239, 230, 0.85)', margin: 0 }}>
                  Mandarin collar linen shirts, smocked peasant tops & palazzo trousers.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <style jsx>{`
          .category-tile:hover .tile-img {
            transform: scale(1.05);
          }
        `}</style>
      </section>

      {/* ----------------------------------------------------
          4. NEW ARRIVALS SHOWCASE (6 curated styles)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--color-ivory-light)' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '3rem',
              gap: '1rem'
            }}
          >
            <div>
              <span className="section-eyebrow">Wholesale Highlights</span>
              <h2 className="section-title" style={{ margin: 0 }}>New Season Showcase</h2>
            </div>
            <Link href="/collections" className="btn btn-secondary btn-sm" style={{ textDecoration: 'none' }}>
              <span>View All 16 Styles</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {showcaseProducts.map((prod) => (
              <ProductCard
                key={prod.sku}
                product={prod}
                onQuickView={handleQuickView}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          5. BRAND STORY & CRAFTSMANSHIP
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            {/* Editorial imagery stack */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '90%',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden',
                  backgroundColor: '#EAE6DF',
                  border: '1px solid var(--color-border)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80"
                  alt="Hand-block printing artisan in Rajasthan"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Offset secondary image */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-25px',
                  right: '0',
                  width: '55%',
                  aspectRatio: '1 / 1',
                  overflow: 'hidden',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 15px 35px rgba(20, 33, 61, 0.12)'
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80"
                  alt="Lucknowi Chikankari embroidery close-up"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Editorial Copy */}
            <div>
              <span className="section-eyebrow">The Manufacturing Ethos</span>
              <h2 className="section-title">
                Handcrafted Roots, Disciplined Export Standards
              </h2>
              <div className="gold-divider-left" />
              <p style={{ fontSize: '1.02rem', lineHeight: 1.8, marginBottom: '1.4rem' }}>
                At <strong>MYKA FASHION</strong>, we bridge timeless Indian textile heritage with the rigorous technical compliance demanded by European, American, and Gulf fashion labels.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-charcoal-light)', marginBottom: '1.8rem' }}>
                From master carvers shaping teakwood blocks for Bagru mud-resist prints, to generational women artisans crafting delicate shadow-work chikankari in Uttar Pradesh, our garments honor conscious craftsmanship. Every yard of cotton cambric, organic voile, and European flax linen is thoroughly tested for color fastness, dimensional stability, and soft skin feel.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '2rem' }}>
                <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderLeft: '3px solid var(--color-gold)' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: 'var(--color-navy)' }}>Zero Synthetic Fillers</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-charcoal-light)' }}>
                    Natural breathable cottons, certified organic linen, and botanical dyes.
                  </p>
                </div>
                <div style={{ padding: '12px 14px', backgroundColor: 'var(--color-ivory)', borderLeft: '3px solid var(--color-navy)' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: 'var(--color-navy)' }}>Private Label Ready</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-charcoal-light)' }}>
                    Custom neck labels, wash tags, barcodes, and export carton packaging.
                  </p>
                </div>
              </div>

              <Link href="/about" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                <span>Read Full Brand & Export Story</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          6. FOUR-STEP HOW IT WORKS
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--color-navy)', color: 'var(--color-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
              Seamless Global Trade
            </span>
            <h2 style={{ color: 'var(--color-ivory)', marginTop: '0.5rem' }}>How Wholesale Orders Work</h2>
            <p style={{ color: 'rgba(244, 239, 230, 0.8)', maxWidth: '600px', margin: '0.5rem auto 0' }}>
              From initial style shortlisting to air/ocean freight delivery, our export desk manages the entire pipeline with transparent FOB/CIF terms.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(184, 137, 59, 0.3)',
                padding: '30px 24px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.4rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-gold)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                01
              </span>
              <h4 style={{ color: 'var(--color-ivory)', marginBottom: '10px', fontSize: '1.2rem' }}>
                Browse Styles
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', lineHeight: 1.6, margin: 0 }}>
                Explore our 16 curated core silhouettes. Add desired styles, target volume numbers, and color choices to your Inquiry Shortlist.
              </p>
            </div>

            {/* Step 2 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(184, 137, 59, 0.3)',
                padding: '30px 24px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.4rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-gold)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                02
              </span>
              <h4 style={{ color: 'var(--color-ivory)', marginBottom: '10px', fontSize: '1.2rem' }}>
                Send Inquiry
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', lineHeight: 1.6, margin: 0 }}>
                Submit your shortlist with delivery country, company profile, and optional tech packs. Receive your unique inquiry reference code instantly.
              </p>
            </div>

            {/* Step 3 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(184, 137, 59, 0.3)',
                padding: '30px 24px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.4rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-gold)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                03
              </span>
              <h4 style={{ color: 'var(--color-ivory)', marginBottom: '10px', fontSize: '1.2rem' }}>
                Receive Quote & Samples
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', lineHeight: 1.6, margin: 0 }}>
                Within 24 hours, our merchandising desk provides formal FOB/CIF pricing tiers. Physical fabric swatches and samples are dispatched via DHL/FedEx.
              </p>
            </div>

            {/* Step 4 */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(184, 137, 59, 0.3)',
                padding: '30px 24px',
                position: 'relative'
              }}
            >
              <span
                style={{
                  fontSize: '2.4rem',
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-gold)',
                  fontWeight: 600,
                  display: 'block',
                  marginBottom: '10px'
                }}
              >
                04
              </span>
              <h4 style={{ color: 'var(--color-ivory)', marginBottom: '10px', fontSize: '1.2rem' }}>
                Production & Shipping
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', lineHeight: 1.6, margin: 0 }}>
                After PPS (pre-production sample) approval, bulk cutting commences with 4-point fabric inspection and AQL 2.5 final export clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. SAMPLE TESTIMONIAL CARDS (Clearly marked Demo)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Client Perspectives</span>
            <h2 className="section-title">International Buyer Feedback</h2>
            <div style={{ display: 'inline-block', margin: '4px 0 12px' }}>
              <span className="demo-tag">Demonstration Content — Pending Client Verification</span>
            </div>
            <p className="section-subtitle">
              Sample feedback illustrating boutique and wholesale partnerships across our primary export regions.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Testimonial 1 */}
            <div
              style={{
                padding: '32px 28px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
                &ldquo;MYKA Fashion has been our primary manufacturing partner for hand-block tunics in London. The stitching consistency and natural vegetable dyes exceed UK high-street standards.&rdquo;
              </p>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-navy)', fontSize: '1rem' }}>
                  Emma Clarke
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                  Willow & Thread • London, UK
                </span>
                <div style={{ marginTop: '6px' }}>
                  <span className="demo-tag">Demo Testimonial</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div
              style={{
                padding: '32px 28px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
                &ldquo;Exceptional chikankari finishing and prompt air-freight dispatch to Dubai. Our boutique clients appreciate the authentic craftsmanship and delicate sleeve lace detailing.&rdquo;
              </p>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-navy)', fontSize: '1rem' }}>
                  Fatima Al-Sayed
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                  Desert Rose Boutiques • Dubai, UAE
                </span>
                <div style={{ marginTop: '6px' }}>
                  <span className="demo-tag">Demo Testimonial</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div
              style={{
                padding: '32px 28px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--color-charcoal)', marginBottom: '24px' }}>
                &ldquo;Low MOQs allowed us to test four capsule collections in our Melbourne stores before scaling to 2,000-unit bulk orders. Their linen blend trousers are a top seller.&rdquo;
              </p>
              <div>
                <strong style={{ display: 'block', color: 'var(--color-navy)', fontSize: '1rem' }}>
                  Sarah Jenkins
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-gold)' }}>
                  Southern Resort Collective • Melbourne, Australia
                </span>
                <div style={{ marginTop: '6px' }}>
                  <span className="demo-tag">Demo Testimonial</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          8. EXPORT MARKETS SECTION (Tasteful country indicators)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--color-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Global Footprint</span>
            <h2 className="section-title">Serving International Trade Markets</h2>
            <div style={{ display: 'inline-block', margin: '4px 0 12px' }}>
              <span className="demo-tag">Sample Order Share Breakdown — For Planning Demonstration</span>
            </div>
            <p className="section-subtitle">
              Reliable sea freight dispatch via Nhava Sheva & Mundra seaports, and expedited air cargo through Delhi IGI Airport.
            </p>
          </div>

          {/* Market Share Grid based on PRD: UK 22%, UAE 18%, USA 15%, Germany 10%, Australia 8%, France 6%, India 14%, Other 7% */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
              marginBottom: '3rem'
            }}
          >
            {[
              { country: 'United Kingdom', share: '22%', port: 'London Gateway / Felixstowe' },
              { country: 'United Arab Emirates', share: '18%', port: 'Jebel Ali / Dubai Cargo' },
              { country: 'United States', share: '15%', port: 'New York / Los Angeles' },
              { country: 'Domestic (India)', share: '14%', port: 'Jaipur / Delhi NCR Hub' },
              { country: 'Germany', share: '10%', port: 'Hamburg / Frankfurt' },
              { country: 'Australia', share: '8%', port: 'Sydney / Melbourne' },
              { country: 'France', share: '6%', port: 'Le Havre / Paris CDG' },
              { country: 'Other Destinations', share: '7%', port: 'Global Dispatch via DHL/FedEx' }
            ].map((m) => (
              <div
                key={m.country}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ color: 'var(--color-navy)', fontSize: '1rem' }}>{m.country}</strong>
                  <span style={{ color: 'var(--color-gold)', fontWeight: 700, fontSize: '1.1rem' }}>{m.share}</span>
                </div>
                <div style={{ width: '100%', height: '4px', backgroundColor: '#EFEAE1', marginTop: '6px' }}>
                  <div
                    style={{
                      height: '100%',
                      backgroundColor: 'var(--color-gold)',
                      width: m.share
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-subtle)', marginTop: '4px' }}>
                  Delivery Hub: {m.port}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundColor: 'var(--color-navy-dark)',
              color: 'var(--color-ivory)',
              padding: '24px 32px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div>
              <h4 style={{ color: 'var(--color-ivory)', margin: '0 0 4px', fontSize: '1.15rem' }}>
                Need Customs Brokerage or CIF Quotations?
              </h4>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)' }}>
                We provide complete export documentation: Certificate of Origin, Packing List, Commercial Invoices, and EUR.1 movement certificates.
              </p>
            </div>
            <Link href="/contact" className="btn btn-gold btn-sm" style={{ textDecoration: 'none' }}>
              Speak with Export Merchandiser
            </Link>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          9. STRONG FULL-WIDTH INQUIRY CTA
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-ivory)',
          padding: '5rem 0',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <div className="container" style={{ maxWidth: '800px' }}>
          <span style={{ color: 'var(--color-gold)', letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
            Start Your Trade Partnership
          </span>
          <h2 style={{ color: 'var(--color-ivory)', fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', margin: '0.8rem 0 1.2rem' }}>
            Ready to Develop Your Next Apparel Capsule?
          </h2>
          <p style={{ color: 'rgba(244, 239, 230, 0.85)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Submit your shortlisted styles, target quantities, and private labeling requirements. Our merchandising team will return an official FOB / CIF quotation within 24 business hours.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <Link href="/contact" className="btn btn-gold" style={{ textDecoration: 'none' }}>
              <span>Submit Wholesale Inquiry</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setIsCatalogueOpen(true)}
              className="btn btn-outline-white"
            >
              <Download size={16} />
              <span>Download Full Catalogue (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Catalogue Download Modal */}
      <CatalogueDownloadModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
      />
    </>
  );
}
