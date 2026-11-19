'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import CatalogueDownloadModal from '../../components/CatalogueDownloadModal';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  CheckCircle,
  Truck,
  Globe2,
  Package,
  FileCheck2,
  Download,
  AlertCircle
} from 'lucide-react';

export default function AboutPage() {
  const [isCatalogueOpen, setIsCatalogueOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* ----------------------------------------------------
          1. EDITORIAL BRAND INTRO HERO
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy)',
          color: 'var(--color-ivory)',
          padding: '5rem 0 4rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px' }}>
            <span
              style={{
                color: 'var(--color-gold)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                display: 'block',
                marginBottom: '10px'
              }}
            >
              Export Heritage & Manufacturing
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-ivory)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 1.15,
                margin: '0 0 1.25rem 0'
              }}
            >
              Bridging Generational Indian Craft with International Retail
            </h1>
            <p
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.7,
                color: 'rgba(244, 239, 230, 0.85)',
                margin: 0
              }}
            >
              MYKA FASHION manufactures ethical, natural-fiber women&apos;s apparel for discerning fashion labels and wholesale distributors across Europe, the Middle East, North America, and Australasia.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          2. NATURAL FABRICS & ARTISANAL CRAFTSMANSHIP
          ---------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Natural Fiber Philosophy</span>
            <h2 className="section-title">Pure Textiles, Conscious Weaves</h2>
            <p className="section-subtitle">
              We specialize strictly in skin-friendly natural and regenerated cellulose fabrics suited for warm-weather resortwear and breathable daily luxury.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* Fabric 1 */}
            <div style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-ivory-light)', overflow: 'hidden' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=800&q=80"
                  alt="Cambric Cotton and Mulmul"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  60s & 80s Count
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-navy)', margin: '4px 0 10px' }}>
                  Pure Cambric & Mulmul Cotton
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, margin: 0 }}>
                  Sourced from prime Indian cotton belts. High-density combed cotton that breathes freely, accepts organic vegetable mud-resist dyes with vivid depth, and retains softness wash after wash.
                </p>
              </div>
            </div>

            {/* Fabric 2 */}
            <div style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-ivory-light)', overflow: 'hidden' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
                  alt="European Flax Linen"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Flax & Cotton Blends
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-navy)', margin: '4px 0 10px' }}>
                  European Flax Linen
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, margin: 0 }}>
                  Pre-washed for a relaxed slub drape with zero shrinkage. Used in our signature co-ord sets, mandarin-collar shirts, and tailored wide-leg trousers for resort boutiques.
                </p>
              </div>
            </div>

            {/* Fabric 3 */}
            <div style={{ border: '1px solid var(--color-border)', backgroundColor: 'var(--color-ivory-light)', overflow: 'hidden' }}>
              <div style={{ height: '220px', overflow: 'hidden' }}>
                <img
                  src="https://images.unsplash.com/photo-1583391733975-dd8837e3d3bd?auto=format&fit=crop&w=800&q=80"
                  alt="Lucknowi Chikankari Georgette"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Lucknow Shadow-Work
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: 'var(--color-navy)', margin: '4px 0 10px' }}>
                  Chikankari Hand Embroidery
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, margin: 0 }}>
                  Crafted by generational women artisan clusters in Awadh. Featuring intricate bakhiya, phanda, and jaali stitches rendered on flowing georgette and fine cotton voiles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          3. FACTORY, PRODUCTION & CAPACITY (Demo Disclaimer)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--color-ivory)' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '4rem',
              alignItems: 'center'
            }}
          >
            <div>
              <span className="section-eyebrow">Manufacturing Footprint</span>
              <h2 className="section-title">
                Integrated Cutting, Stitching & Finishing Facilities
              </h2>
              <div className="gold-divider-left" />

              <div style={{ marginBottom: '1.5rem' }}>
                <span className="demo-tag">Demonstration Capacity Data — Subject to Owner Verification</span>
              </div>

              <p style={{ fontSize: '0.98rem', lineHeight: 1.7, color: 'var(--color-charcoal-light)', marginBottom: '1.2rem' }}>
                Our production facilities are equipped with automated lay-cutting systems, Juki lockstitch sewing machines, flatlock overlockers, and dedicated garment steam press tunnels.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', margin: '2rem 0' }}>
                <div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600 }}>
                    25,000 pcs
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Monthly Garment Output
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)' }}>Sample target figure</span>
                </div>

                <div>
                  <div style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 600 }}>
                    120 Artisans
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-gold)', fontWeight: 600, textTransform: 'uppercase' }}>
                    Stitching & Craft Team
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)' }}>Subject to verification</span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6 }}>
                Every production run undergoes strict in-line inspection and final AQL 2.5 standard quality audits checking measurement tolerance, seam strength, color fastness, and needle detection.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80"
                alt="Garment stitching line"
                style={{ width: '100%', height: '260px', objectFit: 'cover' }}
              />
              <img
                src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80"
                alt="Fabric inspection and measurement"
                style={{ width: '100%', height: '260px', objectFit: 'cover', marginTop: '20px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          4. INCOTERMS EXPLAINED (Ex-Works, FOB, CIF)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="section-eyebrow">Trade Transparency</span>
            <h2 className="section-title">Commercial Incoterms We Offer</h2>
            <p className="section-subtitle">
              We accommodate multiple international freight arrangements to match your brand&apos;s shipping contracts and freight forwarder partnerships.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}
          >
            {/* EXW */}
            <div
              style={{
                padding: '32px 28px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            >
              <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 700 }}>
                EXW
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-gold)', margin: '4px 0 12px' }}>
                Ex-Works (Warehouse Dispatch)
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Goods are packaged and made available for collection directly from our manufacturing hub in Jaipur / Delhi NCR. Ideal for buyers with existing freight consolidators stationed in India.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-charcoal)' }}>
                <li>✓ Packing into 7-ply export master cartons</li>
                <li>✓ Full packing list and commercial invoice provided</li>
                <li>• Buyer manages domestic transit and customs filing</li>
              </ul>
            </div>

            {/* FOB */}
            <div
              style={{
                padding: '32px 28px',
                border: '2px solid var(--color-gold)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 8px 24px rgba(20, 33, 61, 0.06)'
              }}
            >
              <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 700 }}>
                FOB
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-gold)', margin: '4px 0 12px' }}>
                Free On Board (Most Popular)
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                We manage inland haulage, customs clearance, and deliver your consignment safely over the ship&apos;s rail at Nhava Sheva / Mundra seaport or onto the cargo plane at Delhi IGI.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-charcoal)' }}>
                <li>✓ Indian customs clearance and shipping bill</li>
                <li>✓ Port handling charges covered</li>
                <li>✓ Buyer books ocean or air freight directly</li>
              </ul>
            </div>

            {/* CIF */}
            <div
              style={{
                padding: '32px 28px',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-ivory-light)'
              }}
            >
              <span style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontWeight: 700 }}>
                CIF
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-gold)', margin: '4px 0 12px' }}>
                Cost, Insurance & Freight
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Complete door-to-port service. We arrange insured ocean or air transport directly to your destination seaport (e.g., London Gateway, Jebel Ali, Los Angeles, Hamburg, Sydney).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: 'var(--color-charcoal)' }}>
                <li>✓ Full marine/air cargo transit insurance</li>
                <li>✓ Ocean Bill of Lading (B/L) or Airway Bill (AWB)</li>
                <li>✓ Certificate of Origin for customs import duty relief</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          5. PRIVATE LABEL & OEM MANUFACTURING
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: 'var(--color-navy)', color: 'var(--color-ivory)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span style={{ color: 'var(--color-gold)', letterSpacing: '0.22em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
              Full Brand Customization
            </span>
            <h2 style={{ color: 'var(--color-ivory)', marginTop: '0.5rem' }}>
              Private Label & OEM Services
            </h2>
            <p style={{ color: 'rgba(244, 239, 230, 0.8)', maxWidth: '640px', margin: '0.5rem auto 0' }}>
              We seamlessly integrate your branding elements so your garments arrive retail-ready for immediate showroom display or e-commerce fulfillment.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}
          >
            <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(184, 137, 59, 0.25)' }}>
              <Package size={28} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--color-ivory)', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Woven Neck Labels</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', margin: 0, lineHeight: 1.6 }}>
                High-density damask, satin, or organic cotton woven brand labels produced to your exact pantone and typography specs.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(184, 137, 59, 0.25)' }}>
              <FileCheck2 size={28} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--color-ivory)', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Hang Tags & Barcodes</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', margin: 0, lineHeight: 1.6 }}>
                FSC-certified kraft paper tags, debossed foil finishes, wax-sealed cords, and scannable EAN/UPC barcode stickers.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(184, 137, 59, 0.25)' }}>
              <Shield size={28} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--color-ivory)', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Care & Composition Tags</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', margin: 0, lineHeight: 1.6 }}>
                Multi-language wash instructions conforming to FTC (USA), UKFT, and EU garment labelling directives.
              </p>
            </div>

            <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(184, 137, 59, 0.25)' }}>
              <Truck size={28} style={{ color: 'var(--color-gold)', marginBottom: '12px' }} />
              <h4 style={{ color: 'var(--color-ivory)', margin: '0 0 8px 0', fontSize: '1.1rem' }}>Export Packaging</h4>
              <p style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.75)', margin: 0, lineHeight: 1.6 }}>
                Recyclable individual polybags, silica gel desiccant packs, and heavy-duty 7-ply corrugated export cartons strapped for ocean transit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          6. SUSTAINABILITY & COMPLIANCE (Strict Non-Fabrication Rule)
          ---------------------------------------------------- */}
      <section className="section" style={{ backgroundColor: '#FFFFFF' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <div
            style={{
              padding: '30px',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-ivory-light)',
              display: 'flex',
              gap: '20px',
              alignItems: 'flex-start'
            }}
          >
            <AlertCircle size={32} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-navy)', fontSize: '1.35rem', margin: '0 0 8px 0' }}>
                Ethical Sourcing & Certification Verification Notice
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-light)', lineHeight: 1.7, margin: '0 0 10px 0' }}>
                In strict accordance with international trade integrity, <strong>MYKA FASHION does not fabricate or display unverified third-party audit badges</strong> (such as GOTS, SEDEX SMETA, OEKO-TEX, or ISO).
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-light)', lineHeight: 1.6, margin: 0 }}>
                Mill certificates for organic yarn lots, azo-free dye reports, and factory inspection documents are provided to buyers on request during sampling and technical audit phases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------
          7. BOTTOM INQUIRY CTA
          ---------------------------------------------------- */}
      <section
        style={{
          backgroundColor: 'var(--color-navy-dark)',
          color: 'var(--color-ivory)',
          padding: '4.5rem 0',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '720px' }}>
          <span style={{ color: 'var(--color-gold)', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 600 }}>
            Next Steps
          </span>
          <h2 style={{ color: 'var(--color-ivory)', fontSize: '2.4rem', margin: '8px 0 16px' }}>
            Consult with Our Export Merchandising Desk
          </h2>
          <p style={{ color: 'rgba(244, 239, 230, 0.8)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            Whether you are curating an exclusive capsule line or seeking bulk volume manufacturing, we are here to support your brand with sampling and competitive FOB quotations.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-gold" style={{ textDecoration: 'none' }}>
              <span>Request a Quote</span>
              <ArrowRight size={15} />
            </Link>
            <button onClick={() => setIsCatalogueOpen(true)} className="btn btn-outline-white">
              <Download size={15} />
              <span>Download Lookbook (PDF)</span>
            </button>
          </div>
        </div>
      </section>

      <CatalogueDownloadModal
        isOpen={isCatalogueOpen}
        onClose={() => setIsCatalogueOpen(false)}
      />
    </div>
  );
}
