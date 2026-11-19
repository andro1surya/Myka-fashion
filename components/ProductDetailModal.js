'use client';

import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Send, Clock, Layers, Shield, Sparkles } from 'lucide-react';
import { useInquiry } from '../context/InquiryContext';

export default function ProductDetailModal({ product, isOpen, onClose }) {
  const { addToInquiry, setIsDrawerOpen } = useInquiry();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(100);

  useEffect(() => {
    if (product) {
      setSelectedImage(0);
      setSelectedColor(product.colors && product.colors[0] ? product.colors[0].name : 'Standard');
      setQuantity(product.moq || 50);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80'];

  const handleAddRegular = () => {
    addToInquiry(product, quantity, selectedColor, false);
    setIsDrawerOpen(true);
  };

  const handleAddSample = () => {
    addToInquiry(product, 2, selectedColor, true);
    setIsDrawerOpen(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        backgroundColor: 'rgba(13, 22, 41, 0.75)',
        backdropFilter: 'blur(5px)',
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
          maxWidth: '1020px',
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 0,
          border: '1px solid var(--color-border)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
          overflowY: 'auto',
          position: 'relative',
          animation: 'modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Product Detail"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            background: 'var(--color-navy)',
            color: 'var(--color-ivory)',
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gold)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-navy)')}
        >
          <X size={20} />
        </button>

        {/* Modal Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))'
          }}
        >
          {/* Left Column: Image Gallery (4-5 images) */}
          <div
            style={{
              padding: '30px',
              backgroundColor: 'var(--color-ivory-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {/* Main Stage Image (4:5 Aspect Ratio) */}
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#EAE6DF',
                border: '1px solid var(--color-border)'
              }}
            >
              <img
                src={images[selectedImage]}
                alt={`${product.name} - View ${selectedImage + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  backgroundColor: 'var(--color-navy)',
                  color: 'var(--color-ivory)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  fontWeight: 600,
                  padding: '4px 8px',
                  textTransform: 'uppercase'
                }}
              >
                {product.sku}
              </span>
            </div>

            {/* Thumbnail Carousel (4-5 images) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${images.length}, 1fr)`,
                gap: '10px'
              }}
            >
              {images.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    aspectRatio: '4 / 5',
                    padding: 0,
                    border: selectedImage === idx ? '2px solid var(--color-gold)' : '1px solid var(--color-border)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    opacity: selectedImage === idx ? 1 : 0.65,
                    transition: 'all 0.2s ease',
                    background: '#FAF7F2'
                  }}
                  aria-label={`Select image view ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>

            <p style={{ fontSize: '0.72rem', color: 'var(--color-gray-subtle)', textAlign: 'center', margin: 0 }}>
              Showing high-definition studio & fabric close-up photography.
            </p>
          </div>

          {/* Right Column: Garment Specifications & Actions */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: '0.75rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 600,
                display: 'block',
                marginBottom: '6px'
              }}
            >
              {product.category}
            </span>

            <h2
              style={{
                fontSize: '1.8rem',
                fontFamily: 'var(--font-serif)',
                color: 'var(--color-navy)',
                margin: '0 0 12px 0'
              }}
            >
              {product.name}
            </h2>

            {/* Indicative Pricing */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--color-border)'
              }}
            >
              <span style={{ fontSize: '1.45rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                {product.priceDisplay}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-light)' }}>
                FOB India Port (Indicative trade price)
              </span>
            </div>

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-charcoal-light)',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              {product.description}
            </p>

            {/* Specifications Matrix */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                padding: '16px',
                backgroundColor: 'var(--color-ivory)',
                marginBottom: '20px',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Fabric
                </span>
                <strong style={{ color: 'var(--color-navy)' }}>{product.fabric}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Composition
                </span>
                <strong style={{ color: 'var(--color-navy)' }}>{product.composition || '100% Cambric'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Standard MOQ
                </span>
                <strong style={{ color: 'var(--color-navy)' }}>{product.moq} pcs / style</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-gray-subtle)', display: 'block', fontSize: '0.72rem', textTransform: 'uppercase' }}>
                  Production Lead Time
                </span>
                <strong style={{ color: 'var(--color-navy)' }}>{product.leadTime}</strong>
              </div>
            </div>

            {/* Sizes */}
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-navy)',
                  fontWeight: 600,
                  marginBottom: '8px'
                }}
              >
                Available Export Size Range
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.sizes && product.sizes.map((sz) => (
                  <span
                    key={sz}
                    style={{
                      border: '1px solid var(--color-border)',
                      padding: '4px 10px',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      backgroundColor: '#FFF'
                    }}
                  >
                    {sz}
                  </span>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}
                >
                  Colorway: <span style={{ color: 'var(--color-gold)' }}>{selectedColor}</span>
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: isSelected ? '3px solid var(--color-navy)' : '1px solid #CCC',
                          boxShadow: isSelected ? '0 0 0 2px var(--color-gold)' : 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0
                        }}
                      >
                        {isSelected && (
                          <Check
                            size={14}
                            color={c.hex === '#FFFFFF' || c.hex === '#FAF0CA' || c.hex === '#F4EFE6' ? '#000' : '#FFF'}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special MF-001 Quantity Tier Table */}
            {product.priceTiers && product.priceTiers.length > 0 && (
              <div style={{ marginBottom: '22px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Volume FOB Price Breaks (MF-001 Tiered Matrix)
                </span>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: '0.8rem',
                    textAlign: 'left'
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-navy)', color: '#FFF' }}>
                      <th style={{ padding: '6px 10px', fontWeight: 500 }}>Volume Tier</th>
                      <th style={{ padding: '6px 10px', fontWeight: 500 }}>Unit FOB Price</th>
                      <th style={{ padding: '6px 10px', fontWeight: 500 }}>Est. Lead Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.priceTiers.map((tier, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid var(--color-border)',
                          backgroundColor: idx % 2 === 0 ? 'var(--color-ivory-light)' : '#FFF'
                        }}
                      >
                        <td style={{ padding: '6px 10px', fontWeight: 600 }}>{tier.range}</td>
                        <td style={{ padding: '6px 10px', color: 'var(--color-gold)', fontWeight: 600 }}>
                          {tier.price}
                        </td>
                        <td style={{ padding: '6px 10px', color: 'var(--color-charcoal-light)' }}>
                          {tier.leadTime}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px'
                }}
              >
                <label
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    color: 'var(--color-navy)'
                  }}
                >
                  Target Quantity:
                </label>
                <input
                  type="number"
                  min={product.moq || 50}
                  step={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                  style={{
                    width: '100px',
                    padding: '8px 10px',
                    border: '1px solid var(--color-border)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-gray-subtle)' }}>
                  (Min MOQ: {product.moq} pcs)
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '10px' }}>
                <button
                  onClick={handleAddRegular}
                  className="btn btn-primary"
                  style={{ padding: '12px' }}
                >
                  <ShoppingBag size={16} />
                  <span>Add to Inquiry List</span>
                </button>

                <button
                  onClick={handleAddSample}
                  className="btn btn-secondary"
                  style={{ padding: '12px' }}
                  title="Request 2-3 showroom evaluation samples"
                >
                  <span>Request Sample</span>
                </button>
              </div>

              <p
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-gray-subtle)',
                  marginTop: '10px',
                  marginBottom: 0,
                  textAlign: 'center'
                }}
              >
                ✓ B2B Inquiry only. No payment gateway or retail cart checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
