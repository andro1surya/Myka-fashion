'use client';

import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { generateWholesaleCataloguePdf } from '../lib/pdfGenerator';
import { initialProducts } from '../lib/data/products';

export default function CatalogueDownloadModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid business email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Post lead to API
      const res = await fetch('/api/catalogue-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, companyName })
      });

      // 2. Generate and trigger PDF download immediately
      const doc = generateWholesaleCataloguePdf(initialProducts);
      doc.save('MYKA-FASHION-Wholesale-Lookbook-2026.pdf');

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
        setCompanyName('');
        onClose();
      }, 2500);
    } catch (err) {
      console.error('Catalogue download error:', err);
      // Still allow downloading even if API call had network glitch
      const doc = generateWholesaleCataloguePdf(initialProducts);
      doc.save('MYKA-FASHION-Wholesale-Lookbook-2026.pdf');
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(13, 22, 41, 0.7)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          border: '1px solid var(--color-gold)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
          overflow: 'hidden',
          animation: 'fadeInScale 0.25s ease'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>

        {/* Modal Header */}
        <div
          style={{
            backgroundColor: 'var(--color-navy)',
            color: 'var(--color-ivory)',
            padding: '24px 28px',
            position: 'relative'
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close Modal"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'none',
              border: 'none',
              color: 'var(--color-ivory)',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
          <span
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              display: 'block'
            }}
          >
            Export Lookbook & Pricing
          </span>
          <h3
            style={{
              margin: '4px 0 0',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.6rem',
              color: 'var(--color-ivory)'
            }}
          >
            Download Wholesale Catalogue
          </h3>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '24px 0' }}>
              <CheckCircle size={48} style={{ color: '#25D366', margin: '0 auto 16px' }} />
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--color-navy)',
                  marginBottom: '8px'
                }}
              >
                Catalogue Downloading Now
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-light)' }}>
                Your PDF copy of the <strong>MYKA FASHION Wholesale Lookbook</strong> is saving to your device. Our merchandising desk has also received your interest.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-charcoal-light)',
                  lineHeight: 1.6,
                  marginBottom: '20px'
                }}
              >
                Enter your professional business email to instantly receive our 2026 B2B lookbook, complete with fabric specifications, MOQ matrices, and indicative FOB price tiers.
              </p>

              {errorMsg && (
                <div
                  style={{
                    backgroundColor: '#FDE8E8',
                    color: '#9B1C1C',
                    padding: '10px 14px',
                    fontSize: '0.85rem',
                    marginBottom: '16px'
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Work / Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. buyer@fashionlabel.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--color-ivory-light)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Company / Boutique Name
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Willow & Thread Ltd"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    backgroundColor: 'var(--color-ivory-light)'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px' }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Preparing PDF...</span>
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    <span>Download PDF Catalogue</span>
                  </>
                )}
              </button>

              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-gray-subtle)',
                  textAlign: 'center',
                  marginTop: '14px',
                  marginBottom: 0
                }}
              >
                🔒 We respect your trade confidentiality. No spam. You may opt out anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
