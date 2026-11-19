'use client';

import React from 'react';
import { Eye, ShoppingBag } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

export default function ProductCard({ product, onQuickView }) {
  const { addToInquiry, setIsDrawerOpen } = useInquiry();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToInquiry(product, product.moq || 50);
    setIsDrawerOpen(true);
  };

  const imageSrc = product.images && product.images[0]
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80';

  return (
    <div
      onClick={() => onQuickView(product)}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--color-border)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        position: 'relative'
      }}
      className="product-card group"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-gold)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(20, 33, 61, 0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Product Image Container (Consistent 4:5 Aspect Ratio) */}
      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 5',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#EAE6DF'
        }}
      >
        <img
          src={imageSrc}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="product-img"
        />

        {/* SKU Badge */}
        <span
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: 'var(--color-navy)',
            color: 'var(--color-ivory)',
            fontSize: '0.68rem',
            letterSpacing: '0.12em',
            fontWeight: 600,
            padding: '3px 7px',
            textTransform: 'uppercase'
          }}
        >
          {product.sku}
        </span>

        {/* Quick View Hover Overlay Button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(20, 33, 61, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            opacity: 0,
            transition: 'opacity 0.25s ease'
          }}
          className="hover-overlay"
        >
          <span
            style={{
              backgroundColor: '#FFF',
              color: 'var(--color-navy)',
              padding: '8px 14px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
            <Eye size={14} /> Quick View
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div
        style={{
          padding: '18px 16px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px'
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              color: 'var(--color-gold)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            {product.category}
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-gray-subtle)'
            }}
          >
            MOQ: {product.moq} pcs
          </span>
        </div>

        <h3
          style={{
            fontSize: '1.05rem',
            fontFamily: 'var(--font-serif)',
            color: 'var(--color-navy)',
            margin: '0 0 6px 0',
            lineHeight: 1.3,
            minHeight: '2.6em'
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-charcoal-light)',
            margin: '0 0 14px 0'
          }}
        >
          Fabric: <strong>{product.fabric}</strong>
        </p>

        {/* Pricing & Add to Inquiry Action */}
        <div
          style={{
            marginTop: 'auto',
            paddingTop: '12px',
            borderTop: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <span
              style={{
                display: 'block',
                fontSize: '0.65rem',
                color: 'var(--color-gray-subtle)',
                textTransform: 'uppercase'
              }}
            >
              FOB Price
            </span>
            <strong style={{ fontSize: '0.92rem', color: 'var(--color-navy)' }}>
              {product.priceDisplay}
            </strong>
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to inquiry shortlist`}
            style={{
              backgroundColor: 'var(--color-ivory)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-navy)',
              padding: '6px 10px',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-navy)';
              e.currentTarget.style.color = 'var(--color-ivory)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-ivory)';
              e.currentTarget.style.color = 'var(--color-navy)';
            }}
          >
            <ShoppingBag size={13} />
            <span>Shortlist</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover .product-img {
          transform: scale(1.04);
        }
        .product-card:hover .hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
}
