'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { useInquiry } from '../context/InquiryContext';
import { Menu, X, ShoppingBag, MessageCircle, FileText } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItemsCount, setIsDrawerOpen } = useInquiry();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  // Handle scroll effect for sticky luxury navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'About & Export', href: '/about' },
    { label: 'Inquiry & Contact', href: '/contact' }
  ];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: scrolled ? 'rgba(20, 33, 61, 0.98)' : 'var(--color-navy)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(184, 137, 59, 0.25)',
          transition: 'all 0.3s ease',
          padding: scrolled ? '14px 0' : '18px 0'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          {/* Logo */}
          <Logo light />

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.2rem'
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-ivory)',
                    position: 'relative',
                    padding: '6px 0',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-gold-light)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--color-ivory)';
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '2px',
                        backgroundColor: 'var(--color-gold)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}
          >
            {/* WhatsApp Quick Chat (if configured) */}
            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20MYKA%20FASHION,%20I%20have%20an%20export%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#25D366',
                  padding: '6px'
                }}
                aria-label="Direct WhatsApp Chat"
                className="desktop-only"
              >
                <MessageCircle size={20} />
              </a>
            )}

            {/* Inquiry Shortlist Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              aria-label={`Open Inquiry Shortlist with ${totalItemsCount} items`}
              style={{
                position: 'relative',
                background: 'transparent',
                border: '1px solid rgba(184, 137, 59, 0.4)',
                color: 'var(--color-ivory)',
                padding: '8px 12px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                transition: 'border-color var(--transition-fast)'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(184, 137, 59, 0.4)')}
            >
              <ShoppingBag size={18} style={{ color: 'var(--color-gold)' }} />
              <span style={{ fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase' }} className="shortlist-label">
                Inquiry List
              </span>
              <span
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-navy-dark)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {totalItemsCount}
              </span>
            </button>

            {/* Request a Quote Button */}
            <Link
              href="/contact"
              className="btn btn-gold btn-sm desktop-only"
              style={{ textDecoration: 'none' }}
            >
              Request a Quote
            </Link>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-hamburger"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-ivory)',
                cursor: 'pointer',
                padding: '6px'
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Slide-Out Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999,
            backgroundColor: 'var(--color-navy-dark)',
            padding: '100px 30px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.8rem',
                  color: pathname === link.href ? 'var(--color-gold)' : 'var(--color-ivory)',
                  letterSpacing: '0.05em'
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ height: '1px', backgroundColor: 'rgba(184, 137, 59, 0.3)', margin: '10px 0' }} />
            <Link
              href="/contact"
              className="btn btn-gold"
              style={{ textAlign: 'center', width: '100%' }}
            >
              Request a Quote
            </Link>
          </div>

          <div style={{ fontSize: '0.85rem', color: 'rgba(244, 239, 230, 0.6)' }}>
            <p style={{ margin: 0 }}>MYKA FASHION Wholesale & Export Desk</p>
            <p style={{ margin: '4px 0 0', color: 'var(--color-gold)' }}>wholesale@mykafashion.com</p>
          </div>
        </div>
      )}

      {/* Responsive styles */}
      <style jsx>{`
        @media (max-width: 900px) {
          :global(.desktop-nav),
          :global(.desktop-only) {
            display: none !important;
          }
          :global(.shortlist-label) {
            display: none !important;
          }
        }
        @media (min-width: 901px) {
          :global(.mobile-hamburger) {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
