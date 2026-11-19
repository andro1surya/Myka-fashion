'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInquiry } from '../context/InquiryContext';
import { X, Trash2, ArrowRight, ShoppingBag, Plus, Minus } from 'lucide-react';

export default function InquiryDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQuantity,
    updateItemNotes,
    removeItem,
    clearInquiry,
    totalItemsCount,
    totalGarmentUnits
  } = useInquiry();

  const router = useRouter();

  if (!isDrawerOpen) return null;

  const handleProceedToInquiry = () => {
    setIsDrawerOpen(false);
    router.push('/contact');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(13, 22, 41, 0.65)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity 0.3s ease'
      }}
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '100%',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.15)',
          animation: 'slideInRight 0.3s ease forwards'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            backgroundColor: 'var(--color-navy)',
            color: 'var(--color-ivory)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(184, 137, 59, 0.3)'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                display: 'block'
              }}
            >
              B2B Order Shortlist
            </span>
            <h3
              style={{
                margin: 0,
                fontSize: '1.4rem',
                color: 'var(--color-ivory)',
                fontFamily: 'var(--font-serif)'
              }}
            >
              Inquiry Shortlist ({totalItemsCount})
            </h3>
          </div>
          <button
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close Inquiry Drawer"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-ivory)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Shortlist Items Body */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 24px'
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--color-charcoal-light)'
              }}
            >
              <ShoppingBag
                size={44}
                style={{
                  margin: '0 auto 16px',
                  color: 'var(--color-gold)',
                  opacity: 0.8
                }}
              />
              <h4
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  color: 'var(--color-navy)',
                  marginBottom: '8px'
                }}
              >
                Your Shortlist is Empty
              </h4>
              <p style={{ fontSize: '0.9rem', marginBottom: '24px', lineHeight: 1.5 }}>
                Browse our collections to shortlist garments, evaluate fabric swatches, or request volume quotations.
              </p>
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  router.push('/collections');
                }}
                className="btn btn-primary"
                style={{ width: '100%' }}
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-terracotta)',
                  backgroundColor: 'rgba(166, 75, 42, 0.08)',
                  padding: '8px 12px',
                  borderRadius: '2px',
                  borderLeft: '3px solid var(--color-terracotta)'
                }}
              >
                <strong>B2B Inquiry Notice:</strong> Shortlisting styles does not process any online payment. You will receive an official FOB/CIF quotation from our export desk.
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '16px',
                    backgroundColor: 'var(--color-ivory-light)',
                    border: '1px solid var(--color-border)',
                    position: 'relative'
                  }}
                >
                  {/* Product Image Thumbnail */}
                  <div
                    style={{
                      width: '75px',
                      height: '95px',
                      position: 'relative',
                      flexShrink: 0,
                      backgroundColor: '#EAE6DF',
                      overflow: 'hidden'
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: '#888'
                        }}
                      >
                        {item.sku}
                      </div>
                    )}
                  </div>

                  {/* Product Details & Controls */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '4px'
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          color: 'var(--color-gold)',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.sku} • {item.category}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label="Remove item"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--color-gray-subtle)',
                          cursor: 'pointer',
                          padding: '2px',
                          lineHeight: 1
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-terracotta)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-gray-subtle)')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h4
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        color: 'var(--color-navy)',
                        margin: '0 0 4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {item.name}
                    </h4>

                    <div
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-charcoal-light)',
                        marginBottom: '8px'
                      }}
                    >
                      Fabric: {item.fabric} • Indicative: <strong style={{ color: 'var(--color-navy)' }}>{item.priceDisplay}</strong>
                    </div>

                    {item.isSample && (
                      <span
                        style={{
                          display: 'inline-block',
                          fontSize: '0.65rem',
                          backgroundColor: 'var(--color-navy)',
                          color: '#fff',
                          padding: '2px 6px',
                          marginBottom: '8px',
                          textTransform: 'uppercase'
                        }}
                      >
                        Sample Request
                      </span>
                    )}

                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '8px'
                      }}
                    >
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--color-border)',
                          backgroundColor: '#FFF'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 10)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            color: 'var(--color-navy)'
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          onChange={(e) => updateQuantity(item.id, e.target.value)}
                          style={{
                            width: '56px',
                            textAlign: 'center',
                            border: 'none',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            color: 'var(--color-navy)'
                          }}
                        />
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 10)}
                          style={{
                            background: 'none',
                            border: 'none',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            color: 'var(--color-navy)'
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span style={{ fontSize: '0.75rem', color: 'var(--color-gray-subtle)' }}>
                        MOQ: {item.moq} pcs
                      </span>
                    </div>

                    {/* Custom specifications / color note */}
                    <input
                      type="text"
                      placeholder="Color / packaging note (e.g. Indigo, Navy)"
                      value={item.notes || ''}
                      onChange={(e) => updateItemNotes(item.id, e.target.value)}
                      style={{
                        width: '100%',
                        marginTop: '8px',
                        padding: '5px 8px',
                        fontSize: '0.78rem',
                        border: '1px solid var(--color-border)',
                        backgroundColor: '#FFF'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer with summary & CTA */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              backgroundColor: 'var(--color-ivory)',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '10px',
                fontSize: '0.85rem'
              }}
            >
              <span style={{ color: 'var(--color-charcoal-light)' }}>Total Shortlisted Styles:</span>
              <strong style={{ color: 'var(--color-navy)' }}>{totalItemsCount} styles</strong>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: '0.95rem'
              }}
            >
              <span style={{ color: 'var(--color-navy)', fontWeight: 600 }}>Estimated Order Quantity:</span>
              <strong style={{ color: 'var(--color-gold)', fontSize: '1.05rem' }}>
                {totalGarmentUnits} pieces
              </strong>
            </div>

            <button
              onClick={handleProceedToInquiry}
              className="btn btn-primary"
              style={{ width: '100%', marginBottom: '10px' }}
            >
              <span>Submit Wholesale Inquiry</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={clearInquiry}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                color: 'var(--color-gray-subtle)',
                fontSize: '0.78rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                padding: '4px'
              }}
            >
              Clear All Shortlisted Styles
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
